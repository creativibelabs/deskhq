<?php

namespace App\Http\Controllers\Api\V1\DHQAdmin\Settings;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\V1\DHQAdmin\Plans\PlanController;
use App\Models\Setting;
use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Stripe\StripeClient;
use Stripe\Exception\ApiErrorException;

class StripeController extends Controller
{
    private function getStripeClient(): StripeClient
    {
        $secret = Setting::get('stripe_secret');

        if (empty($secret)) {
            throw new \Exception('Stripe secret key not configured.');
        }

        return new StripeClient($secret);
    }

    public function status(): JsonResponse
    {
        $isConnected = Setting::get('stripe_connected', false);
        $mode        = Setting::get('stripe_mode', 'test');
        $stripeKey   = Setting::get('stripe_key', '');

        return response()->json([
            'success' => true,
            'message' => 'Stripe status retrieved successfully.',
            'data'    => [
                'connected'  => (bool) $isConnected,
                'mode'       => $mode,
                'stripe_key' => $stripeKey ? substr($stripeKey, 0, 8) . '***' : null,
            ],
        ], 200);
    }

    public function connect(Request $request): JsonResponse
    {
        $request->validate([
            'stripe_key'    => 'required|string|starts_with:pk_',
            'stripe_secret' => 'required|string|starts_with:sk_',
            'stripe_mode'   => 'required|in:test,live',
        ]);

        $keyPrefix    = $request->stripe_mode === 'test' ? 'pk_test_' : 'pk_live_';
        $secretPrefix = $request->stripe_mode === 'test' ? 'sk_test_' : 'sk_live_';

        if (!str_starts_with($request->stripe_key, $keyPrefix)) {
            return response()->json([
                'success' => false,
                'message' => "Stripe key must start with {$keyPrefix} for {$request->stripe_mode} mode.",
            ], 422);
        }

        if (!str_starts_with($request->stripe_secret, $secretPrefix)) {
            return response()->json([
                'success' => false,
                'message' => "Stripe secret must start with {$secretPrefix} for {$request->stripe_mode} mode.",
            ], 422);
        }

        try {
            Setting::set('stripe_key',    $request->stripe_key,    'stripe', 'string', true);
            Setting::set('stripe_secret', $request->stripe_secret, 'stripe', 'string', true);
            Setting::set('stripe_mode',   $request->stripe_mode,   'stripe', 'string', true);

            $stripe  = $this->getStripeClient();
            $account = $stripe->accounts->retrieve();

            // Local → whsec from .env
            // Production → webhook auto create
            if (app()->environment('production')) {
                $webhookUrl = config('app.url') . '/api/v1/webhooks/stripe';

                $oldWebhookId = Setting::get('stripe_webhook_id');
                if (!empty($oldWebhookId)) {
                    try {
                        $stripe->webhookEndpoints->delete($oldWebhookId);
                    } catch (\Exception $e) {}
                }

                $webhook = $stripe->webhookEndpoints->create([
                    'url'            => $webhookUrl,
                    'enabled_events' => [
                        'customer.subscription.created',
                        'customer.subscription.updated',
                        'customer.subscription.deleted',
                        'invoice.payment_succeeded',
                        'invoice.payment_failed',
                    ],
                    'description' => 'DeskHQ Webhook',
                ]);

                Setting::set('stripe_webhook_id',    $webhook->id,     'stripe', 'string', true);
                Setting::set('stripe_webhook_secret', $webhook->secret, 'stripe', 'string', true);
            } else {
                $webhookSecret = config('services.stripe.webhook_secret');
                if (!empty($webhookSecret)) {
                    Setting::set('stripe_webhook_secret', $webhookSecret, 'stripe', 'string', true);
                }
            }

            Setting::set('stripe_connected', 'true', 'stripe', 'boolean', true);
            Setting::flushGroup('stripe');

            // Auto sync all plans
            $synced  = 0;
            $failed  = 0;
            $planController = new PlanController();
            $plans   = SubscriptionPlan::all();

            foreach ($plans as $plan) {
                try {
                    $planController->syncPlanToStripe($plan);
                    $synced++;
                } catch (\Exception $e) {
                    $failed++;
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Stripe connected successfully.',
                'data'    => [
                    'connected'    => true,
                    'mode'         => $request->stripe_mode,
                    'account_id'   => $account->id,
                    'plans_synced' => $synced,
                    'plans_failed' => $failed,
                ],
            ], 200);

        } catch (ApiErrorException $e) {
            Setting::set('stripe_connected', 'false', 'stripe', 'boolean', true);
            Setting::flushGroup('stripe');

            return response()->json([
                'success' => false,
                'message' => 'Stripe connection failed: ' . $e->getMessage(),
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function disconnect(): JsonResponse
    {
        try {
            $webhookId = Setting::get('stripe_webhook_id');

            if (!empty($webhookId) && app()->environment('production')) {
                try {
                    $stripe = $this->getStripeClient();
                    $stripe->webhookEndpoints->delete($webhookId);
                } catch (\Exception $e) {}
            }

            Setting::set('stripe_connected',      'false', 'stripe', 'boolean', true);
            Setting::set('stripe_webhook_id',      '',      'stripe', 'string',  true);
            Setting::set('stripe_webhook_secret',  '',      'stripe', 'string',  true);
            Setting::set('stripe_key',             '',      'stripe', 'string',  true);
            Setting::set('stripe_secret',          '',      'stripe', 'string',  true);
            Setting::set('stripe_mode',            'test',  'stripe', 'string',  true);

            Setting::flushGroup('stripe');

            return response()->json([
                'success' => true,
                'message' => 'Stripe disconnected successfully.',
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function syncPlans(): JsonResponse
    {
        if (!Setting::get('stripe_connected', false)) {
            return response()->json([
                'success' => false,
                'message' => 'Stripe is not connected.',
            ], 422);
        }

        $synced         = 0;
        $failed         = 0;
        $results        = [];
        $planController = new PlanController();
        $plans          = SubscriptionPlan::all();

        foreach ($plans as $plan) {
            try {
                $planController->syncPlanToStripe($plan);
                $synced++;
                $results[] = [
                    'plan'    => $plan->name,
                    'status'  => 'success',
                ];
            } catch (\Exception $e) {
                $failed++;
                $results[] = [
                    'plan'    => $plan->name,
                    'status'  => 'failed',
                    'message' => $e->getMessage(),
                ];
            }
        }

        return response()->json([
            'success' => true,
            'message' => "Sync complete: {$synced} succeeded, {$failed} failed.",
            'data'    => [
                'synced'  => $synced,
                'failed'  => $failed,
                'results' => $results,
            ],
        ], 200);
    }
}
