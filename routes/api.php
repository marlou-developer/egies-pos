<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\BookingInfoController;
use App\Http\Controllers\BookingOrderController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InventoryAllocationController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\InventoryStockController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\RentController;
use App\Http\Controllers\ResortController;
use App\Http\Controllers\TermController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\XenditController;
use App\Http\Controllers\XenditPaymentController;
use GlennRaya\Xendivel\Xendivel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Route::post('/create-payment', [PaymentController::class, 'createPayment'])->name('payment.create');
// Route::get('/payment-status', [PaymentController::class, 'paymentStatus'])->name('payment.status');


// Route::resource('activity', ActivityController::class);
// Route::post('/update_activity', [ActivityController::class, 'update_activity']);
// Route::resource('dashboard', DashboardController::class);
// Route::resource('account', AccountController::class);
// Route::resource('booking_info', BookingInfoController::class);
// Route::get('/get_calendar', [BookingInfoController::class, 'get_calendar']);
// Route::post('/add_order', [BookingInfoController::class, 'add_order']);
// Route::post('/checkout_data', [BookingInfoController::class, 'checkout_data']);

// Route::resource('booking_order', BookingOrderController::class);
// Route::resource('inventory_allocations', InventoryAllocationController::class);
// Route::resource('inventory', InventoryController::class);
// Route::put('/return_item/{id}', [InventoryController::class, 'return_item']);
// Route::resource('inventory_stocks', InventoryStockController::class);
// Route::resource('landing_page', LandingPageController::class);
// Route::resource('rent', RentController::class);
// Route::post('/update_rent', [RentController::class, 'update_rent']);
// Route::resource('resort', ResortController::class);
// Route::resource('term', TermController::class);
// Route::resource('upload', UploadController::class);


// Route::post('pay-via-ewallet', [XenditController::class, 'pay_via_ewallet']);
// Route::post('pay-with-card', [XenditController::class, 'pay_via_card']);
