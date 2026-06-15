<?php

namespace App\Http\Controllers\Api\V1\DHQAdmin\Plans;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlan;
use App\Models\PlanModule;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Stripe\StripeClient;
use Stripe\Exception\ApiErrorException;

class PlanController extends Controller
{
    private function getStripe(): ?StripeClient
    {
        if (!Setting::get('stripe_connected', false)) return null;

        $secret = Setting::get('stripe_secret');
        if (empty($secret)) return null;

        return new StripeClient($secret);
    }

    public function syncPlanToStripe(SubscriptionPlan $plan): void
    {
        $this->syncToStripe($plan);
    }

    private function syncToStripe(SubscriptionPlan $plan): void
    {
        $stripe = $this->getStripe();
        if (!$stripe) return;

        try {
            // Create or update product
            if (!empty($plan->stripe_product_id)) {
                try {
                    $product = $stripe->products->update(
                        $plan->stripe_product_id,
                        [
                            'name'        => 'DeskHQ ' . $plan->name,
                            'description' => $plan->description ?? '',
                            'metadata'    => [
                                'plan_id'   => $plan->id,
                                'plan_slug' => $plan->slug,
                            ],
                        ]
                    );
                } catch (ApiErrorException $e) {
                    $product = $stripe->products->create([
                        'name'        => 'DeskHQ ' . $plan->name,
                        'description' => $plan->description ?? '',
                        'metadata'    => [
                            'plan_id'   => $plan->id,
                            'plan_slug' => $plan->slug,
                        ],
                    ]);
                }
            } else {
                $product = $stripe->products->create([
                    'name'        => 'DeskHQ ' . $plan->name,
                    'description' => $plan->description ?? '',
                    'metadata'    => [
                        'plan_id'   => $plan->id,
                        'plan_slug' => $plan->slug,
                    ],
                ]);
            }

            // Monthly price
            $monthlyPrice = $this->syncPrice(
                $stripe,
                $product->id,
                (float)$plan->monthly_price,
                'month',
                $plan->monthly_stripe_price_id,
                $plan
            );

            // Yearly price
            $yearlyPrice = $this->syncPrice(
                $stripe,
                $product->id,
                (float)$plan->yearly_price,
                'year',
                $plan->yearly_stripe_price_id,
                $plan
            );

            // Save IDs
            $plan->updateQuietly([
                'stripe_product_id'       => $product->id,
                'monthly_stripe_price_id' => $monthlyPrice->id,
                'yearly_stripe_price_id'  => $yearlyPrice->id,
            ]);
        } catch (\Exception $e) {
            // Stripe sync failed — not critical, continue
        }
    }

    private function syncPrice(
        StripeClient $stripe,
        string $productId,
        float $amount,
        string $interval,
        ?string $existingPriceId,
        SubscriptionPlan $plan
    ): object {
        // Check if existing price has same amount
        if (!empty($existingPriceId)) {
            try {
                $existing = $stripe->prices->retrieve($existingPriceId);
                if ($existing->unit_amount === (int)($amount * 100)) {
                    return $existing;
                }
                // Archive old price
                $stripe->prices->update($existingPriceId, ['active' => false]);
            } catch (ApiErrorException $e) {
            }
        }

        // Create new price
        return $stripe->prices->create([
            'product'     => $productId,
            'unit_amount' => (int)($amount * 100),
            'currency'    => 'usd',
            'recurring'   => ['interval' => $interval],
            'metadata'    => [
                'plan_id'   => $plan->id,
                'plan_slug' => $plan->slug,
                'interval'  => $interval,
            ],
        ]);
    }

    private function archiveFromStripe(SubscriptionPlan $plan): void
    {
        $stripe = $this->getStripe();
        if (!$stripe || empty($plan->stripe_product_id)) return;

        try {
            $stripe->products->update(
                $plan->stripe_product_id,
                ['active' => false]
            );
        } catch (\Exception $e) {
        }
    }

