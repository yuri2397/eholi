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
        Schema::create('class_level_has_courses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->integer('coef')->default(1);
            $table->integer('max_note')->default(20);
            $table->foreignUuid('class_level_id')->unique()->references('id')->on('class_levels');
            $table->foreignUuid('course_id')->references('id')->on('courses');
            $table->foreignUuid('level_has_semester_id')->references('id')->on('level_has_semesters');
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
        Schema::dropIfExists('class_level_has_courses');
    }
};
