<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notification extends Model
{
    use HasFactory, SoftDeletes;

    public $incrementing = false;
    protected $keyType = 'string';

    const TYPES = [
        'price_updated',
        'plan_expiring',
        'plan_expired',
        'trial_ending',
        'trial_expired',
        'payment_failed',
        'payment_success',
        'org_invitation',
        'org_member_joined',
        'org_member_left',
        'task_assigned',
        'task_updated',
        'task_completed',
        'task_due_soon',
        'project_assigned',
        'project_updated',
        'new_message',
        'mentioned_in_chat',
        'system_alert',
        'storage_limit_warning',
    ];

    protected $fillable = [
        'user_id',
        'type',
        'title',
        'message',
        'data',
        'read_at',
    ];

    protected function casts(): array
    {
        return [
            'data'    => 'array',
            'read_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function isRead(): bool
    {
        return !is_null($this->read_at);
    }

    public function markAsRead(): void
    {
        $this->update(['read_at' => now()]);
    }

    public function scopeUnread($query)
    {
        return $query->whereNull('read_at');
    }

    public function scopeRead($query)
    {
        return $query->whereNotNull('read_at');
    }
}
