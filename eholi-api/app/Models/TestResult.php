<?php

namespace App\Models;

use App\Models\AbstractModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TestResult extends AbstractModel
{

    public const OK = 'ok';
    public const PENDING = 'pending';
    public const CANCEL = 'cancel';
    protected $fillable = ['status', 'class_level_has_student_id', 'note', 'test_id', 'explanations'];

    protected $with = ['student'];

    public function test()
    {
        return $this->belongsTo(Test::class);
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
