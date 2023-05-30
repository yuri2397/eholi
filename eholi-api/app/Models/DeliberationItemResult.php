<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliberationItemResult extends AbstractModel
{
    // STATUS
    const SUCCESS = 'success';
    const APPEND = 'append';
    const CANCEL = 'cancel';
    const REMOVE = 'remove';

    // MENTION
    const EXCELLENT = 'excellent';
    const VERY_GOOD = 'very_good';
    const GOOD = 'good';
    const PASSABLE = 'passable';
    const MEDIOCRE = 'mediocre';
    const WEAK = 'weak';
    const VERY_WEAK = 'very_weak';
    const ANY = 'any';
    
    protected $fillable = [
        'average',
        'status',
        'mention',
        'duty_average',
        'exam_average',
        'coef',
        'mention',
        'rang',
        'deliberation_id',
        'class_level_has_course_id',
        'class_level_has_student_id',
    ];

    protected $with = ['student', 'classLevelHasCourse.course'];

    // all relationships 

    public function deliberation()
    {
        return $this->belongsTo(Deliberation::class);
    }

    public function classLevelHasStudent()
    {
        return $this->belongsTo(ClassLevelHasStudent::class);
    }

    public function classLevelHasCourse()
    {
        return $this->belongsTo(ClassLevelHasCourse::class);
    }

    // get student from class_level_has_student when test_resutl.class_level_has_student_id is set and join the student and select the student and class_level_has_student attributes and alias them id
    public function student()
    {
        return $this->hasOneThrough(
            Student::class,
            ClassLevelHasStudent::class,
            'id',
            'id',
            'class_level_has_student_id',
            'student_id'
        )->select('students.*', 'class_level_has_students.id');
    }
}
