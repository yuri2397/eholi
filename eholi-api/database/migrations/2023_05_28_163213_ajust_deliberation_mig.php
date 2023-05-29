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
        Schema::table('deliberation_items', function (Blueprint $table) {
            //
        });

        // remove deliberation_item_id in deliberation_item_results
        Schema::table('deliberation_item_results', function (Blueprint $table) {
            $table->dropForeign(['deliberation_item_id']);
            $table->dropColumn('deliberation_item_id');
            
            $table->uuid('deliberation_id');
            $table->foreign('deliberation_id')->references('id')->on('deliberations')->cascadeOnDelete();

            // add class_level_has_student_id
            $table->uuid('class_level_has_student_id');
            $table->foreign('class_level_has_student_id')->references('id')->on('class_level_has_students')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('deliberation_items', function (Blueprint $table) {
            //
        });
    }
};
