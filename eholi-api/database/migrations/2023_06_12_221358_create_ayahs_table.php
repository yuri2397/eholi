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
        Schema::create('ayahs', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->unsignedInteger("number")->unique();
            $table->text("text");
            $table->unsignedInteger("number_inSurah");
            $table->string("juz");
            $table->string("manzil");
            $table->unsignedInteger("page");
            $table->string("ruku");
            $table->unsignedInteger("hizb_quarter");
            $table->boolean("sajda")->default(false);

            $table->foreignUuid("surah_id")->references("id")->on("surahs");
            
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
        Schema::dropIfExists('ayahs');
    }
};
