<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentHasTutor extends AbstractModel
{
    public const TYPE_FATHER = 'father';
    public const TYPE_MOTHER = 'mother';
    public const TYPE_OTHER = 'other';

    protected $fillable = [
        'id',
        'student_id',
        'tutor_id',
        'type',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function tutor()
    {
        return $this->belongsTo(Tutor::class);
    }
}
