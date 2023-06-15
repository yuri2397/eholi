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
        Schema::create('student_progression_items', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid("student_progression_id")->references("id")->on("student_progressions");
            $table->unsignedInteger("start_ayah_number");
            $table->unsignedInteger("end_ayah_number");
            $table->unsignedInteger("note")->default(1);
            $table->boolean("redo")->default(false);
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
        Schema::dropIfExists('student_progression_items');
    }
};
