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
        Schema::table('class_level_has_courses', function (Blueprint $table) {
            // $table->dropConstrainedForeignId("level_has_semester_id");
            // $table->dropColumn("level_has_semester_id");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('class_level_has_courses', function (Blueprint $table) {
            //
        });
    }
};
