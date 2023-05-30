<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Level extends AbstractModel
{
    public function cycle()
    {
        return $this->belongsTo(Cycle::class);
    }

    // semester
    public function semesters()
    {
        return $this->belongsToMany(Semester::class, 'level_has_semesters');
    }
}
