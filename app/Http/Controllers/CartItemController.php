<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartItemController extends Controller
{
    public function destroy($id)
    {
        $cart_item = CartItem::where('id', $id)->first();

        if ($cart_item) {
            $cart_id = $cart_item->cart_id;

            // Restore product quantity before deleting the cart item
            $product = Product::where('id', $cart_item->product_id)->first();
            if ($product) {
                $product->update([
                    'quantity' => $product->quantity + $cart_item->quantity
                ]);
            }

            // Delete the cart item
            $cart_item->delete();

            // Recalculate cart totals
            $cart = Cart::where('cart_id', $cart_id)->first();
            if ($cart) {
                $remaining_items = CartItem::where('cart_id', $cart_id)->get();

                // Calculate new subtotal from remaining items
                $sub_total = $remaining_items->sum(function ($item) {
                    return $item->price * $item->quantity;
                });

                // Calculate total item discounts
                $total_item_discount = $remaining_items->sum('discount') + $remaining_items->sum('customer_discount');

                // Calculate final total price
                $total_price = $sub_total - $total_item_discount - $cart->discount_per_order;

                // Update cart with new totals
                $cart->update([
                    'sub_total' => $sub_total,
                    'discount_per_item' => $total_item_discount,
                    'total_price' => $total_price,
                    'balance' => $cart->is_credit == 'true' ? $total_price : 0,
                ]);
            }
        }

        return response()->json(['message' => 'Item deleted successfully']);
    }
}
