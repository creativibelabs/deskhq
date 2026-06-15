<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Spatie\Activitylog\Models\Concerns\LogsActivity;
use Spatie\Activitylog\Support\LogOptions;

class Organization extends Model
{
    use HasFactory, SoftDeletes, LogsActivity;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'slug',
        'email',
        'phone',
        'website',
        'logo',
        'address',
        'city',
        'country',
        'timezone',
        'status',
        'created_by',
    ];

    protected $table = 'organizations';

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
            if (empty($model->slug)) {
                $model->slug = self::generateSlug($model->name);
            }
        });
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly([
                'name',
                'email',
                'status',
                'phone',
                'website',
                'address',
            ])
            ->logOnlyDirty()
            ->dontLogEmptyChanges();
    }

    private static function generateSlug(string $name): string
    {
        $slug = Str::slug($name);
        $count = self::withTrashed()
            ->where('slug', 'like', $slug . '%')
            ->count();

        return $count > 0 ? $slug . '-' . ($count + 1) : $slug;
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function users()
    {
        return $this->belongsToMany(
            User::class,
            'organization_users'
        )
            ->using(OrganizationUser::class)
            ->withPivot(
                'role',
                'status',
                'invited_by',
                'joined_at',
                'last_active_at'
            )
            ->withTimestamps();
    }

    public function invitations()
    {
        return $this->hasMany(Invitation::class);
    }

    public function pendingInvitations()
    {
        return $this->hasMany(Invitation::class)
            ->where('status', 'pending');
    }

    public function customRoles()
    {
        return $this->hasMany(OrganizationRole::class);
    }

    public function isActive(): bool
    {
        return $this->status === 'active';
    }
    public function subscription()
    {
        return $this->hasOne(OrganizationSubscription::class)
            ->latest();
    }

    public function subscriptionHistories()
    {
        return $this->hasMany(SubscriptionHistory::class);
    }

    public function activeSubscription()
    {
        return $this->hasOne(OrganizationSubscription::class)
            ->whereIn('status', ['active', 'trial'])
            ->latest();
    }
}
