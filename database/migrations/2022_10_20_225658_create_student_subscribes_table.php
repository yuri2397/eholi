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
        Schema::create('student_subscribes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->enum('status', ['pending', 'success', 'cancel'])->default('pending');
            $table->unsignedInteger('amount');
            $table->string('reference')->unique();
            $table->enum('type', ['offline', 'online', 'delay'])->default('offline');
            $table->foreignUuid('student_id')->references('id')->on('students');
            $table->foreignUuid('class_level_has_student_id')->references('id')->on('class_level_has_students');
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
        Schema::dropIfExists('student_subscribes');
    }
};
