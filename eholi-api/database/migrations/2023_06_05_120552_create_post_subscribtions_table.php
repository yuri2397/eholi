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
        Schema::create('post_subscribtions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->enum('status', ['pending', 'success', 'cancel'])->default('pending');
            $table->unsignedInteger('amount');
            $table->string('reference')->unique();
            $table->enum('type', ['offline', 'online', 'delay'])->default('offline');
            $table->foreignUuid('student_id')->nullable()->references('id')->on('students')->nullOnDelete();
            $table->foreignUuid('level_id')->nullable()->references('id')->on('levels')->nullOnDelete();
            $table->foreignUuid('deliberation_id')->nullable()->references('id')->on('deliberations')->nullOnDelete();
            $table->foreignUuid('deliberation_item_id')->nullable()->references('id')->on('deliberation_items')->nullOnDelete();
            $table->foreignUuid('class_level_id')->nullable()->references('id')->on('class_levels')->nullOnDelete();
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
        Schema::dropIfExists('post_subscribtions');
    }
};
