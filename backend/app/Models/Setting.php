<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'group',
        'key',
        'value',
        'type',
        'is_encrypted',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'is_encrypted' => 'boolean',
        ];
    }

    const GROUPS = [
        'app',
        'mail',
        'stripe',
        'storage',
    ];

    const TYPES = [
        'string',
        'integer',
        'boolean',
        'json',
    ];

    public static function get(string $key, mixed $default = null): mixed
    {
        $cacheKey = "setting_{$key}";

        return Cache::remember($cacheKey, 3600, function () use ($key, $default) {
            $setting = static::where('key', $key)->first();

            if (!$setting) return $default;

            $value = $setting->is_encrypted
                ? Crypt::decryptString($setting->value)
                : $setting->value;

            return match($setting->type) {
                'integer' => (int) $value,
                'boolean' => filter_var($value, FILTER_VALIDATE_BOOLEAN),
                'json'    => json_decode($value, true),
                default   => $value,
            };
        });
    }

    public static function set(
        string $key,
        mixed $value,
        string $group = 'app',
        string $type = 'string',
        bool $isEncrypted = true,
        string $description = null
    ): void {
        $stringValue = is_array($value)
            ? json_encode($value)
            : (string) $value;

        $storedValue = $isEncrypted
            ? Crypt::encryptString($stringValue)
            : $stringValue;

        static::updateOrCreate(
            ['key' => $key],
            [
                'group'        => $group,
                'value'        => $storedValue,
                'type'         => $type,
                'is_encrypted' => $isEncrypted,
                'description'  => $description,
            ]
        );

        Cache::forget("setting_{$key}");
    }

    public static function getGroup(string $group): array
    {
        $settings = static::where('group', $group)->get();

        return $settings->mapWithKeys(function ($setting) {
            $value = $setting->is_encrypted
                ? Crypt::decryptString($setting->value)
                : $setting->value;

            $value = match($setting->type) {
                'integer' => (int) $value,
                'boolean' => filter_var($value, FILTER_VALIDATE_BOOLEAN),
                'json'    => json_decode($value, true),
                default   => $value,
            };

            return [$setting->key => $value];
        })->toArray();
    }

    public static function flush(string $key): void
    {
        Cache::forget("setting_{$key}");
    }

    public static function flushGroup(string $group): void
    {
        static::where('group', $group)
              ->pluck('key')
              ->each(fn($key) => Cache::forget("setting_{$key}"));
    }
}
