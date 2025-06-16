<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Stock;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;

class CartController extends Controller
{

    public function get_report(Request $request)
    {

        $start = Carbon::parse($request->start)->startOfDay();
        $end = Carbon::parse($request->end)->endOfDay();
        if ($request->type == "Daily Sales") {

            // Fetch sales grouped by date
            $sales = DB::table('carts')
                ->select(DB::raw("DATE(created_at) as date"), DB::raw("SUM(total_price) as total_sales"))
                ->whereBetween('created_at', [$start, $end])
                ->groupBy(DB::raw("DATE(created_at)"))
                ->orderBy('date', 'ASC')
                ->pluck('total_sales', 'date'); // result: ['2025-06-13' => 2000, ...]

            // Generate full date range
            $dateRange = new Collection();
            for ($date = $start->copy(); $date <= $end; $date->addDay()) {
                $dateStr = $date->toDateString();
                $dateRange->push([
                    'date' => $dateStr,
                    'total_sales' => $sales[$dateStr] ?? 0
                ]);
            }

            return response()->json($dateRange, 200);
        } else if ($request->type == 'Sales By Customer') {
            $salesByCustomer = DB::table('carts')
                ->join('customers', 'carts.customer_id', '=', 'customers.id')
                ->select(
                    'customers.id as customer_id',
                    'customers.name as customer_name',
                    DB::raw('SUM(carts.total_price) as total_sales'),
                    DB::raw('COUNT(carts.id) as total_transactions')
                )
                ->whereBetween('carts.created_at', [$start, $end])
                ->groupBy('customers.id', 'customers.name')
                ->orderByDesc('total_sales')
                ->get();

            return response()->json($salesByCustomer, 200);
        } else if ($request->type == "Fast Stock Movement") {
            $fastMoving = DB::table('cart_items')
                ->join('products', 'cart_items.product_id', '=', 'products.id')
                ->select(
                    'products.id as product_id',
                    'products.name as product_name',
                    DB::raw('SUM(cart_items.quantity) as total_sold'),
                    DB::raw('SUM(cart_items.total) as total_sales')
                )
                ->whereBetween('cart_items.created_at', [$start, $end])
                ->groupBy('products.id', 'products.name')
                ->havingRaw('SUM(cart_items.quantity) >= 10')
                ->orderByDesc('total_sold')
                ->get();

            return response()->json($fastMoving, 200);
        } else if ($request->type == "Slow Stock Movement") {
            $slowMoving = DB::table('products')
                ->leftJoin('cart_items', function ($join) use ($start, $end) {
                    $join->on('products.id', '=', 'cart_items.product_id')
                        ->whereBetween('cart_items.created_at', [$start, $end]);
                })
                ->select(
                    'products.id as product_id',
                    'products.name as product_name',
                    DB::raw('COALESCE(SUM(cart_items.quantity), 0) as total_sold'),
                    DB::raw('COALESCE(SUM(cart_items.total), 0) as total_sales')
                )
                ->groupBy('products.id', 'products.name')
                ->havingRaw('COALESCE(SUM(cart_items.quantity), 0) < 10')
                ->orderBy('total_sold', 'desc')
                ->get();
            return response()->json($slowMoving, 200);
        } else if ($request->type == "Sales By Product") {
            $sales_by_product = DB::table('cart_items')
                ->join('products', 'cart_items.product_id', '=', 'products.id')
                ->select(
                    'products.id as product_id',
                    'products.name as product_name',
                    DB::raw('SUM(cart_items.quantity) as total_sold'),
                    DB::raw('SUM(cart_items.total) as total_sales')
                )
                ->whereBetween('cart_items.created_at', [$start, $end])
                ->groupBy('products.id', 'products.name')
                ->orderByDesc('total_sold')
                ->get();

            return response()->json($sales_by_product, 200);
        } else if ($request->type == "Sales By Payment Types") {
            $carts = DB::table('carts')
                ->select(
                    DB::raw('DATE(created_at) as date'),
                    'payment_type',
                    DB::raw('SUM(total_price) as total_sales'),
                    DB::raw('COUNT(*) as total_transactions')
                )
                ->whereBetween('created_at', [$start, $end])
                // ->whereNotNull('payment_type')
                ->groupBy(DB::raw('DATE(created_at)'), 'payment_type')
                ->orderBy('date', 'asc')
                ->orderByDesc('total_sales')
                ->get();

            return response()->json($carts, 200);
        } else if ($request->type == "Unpaid Sales") {
            $unpaidCarts = Customer::with(['carts' => function ($query) use ($start, $end) {
                $query->whereBetween('created_at', [$start, $end])
                    ->where('is_credit', 'true')
                    ->whereIn('status', ['Partial', 'Pending']);
            }])->get()
                ->filter(function ($customer) {
                    return $customer->carts->isNotEmpty();
                })
                ->values();
            return response()->json($unpaidCarts, 200);
        }else if($request->type == "Purchase by Product"){
            return response()->json([], 200);  
        }
    }
    public function update_all_status(Request $request)
    {
        foreach ($request->data as $key => $data_value) {
            $cart = Cart::where('cart_id',  $data_value['cart_id'])->first();
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
        }
        return response()->json('success', 200);
    }

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
            ->orderBy('id', 'desc')
            ->with(['customer', 'cart_items']);

        // Optional search filter by cart ID
        if ($request->filled('search')) {
            $query->where('cart_id', 'like', '%' . $request->search . '%');
        }

        $carts = $query->paginate(10);

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



        $out_stocks = Product::where('quantity', 0)
            ->get()
            ->map(function ($product) {
                $product->stock_status = 'Out of Stock';
                return $product;
            });


        $current_sales = CartItem::whereHas('cart', function ($query) {
            $today = Carbon::today();
            $query->whereDate('updated_at', $today);
            $query->where('status', 'Paid');
        })
            ->sum(DB::raw('total'));

        $current_profit = CartItem::whereHas('cart', function ($query) {
            $today = Carbon::today();
            $query->whereDate('updated_at', $today);
            $query->where('status', 'Paid');
        })
            ->sum(DB::raw('profit'));

        $total_sales = CartItem::whereHas('cart', function ($query) {
            $query->where('status', 'Paid');
        })->sum(DB::raw('total'));
        $total_profit = CartItem::whereHas('cart', function ($query) {
            $query->where('status', 'Paid');
        })->sum(DB::raw('profit'));


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


        $total_overall_inventory_retail_price = Product::selectRaw('SUM(quantity * srp) as total')
            ->value('total');

        $total_overall_inventory_capital = Product::selectRaw('SUM(quantity * cost) as total')
            ->value('total');

        return response()->json([
            'over_due' => $carts,
            'stocks' => $stocks,
            'out_stocks' => $out_stocks,
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

                'total_overall_inventory_retail_price' => $total_overall_inventory_retail_price,
                'total_overall_inventory_capital' => $total_overall_inventory_capital,
            ]
        ], 200);
    }



    public function get_shopee(Request $request)
    {

        $carts = Cart::where('shop', 'Shopee')->with(['cart_items', 'credit_payments']);
        if ($request->filled('search')) {
            $carts->where('cart_id', 'like', '%' . $request->search . '%');
            $carts->orWhere('customer', 'like', '%' . $request->search . '%');
            $carts->orWhere('order_id', 'like', '%' . $request->search . '%');
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
            'user_id' => Auth::user()->id ?? null,
            'order_id' => $request->order_id ?? null,
            'customer' => $request->customer_name ?? null,
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

        return $cart;
    }
}
