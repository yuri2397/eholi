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
        Schema::create('test_results', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->double('note')->default(0);
            $table->enum('status', ['cancel', 'pending', 'ok'])->default('ok');
            $table->text('explanations')->nullable();
            $table->foreignUuid('test_id')->references('id')->on("tests");
            $table->foreignUuid('class_level_has_student_id')->references('id')->on("class_level_has_students");
            
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
        Schema::dropIfExists('test_results');
    }
};
