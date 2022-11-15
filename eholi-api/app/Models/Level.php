<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Level extends AbstractModel
{
    public function cycle()
    {
        return $this->belongsTo(Cycle::class);
    }
}
