<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\SubscriptionPlan;
use App\Models\PlanModule;

class SubscriptionPlansSeeder extends Seeder
{
    public function run(): void
    {
        $plans = [
            [
                'name'               => 'Free',
                'slug'               => 'free',
                'description'        => 'Get started with basic features',
                'monthly_price'      => 0,
                'yearly_price'       => 0,
                'users_limit'        => 10,
                'storage_limit_gb'   => 5,
                'is_trial_available' => false,
                'trial_days'         => 0,
                'is_active'          => true,
                'modules'            => [
                    ['slug' => 'task_management', 'is_limited' => true,  'limits' => ['max_tasks' => 20]],
                    ['slug' => 'chat',            'is_limited' => true,  'limits' => ['max_members' => 5]],
                    ['slug' => 'file_management', 'is_limited' => true,  'limits' => ['max_size_mb' => 100]],
                ],
            ],
            [
                'name'               => 'Starter',
                'slug'               => 'starter',
                'description'        => 'Perfect for small teams',
                'monthly_price'      => 19,
                'yearly_price'       => 190,
                'users_limit'        => 30,
                'storage_limit_gb'   => 50,
                'is_trial_available' => false,
                'trial_days'         => 0,
                'is_active'          => true,
                'modules'            => [
                    ['slug' => 'employee_management', 'is_limited' => false, 'limits' => null],
                    ['slug' => 'client_management',   'is_limited' => false, 'limits' => null],
                    ['slug' => 'task_management',     'is_limited' => false, 'limits' => null],
                    ['slug' => 'project_management',  'is_limited' => false, 'limits' => null],
                    ['slug' => 'chat',                'is_limited' => false, 'limits' => null],
                    ['slug' => 'file_management',     'is_limited' => false, 'limits' => null],
                ],
            ],
            [
                'name'               => 'Professional',
                'slug'               => 'professional',
                'description'        => 'For growing businesses',
                'monthly_price'      => 49,
                'yearly_price'       => 490,
                'users_limit'        => 100,
                'storage_limit_gb'   => 500,
                'is_trial_available' => true,
                'trial_days'         => 14,
                'is_active'          => true,
                'modules'            => [
                    ['slug' => 'employee_management',    'is_limited' => false, 'limits' => null],
                    ['slug' => 'client_management',      'is_limited' => false, 'limits' => null],
                    ['slug' => 'task_management',        'is_limited' => false, 'limits' => null],
                    ['slug' => 'project_management',     'is_limited' => false, 'limits' => null],
                    ['slug' => 'chat',                   'is_limited' => false, 'limits' => null],
                    ['slug' => 'file_management',        'is_limited' => false, 'limits' => null],
                    ['slug' => 'hr_management',          'is_limited' => false, 'limits' => null],
                    ['slug' => 'crm',                    'is_limited' => false, 'limits' => null],
                    ['slug' => 'payments_invoicing',     'is_limited' => false, 'limits' => null],
                    ['slug' => 'revenue_management',     'is_limited' => false, 'limits' => null],
                    ['slug' => 'asset_management',       'is_limited' => false, 'limits' => null],
                    ['slug' => 'docs',                   'is_limited' => false, 'limits' => null],
                    ['slug' => 'sheets',                 'is_limited' => false, 'limits' => null],
                    ['slug' => 'source_code_management', 'is_limited' => false, 'limits' => null],
                ],
            ],
            [
                'name'               => 'Enterprise',
                'slug'               => 'enterprise',
                'description'        => 'For large organizations',
                'monthly_price'      => 99,
                'yearly_price'       => 990,
                'users_limit'        => null,
                'storage_limit_gb'   => 5000,
                'is_trial_available' => true,
                'trial_days'         => 14,
                'is_active'          => true,
                'modules'            => [
                    ['slug' => 'employee_management',    'is_limited' => false, 'limits' => null],
                    ['slug' => 'client_management',      'is_limited' => false, 'limits' => null],
                    ['slug' => 'task_management',        'is_limited' => false, 'limits' => null],
                    ['slug' => 'project_management',     'is_limited' => false, 'limits' => null],
                    ['slug' => 'chat',                   'is_limited' => false, 'limits' => null],
                    ['slug' => 'file_management',        'is_limited' => false, 'limits' => null],
                    ['slug' => 'hr_management',          'is_limited' => false, 'limits' => null],
                    ['slug' => 'crm',                    'is_limited' => false, 'limits' => null],
                    ['slug' => 'payments_invoicing',     'is_limited' => false, 'limits' => null],
                    ['slug' => 'revenue_management',     'is_limited' => false, 'limits' => null],
                    ['slug' => 'asset_management',       'is_limited' => false, 'limits' => null],
                    ['slug' => 'docs',                   'is_limited' => false, 'limits' => null],
                    ['slug' => 'sheets',                 'is_limited' => false, 'limits' => null],
                    ['slug' => 'source_code_management', 'is_limited' => false, 'limits' => null],
                    ['slug' => 'deskee_ai',              'is_limited' => false, 'limits' => null],
                ],
            ],
        ];

        foreach ($plans as $planData) {
            $modules = $planData['modules'];
            unset($planData['modules']);

            $plan = SubscriptionPlan::firstOrCreate(
                ['slug' => $planData['slug']],
                array_merge($planData, ['id' => (string) Str::uuid()])
            );

            foreach ($modules as $module) {
                PlanModule::firstOrCreate(
                    [
                        'plan_id'     => $plan->id,
                        'module_slug' => $module['slug'],
                    ],
                    [
                        'id'         => (string) Str::uuid(),
                        'is_limited' => $module['is_limited'],
                        'limits'     => $module['limits'],
                    ]
                );
            }
        }

        $this->command->info('Subscription plans seeded successfully.');
        $this->command->table(
            ['Plan', 'Monthly', 'Yearly', 'Users', 'Storage', 'Modules'],
            [
                ['Free',         '$0',  '$0',   '10',  '5GB',   '3'],
                ['Starter',      '$19', '$190', '30',  '50GB',  '6'],
                ['Professional', '$49', '$490', '100', '500GB', '14'],
                ['Enterprise',   '$99', '$990', '∞',   '5TB',   '15'],
            ]
        );
    }
}
