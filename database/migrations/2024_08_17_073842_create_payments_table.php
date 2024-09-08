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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('service_id')->constrained()->onDelete('cascade');
            $table->decimal('amount_usd', 10, 2);
            $table->string('method', 100)->nullable()->default('Ecocash');
            $table->string('image', 100)->nullable()->default('placeholder.jpg');
            $table->date('payment_date');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
           // $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null'); // References the user who approved the payment
            //$table->timestamp('approved_at')->nullable(); // Timestamp for when the payment was approved
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
