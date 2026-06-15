<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProdRole;

class ProdRolesSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'name'        => 'Super Admin',
                'slug'        => 'super_admin',
                'description' => 'Everything',
            ],
            [
                'name'        => 'Sub Admin',
                'slug'        => 'sub_admin',
                'description' => 'Everything except payments and finance',
            ],
            [
                'name'        => 'Editor',
                'slug'        => 'editor',
                'description' => 'Blog and content management only',
            ],
            [
                'name'        => 'Accountant',
                'slug'        => 'accountant',
                'description' => 'Payments and finance only',
            ],
            [
                'name'        => 'Support',
                'slug'        => 'support',
                'description' => 'Chats, Storage, System Health and Alerts',
            ],
        ];

        foreach ($roles as $role) {
            ProdRole::firstOrCreate(
                ['slug' => $role['slug']],
                $role
            );
        }

        $this->command->info('Prod roles seeded successfully.');
        $this->command->table(
            ['Name', 'Slug', 'Description'],
            array_map(fn($r) => [
                $r['name'],
                $r['slug'],
                $r['description']
            ], $roles)
        );
    }
}
