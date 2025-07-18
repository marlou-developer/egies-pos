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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('category_id')->nullable();
            $table->string('supplier_id')->nullable();
            $table->string('barcode')->nullable();
            $table->string('brand')->nullable();
            $table->string('quantity')->nullable();
            $table->string('status')->nullable();
            $table->string('cost')->nullable();
            $table->string('srp')->nullable();
            $table->string('shopee')->nullable();
            $table->string('customer')->nullable();
            $table->string('reseller')->nullable();
            $table->string('city_distributor')->nullable();
            $table->string('district_distributor')->nullable();
            $table->string('provincial_distributor')->nullable();
            $table->string('delivery_receipt_no')->nullable();
            $table->string('is_soft_deleted')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
