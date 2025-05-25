<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Stock;
use Illuminate\Http\Request;

class StockController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|string',
            'date' => 'nullable|string',
            'delivery_id' => 'nullable|string',
            'quantity' => 'nullable|integer',
            'price' => 'nullable',
        ]);

        $stocks = Stock::create($data);

        $product = Product::find($data['product_id']);
        if ($product) {
            $product->quantity += (int) $data['quantity'];
            $product->save();
        }

        return response()->json([
            'status' => 'success',
            'data' => $stocks,
        ], 200);
    }
}
