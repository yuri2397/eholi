<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimesTable extends AbstractModel
{
    protected $fillable = ['class_level', 'school_year'];

    protected $with = ['rows'];

    public function rows()
    {
        return $this->hasMany(TimesTableRow::class, 'times_table_id');
    }

    public function class_level()
    {
        return $this->belongsTo(ClassLevel::class);
    }
}
