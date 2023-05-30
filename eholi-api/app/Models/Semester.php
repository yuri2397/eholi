<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Semester extends AbstractModel
{
    use HasFactory, UUID;

    protected $fillable = ['name', 'number'];

    # scopePagination
    public function scopePagination($query)
    {
        $request = request();
        return $query->paginate($request->per_page);
    }

    # scopeSearch
    public function scopeSearch($query)
    {
        $request = request();
        return $query->where('name', 'like', "%{$request->search}%");
    }

    # scopeFilter
    public function scopeFilter($query)
    {
        $request = request();
        $query->search();
        if ($request->has('per_page') && $request->has('page')) {
            return $query->pagination();
        }
        return $query->get();
    }

    # filter by name
}
