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
        Schema::create('deliberation_item_results', function (Blueprint $table) {


            $table->uuid('id')->primary();
            $table->uuid('deliberation_item_id');
            $table->foreign('deliberation_item_id')->references('id')->on('deliberation_items')->onDelete('cascade');
            // class_level_has_course_id foreign
            $table->uuid('class_level_has_course_id');
            $table->foreign('class_level_has_course_id')->references('id')->on('class_level_has_courses')->onDelete('cascade');
            // coef
            $table->float('coef')->default(1);
            // average
            $table->float('average')->nullable();
            // status
            $table->enum('status', ['success', 'append', 'cancel', 'remove'])->nullable();
            // mention
            $table->enum('mention', ['any', 'excellent', 'very_good', 'good', 'passable', 'mediocre', 'weak', 'very_weak'])->nullable();
            // rang
            $table->integer('rang')->nullable();
            // duty average
            $table->float('duty_average')->nullable();
            // exam average
            $table->float('exam_average')->nullable();


            $table->timestamps();
        });

        // remove class_level_has_course_id  in deliberation_items table
        Schema::table('deliberation_items', function (Blueprint $table) {
            $table->dropForeign(['class_level_has_course_id']);
            $table->dropColumn('class_level_has_course_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('deliberation_item_results');
    }
};
