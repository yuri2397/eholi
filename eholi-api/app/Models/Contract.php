<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends AbstractModel
{
    public const STATUS_PENDING = 'pending';
    public const STATUS_CONFIRM = 'confirm';
    public const STATUS_IN_PROGRESS = 'in_progress';
    public const STATUS_FINISH = 'finish';
    public const STATUS_CANCEL = 'cancel';
}
