<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('plan_modules', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->uuid('plan_id');
            $table->enum('module_slug', [
                'employee_management',
                'client_management',
                'chat',
                'task_management',
                'project_management',
                'payments_invoicing',
                'crm',
                'revenue_management',
                'file_management',
                'source_code_management',
                'deskee_ai',
                'hr_management',
                'asset_management',
                'docs',
                'sheets',
            ]);
            $table->boolean('is_limited')->default(false);
            $table->json('limits')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('plan_id')
                  ->references('id')
                  ->on('subscription_plans')
                  ->cascadeOnDelete();

            $table->unique(['plan_id', 'module_slug']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('plan_modules');
    }
};
