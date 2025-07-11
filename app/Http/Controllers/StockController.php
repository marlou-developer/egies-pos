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
                'date' => $request->date,
                'supplier_id' => $request->supplier_id,
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
        $stocks = Stock::where('product_id', $id)->with(['products', 'supplier'])->get();
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

    public function soft_delete(Request $request, $id)
    {
        try {
            // Try to get product ID from different sources
            $productId = $id ?? $request->products['id'] ?? $request->product_id;
            
            if (!$productId) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Product ID is required'
                ], 400);
            }

            $product = Product::where('id', $productId)->first();
            
            if (!$product) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Product not found'
                ], 404);
            }

            // Check if product is already soft deleted
            if ($product->is_soft_deleted == '1' || $product->is_soft_deleted == 1) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Product is already soft deleted'
                ], 400);
            }

            // Update quantity if needed (keeping original logic)
            if (isset($request->new_quantity) && isset($request->quantity)) {
                if ($request->new_quantity > $request->quantity) {
                    $product->update([
                        'quantity' => $product->quantity + ($request->new_quantity - $request->quantity)
                    ]);
                } else if (isset($request->return)) {
                    $product->update([
                        'quantity' => $product->quantity - $request->return
                    ]);
                }
            }

            // Soft delete the product
            $product->update([
                'is_soft_deleted' => '1'
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Product soft deleted successfully',
                'data' => $product
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while soft deleting the product',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    public function restore(Request $request, $id)
    {
        try {
            // Try to get product ID from different sources
            $productId = $id ?? $request->products['id'] ?? $request->product_id;
            
            if (!$productId) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Product ID is required'
                ], 400);
            }

            $product = Product::where('id', $productId)->first();
            
            if (!$product) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Product not found'
                ], 404);
            }

            // Check if product is not soft deleted
            if ($product->is_soft_deleted != '1' && $product->is_soft_deleted != 1) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Product is not soft deleted'
                ], 400);
            }

            // Restore the product
            $product->update([
                'is_soft_deleted' => '0'
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Product restored successfully',
                'data' => $product
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while restoring the product',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
