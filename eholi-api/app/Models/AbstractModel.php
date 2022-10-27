<?php

namespace App\Models;

use App\Traits\UUID;
use App\Traits\BaseModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

abstract class AbstractModel extends Model
{
    use UUID, HasFactory, BaseModel;
}
