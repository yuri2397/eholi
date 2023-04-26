<?php

namespace App\Models;

use App\Models\AbstractModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TimesTableRow extends  AbstractModel
{
    use HasFactory;

    protected $fillable = ['start','end','class_level_has_course_id','class_room_id','school_has_professor_id','times_table_id'];

    protected $with = ['class_level_has_course.course', 'school_has_professor.professor'];

    public function class_level_has_course()
    {
        return $this->belongsTo(ClassLevelHasCourse::class, 'class_level_has_course_id');
    }

    public function school_has_professor()
    {
        return $this->belongsTo(SchoolHasProfessor::class, 'school_has_professor_id');
    }

    public function FunctionName()
    {
        
    }
}
