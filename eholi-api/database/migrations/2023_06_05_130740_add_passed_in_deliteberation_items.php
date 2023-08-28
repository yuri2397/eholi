<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('deliberation_items', function (Blueprint $table) {
            $table->enum('decision', ['passer', 'redoubler', 'repecher'])->default('redoubler');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('deliberation_items', function (Blueprint $table) {
            //
        });
    }
};
