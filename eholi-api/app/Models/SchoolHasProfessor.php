<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolHasProfessor extends AbstractModel
{
    public const STATUS_FULL = 'full';
    public const STATUS_LESS = 'less';
}
