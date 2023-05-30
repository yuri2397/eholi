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
        Schema::table('class_level_has_courses', function (Blueprint $table) {
            $table->double('duty_percent')->default(50)->after('max_note');
            $table->double('exam_percent')->default(50)->after('max_note');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('class_level_has_courses', function (Blueprint $table) {
            //
        });
    }
};
