<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Stock;
use Illuminate\Http\Request;

class StockController extends Controller
{

    public function update(Request $request, $id)
    {

        $stock = Stock::where('id', $request->id)->first();
        if ($stock) {
            $stock->update([
                'quantity' => $request->new_quantity,
            ]);
            $product = Product::where('id', $request->products['id'])->first();
            if ($product) {
                if ($request->new_quantity > $request->quantity) {
                    $product->update([
                        'quantity' => $product->quantity + ($request->new_quantity - $request->quantity)
                    ]);
                } else {
                    $product->update([
                        'quantity' => $product->quantity - $request->return
                    ]);
                }
            }
        }
        return response()->json('$stocks', 200);
    }
    public function get_stock_by_products_id($id)
    {
        $stocks = Stock::where('product_id', $id)->with(['products'])->get();
        return response()->json($stocks, 200);
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|string',
            'date' => 'nullable|string',
            'delivery_id' => 'nullable|string',
            'quantity' => 'nullable|integer',
            'remaining' => 'nullable|integer',
            'price' => 'nullable',
            'supplier_id' => 'nullable',
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
