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
        Schema::create('students', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string("first_name")->nullable();
            $table->string('last_name');
            $table->date('birth_at')->comment('Date de naissance');
            $table->string('birth_in')->comment('Lieu de naissance');
            $table->string('email')->nullable()->unique();
            $table->string('telephone')->unique()->nullable();
            $table->string('cni')->unique()->nullable();
            $table->string('reference')->unique();
            $table->enum('sexe', ['m', 'w']);
            $table->string("adress")->nullable();
            $table->boolean('status')->default(true);
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
        Schema::dropIfExists('students');
    }
};
