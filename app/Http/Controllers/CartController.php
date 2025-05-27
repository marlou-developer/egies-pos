<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\Stock;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{

    public function update_status(Request $request)
    {
        $cart = Cart::where('id', $request->id)->first();
        if ($cart) {
            $cart->update([
                'status' => $request->status
            ]);
            if ($request->status == 'Returned') {
                foreach ($request->cart_items as $key => $value) {
                    $product = Product::where('id', $value['product_id'])->first();
                    if ($product) {
                        $product->update([
                            'quantity' => $value['quantity'] +  $product->quantity
                        ]);
                    }
                }
            }
        }
        return response()->json($cart, 200);
    }
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
        $today = Carbon::today();
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

        $current_sales = CartItem::whereDate('created_at', $today)
            ->whereHas('cart', function ($query) {
                $query->where('status', 'Paid');
            })
            ->sum(DB::raw('total'));

        $current_profit = CartItem::whereDate('created_at', $today)
            ->whereHas('cart', function ($query) {
                $query->where('status', 'Paid');
            })
            ->sum(DB::raw('profit'));

        $total_sales = CartItem::sum(DB::raw('total'));
        $total_profit = CartItem::sum(DB::raw('profit'));


        $current_credit = Cart::whereDate('created_at', $today)
            ->where('status', 'Paid')
            ->where('is_credit', 'true')  // boolean true, or use 1 if stored as integer
            ->sum('total_price');

        $total_credit = Cart::where('is_credit', '=', 'true')
            ->where('status', 'Paid')
            ->sum(DB::raw('total_price'));

        $due_date_today = Cart::whereDate('due_date', $today)
            ->whereIn('status', ['Pending', 'Partial'])
            ->with('customer')
            ->count();

        $over_due = Cart::whereDate('due_date', '<', Carbon::today())
            ->whereIn('status', ['Pending', 'Partial'])
            ->with('customer')->count();

        $low_stock = Product::whereBetween('quantity', [1, 10])
            ->count();

        $out_of_stock = Product::where('quantity', 0)->count();

        return response()->json([
            'over_due' => $carts,
            'stocks' => $stocks,
            'dashboard' => [
                'current_sales' => $current_sales,
                'current_profit' => $current_profit,
                'total_sales' => $total_sales,
                'total_profit' => $total_profit,

                'current_credit' => $current_credit,
                'total_credit' => $total_credit,
                'due_date_today' => $due_date_today,
                'over_due' => $over_due,

                'low_stock' => $low_stock,
                'out_of_stock' => $out_of_stock,
            ]
        ], 200);
    }



    public function get_shopee(Request $request)
    {

        $carts = Cart::where('shop', 'Shopee')->with(['cart_items', 'credit_payments']);
        if ($request->filled('search')) {
            $carts->where('order_id', 'like', '%' . $request->search . '%');
            $carts->orWhere('customer', 'like', '%' . $request->search . '%');
        }


        return response()->json($carts->paginate(10), 200);
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
            'order_id' => $request->order_id ?? null,
            'customer' => $request->customer ?? null,
            'sub_total' => $request->sub_total,
            'customer_total_discount' => $request->customer_total_discount,
            'discount_per_item' => $request->total_item_discount,
            'discount_per_order' => $request->discount_per_order,
            'total_price' => $request->total_price,
            'payment_type' => $request->payment_type,
            'status' => $request->is_credit == 'true' || $request->shop == 'Shopee' ? 'Pending' : 'Paid',
            'customer_amount' => $request->customer_amount,
            'change' => $request->change,
            'is_credit' => $request->is_credit ?? null,
            'due_date' => $request->due_date,
            'shop' => $request->shop,
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
