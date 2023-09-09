<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentProgression extends AbstractModel
{
    protected $fillable=  ['*'];

    protected $with = ['studentProgressionItem', 'surah'];

    public function studentProgressionItem()
    {
        return $this->hasMany(StudentProgressionItem::class);
    }

    public function student()
    {
        return $this->hasOne(Student::class);
    }

    public function surah(){
        return $this->belongsTo(Surah::class);
    }
}
