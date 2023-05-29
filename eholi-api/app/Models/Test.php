<?php

namespace App\Models;

use App\Models\AbstractModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Test extends AbstractModel
{

    const EXAM = 'exam';
    const DUTY = 'duty';

    protected $fillable = [
        'title',
        'max_note',
        'type',
        'percent',
        'date',
        'school_id',
        'class_level_has_course_id',
        'school_has_professor_id',
        'class_level_id',
        'status',
        'semester_id'
    ];

    protected $appends = ['isFinish'];

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

    // semester relationship
    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }

    // if test is finish (when all test_results have status = ok)

    public function getIsFinishAttribute()
    {
        $test_results = $this->test_results;
        foreach ($test_results as $test_result) {
            if ($test_result->status != TestResult::OK) {
                return false;
            }
        }
        return true;
    }

}
