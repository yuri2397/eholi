<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends AbstractModel
{
    const ACTITE = 'active';
    const INACTIVE = 'inactive';
    public const BASE_REFERENCE = "ST-";

    protected $fillable = ['first_name', 'last_name', 'birth_at', 'birth_in', 'email', 'telephone', 'cni', 'reference', 'sexe', 'adress'];
    protected $guard = [];



    public function user()
    {
        return $this->morphOne(User::class, 'owner');
    }

    public function school_students()
    {
        return $this->hasMany(SchoolStudent::class);
    }

    public function school()
    {
        return $this->belongsToMany(School::class, 'school_students');
    }

    public function rooms()
    {
        return $this->hasMany(StudentHasRoom::class);
    }

    # tutors
    public function tutors()
    {
        return $this->belongsToMany(Tutor::class, 'student_has_tutors');
    }

    # morphto school user
    public function school_user()
    {
        return $this->morphOne(SchoolUser::class, 'user');
    }

    # class_level_has_student
    public function class_level_has_students()
    {
        return $this->hasMany(ClassLevelHasStudent::class);
    }

    /**
     * Get the class_levels for the student through class_level_has_student
     */
    public function class_levels()
    {
        return $this->belongsToMany(ClassLevel::class, 'class_level_has_students');
    }

    # active class_level
    public function active_class_level()
    {
        return $this->class_level_has_student()->where('status', true)->first();
    }


    public function room()
    {
        return $this->rooms()->whereSchoolId(school()->id)->first();
    }
}
