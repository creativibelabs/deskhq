<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrganizationSubscription extends Model
{
    use HasFactory, SoftDeletes;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'organization_id',
        'plan_id',
        'billing_cycle',
        'status',
        'price_at_subscription',
        'new_price',
        'new_price_effective_at',
        'is_price_updated',
        'stripe_subscription_id',
        'stripe_customer_id',
        'trial_ends_at',
        'starts_at',
        'ends_at',
        'last_payment_at',
        'next_payment_at',
    ];

    protected function casts(): array
    {
        return [
            'price_at_subscription' => 'decimal:2',
            'new_price'             => 'decimal:2',
            'is_price_updated'      => 'boolean',
            'trial_ends_at'         => 'datetime',
            'starts_at'             => 'datetime',
            'ends_at'               => 'datetime',
            'new_price_effective_at'=> 'datetime',
            'last_payment_at'       => 'datetime',
            'next_payment_at'       => 'datetime',
        ];
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function plan()
    {
        return $this->belongsTo(SubscriptionPlan::class, 'plan_id');
    }

    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    public function isTrial(): bool
    {
        return $this->status === 'trial';
    }

    public function isExpired(): bool
    {
        return $this->status === 'expired';
    }

    public function isCancelled(): bool
    {
        return $this->status === 'cancelled';
    }

    public function isTrialEnding(int $days = 3): bool
    {
        return $this->isTrial()
            && $this->trial_ends_at
            && $this->trial_ends_at->diffInDays(now()) <= $days;
    }

    public function daysUntilRenewal(): int
    {
        return (int) now()->diffInDays($this->ends_at);
    }

    public function hasPriceUpdate(): bool
    {
        return $this->is_price_updated
            && $this->new_price_effective_at?->isFuture();
    }
}
