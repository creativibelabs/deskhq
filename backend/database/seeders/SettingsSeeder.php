<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            [
                'group'       => 'stripe',
                'key'         => 'stripe_mode',
                'value'       => 'test',
                'type'        => 'string',
                'description' => 'Stripe mode (test/live)',
            ],
            [
                'group'       => 'stripe',
                'key'         => 'stripe_key',
                'value'       => '',
                'type'        => 'string',
                'description' => 'Stripe publishable key',
            ],
            [
                'group'       => 'stripe',
                'key'         => 'stripe_secret',
                'value'       => '',
                'type'        => 'string',
                'description' => 'Stripe secret key',
            ],
            [
                'group'       => 'stripe',
                'key'         => 'stripe_connected',
                'value'       => 'false',
                'type'        => 'boolean',
                'description' => 'Stripe connection status',
            ],
            [
                'group'       => 'stripe',
                'key'         => 'stripe_webhook_id',
                'value'       => '',
                'type'        => 'string',
                'description' => 'Stripe webhook endpoint ID',
            ],
            [
                'group'       => 'stripe',
                'key'         => 'stripe_webhook_secret',
                'value'       => '',
                'type'        => 'string',
                'description' => 'Stripe webhook secret (auto saved)',
            ],
        ];

        foreach ($settings as $setting) {
            Setting::set(
                key:         $setting['key'],
                value:       $setting['value'],
                group:       $setting['group'],
                type:        $setting['type'],
                isEncrypted: true,
                description: $setting['description'],
            );
        }

        $this->command->info('Settings seeded successfully.');
        $this->command->table(
            ['Group', 'Key', 'Description'],
            array_map(fn($s) => [
                $s['group'],
                $s['key'],
                $s['description'],
            ], $settings)
        );
    }
}
