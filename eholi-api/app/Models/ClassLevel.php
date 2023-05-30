<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassLevel extends AbstractModel
{
    protected $fillable = ['name', 'level_id', 'school_year_id', 'semester_id'];

    protected $appends = ['total_students', 'total_courses'];


    public function level()
    {
        return $this->belongsTo(Level::class);
    }

    public function school_year()
    {
        return $this->belongsTo(SchoolYear::class);
    }

    public function students()
    {
        return $this->belongsToMany(Student::class, 'class_level_has_students');
    }

    public function class_level_has_students()
    {
        return $this->hasMany(ClassLevelHasStudent::class);
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'class_level_has_courses');
    }

    public function getTotalStudentsAttribute()
    {
        return $this->students()->count();
    }

    public function getTotalCoursesAttribute()
    {
        return $this->courses()->count();
    }

    public function times_table()
    {
        return $this->hasOne(TimesTable::class, 'class_level_id');
    }

    // get semesters from level
    public function semesters()
    {
        return $this->belongsToMany(Semester::class, 'class_level_has_semesters');
    }
}
