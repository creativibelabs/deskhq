<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class UserProfile extends Model
{
    use HasFactory, SoftDeletes;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $table = 'user_profiles';

    protected $fillable = [
        'user_id',
        'avatar',
        'phone',
        'date_of_birth',
        'gender',
        'address',
        'city',
        'country',
        'timezone',
        'locale',
        'job_title',
        'bio',
        'linkedin',
        'github',
        'website',
        'two_fa_enabled',
        'two_fa_secret',
        'two_fa_recovery_codes',
        'notification_preferences',
        'theme',
    ];

    protected $hidden = [
        'two_fa_secret',
        'two_fa_recovery_codes',
    ];

    protected function casts(): array
    {
        return [
            'date_of_birth'              => 'date',
            'two_fa_enabled'             => 'boolean',
            'two_fa_recovery_codes'      => 'array',
            'notification_preferences'   => 'array',
        ];
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
            if (empty($model->notification_preferences)) {
                $model->notification_preferences = [
                    'email'           => true,
                    'push'            => true,
                    'task_assigned'   => true,
                    'project_updated' => true,
                    'chat_message'    => true,
                ];
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
