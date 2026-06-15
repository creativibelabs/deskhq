<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class OrganizationRole extends Model
{
    use HasFactory, SoftDeletes;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'organization_id',
        'name',
        'slug',
        'base_role',
        'permissions',
        'description',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'permissions' => 'array',
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
                $model->slug = self::generateSlug(
                    $model->organization_id,
                    $model->name
                );
            }
        });
    }

    private static function generateSlug(
        string $organizationId,
        string $name
    ): string {
        $slug = Str::slug($name);
        $count = self::withTrashed()
            ->where('organization_id', $organizationId)
            ->where('slug', 'like', $slug . '%')
            ->count();

        return $count > 0 ? $slug . '-' . ($count + 1) : $slug;
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function assignedUsers()
    {
        return $this->hasMany(OrganizationUserRole::class);
    }

    public function isManagerRole(): bool
    {
        return $this->base_role === 'manager';
    }

    public function isEmployeeRole(): bool
    {
        return $this->base_role === 'employee';
    }

    public function hasAssignedUsers(): bool
    {
        return OrganizationUserRole::where(
            'organization_role_id',
            $this->id
        )->exists();
    }

    public function assignedUsersCount(): int
    {
        return OrganizationUserRole::where(
            'organization_role_id',
            $this->id
        )->count();
    }
}
