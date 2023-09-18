<?php

namespace App\Models;

use App\Models\Surah;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StudentProgression extends AbstractModel
{
    protected $fillable=  ['*'];

    protected $with = ['studentProgressionItems', 'surah'];

    public function studentProgressionItems()
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
