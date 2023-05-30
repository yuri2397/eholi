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
        Schema::create('contracts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('reference')->unique();
            $table->enum('type', ['full', 'less'])->default('full');
            $table->date('start_at')->default(now());
            $table->date('end_at')->nullable();
            $table->json('criterias')->nullable();
            $table->enum('status', ['pending', 'confirm', 'in_progress', 'finish', 'cancel']);
            $table->foreignUuid('school_has_professor_id')->references('id')->on('school_has_professors');
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
        Schema::dropIfExists('contracts');
    }
};
