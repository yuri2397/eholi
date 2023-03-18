<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassRoom extends AbstractModel
{
    protected $fillable = ['name', 'building_id', 'school_id', 'size'];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function building()
    {
        return $this->belongsTo(Building::class);
    }
}
