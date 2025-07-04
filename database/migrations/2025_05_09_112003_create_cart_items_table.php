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
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();
            $table->string('cart_id')->nullable();
            $table->string('product_id')->nullable();
            $table->string('discount')->nullable();
            $table->string('customer_discount')->nullable();
            $table->string('cost')->nullable();
            $table->string('profit')->nullable();
            $table->string('pricing_type')->nullable();
            $table->string('quantity')->nullable();
            $table->string('price')->nullable();
            $table->string('fixed_price')->nullable();
            $table->string('total')->nullable();
            $table->string('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};
