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
        Schema::dropIfExists('course_has_timestables');

        Schema::create('times_table_rows', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->dateTime("start");
            $table->dateTime("end");
            $table->boolean('all_day')->default(false);
            $table->boolean('is_repeated')->default(false);

            $table->foreignUuid('times_table_id')->references('id')->on("times_tables");
            $table->foreignUuid('class_room_id')->nullable()->references('id')->on('class_rooms');
            $table->foreignUuid('class_level_has_course_id')->references('id')->on('class_level_has_courses');
            $table->foreignUuid('school_has_professor_id')->nullable()->references('id')->on('school_has_professors');

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
        Schema::dropIfExists('times_table_rows');
    }
};
