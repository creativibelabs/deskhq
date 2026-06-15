<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class PlanModule extends Model
{
    use HasFactory, SoftDeletes;

    public $incrementing = false;
    protected $keyType = 'string';

    const MODULES = [
        'employee_management',
        'client_management',
        'chat',
        'task_management',
        'project_management',
        'payments_invoicing',
        'crm',
        'revenue_management',
        'file_management',
        'source_code_management',
        'deskee_ai',
        'hr_management',
        'asset_management',
        'docs',
        'sheets',
    ];

    protected $fillable = [
        'plan_id',
        'module_slug',
        'is_limited',
        'limits',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    protected function casts(): array
    {
        return [
            'is_limited' => 'boolean',
            'limits'     => 'array',
        ];
    }

    public function plan()
    {
        return $this->belongsTo(SubscriptionPlan::class, 'plan_id');
    }
}