    public function index(): JsonResponse
    {
        $plans = SubscriptionPlan::withCount('modules')
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Plans retrieved successfully.',
            'data'    => $plans->map(fn($plan) => [
                'id'                 => $plan->id,
                'name'               => $plan->name,
                'slug'               => $plan->slug,
                'description'        => $plan->description,
                'monthly_price'      => $plan->monthly_price,
                'yearly_price'       => $plan->yearly_price,
                'yearly_discount'    => $plan->getYearlyDiscount() . '%',
                'users_limit'        => $plan->users_limit ?? 'Unlimited',
                'storage_limit_gb'   => $plan->storage_limit_gb ?? 'Unlimited',
                'is_trial_available' => $plan->is_trial_available,
                'trial_days'         => $plan->trial_days,
                'is_active'          => $plan->is_active,
                'sort_order'         => $plan->sort_order,
                'modules_count'      => $plan->modules_count,
                'synced_to_stripe'   => !empty($plan->stripe_product_id),
            ]),
        ], 200);
    }

    public function show(string $id): JsonResponse
    {
        $plan = SubscriptionPlan::with('modules')->find($id);

        if (!$plan) {
            return response()->json([
                'success' => false,
                'message' => 'Plan not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Plan retrieved successfully.',
            'data'    => [
                'id'                      => $plan->id,
                'name'                    => $plan->name,
                'slug'                    => $plan->slug,
                'description'             => $plan->description,
                'monthly_price'           => $plan->monthly_price,
                'yearly_price'            => $plan->yearly_price,
                'yearly_discount'         => $plan->getYearlyDiscount() . '%',
                'users_limit'             => $plan->users_limit ?? 'Unlimited',
                'storage_limit_gb'        => $plan->storage_limit_gb ?? 'Unlimited',
                'is_trial_available'      => $plan->is_trial_available,
                'trial_days'              => $plan->trial_days,
                'is_active'               => $plan->is_active,
                'sort_order'              => $plan->sort_order,
                'stripe_product_id'       => $plan->stripe_product_id,
                'monthly_stripe_price_id' => $plan->monthly_stripe_price_id,
                'yearly_stripe_price_id'  => $plan->yearly_stripe_price_id,
                'synced_to_stripe'        => !empty($plan->stripe_product_id),
                'modules'                 => $plan->modules->map(fn($m) => [
                    'id'          => $m->id,
                    'module_slug' => $m->module_slug,
                    'is_limited'  => $m->is_limited,
                    'limits'      => $m->limits,
                ]),
            ],
        ], 200);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name'                 => 'required|string|unique:subscription_plans,name',
            'description'          => 'nullable|string',
            'monthly_price'        => 'required|numeric|min:0',
            'yearly_price'         => 'required|numeric|min:0',
            'users_limit'          => 'nullable|integer|min:1',
            'storage_limit_gb'     => 'nullable|integer|min:1',
            'is_trial_available'   => 'boolean',
            'trial_days'           => 'integer|min:0',
            'is_active'            => 'boolean',
            'modules'              => 'nullable|array',
            'modules.*.slug'       => 'required|string|in:' . implode(',', PlanModule::MODULES),
            'modules.*.is_limited' => 'boolean',
            'modules.*.limits'     => 'nullable|array',
        ]);

        $plan = SubscriptionPlan::create([
            'id'                 => (string) Str::uuid(),
            'name'               => $request->name,
            'description'        => $request->description,
            'monthly_price'      => $request->monthly_price,
            'yearly_price'       => $request->yearly_price,
            'users_limit'        => $request->users_limit,
            'storage_limit_gb'   => $request->storage_limit_gb,
            'is_trial_available' => $request->is_trial_available ?? false,
            'trial_days'         => $request->trial_days ?? 0,
            'is_active'          => $request->is_active ?? true,
        ]);

        if ($request->has('modules')) {
            foreach ($request->modules as $module) {
                PlanModule::create([
                    'id'          => (string) Str::uuid(),
                    'plan_id'     => $plan->id,
                    'module_slug' => $module['slug'],
                    'is_limited'  => $module['is_limited'] ?? false,
                    'limits'      => $module['limits'] ?? null,
                ]);
            }
        }

        $this->syncToStripe($plan);

        return response()->json([
            'success' => true,
            'message' => 'Plan created successfully.',
            'data'    => $plan->fresh()->load('modules'),
        ], 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $plan = SubscriptionPlan::find($id);

        if (!$plan) {
            return response()->json([
                'success' => false,
                'message' => 'Plan not found.',
            ], 404);
        }

        $request->validate([
            'name'                 => 'sometimes|string|unique:subscription_plans,name,' . $id,
            'description'          => 'nullable|string',
            'monthly_price'        => 'sometimes|numeric|min:0',
            'yearly_price'         => 'sometimes|numeric|min:0',
            'users_limit'          => 'nullable|integer|min:1',
            'storage_limit_gb'     => 'nullable|integer|min:1',
            'is_trial_available'   => 'boolean',
            'trial_days'           => 'integer|min:0',
            'is_active'            => 'boolean',
            'modules'              => 'nullable|array',
            'modules.*.slug'       => 'required|string|in:' . implode(',', PlanModule::MODULES),
            'modules.*.is_limited' => 'boolean',
            'modules.*.limits'     => 'nullable|array',
        ]);

        $plan->update($request->except('modules'));

        if ($request->has('modules')) {
            $plan->modules()->delete();
            foreach ($request->modules as $module) {
                PlanModule::create([
                    'id'          => (string) Str::uuid(),
                    'plan_id'     => $plan->id,
                    'module_slug' => $module['slug'],
                    'is_limited'  => $module['is_limited'] ?? false,
                    'limits'      => $module['limits'] ?? null,
                ]);
            }
        }

        $this->syncToStripe($plan->fresh());

        return response()->json([
            'success' => true,
            'message' => 'Plan updated successfully.',
            'data'    => $plan->fresh()->load('modules'),
        ], 200);
    }

    public function destroy(string $id): JsonResponse
    {
        $plan = SubscriptionPlan::find($id);

        if (!$plan) {
            return response()->json([
                'success' => false,
                'message' => 'Plan not found.',
            ], 404);
        }

        $activeSubscribers = $plan->organizations()
            ->whereIn('status', ['active', 'trial'])
            ->count();

        if ($activeSubscribers > 0) {
            return response()->json([
                'success' => false,
                'message' => "Cannot delete plan with {$activeSubscribers} active subscriber(s).",
            ], 422);
        }

        $this->archiveFromStripe($plan);
        $plan->delete();

        return response()->json([
            'success' => true,
            'message' => 'Plan deleted successfully.',
        ], 200);
    }
}
