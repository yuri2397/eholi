<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassLevelHasSemester extends AbstractModel
{
    protected $fillable = ['class_level_id', 'semester_id'];

    public function class_level()
    {
        return $this->belongsTo(ClassLevel::class);
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }
}
