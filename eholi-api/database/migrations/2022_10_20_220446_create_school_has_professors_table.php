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
        Schema::create('school_has_professors', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('poste');
            $table->foreignUuid('professor_id')->references('id')->on('professors');
            $table->foreignUuid('school_id')->references('id')->on('schools');
            $table->enum('type', ['full', 'less'])->default('full');
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
        Schema::dropIfExists('school_has_professors');
    }
};
