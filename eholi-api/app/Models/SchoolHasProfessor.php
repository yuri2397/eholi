<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolHasProfessor extends AbstractModel
{
    public const TYPE_FULL = 'full';
    public const TYPE_LESS = 'less';

    protected $fillable = ['school_id', 'professor_id', 'type', 'post'];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function professor()
    {
        return $this->belongsTo(Professor::class);
    }
}
