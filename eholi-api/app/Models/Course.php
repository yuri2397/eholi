<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends AbstractModel
{
    protected $fillable = ['name', 'reference', 'description'];
}
