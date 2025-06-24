<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect('/administrator/dashboard');
    }
    return Inertia::render('auth/login/page');
})->name('login');

Route::middleware('auth:sanctum')->get('api/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->prefix('administrator')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('administrator/dashboard/page');
    });
    Route::get('pos', function () {
        return Inertia::render('administrator/pos/page');
    });

    Route::prefix('customer')->group(function () {
        Route::get('/', function () {
            return Inertia::render('administrator/customer/page');
        });
        Route::get('/{cust_id}', function () {
            return Inertia::render('administrator/customer/id/page');
        });
    });


    Route::get('supplier', function () {
        return Inertia::render('administrator/supplier/page');
    });
    Route::get('products', function () {
        return Inertia::render('administrator/products/page');
    });
    Route::get('stocks', function () {
        return Inertia::render('administrator/stocks/page');
    });
    Route::get('stocks/{id}', function () {
        return Inertia::render('administrator/stocks/id/page');
    });
    Route::get('shopee', function () {
        return Inertia::render('administrator/shopee/page');
    });
    Route::get('sales', function () {
        return Inertia::render('administrator/sales/page');
    });
    Route::get('sales/{id}', function () {
        return Inertia::render('administrator/sales/id/page');
    });
    Route::get('credits', function () {
        return Inertia::render('administrator/credits/page');
    });
    Route::get('credits/{id}', function () {
        return Inertia::render('administrator/credits/id/page');
    });
    Route::get('expenses', function () {
        return Inertia::render('administrator/expenses/page');
    });
    Route::get('reports', function () {
        return Inertia::render('administrator/reports/page');
    });
    Route::get('users', function () {
        return Inertia::render('administrator/users/page');
    });
    Route::get('settings', function () {
        return Inertia::render('administrator/settings/page');
    });
});

Route::prefix('administrator')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('administrator/dashboard/page');
    });
});

Route::get('/dashboard', function () {
    return Inertia::render('administrator/dashboard/page');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
