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
        Schema::create('student_has_tutors', function (Blueprint $table) {
            $table
                ->foreignUuid('student_id')
                ->constrained('students')
                ->cascadeOnDelete();
            $table
                ->foreignUuid('tutor_id')
                ->constrained('tutors')
                ->cascadeOnDelete();
            $table->enum('type', ['father', 'mother', 'other']);
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
        Schema::dropIfExists('student_has_tutors');
    }
};
