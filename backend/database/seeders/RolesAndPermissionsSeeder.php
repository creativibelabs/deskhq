<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Role;
use App\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $roles = [
            'prod_admin',
            'super_admin',
            'admin',
            'manager',
            'employee',
            'standard_user',
            'client',
        ];

        foreach ($roles as $roleName) {
            $role = Role::firstOrCreate(
                ['name' => $roleName, 'guard_name' => 'api'],
                ['id' => (string) Str::uuid()]
            );

            $permission = Permission::firstOrCreate(
                ['name' => "view_{$roleName}", 'guard_name' => 'api'],
                ['id' => (string) Str::uuid()]
            );

            $role->givePermissionTo($permission);
        }

        $this->command->info('Roles and permissions seeded successfully.');
    }
}
