<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class ProdAdminSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'admin@creativibelabs.com'],
            [
                'name'              => 'CreatiVibe Admin',
                'email'             => 'admin@creativibelabs.com',
                'password'          => Hash::make('Admin@DeskHQ#2026'),
                'email_verified_at' => now(),
            ]
        );

        $user->assignRole('prod_admin');

        $this->command->info('prod_admin user created successfully.');
        $this->command->table(
            ['Field', 'Value'],
            [
                ['Name',     'CreatiVibe Admin'],
                ['Email',    'admin@creativibelabs.com'],
                ['Password', 'Admin@DeskHQ#2026'],
                ['Role',     'prod_admin'],
            ]
        );
    }
}
