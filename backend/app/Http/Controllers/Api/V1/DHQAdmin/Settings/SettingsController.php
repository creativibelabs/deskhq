<?php

namespace App\Http\Controllers\Api\V1\DHQAdmin\Settings;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class SettingsController extends Controller
{
    const ALLOWED_GROUPS = [
        'stripe',
    ];

    public function show(string $group): JsonResponse
    {
        if (!in_array($group, self::ALLOWED_GROUPS)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid settings group.',
            ], 404);
        }

        $settings = Setting::getGroup($group);

        return response()->json([
            'success' => true,
            'message' => 'Settings retrieved successfully.',
            'data'    => [
                'group'    => $group,
                'settings' => $settings,
            ],
        ], 200);
    }

    public function update(Request $request, string $group): JsonResponse
    {
        if (!in_array($group, self::ALLOWED_GROUPS)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid settings group.',
            ], 404);
        }

        $request->validate([
            'settings'   => 'required|array',
            'settings.*' => 'nullable|string',
        ]);

        $allowedKeys = Setting::where('group', $group)
                              ->pluck('key')
                              ->toArray();

        $invalidKeys = array_diff(
            array_keys($request->settings),
            $allowedKeys
        );

        if (!empty($invalidKeys)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid settings keys.',
                'errors'  => [
                    'invalid_keys' => array_values($invalidKeys),
                ],
            ], 422);
        }

        foreach ($request->settings as $key => $value) {
            $setting = Setting::where('key', $key)->first();

            if ($setting) {
                Setting::set(
                    key:         $key,
                    value:       $value ?? '',
                    group:       $group,
                    type:        $setting->type,
                    isEncrypted: true,
                    description: $setting->description,
                );
            }
        }

        Setting::flushGroup($group);

        $updated = Setting::getGroup($group);

        return response()->json([
            'success' => true,
            'message' => 'Settings updated successfully.',
            'data'    => [
                'group'    => $group,
                'settings' => $updated,
            ],
        ], 200);
    }
}
