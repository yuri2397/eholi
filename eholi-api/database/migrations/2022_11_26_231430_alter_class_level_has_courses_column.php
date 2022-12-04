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
        Schema::table('class_level_has_courses', function (Blueprint $table) {
            $table
                ->foreignUuid('class_level_id')
                ->nullable()
                ->references('id')
                ->on('class_levels');
            $table
                ->foreignUuid('course_id')
                ->nullable()
                ->references('id')
                ->on('courses');

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
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('class_level_has_courses', function (
            Blueprint $table
        ) {});
    }
};
