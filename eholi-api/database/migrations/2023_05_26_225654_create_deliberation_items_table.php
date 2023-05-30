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
        Schema::create('deliberation_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('deliberation_id');
            $table->foreign('deliberation_id')->references('id')->on('deliberations')->cascadeOnDelete();
            $table->enum('status', ['success', 'append', 'cancel', 'remove'])->default('append');
            $table->float('average')->default(0);
            $table->unsignedInteger('rang')->default(1);
            $table->string('mention')->default('any');
            $table->uuid('class_level_has_student_id');
            $table->foreign('class_level_has_student_id')->references('id')->on('class_level_has_students');
            $table->uuid('class_level_has_course_id');
            $table->foreign('class_level_has_course_id')->references('id')->on('class_level_has_courses');
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
        Schema::dropIfExists('deliberation_items');
    }
};
