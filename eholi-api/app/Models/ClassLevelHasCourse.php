<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class ClassLevelHasCourse extends AbstractModel
{
    protected $fillable = [
        'coef',
        'max_note',
        'class_level_id',
        'course_id',
        'semester_id',
        'school_id',
        'semester_id',
        'professor_id',
        'duty_percent',
        'exam_percent',
    ];

    public function class_level()
    {
        return $this->belongsTo(ClassLevel::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }

    public function professor()
    {
        return $this->belongsTo(Professor::class);
    }

    // tests
    public function tests()
    {
        return $this->hasMany(Test::class);
    }
}
