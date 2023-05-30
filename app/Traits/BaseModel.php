<?php

namespace App\Traits;

use Illuminate\Support\Facades\Schema;

/**
 * @method static Builder filter()
 */
trait BaseModel
{
    /**
     * Return model columns list
     *
     * @return array
     */
    public function getColumns(): array
    {
        return Schema::getColumnListing($this->getTable());
    }
}
