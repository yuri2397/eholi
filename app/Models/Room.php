<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends AbstractModel
{
    protected $fillable = ['label', 'size', 'school_id', 'building_id'];

    protected $appends = ['total_students'];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function building()
    {
        return $this->belongsTo(Building::class);
    }

    public function students()
    {
        return $this->belongsToMany(Student::class, 'student_has_rooms');
    }

    public function getTotalStudentsAttribute()
    {
        return $this->students()->count();
    }
}
