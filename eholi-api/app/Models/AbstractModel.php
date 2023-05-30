<?php

namespace App\Models;

use App\Traits\UUID;
use App\Traits\BaseModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

abstract class AbstractModel extends Model
{
    use UUID, HasFactory, BaseModel;
    public const BASE_REFERENCE = 'dt';

    # generate reference of 6 characters number 
    public static function generateReference()
    {
        $reference = self::BASE_REFERENCE . '-' . rand(100000, 999999);
        if (self::where('reference', $reference)->exists()) {
            return self::generateReference();
        }
        return $reference;
    }

    public function school()
    {
        return $this->morphOne(SchoolUser::class, 'user');
    }
}
