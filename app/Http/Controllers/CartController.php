<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function store(Request $request)
    {
        $cart_id = Carbon::now()->format('mdyHisv');

        $cart = Cart::create([
            'cart_id' => $cart_id,
            'customer_id' => $request->customer_id,
            'sub_total' => $request->sub_total,
            'customer_total_discount' => $request->customer_total_discount,
            'discount_per_item' => $request->total_item_discount,
            'discount_per_order' => $request->discount_per_order,
            'total_price' => $request->total_price,
            'payment_type' => $request->payment_type,
            'status' => $request->is_credit == 'true' ? 'Pending' : 'Paid',
            'customer_amount' => $request->customer_amount,
            'change' => $request->change,
            'is_credit' => $request->is_credit,
            'due_date' => $request->due_date,
        ]);

        foreach ($request->cart_items as $item) {
            $subPrice = $item['sub_price'];
            $pricing_type = match (true) {
                $subPrice == $item['srp'] => 'SRP',
                $subPrice == $item['city_distributor'] => 'City Distributor',
                $subPrice == $item['district_distributor'] => 'District Distributor',
                $subPrice == $item['provincial_distributor'] => 'Provincial Distributor',
                default => 'SRP',
            };

            $discount = $item['discount'] ?? 0;
            $quantity = $item['pcs'];
            $customer_discount = $item['customer_discount'] ?? 0;
            $price = $subPrice;
            $fixed_price = $price - $discount;
            $total = ($quantity * $price) - $discount;

            CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $item['id'],
                'discount' => $discount,
                'customer_discount' => $customer_discount,
                'pricing_type' => $pricing_type,
                'quantity' => $quantity,
                'price' => $price,
                'fixed_price' => $fixed_price,
                'total' => $total,
            ]);

            $product = Product::where('id', $item['id'])->first();
            if ($product) {
                $product->update([
                    'quantity' => $product->quantity -  $quantity
                ]);
            }
        }

        return 'success';
    }
}
