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
        Schema::create('deliberations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('school_year_id');
            $table->foreign('school_year_id')->references('id')->on('school_years')->cascadeOnDelete();
            // semester foreign key uuid
            $table->uuid('semester_id');
            $table->foreign('semester_id')->references('id')->on('semesters')->cascadeOnDelete();
            // class_level foreign key uuid
            $table->uuid('class_level_id');
            $table->foreign('class_level_id')->references('id')->on('class_levels')->cascadeOnDelete();

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
        Schema::dropIfExists('deliberations');
    }
};
