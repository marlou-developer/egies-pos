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

    // public function get_discounted_products_by_id($id)
    // {
    //     $product_discount = ProductDiscount::where('customer_id', $id)->orderBy('created_at', 'desc')->paginate();
    //     return response()->json([
    //         'result' => $product_discount
    //     ], 200);
    // }

    public function show($customer_id)
    {
        $product_discount = ProductDiscount::where('customer_id', $customer_id)->first();
        return response()->json([
            'status' => $product_discount,
        ], 200);
    }
}
