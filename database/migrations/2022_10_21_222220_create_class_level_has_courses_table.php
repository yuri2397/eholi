<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
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

            $table
                ->foreignUuid('course_id')
                ->references('id')
                ->on('courses');
            $table
                ->foreignUuid('level_has_semester_id')
                ->references('id')
                ->on('level_has_semesters');

            $table
                ->foreignUuid('class_level_id')
                ->nullable()
                ->references('id')
                ->on('class_levels');

            $table
                ->foreignUuid('school_id')
                ->references('id')
                ->on('schools')
                ->cascadeOnDelete();
            $table
                ->foreignUuid('semester_id')
                ->references('id')
                ->on('semesters')
                ->cascadeOnDelete();

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
