<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CreditPaymentController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductDiscountController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\SupplierController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::resource('account', AccountController::class);
Route::resource('product', ProductController::class);
Route::resource('stock', StockController::class);
Route::resource('category', CategoryController::class);
Route::resource('customer', CustomerController::class);
Route::resource('cart', CartController::class);
Route::resource('cart_item', CartItemController::class);
Route::get('get_cart_credit', [CartController::class, 'get_cart_credit']);
Route::get('get_shopee', [CartController::class, 'get_shopee']);
Route::get('get_over_due', [CartController::class, 'get_over_due']);
Route::post('update_status', [CartController::class, 'update_status']);
Route::resource('credit_payment', CreditPaymentController::class);
Route::resource('dashboard', DashboardController::class);
Route::resource('supplier', SupplierController::class);

Route::resource('product_discount', ProductDiscountController::class);
Route::post('update_product', [ProductController::class, 'update_product']);
Route::get('search_customer', [CustomerController::class, 'search_customer']);
Route::get('/get_discounted_products_by_id/{customer_id}', [ProductDiscountController::class, 'get_discounted_products_by_id']);
