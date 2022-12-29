<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentHasRoom extends AbstractModel
{

    protected $fillable = [
        'student_id',
        'room_id',
        'school_id',
    ];


    public function room()
    {
        return $this->belongsTo(Room::class);
    }

}
