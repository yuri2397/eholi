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
        Schema::create('room_has_students', function (Blueprint $table) {
            $table->foreignUuid('room_id')->references('id')->on('rooms');
            $table->foreignUuid('student_id')->references('id')->on('students');
            $table->foreignUuid('school_id')->nullable()->references('id')->on('schools');
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
        Schema::dropIfExists('room_has_students');
    }
};
