<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invitations', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->uuid('organization_id')->nullable();
            $table->uuid('invited_by');
            $table->string('email');
            $table->enum('role', [
                'super_admin',
                'admin',
                'manager',
                'employee',
                'client',
            ]);
            $table->string('token')->unique();
            $table->enum('status', [
                'pending',
                'accepted',
                'expired',
                'cancelled',
            ])->default('pending');
            $table->text('message')->nullable();
            $table->integer('resend_count')->default(0);
            $table->timestamp('last_resent_at')->nullable();
            $table->timestamp('expires_at');
            $table->timestamp('accepted_at')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('organization_id')
                  ->references('id')
                  ->on('organizations')
                  ->cascadeOnDelete();

            $table->foreign('invited_by')
                  ->references('id')
                  ->on('users')
                  ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invitations');
    }
};
