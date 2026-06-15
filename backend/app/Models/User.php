<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Str;
use Spatie\Activitylog\Models\Concerns\LogsActivity;
use Spatie\Activitylog\Support\LogOptions;
use App\Traits\HasProdRole;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens,
        HasFactory,
        Notifiable,
        HasRoles,
        SoftDeletes,
        LogsActivity,
        HasProdRole;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $table = 'users';

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['name', 'email', 'status'])
            ->logOnlyDirty()
            ->dontLogEmptyChanges();
    }

    public function profile()
    {
        return $this->hasOne(UserProfile::class);
    }

    public function organizations()
    {
        return $this->belongsToMany(
            Organization::class,
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

    public function ownedOrganizations()
    {
        return $this->hasMany(Organization::class, 'created_by');
    }

    public function organizationUserRoles()
    {
        return $this->hasMany(OrganizationUserRole::class);
    }

    public function customRoleInOrganization(string $organizationId)
    {
        return $this->organizationUserRoles()
            ->where('organization_id', $organizationId)
            ->with('role')
            ->first();
    }

    public function sentInvitations()
    {
        return $this->hasMany(Invitation::class, 'invited_by');
    }

    public function prodRole()
    {
        return $this->hasOne(ProdUserRole::class);
    }

    public function isProdMember(): bool
    {
        return in_array(
            $this->roles->first()?->name,
            ['prod_admin', 'sub_admin', 'editor', 'accountant', 'support']
        );
    }

    // ── Status Helpers ────────────────────────────────

    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    public function isInactive(): bool
    {
        return $this->status === 'inactive';
    }

    public function isSuspended(): bool
    {
        return $this->status === 'suspended';
    }

    public function activate(): void
    {
        $this->update(['status' => 'active']);
    }

    public function deactivate(): void
    {
        $this->update(['status' => 'inactive']);
    }

    public function suspend(): void
    {
        $this->update(['status' => 'suspended']);
    }

    // ── Role Helpers ──────────────────────────────────

    public function isProdAdmin(): bool
    {
        return $this->hasRole('prod_admin', 'api');
    }

    public function isSuperAdmin(): bool
    {
        return $this->hasRole('super_admin', 'api');
    }

    public function isAdmin(): bool
    {
        return $this->hasRole('admin', 'api');
    }

    public function isManager(): bool
    {
        return $this->hasRole('manager', 'api');
    }

    public function isEmployee(): bool
    {
        return $this->hasRole('employee', 'api');
    }

    public function isClient(): bool
    {
        return $this->hasRole('client', 'api');
    }

    public function isStandardUser(): bool
    {
        return $this->hasRole('standard_user', 'api');
    }

    public function getGlobalRole(): ?string
    {
        return $this->roles->first()?->name;
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function unreadNotifications()
    {
        return $this->hasMany(Notification::class)
            ->whereNull('read_at');
    }

    public function unreadNotificationsCount(): int
    {
        return $this->unreadNotifications()->count();
    }
}
