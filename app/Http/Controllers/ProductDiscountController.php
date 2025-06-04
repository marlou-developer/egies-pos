<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\ProductDiscount;
use Illuminate\Http\Request;

class ProductDiscountController extends Controller
{
    public function store(Request $request)
    {

        $request->validate([
            'customer_id' => 'nullable',
            'product_id' => 'nullable',
            'discount' => 'nullable'
        ]);
        $pd = ProductDiscount::where([
            ['product_id', '=', $request->product_id],
            ['customer_id', '=', $request->customer_id],
        ])->first();
        if (!$pd) {
            ProductDiscount::create([
                'customer_id' => $request->customer_id,
                'product_id' => $request->product_id,
                'customer_discount' => $request->discount,
            ]);
            return response()->json('success', 200);
        } else {
            return response()->json('error', 422);
        }
    }

    public function destroy($id)
    {
        $product_discount = ProductDiscount::where('id', $id)->first();
        if ($product_discount) {
            $product_discount->delete();
        }

        return response()->json(['message' => 'Product Discount deleted successfully']);
    }

    public function update(Request $request,  $id)
    {
        $product_discount = ProductDiscount::where('id', $id)->first();
        if ($product_discount) {
            $product_discount->update($request->all());
        }
    }

    public function show($customer_id)
    {
        $product_discount = Customer::where('id', $customer_id)->with(['discounts'])->first();
        return response()->json($product_discount, 200);
    }
}
