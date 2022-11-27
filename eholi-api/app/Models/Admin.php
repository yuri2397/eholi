<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends AbstractModel
{
    public const BASE_REFERENCE = "ad";

    protected $fillable = ['first_name', 'last_name', 'email', 'telephone'];

    public function user()
    {
        return $this->morphOne(User::class, 'owner');
    }

    public function school_user()
    {
        return $this->morphOne(SchoolUser::class, 'user');
    }
}
