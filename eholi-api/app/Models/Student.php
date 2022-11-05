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
}
