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
        Schema::create('course_has_timestables', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->time('start_at');
            $table->time('end_at');
            $table->string('group')->nullable();
            $table->enum('day', ['1', '2', '3', '4', '5', '6', '7'])->comment('1 correspond a LUNDI et 7 a DIMANCHE');
            $table->foreignUlid('class_room_id')->nullable()->references('id')->on('class_rooms');
            $table->foreignUlid('class_level_has_course_id')->references('id')->on('class_level_has_courses');
            $table->foreignUlid('school_has_professor_id')->nullable()->references('id')->on('school_has_professors');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('course_has_timestables');
    }
};
