<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('property_id');
            $table->string('service', 100);
            $table->float('current_amount')->nullable()->default(123.45);
            $table->float('arreas')->nullable()->default(123.45);
            $table->dateTime('expire_date');
            $table->string("status")->default("pending");
            $table->foreign('property_id')
                ->references('id')
                ->on('properties')
                ->constrained("properties")
                ->onDelete("cascade")
                ->onUpdate("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
