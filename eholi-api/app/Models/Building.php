<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Building extends AbstractModel
{
    protected $fillable = ['name', 'school_id', 'status'];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function class_rooms()
    {
        return $this->hasMany(ClassRoom::class);
    }
}
