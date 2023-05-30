<?php

namespace App\Models;

use App\Traits\UUID;
use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Professor extends AbstractModel implements HasMedia
{
    use InteractsWithMedia;
    public const BASE_REFERENCE = 'tr';
    protected $with = ['media'];

    protected $fillable = [
        'first_name',
        'last_name',
        'status',
        'last_degree',
        'email',
        'telephone',
        'cni',
        'reference',
        'sexe',
        'adress',
    ];
    protected $guard = [];

    public function user()
    {
        return $this->morphOne(User::class, 'owner');
    }

    public function school_has_professors()
    {
        return $this->hasMany(SchoolHasProfessor::class);
    }

    public function school()
    {
        return $this->belongsToMany(School::class, 'school_has_professors');
    }

    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('preview')
            ->fit(Manipulations::FIT_CROP, 300, 300)
            ->nonQueued();
    }

    public function setAvatar($pathToFile)
    {
        $this->addMedia($pathToFile)->toMediaCollection('avatar');
    }
}
