<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Building extends AbstractModel
{
    protected $fillable = ['name', 'school_id', 'status'];

    protected $appends = ['class_room_count'];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function class_rooms()
    {
        return $this->hasMany(ClassRoom::class);
    }

    public function getClassRoomCountAttribute(){
        return $this->class_rooms()->count();
    }
}
