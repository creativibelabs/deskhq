<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\Webhooks\StripeWebhookController;

Route::prefix('webhooks')->group(function () {
    Route::post('stripe', [StripeWebhookController::class, 'handle']);
});
