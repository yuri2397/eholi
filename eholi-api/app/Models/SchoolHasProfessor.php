<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolHasProfessor extends Model
{
    use HasFactory;

    public const STATUS_FULL = 'full';
    public const STATUS_LESS = 'less';
}
