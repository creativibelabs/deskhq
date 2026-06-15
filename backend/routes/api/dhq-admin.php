<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\DHQAdmin\Auth\AuthController;
use App\Http\Controllers\Api\V1\DHQAdmin\Settings\SettingsController;
use App\Http\Controllers\Api\V1\DHQAdmin\Settings\StripeController;
use App\Http\Controllers\Api\V1\DHQAdmin\Plans\PlanController;

Route::prefix('dhq-admin')->group(function () {

    // ── Auth ─────────────────────────────────
    Route::prefix('auth')->group(function () {

        // Guest
        Route::post('login',           [AuthController::class, 'login']);
        Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
        Route::post('reset-password',  [AuthController::class, 'resetPassword']);

        // Authenticated
        Route::middleware(['auth:sanctum', 'role:prod_admin'])->group(function () {
            Route::post('logout', [AuthController::class, 'logout']);
            Route::get('me',      [AuthController::class, 'me']);
        });
    });

    // ── Authenticated ─────────────────────────
    Route::middleware(['auth:sanctum', 'role:prod_admin'])->group(function () {

        // Settings
        Route::prefix('settings')->group(function () {
            Route::get('{group}',  [SettingsController::class, 'show']);
            Route::put('{group}',  [SettingsController::class, 'update']);

            // Stripe
            Route::prefix('stripe')->group(function () {
                Route::get('status',      [StripeController::class, 'status']);
                Route::post('connect',    [StripeController::class, 'connect']);
                Route::post('disconnect', [StripeController::class, 'disconnect']);
                Route::post('sync-plans', [StripeController::class, 'syncPlans']);
            });
        });

        // Plans
        Route::middleware('prod.role:super_admin,sub_admin')
            ->prefix('plans')
            ->group(function () {
                Route::get('/',        [PlanController::class, 'index']);
                Route::post('/',       [PlanController::class, 'store']);
                Route::get('/{id}',    [PlanController::class, 'show']);
                Route::put('/{id}',    [PlanController::class, 'update']);
                Route::delete('/{id}', [PlanController::class, 'destroy']);
            });
    });
});
