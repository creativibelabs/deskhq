<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class SubscriptionPlan extends Model
{
    use HasFactory, SoftDeletes;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'monthly_price',
        'yearly_price',
        'monthly_stripe_price_id',
        'yearly_stripe_price_id',
        'stripe_product_id',
        'users_limit',
        'storage_limit_gb',
        'is_trial_available',
        'trial_days',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'monthly_price'      => 'decimal:2',
            'yearly_price'       => 'decimal:2',
            'is_trial_available' => 'boolean',
            'is_active'          => 'boolean',
            'users_limit'        => 'integer',
            'storage_limit_gb'   => 'integer',
            'trial_days'         => 'integer',
            'sort_order'         => 'integer',
        ];
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
            if (empty($model->slug)) {
                $model->slug = Str::slug($model->name);
            }
            if (empty($model->sort_order)) {
                $model->sort_order = static::max('sort_order') + 1;
            }
        });
    }

    public function modules()
    {
        return $this->hasMany(PlanModule::class, 'plan_id');
    }

    public function organizations()
    {
        return $this->hasMany(OrganizationSubscription::class, 'plan_id');
    }

    public function hasModule(string $moduleSlug): bool
    {
        return $this->modules()
                    ->where('module_slug', $moduleSlug)
                    ->exists();
    }

    public function isUnlimitedUsers(): bool
    {
        return is_null($this->users_limit);
    }

    public function isUnlimitedStorage(): bool
    {
        return is_null($this->storage_limit_gb);
    }

    public function isFree(): bool
    {
        return $this->monthly_price == 0;
    }

    public function getYearlyDiscount(): float
    {
        if ($this->monthly_price == 0) return 0;
        $monthlyTotal = $this->monthly_price * 12;
        return round((($monthlyTotal - $this->yearly_price) / $monthlyTotal) * 100, 1);
    }
}
