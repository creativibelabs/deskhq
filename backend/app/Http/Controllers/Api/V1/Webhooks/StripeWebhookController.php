<?php

namespace App\Http\Controllers\Api\V1\Webhooks;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Stripe\Webhook;
use Stripe\Exception\SignatureVerificationException;

class StripeWebhookController extends Controller
{
    public function handle(Request $request): JsonResponse
    {
        $webhookSecret = Setting::get('stripe_webhook_secret');

        if (empty($webhookSecret)) {
            return response()->json([
                'success' => false,
                'message' => 'Webhook secret not configured.',
            ], 500);
        }

        try {
            $event = Webhook::constructEvent(
                $request->getContent(),
                $request->header('Stripe-Signature'),
                $webhookSecret
            );
        } catch (SignatureVerificationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid webhook signature.',
            ], 400);
        }

        match ($event->type) {
            'customer.subscription.created'  => $this->handleSubscriptionCreated($event),
            'customer.subscription.updated'  => $this->handleSubscriptionUpdated($event),
            'customer.subscription.deleted'  => $this->handleSubscriptionDeleted($event),
            'invoice.payment_succeeded'      => $this->handlePaymentSucceeded($event),
            'invoice.payment_failed'         => $this->handlePaymentFailed($event),
            default                          => null,
        };

        return response()->json(['success' => true], 200);
    }

    private function handleSubscriptionCreated(object $event): void
    {
        // Phase 8 — Payments module mein implement karein ge
    }

    private function handleSubscriptionUpdated(object $event): void
    {
        // Phase 8 — Payments module mein implement karein ge
    }

    private function handleSubscriptionDeleted(object $event): void
    {
        // Phase 8 — Payments module mein implement karein ge
    }

    private function handlePaymentSucceeded(object $event): void
    {
        // Phase 8 — Payments module mein implement karein ge
    }

    private function handlePaymentFailed(object $event): void
    {
        // Phase 8 — Payments module mein implement karein ge
    }
}
