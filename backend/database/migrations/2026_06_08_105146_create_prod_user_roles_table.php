<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('prod_user_roles', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->uuid('user_id');
            $table->uuid('prod_role_id');
            $table->uuid('assigned_by')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->cascadeOnDelete();

            $table->foreign('prod_role_id')
                  ->references('id')
                  ->on('prod_roles')
                  ->restrictOnDelete();

            $table->foreign('assigned_by')
                  ->references('id')
                  ->on('users')
                  ->nullOnDelete();

            $table->unique(['user_id', 'prod_role_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('prod_user_roles');
    }
};
