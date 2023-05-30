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
        Schema::create('tests', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string("title");
            $table->double("max_note")->default(20);
            $table->enum("type", ['examen', 'duty'])->default('duty');
            $table->double("percent")->default(100)->comment("Le pourcentage que represente un test pour la note final de ce cours.");
            $table->dateTime('date')->nullable();

            $table->foreignUlid('class_level_id')->references('id')->on('class_levels');
            $table->foreignUuid('school_has_professor_id')->references('id')->on("school_has_professors");
            $table->foreignUuid('level_has_semester_id')->references('id')->on("level_has_semesters");
            $table->foreignUuid('school_id')->references('id')->on("schools");

            $table->timestamps();
        });

        Schema::dropIfExists('notes');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tests');
    }
};
