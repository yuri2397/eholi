<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends AbstractModel
{
    public const BASE_REFERENCE = "st";

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
        return $this->belongsTo(Room::class, 'student_has_rooms');
    }
}
