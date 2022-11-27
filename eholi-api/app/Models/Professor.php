<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Professor extends AbstractModel
{
    public const BASE_REFERENCE = "tr";

    protected $fillable = ['first_name', 'last_name', 'status', 'last_degree', 'email', 'telephone', 'cni', 'reference', 'sexe', 'adress'];
    protected $guard = [];

    public function user()
    {
        return $this->morphOne(User::class, 'owner');
    }

    public function school_has_professors()
    {
        return $this->hasMany(SchoolHasProfessor::class);
    }

    public function school()
    {
        return $this->belongsToMany(School::class, 'school_has_professors');
    }
}
