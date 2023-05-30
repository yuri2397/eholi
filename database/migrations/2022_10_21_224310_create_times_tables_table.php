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
        Schema::create('times_tables', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('class_level_id')->references('id')->on('class_levels');
            $table->foreignUuid('school_year_id')->references('id')->on('school_years');
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
        Schema::dropIfExists('times_tables');
    }
};
