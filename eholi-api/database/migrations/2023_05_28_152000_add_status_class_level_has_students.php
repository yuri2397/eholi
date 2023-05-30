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
        Schema::table('class_level_has_students', function (Blueprint $table) {
            $table->enum('status', ['active', 'inactive'])->default('active')->after('class_level_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('class_level_has_students', function (Blueprint $table) {
            //
        });
    }
};
