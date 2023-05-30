<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassLevelHasStudent extends AbstractModel
{
    protected $fillable = ['student_id', 'class_level_id'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function class_level()
    {
        return $this->belongsTo(ClassLevel::class);
    }
}
