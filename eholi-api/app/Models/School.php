<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class School extends AbstractModel
{
    public const BASE_REFERENCE = "sc";

    protected $fillable = ['reference', 'name', 'address', 'phone', 'email'];


    public function school_years()
    {
        return $this->hasMany(SchoolYear::class);
    }
}
