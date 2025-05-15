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
        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            $table->string('cart_id')->nullable();
            $table->string('customer_id')->nullable();
            $table->string('sub_total')->nullable();
            $table->string('discount_per_item')->nullable();
            $table->string('discount_per_order')->nullable();
            $table->string('total_price')->nullable();
            $table->string('payment_type')->nullable();
            $table->string('tax')->nullable();
            $table->string('customer_amount')->nullable();
            $table->string('change')->nullable();
            $table->string('status')->nullable();
            $table->string('is_credit')->nullable();
            $table->string('due_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carts');
    }
};
