<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subscription_histories', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->uuid('organization_id');
            $table->uuid('old_plan_id')->nullable();
            $table->uuid('new_plan_id');
            $table->uuid('changed_by')->nullable();
            $table->enum('change_type', [
                'upgrade',
                'downgrade',
                'cancel',
                'renew',
                'trial_start',
                'trial_expired',
                'price_updated',
            ]);
            $table->enum('billing_cycle', ['monthly', 'yearly']);
            $table->decimal('old_price', 10, 2)->nullable();
            $table->decimal('new_price', 10, 2);
            $table->text('note')->nullable();
            $table->timestamps();

            $table->foreign('organization_id')
                  ->references('id')
                  ->on('organizations')
                  ->cascadeOnDelete();

            $table->foreign('old_plan_id')
                  ->references('id')
                  ->on('subscription_plans')
                  ->nullOnDelete();

            $table->foreign('new_plan_id')
                  ->references('id')
                  ->on('subscription_plans')
                  ->restrictOnDelete();

            $table->foreign('changed_by')
                  ->references('id')
                  ->on('users')
                  ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subscription_histories');
    }
};
