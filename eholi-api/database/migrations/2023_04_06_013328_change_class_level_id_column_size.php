<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tests', function (Blueprint $table) {
            // change class_level_id column size to uuid type
            // remove class_level_id contraints
            DB::statement("ALTER TABLE tests DROP FOREIGN KEY tests_class_level_id_foreign");
            DB::statement("ALTER TABLE tests MODIFY class_level_id CHAR(36) NULL AFTER date, ADD CONSTRAINT tests_class_level_id_foreign FOREIGN KEY (class_level_id) REFERENCES class_levels (id) ON DELETE SET NULL");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tests', function (Blueprint $table) {
            //
        });
    }
};
