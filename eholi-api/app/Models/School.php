<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class School extends Model
{
    use HasFactory, UUID;

    public function school_years()
    {
        return $this->hasMany(SchoolYear::class);
    }
}
