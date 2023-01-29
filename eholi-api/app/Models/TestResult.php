<?php

namespace App\Models;

use App\Models\AbstractModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TestResult extends AbstractModel
{
    protected $fillable = ['*'];

    public function test()
    {
        return $this->belongsTo(Test::class);
    }

    public function student()
    {
        return $this->belongsTo(ClassLevelHasStudent::class, 'class_level_has_student_id', 'student_id', Student::class);
    }
}
