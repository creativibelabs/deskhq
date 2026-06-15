<?php

namespace App\Http\Controllers\Api\V1\DHQAdmin\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Mail\DHQAdmin\ProdAdminResetPasswordMail;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'login'    => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->login)
            ->orWhere('username', $request->login)
            ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials',
            ], 401);
        }

        if (!$user->isProdAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        if (!$user->isActive()) {
            return response()->json([
                'success' => false,
                'message' => 'Your account is suspended',
            ], 403);
        }

        $user->tokens()->delete();

        $token = $user->createToken('prod-admin-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'data'    => [
                'user'       => [
                    'id'        => $user->id,
                    'name'      => $user->name,
                    'username'  => $user->username,
                    'email'     => $user->email,
                    'role'      => $user->getGlobalRole(),
                    'prod_role' => $user->getProdRole()?->slug,
                ],
                'token'      => $token,
                'token_type' => 'Bearer',
            ],
        ], 200);
    }

    public function logout(Request $request): JsonResponse
    {
        if (!$request->user()->isProdAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully',
        ], 200);
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user->isProdAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        return response()->json([
            'success' => true,
            'message' => 'User retrieved successfully',
            'data'    => [
                'user' => [
                    'id'        => $user->id,
                    'name'      => $user->name,
                    'username'  => $user->username,
                    'email'     => $user->email,
                    'role'      => $user->getGlobalRole(),
                    'prod_role' => $user->getProdRole()?->slug,
                ],
            ],
        ], 200);
    }

    public function forgotPassword(Request $request): JsonResponse
    {
        $request->validate([
            'login' => 'required|string',
        ]);

        $user = User::where('email', $request->login)
            ->orWhere('username', $request->login)
            ->first();

        if (!$user || !$user->isProdAdmin()) {
            return response()->json([
                'success' => true,
                'message' => 'If this account exists, a reset link has been sent.',
            ], 200);
        }

        if (!$user->isActive()) {
            return response()->json([
                'success' => false,
                'message' => 'Your account is suspended.',
            ], 403);
        }

        $token = Str::random(64);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $user->email],
            [
                'email'      => $user->email,
                'token'      => Hash::make($token),
                'created_at' => now(),
            ]
        );

        $hashedEmail = base64_encode($user->email);
        $hashedToken = base64_encode($token);

        $resetUrl = config('app.frontend_url')
            . '/dhq-admin/reset-password'
            . '?token=' . $hashedToken
            . '&email=' . $hashedEmail;

        Mail::to($user->email)->send(
            new ProdAdminResetPasswordMail(
                resetUrl: $resetUrl,
                name: $user->name,
            )
        );

        return response()->json([
            'success' => true,
            'message' => 'Password reset link has been sent.',
            'data'    => [
                'email' => $user->email,
            ],
        ], 200);
    }

    public function resetPassword(Request $request): JsonResponse
    {
        $request->validate([
            'token'                 => 'required|string',
            'email'                 => 'required|string',
            'password'              => [
                'required',
                'string',
                'min:8',
                'confirmed',
                'regex:/[A-Z]/',
                'regex:/[0-9]/',
                'regex:/[@$!%*#?&]/',
            ],
        ], [
            'password.regex' => 'Password must contain at least one uppercase letter, one number and one special character.',
        ]);

        $decodedEmail = base64_decode($request->email);
        $decodedToken = base64_decode($request->token);

        $record = DB::table('password_reset_tokens')
            ->where('email', $decodedEmail)
            ->first();

        if (!$record) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid or expired reset link.',
            ], 422);
        }

        if (!Hash::check($decodedToken, $record->token)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid or expired reset link.',
            ], 422);
        }

        if (now()->diffInMinutes($record->created_at) > 60) {
            DB::table('password_reset_tokens')
                ->where('email', $decodedEmail)
                ->delete();

            return response()->json([
                'success' => false,
                'message' => 'Reset link has expired. Please request a new one.',
            ], 422);
        }

        $user = User::where('email', $decodedEmail)->first();

        if (!$user || !$user->isProdAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'User not found.',
            ], 404);
        }

        if (!$user->isActive()) {
            return response()->json([
                'success' => false,
                'message' => 'Your account is suspended.',
            ], 403);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        $user->tokens()->delete();

        DB::table('password_reset_tokens')
            ->where('email', $decodedEmail)
            ->delete();

        return response()->json([
            'success' => true,
            'message' => 'Password reset successfully. Please login with your new password.',
        ], 200);
    }
}
