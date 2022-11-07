<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassLevel extends AbstractModel
{
    protected $fillable = ['name', 'level_id', 'school_year_id'];

    public function level()
    {
        return $this->belongsTo(Level::class);
    }

    public function school_year()
    {
        return $this->belongsTo(SchoolYear::class);
    }
}
