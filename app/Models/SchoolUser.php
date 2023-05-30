<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Tout utilisateur ou personne de l'école.
 */
class SchoolUser extends AbstractModel
{
    public function user()
    {
        return $this->morphTo();
    }

    public function school()
    {
        return $this->belongsTo(School::class);
    }
}
