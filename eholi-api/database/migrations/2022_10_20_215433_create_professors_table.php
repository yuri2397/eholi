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
        Schema::create('professors', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string("first_name")->nullable();
            $table->string('last_name');
            $table->string('email')->nullable()->unique();
            $table->string('telephone')->unique();
            $table->string('cni')->unique()->nullable();
            $table->string('reference')->unique();
            $table->enum('sexe', ['m', 'w']);
            $table->string("adress")->nullable();
            $table->boolean('status')->default(true);
            $table->string("last_degre")->nullable();
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
        Schema::dropIfExists('professors');
    }
};
