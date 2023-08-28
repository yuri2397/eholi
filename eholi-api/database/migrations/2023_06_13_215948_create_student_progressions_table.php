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
        Schema::create('student_progressions', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid("student_id")->references("id")->on("students");
            $table->foreignUuid("surah_id")->references("id")->on("surahs");
            $table->unsignedInteger("progression")->default(0);
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
        Schema::dropIfExists('student_progressions');
    }
};
