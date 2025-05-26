<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\Stock;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CartController extends Controller
{

    public function index(Request $request)
    {
        $query = Cart::where('status', 'Paid')
            ->with(['customer', 'cart_items']);

        // Optional search filter by cart ID
        if ($request->filled('search')) {
            $query->where('cart_id', 'like', '%' . $request->search . '%');
        }

        $carts = $query->get();

        return response()->json($carts, 200);
    }
    public function get_over_due(Request $request)
    {
        $query = Cart::where('due_date', '<', Carbon::now())
            ->whereIn('status', ['Pending', 'Partial'])
            ->with(['customer']);

        // Optional search filter by cart ID
        if ($request->filled('search')) {
            $query->where('cart_id', $request->search);
        }

        $carts = $query->get();

        $stocks = Product::whereBetween('quantity', [1, 10])
            ->get()
            ->map(function ($product) {
                $product->stock_status = 'Low Stock';
                return $product;
            });


        return response()->json([
            ...$carts,
            'stocks'=>$stocks
        ], 200);
    }

    public function get_cart_credit(Request $request)
    {

        $carts = Cart::where('is_credit', 'true')->with(['customer', 'cart_items', 'credit_payments']);
        if ($request->filled('search')) {
            $carts->where('cart_id', 'like', '%' . $request->search . '%');
        }

        return response()->json($carts->paginate(10), 200);
    }

    public function show($id)
    {
        $cart = Cart::where('cart_id', $id)->with(['customer', 'cart_items'])->first();
        return response()->json($cart, 200);
    }
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
            'balance' => $request->is_credit == 'true' ? $request->total_price : '0',
        ]);

        foreach ($request->cart_items as $item) {
            $subPrice = $item['sub_price'];
            $pricing_type = match (true) {
                $subPrice == $item['srp'] => 'SRP',
                $subPrice == $item['shopee'] => 'Shopee',
                $subPrice == $item['reseller'] => 'Reseller',
                $subPrice == $item['city_distributor'] => 'City Distributor',
                $subPrice == $item['district_distributor'] => 'District Distributor',
                $subPrice == $item['provincial_distributor'] => 'Provincial Distributor',
                default => 'SRP',
            };

            $quantity = $item['pcs'];
            $discounted = ($item['discount'] ?? 0) + (($item['customer_discount'] ?? 0) * $quantity);
            $discount = $item['discount'] ?? 0;
            $customer_discount = $item['customer_discount'] ?? 0;
            $price = $subPrice;
            $total = ($quantity * $price) - $discounted;

            CartItem::create([
                'cart_id' => $cart->cart_id,
                'product_id' => $item['id'],
                'discount' => $discount,
                'customer_discount' => $customer_discount * $quantity,
                'pricing_type' => $pricing_type,
                'quantity' => $quantity,
                'cost' => $item['cost'] * $quantity,
                'profit' =>  $total - ($item['cost'] * $quantity),
                'price' => $price,
                'fixed_price' => number_format($total / $quantity, 2),
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
