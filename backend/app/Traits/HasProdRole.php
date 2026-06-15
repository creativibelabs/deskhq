<?php

namespace App\Traits;

use App\Models\ProdRole;
use App\Models\ProdUserRole;
use Illuminate\Support\Str;

trait HasProdRole
{
    public function assignProdRole(string $slug): void
    {
        /** @var \App\Models\User $this */
        $role = ProdRole::where('slug', $slug)->first();

        if (!$role) {
            throw new \Exception("Prod role '{$slug}' not found.");
        }

        ProdUserRole::firstOrCreate(
            [
                'user_id' => $this->getAttribute('id'),
            ],
            [
                'id'           => (string) Str::uuid(),
                'user_id'      => $this->getAttribute('id'),
                'prod_role_id' => $role->getAttribute('id'),
                'assigned_by'  => $this->getAttribute('id'),
            ]
        );
    }

    public function removeProdRole(): void
    {
        /** @var \App\Models\User $this */
        ProdUserRole::where(
            'user_id', $this->getAttribute('id')
        )->delete();
    }

    public function syncProdRole(string $slug): void
    {
        $this->removeProdRole();
        $this->assignProdRole($slug);
    }

    public function hasProdRole(string $slug): bool
    {
        /** @var \App\Models\User $this */
        return ProdUserRole::where(
            'user_id', $this->getAttribute('id')
        )
        ->whereHas(
            'prodRole',
            fn($q) => $q->where('slug', $slug)
        )
        ->exists();
    }

    public function getProdRole(): ?ProdRole
    {
        /** @var \App\Models\User $this */
        return ProdUserRole::where(
            'user_id', $this->getAttribute('id')
        )
        ->with('prodRole')
        ->first()
        ?->prodRole;
    }

    public function prodRole()
    {
        return $this->hasOne(ProdUserRole::class, 'user_id')
                    ->with('prodRole');
    }
}
