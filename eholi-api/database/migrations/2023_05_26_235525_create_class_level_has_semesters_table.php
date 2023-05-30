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
        Schema::create('class_level_has_semesters', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('class_level_id');
            $table->uuid('semester_id');
            $table->foreign('class_level_id')->references('id')->on('class_levels')->onDelete('cascade');
            $table->foreign('semester_id')->references('id')->on('semesters')->onDelete('cascade');
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
        Schema::dropIfExists('class_level_has_semesters');
    }
};
