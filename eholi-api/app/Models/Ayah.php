<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ayah extends AbstractModel
{
    protected $fillable = ['number', 'text', 'number_inSurah', 'juz', 'manzil', 'page', 'ruku', 'hizb_quarter', 'sajda', 'surah_id'];

    public function surah() {
        return $this->belongsTo(Surah::class);
    }

}
