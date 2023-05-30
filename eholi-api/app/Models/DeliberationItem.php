<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliberationItem extends AbstractModel
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
        'deliberation_id',
        'average',
        'status',
        'mention',
        'class_level_has_student_id',
    ];

    public function deliberation()
    {
        return $this->belongsTo(Deliberation::class);
    }

    public function classLevelHasStudent()
    {
        return $this->belongsTo(ClassLevelHasStudent::class);
    }

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
