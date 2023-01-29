<?php

namespace App\Models;

use App\Models\AbstractModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Test extends AbstractModel
{
    protected $fillable = ['*'];

    public function test_results()  
    {
        return $this->hasMany(TestResult::class);
    }

    public function class_level()
    {
        return $this->hasOne(ClassLevel::class);
    }
}
