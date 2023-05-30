<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LevelHasSemester extends AbstractModel
{
    // level_id, semester_id

    protected $fillable = ['level_id', 'semester_id'];

    
}
