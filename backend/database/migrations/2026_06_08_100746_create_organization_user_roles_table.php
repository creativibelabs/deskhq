<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('organization_user_roles', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->uuid('organization_id');
            $table->uuid('user_id');
            $table->uuid('organization_role_id');
            $table->uuid('assigned_by')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('organization_id')
                  ->references('id')
                  ->on('organizations')
                  ->cascadeOnDelete();

            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->cascadeOnDelete();

            $table->foreign('organization_role_id')
                  ->references('id')
                  ->on('organization_roles')
                  ->restrictOnDelete();

            $table->foreign('assigned_by')
                  ->references('id')
                  ->on('users')
                  ->nullOnDelete();

            $table->unique([
                'organization_id',
                'user_id'
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('organization_user_roles');
    }
};
