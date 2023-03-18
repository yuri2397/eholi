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
        Schema::create('notes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->double('value')->default(0);
            $table->foreignUuid('student_id')->references('id')->on('students');
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
        Schema::dropIfExists('notes');
    }
};
