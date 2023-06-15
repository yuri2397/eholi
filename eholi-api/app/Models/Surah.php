<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Surah extends AbstractModel
{
    protected $fillable = ['name', 'number', 'tr_name', 'revelation_type'];
}
