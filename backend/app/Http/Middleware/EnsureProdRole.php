<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureProdRole
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated',
            ], 401);
        }

        if (!$user->isProdAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        $prodRole = $user->getProdRole();

        if (!$prodRole) {
            return response()->json([
                'success' => false,
                'message' => 'No prod role assigned',
            ], 403);
        }

        if (!in_array($prodRole->slug, $roles)) {
            return response()->json([
                'success' => false,
                'message' => 'Insufficient prod role permissions',
            ], 403);
        }

        return $next($request);
    }
}
