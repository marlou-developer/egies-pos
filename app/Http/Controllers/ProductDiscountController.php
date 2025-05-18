<?php

namespace App\Http\Controllers;

use App\Models\ProductDiscount;
use Illuminate\Http\Request;

class ProductDiscountController extends Controller
{
    public function store(Request $request)
    {

        $request->validate([
            'customer_id' => 'nullable',
            'product_id' => 'nullable|unique:product_discounts,product_id',
            'discount' => 'nullable'
        ]);

        ProductDiscount::create([
            'customer_id' => $request->customer_id,
            'product_id' => $request->product_id,
            'discount' => $request->discount,
        ]);
    }
}
