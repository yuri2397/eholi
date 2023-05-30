<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('class_level_has_courses', function (Blueprint $table) {
            $table
                ->foreignUuid('professor_id')
                ->nullable()
                ->constrained('professors');
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
            $table->dropConstrainedForeignId('professor_id');
            $table->dropColumn('professor_id');
        });
    }
};
