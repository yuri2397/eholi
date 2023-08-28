<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Deliberation extends AbstractModel
{
    use HasFactory;

    protected $fillable = [
        'school_year_id',
        'semester_id',
        'class_level_id',
    ];

    protected $with = [
        'semester',
    ];

    public function schoolYear()
    {
        return $this->belongsTo(SchoolYear::class);
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }

    public function classLevel()
    {
        return $this->belongsTo(ClassLevel::class);
    }

    // deliberation_item_results
    public function deliberationItemResults()
    {
        return $this->hasMany(DeliberationItemResult::class);
    }

    public function deliberationItems()  {
        return $this->hasMany(DeliberationItem::class);
    }

    // public function deliberationResults()
    // {
    //     return $this->hasMany(DeliberationResult::class);
    // }
}
