<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SchoolYear extends AbstractModel
{

    public const ACTIVE = 'active';
    public const INACTIVE = 'inactive';

    protected $fillable = ['start_at', 'end_at', 'status', 'school_id'];
    // appends
    protected $appends = ['start_end'];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    // string of start-end like 2023-2024
    public function getStartEndAttribute()
    {
        // format start_at and end_at
        $start_at = date('Y', strtotime($this->start_at));
        $end_at = date('Y', strtotime($this->end_at));
        return $start_at . '-' . $end_at;
    }

}
