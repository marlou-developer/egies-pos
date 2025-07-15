<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CreditPaymentController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductDiscountController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\SupplierController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('account', AccountController::class);
    Route::resource('product', ProductController::class);
    Route::get('product_soft_deleted', [ProductController::class, 'getSoftDeleted']);
    Route::post('soft_delete/{id}', [StockController::class, 'soft_delete']);
    Route::post('restore/{id}', [ProductController::class, 'restore']);
    Route::resource('stock', StockController::class);
    Route::get('get_stock_by_products_id/{id}', [StockController::class, 'get_stock_by_products_id']);
    Route::resource('category', CategoryController::class);
    Route::resource('customer', CustomerController::class);
    Route::put('update_customer/{id}', [CartController::class, 'update_customer']);
    Route::resource('cart', CartController::class);
    Route::resource('cart_item', CartItemController::class);
    Route::post('edit_discount', [CartController::class, 'edit_discount']);
    Route::get('get_cart_credit', [CartController::class, 'get_cart_credit']);
    Route::get('get_shopee', [CartController::class, 'get_shopee']);
    Route::get('get_over_due', [CartController::class, 'get_over_due']);
    Route::post('update_status', [CartController::class, 'update_status']);
    Route::post('return_per_item', [CartController::class, 'return_per_item']);
    Route::post('update_all_status', [CartController::class, 'update_all_status']);
    Route::post('edit_payment', [CartController::class, 'edit_payment']);
    Route::post('edit_quantity', [CartController::class, 'edit_quantity']);
    Route::post('update_is_read', [CartController::class, 'update_is_read']);

    Route::post('cart_item', [CartItemController::class, 'cart_item']);

    Route::get('get_report', [CartController::class, 'get_report']);
    Route::get('report_items', [CartController::class, 'report_items']);
    Route::resource('credit_payment', CreditPaymentController::class);
    Route::resource('dashboard', DashboardController::class);
    Route::resource('supplier', SupplierController::class);
    Route::resource('expense', ExpenseController::class);

    Route::resource('product_discount', ProductDiscountController::class);
    Route::post('update_product', [ProductController::class, 'update_product']);

    Route::get('search_customer', [CustomerController::class, 'search_customer']);
    Route::get('/get_discounted_products_by_id/{customer_id}', [ProductDiscountController::class, 'get_discounted_products_by_id']);
});
