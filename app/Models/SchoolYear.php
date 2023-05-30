<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SchoolYear extends AbstractModel
{

    public const ACTIVE = 'active';
    public const INACTIVE = 'inactive';

    public function school()
    {
        return $this->belongsTo(School::class);
    }
}
