<?php

namespace App\Models;

use App\Models\AbstractModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Test extends AbstractModel
{
    protected $fillable = [
        'title',
        'max_note',
        'type',
        'percent',
        'date',
        'school_id',
        'class_level_has_course_id',
        'school_has_professor_id',
        'class_level_id'
    ];

    public function test_results()  
    {
        return $this->hasMany(TestResult::class);
    }

    public function class_level()
    {
        return $this->belongsTo(ClassLevel::class);
    }

    public function school_has_professor()
    {
        return $this->hasOne(SchoolHasProfessor::class);
    }

    public function class_level_has_course()
    {
        return $this->belongsTo(ClassLevelHasCourse::class);
    }

}
