<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tutor extends AbstractModel
{
    public const BASE_REFERENCE = "tt";
    protected $fillable = [
        'reference',
        'name',
        'email',
        'phone1',
        'phone2',
        'adress',
    ];

    public function students()
    {
        return $this->belongsToMany(Student::class, 'student_has_tutors', 'tutor_id', 'student_id');
    }

    public function school_user()
    {
        return $this->morphOne(SchoolUser::class, 'user');
    }

    public function user()
    {
        return $this->morphOne(User::class, 'owner');
    }
}
