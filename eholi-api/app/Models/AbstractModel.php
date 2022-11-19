<?php

namespace App\Models;

use App\Traits\UUID;
use App\Traits\BaseModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

abstract class AbstractModel extends Model
{
    use UUID, HasFactory, BaseModel;
    public const BASE_REFERENCE = "dt";

    # generate reference
    public static function generateReference()
    {
        $last = static::latest()->first();
        $lastReference = $last ? $last->reference : static::BASE_REFERENCE . "00000000";
        $lastNumber = (int) substr($lastReference, -10);
        $newNumber = $lastNumber + 1;
        $newReference = static::BASE_REFERENCE . str_pad($newNumber, 10, "0", STR_PAD_LEFT);
        return $newReference;
    }

    public function school()
    {
        return $this->morphOne(SchoolUser::class, 'user');
    }
}
