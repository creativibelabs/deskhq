<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

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
            $role = Role::firstOrCreate(['name' => $roleName, 'guard_name' => 'web']);
            $permission = Permission::firstOrCreate(['name' => "view_{$roleName}", 'guard_name' => 'web']);
            $role->givePermissionTo($permission);
        }

        $this->command->info('Roles and permissions seeded successfully.');
    }
}
