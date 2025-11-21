<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Category;
use App\Models\CreditPayment;
use App\Models\Customer;
use App\Models\Expense;
use App\Models\Notification;
use App\Models\Product;
use App\Models\Stock;
use App\Models\Supplier;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Collection;

class CartController extends Controller
{
    public function update_cart_created_at(Request $request)
    {
        $request->validate([
            'id' => 'required|integer|exists:carts,id',
            'created_at' => 'required|date_format:Y-m-d H:i:s',
        ]);

        $cart = Cart::find($request->id);

        $cart->update([
            'created_at' => $request->created_at,
        ]);

        return response()->json(['status' => 'success'], 200);
    }

    public function change_discount_per_order()
    {
        $carts = Cart::where('discount_per_order', '!=', 0)->orderBy('id', 'desc')->get();

        foreach ($carts as $cart) {
            $cart_items = CartItem::where('cart_id', $cart->cart_id)->get();

            $split_discount = $cart->discount_per_order / count($cart_items);

            foreach ($cart_items as $item) {
                $item->update([
                    'discount' => $item->discount + $split_discount,
                    'total' => ($item->price * $item->quantity) - ($item->discount + $split_discount),
                    'profit' => ($item->price * $item->quantity) - ($item->discount + $split_discount) - $item['cost'],
                ]);
            }
        }
        return response()->json([
            'carts' => $carts,
        ], 200);
    }
    public function report_items()
    {

        $customers = Customer::get();
        $suppliers = Supplier::get();
        $products = Product::get();
        $users = User::get();
        $categories = Category::get();
        return response()->json([
            'customers' => $customers,
            'suppliers' => $suppliers,
            'products' => $products,
            'users' => $users,
            'categories' => $categories,
        ], 200);
    }

    public function update_is_read(Request $request)
    {
        $user = Auth::user();

        // Debug: Log the incoming request
        Log::info('Update is_read request:', [
            'user_id' => $user->id,
            'notifications' => $request->all()
        ]);

        // Check if notifications exist and handle both array and object cases
        $notifications = $request->input('notifications', []);

        if (!empty($notifications)) {
            foreach ($notifications as $value) {
                // Handle both array and object notation
                $notificationId = is_array($value) ? $value['id'] : $value->id;

                if ($notificationId) {
                    $notif = Notification::where('id', $notificationId)
                        ->where('user_id', $user->id)
                        ->first();

                    if ($notif) {
                        $updated = $notif->update([
                            'is_read' => 'true'
                        ]);
                        Log::info('Updated notification:', [
                            'id' => $notificationId,
                            'success' => $updated
                        ]);
                    } else {
                        Log::warning('Notification not found:', [
                            'id' => $notificationId,
                            'user_id' => $user->id
                        ]);
                    }
                }
            }
        }

        return response()->json([
            'result' => 'success',
            'updated_count' => count($notifications)
        ], 200);
    }


    public function return_per_item(Request $request)
    {

        $cart_item = CartItem::where('id', $request->id)->first();
        $remaining_quanity = $cart_item->quantity - $request->quantity;
        $kaltas_price = $request->quantity * $cart_item->fixed_price;

        if ($cart_item) {
            $cart_item->update([
                'quantity' =>  $remaining_quanity,
                'total' =>  $remaining_quanity * $cart_item->fixed_price,
            ]);
        }
        $cart = Cart::where('cart_id', $cart_item->cart_id)->first();
        if ($cart) {
            $cart->update([
                'total_price' => $cart->total_price - $kaltas_price,
                'sub_total' => $cart->sub_total - $kaltas_price,
            ]);
        }

        $product = Product::where('id', $cart_item->product_id)->first();
        if ($product) {
            $product->update([
                'quantity' => $product->quantity +  $request->quantity
            ]);
        }
        return response()->json([
            'result' => 'success'
        ], 200);
    }

    public function edit_discount(Request $request)
    {
        $cart_item = CartItem::where('id', $request->id)->first();
        $total = ($cart_item->price * $cart_item->quantity) - $request->discount_per_item;
        $fixed_price = $total / $cart_item->quantity;
        $profit = $total - $cart_item->cost;
        if ($cart_item) {
            $cart_item->update([
                'discount' => $request->discount_per_item,
                'fixed_price' => $fixed_price,
                'total' => $total,
                'profit' => $profit,
            ]);
        }
        $cart = Cart::where('cart_id', $request->cart_id)->first();
        if ($cart) {
            // Recalculate cart totals based on all cart items
            $cart_items = CartItem::where('cart_id', $request->cart_id)->get();
            
            $sub_total = $cart_items->sum(function ($item) {
                return $item->price * $item->quantity;
            });
            
            $total_item_discounts = $cart_items->sum('discount');
            
            $new_total_price = $sub_total - $total_item_discounts - ($request->discount_per_order ?? 0) - ($cart->customer_total_discount ?? 0);
            
            $cart->update([
                'discount_per_order' => $request->discount_per_order ?? $cart->discount_per_order,
                'discount_per_item' => $total_item_discounts,
                'sub_total' => $sub_total,
                'total_price' => $new_total_price,
            ]);
        }
        return response()->json($request, 200);
    }


    public function edit_quantity(Request $request)
    {
        $cart = Cart::where('cart_id', $request->cart_id)->first();
        $cart_item = CartItem::where('id', $request->id)->first();
        $product = Product::where('id', $request->product_id)->first();
        if ($cart && $cart_item) {
            if ($product) {
                if ($request->quantity > $cart_item->quantity) {
                    $product->update([
                        'quantity' => $product->quantity - ($request->quantity - $cart_item->quantity)
                    ]);
                } else {
                    $product->update([
                        'quantity' => $product->quantity +  ($cart_item->quantity - $request->quantity)
                    ]);
                }
            }
            $total = $request->quantity * $request->price - $cart_item->discount;
            $fixed_price = $total / $request->quantity;
            $profit = $total - ($cart_item->cost / $cart_item->quantity * $request->quantity);
            
            $cart_item->update([
                'quantity' => $request->quantity,
                'total' => $total,
                'fixed_price' => $fixed_price,
                'profit' => $profit,
            ]);
            $cart_items = CartItem::where('cart_id', $request->cart_id)->get();

            $total = $cart_items->sum(function ($item) {
                return $item->price * $item->quantity;
            });

            $new_total_price = $total - ($cart->discount_per_order + $cart->discount_per_item + $cart->customer_total_discount);

            $cart->update([
                'sub_total' => $total,
                'total_price' => $new_total_price,
            ]);

            if ($cart->is_credit == 'true') {
                // Calculate the new balance: new total price minus any payments already made
                $total_payments = $cart->credit_payments()->sum('amount');
                $new_balance = $new_total_price - $total_payments;
                
                // Ensure balance doesn't go below 0
                $new_balance = max(0, $new_balance);
                
                // Update status based on balance
                $status = $new_balance <= 0 ? 'Paid' : ($total_payments > 0 ? 'Partial' : 'Pending');
                
                $cart->update([
                    'balance' => $new_balance,
                    'status' => $status,
                ]);
            }
        }
        return response()->json($cart, 200);
    }

    public function edit_payment(Request $request)
    {
        $cart = Cart::where('cart_id', $request->cart_id)->first();
        if ($cart) {
            $cart->update([
                'due_date' => $request->due_date
            ]);
        }
        if (Carbon::parse($request->due_date)->gt(Carbon::now())) {
            $cart = Cart::where('cart_id', $request->cart_id)->first();
            if ($cart) {
                Notification::where('cp_id', $cart->id)
                    ->where('is_read', 'true')
                    ->where('type', 'cart')
                    ->delete();
            }
        }
    }

    public function update_payment(Request $request)
    {
        $credit_payment = CreditPayment::where('id', $request->id)->where('cart_id', $request->cart_id)->first();
        $cart = Cart::where('cart_id', $request->cart_id)->first();

        if (!$cart || !$credit_payment) {
            return response()->json(['error' => 'Cart or payment not found'], 404);
        }

        $oldAmount = $credit_payment->amount;
        $newAmount = $request->amount;

        $credit_payment->update([
            'amount' => $newAmount,
            'created_at' => $request->date,
            'payment_type' => $request->payment_type,
        ]);

        $difference = $newAmount - $oldAmount;

        $newBalance = $cart->balance - $difference;

        if ($newBalance < 0) {
            $newBalance = 0;
        }

        $status = $newBalance <= 0 ? 'Paid' : 'Partial';

        $cart->update([
            'balance' => $newBalance,
            'status' => $status,
        ]);

        return response()->json(['message' => 'Payment and balance updated successfully']);
    }


    public function get_report(Request $request)
    {

        $start = Carbon::parse($request->start)->startOfDay();
        $end = Carbon::parse($request->end)->endOfDay();
        $customer = Customer::where('id', $request->customer)->first();
        $user = User::where('id', $request->user)->first();
        $product = Product::where('id', $request->product)->first();

        if ($request->type == "Stock Movement") {
            $fastMoving = DB::table('cart_items')
                ->join('products', 'cart_items.product_id', '=', 'products.id')
                ->join('carts', 'cart_items.cart_id', '=', 'carts.cart_id')
                ->join('categories', 'products.category_id', '=', 'categories.id')
                ->select(
                    'products.id as product_id',
                    'products.name as product_name',
                    DB::raw('SUM(cart_items.quantity) as total_sold'),
                    DB::raw('SUM(cart_items.total) as total_sales')
                )
                ->whereBetween('cart_items.created_at', [$start, $end])
                ->when(!empty($request->customer) && $request->customer !== 'all', function ($query) use ($request) {
                    return $query->where('carts.customer_id', $request->customer);
                })
                ->when(!empty($request->user) && $request->user !== 'all', function ($query) use ($request) {
                    return $query->where('carts.user_id', $request->user);
                })
                ->when(!empty($request->product) && $request->product !== 'all', function ($query) use ($request) {
                    return $query->where('products.id', $request->product);
                })
                ->when(!empty($request->category) && $request->category !== 'all', function ($query) use ($request) {
                    return $query->where('categories.id', $request->category);
                })
                ->when(!empty($request->supplier) && $request->supplier !== 'all', function ($query) use ($request) {
                    return $query->where('products.supplier_id', $request->supplier);
                })
                ->groupBy('products.id', 'products.name')
                ->havingRaw('SUM(cart_items.quantity) > 10')
                ->orderByDesc('total_sold')
                ->get();

            $slowMoving = DB::table('cart_items')
                ->join('products', 'cart_items.product_id', '=', 'products.id')
                ->join('carts', 'cart_items.cart_id', '=', 'carts.cart_id')
                ->join('categories', 'products.category_id', '=', 'categories.id')
                ->select(
                    'products.id as product_id',
                    'products.name as product_name',
                    DB::raw('SUM(cart_items.quantity) as total_sold'),
                    DB::raw('SUM(cart_items.total) as total_sales')
                )
                ->whereBetween('cart_items.created_at', [$start, $end])
                ->when(!empty($request->customer) && $request->customer !== 'all', function ($query) use ($request) {
                    return $query->where('carts.customer_id', $request->customer);
                })
                ->when(!empty($request->user) && $request->user !== 'all', function ($query) use ($request) {
                    return $query->where('carts.user_id', $request->user);
                })
                ->when(!empty($request->product) && $request->product !== 'all', function ($query) use ($request) {
                    return $query->where('products.id', $request->product);
                })
                ->when(!empty($request->category) && $request->category !== 'all', function ($query) use ($request) {
                    return $query->where('categories.id', $request->category);
                })
                ->when(!empty($request->supplier) && $request->supplier !== 'all', function ($query) use ($request) {
                    return $query->where('products.supplier_id', $request->supplier);
                })
                ->groupBy('products.id', 'products.name')
                ->havingRaw('SUM(cart_items.quantity) > 0 AND SUM(cart_items.quantity) <= 10')
                ->orderBy('total_sold') // Slowest first
                ->get();


            return response()->json([
                'fast_movement' => $fastMoving,
                'slow_movement' => $slowMoving,
                'customer' => $customer,
                'user' => $user,
                'product' => $product
            ], 200);
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
                ->when(!empty($request->customer) && $request->customer !== 'all', function ($query) use ($request) {
                    return $query->where('carts.customer_id', $request->customer);
                })
                ->groupBy('customers.id', 'customers.name')
                ->orderByDesc('total_sales')
                ->get();
            return response()->json([
                'data' => $salesByCustomer,
                'customer' => $customer,
                'user' => $user,
                'product' => $product
            ], 200);
        } else if ($request->type == "Daily Sales") {

            // Fetch sales grouped by date
            $sales = DB::table('carts')
                ->select(DB::raw("DATE(carts.created_at) as date"), DB::raw("SUM(total_price) as total_sales"))
                ->whereBetween('carts.created_at', [$start, $end])
                ->groupBy(DB::raw("DATE(carts.created_at)"))
                ->orderBy('date', 'ASC')
                ->when(!empty($request->customer) && $request->customer !== 'all', function ($query) use ($request) {
                    return $request->customer == '1'
                        ? $query->whereNull('carts.customer_id')
                        : $query->where('carts.customer_id', $request->customer);
                })
                ->when(!empty($request->user) && $request->user !== 'all', function ($query) use ($request) {
                    return $query->where('carts.user_id', $request->user);
                })
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

            return response()->json([
                'data' => $dateRange,
                'customer' => $customer,
                'user' => $user,
                'product' => $product
            ], 200);
        } else if ($request->type == "Invoices") {
            $Invoice = Cart::with(['customer',    'cart_items' => function ($q) use ($request) {
                if (!empty($request->product) && $request->product !== 'all') {
                    $q->where('product_id', $request->product);
                }
            }])
                ->whereBetween('created_at', [$start, $end])
                ->when(!empty($request->customer) && $request->customer !== 'all', function ($query) use ($request) {
                    return $request->customer == '1'
                        ? $query->whereNull('carts.customer_id')
                        : $query->where('carts.customer_id', $request->customer);
                })
                ->when(!empty($request->user) && $request->user !== 'all', function ($query) use ($request) {
                    return $query->where('carts.user_id', $request->user);
                })

                ->when(!empty($request->product) && $request->product !== 'all', function ($query) use ($request) {
                    return $query->whereHas('cart_items', function ($q) use ($request) {
                        $q->where('product_id', $request->product);
                    });
                })
                ->get()
                ->values();

            return response()->json([
                'data' => $Invoice,
                'customer' => $customer,
                'user' => $user,
                'product' => $product
            ], 200);
        } else if ($request->type == "Payment Types by User") {
            $paymentTypes = User::with(['carts' => function ($query) use ($request, $start, $end) {
                if (!empty($request->customer) && $request->customer !== 'all') {
                    if ($request->customer == '1') {
                        $query->whereNull('carts.customer_id');
                    } else {
                        $query->where('carts.customer_id', $request->customer);
                    }
                }
                if (!empty($request->user) && $request->user !== 'all') {
                    $query->where('carts.user_id', $request->user);
                }
                $query->whereBetween('created_at', [$start, $end])
                    ->whereNotNull('payment_type');
            }])->get()
                ->map(function ($user) {
                    $byPaymentType = $user->carts
                        ->groupBy('payment_type')
                        ->map(function ($group, $type) {
                            return [
                                'type' => $type,
                                'count' => $group->count(),
                                'total_amount' => $group->sum('total_price'),
                            ];
                        })
                        ->values();

                    return [
                        'user_id' => $user->id,
                        'user_name' => $user->name,
                        'payment_types' => $byPaymentType
                    ];
                })
                ->filter(fn($u) => $u['payment_types']->isNotEmpty())
                ->values();


            return response()->json([
                'data' => $paymentTypes,
                'customer' => $customer,
                'user' => $user,
                'product' => $product
            ], 200);
        } else if ($request->type == "Profit and Margin") {

            $baseCartItemsQuery = function ($shopConditionCallback) use ($start, $end, $request) {
                return CartItem::select(
                    'product_id',
                    DB::raw('SUM(quantity) as quantity'),
                    DB::raw('SUM(cost) as cost'),
                    DB::raw('SUM(profit) as profit'),
                    DB::raw('SUM(total) as sales'),
                    DB::raw('SUM(discount) as discount'),

                )
                    ->whereBetween('cart_items.created_at', [$start, $end])
                    ->when(!empty($request->customer) && $request->customer !== 'all', function ($query) use ($request) {
                        if ($request->customer == '1') {
                            $query->whereHas('cart', function ($q) {
                                $q->whereNull('customer_id');
                            });
                        } else {
                            $query->whereHas('cart.customer', function ($q) use ($request) {
                                $q->where('id', $request->customer);
                            });
                        }
                    })
                    ->when(!empty($request->user) && $request->user !== 'all', function ($query) use ($request) {
                        $query->whereHas('cart', function ($q) use ($request) {
                            $q->where('user_id', $request->user);
                        });
                    })
                    ->when(!empty($request->product) && $request->product !== 'all', function ($query) use ($request) {
                        $query->where('product_id', $request->product);
                    })
                    ->when(!empty($request->category) && $request->category !== 'all', function ($query) use ($request) {
                        $query->whereHas('product', function ($q) use ($request) {
                            $q->where('category_id', $request->category);
                        });
                    })
                    ->whereHas('cart', $shopConditionCallback)
                    ->groupBy('product_id')
                    ->with(['product:id,name'])
                    ->get()
                    ->map(function ($item) {
                        $margin = $item->sales > 0
                            ? round(($item->profit / $item->sales) * 100, 2)
                            : 0;

                        return [
                            'code' => $item->product_id,
                            'product' => $item->product->name ?? 'N/A',
                            'quantity' => $item->quantity,
                            'cost' => $item->cost,
                            'sales' => $item->sales,
                            'profit' => $item->profit,
                            'discount' => $item->discount,
                            'margin' => $margin . '%',
                        ];
                    });
            };

            // Generate each cart item collection with specific cart condition
            $cart_items_store = $baseCartItemsQuery(function ($q) {
                $q->where([
                    ['is_credit', '<>', 'true'],
                    ['shop', '=', 'Store'],
                    ['status', '=', 'Paid']
                ]);
            });

            $cart_items_shopee = $baseCartItemsQuery(function ($q) {
                $q->where([
                    ['is_credit', '<>', 'true'],
                    ['shop', '=', 'Shopee'],
                    ['status', '=', 'Paid']
                ]);
            });

            $cart_items_credit = $baseCartItemsQuery(function ($q) {
                $q->where([
                    ['is_credit', '=', 'true'],
                    ['status', '=', 'Paid']
                ]);
                $q->orWhere([
                    ['is_credit', '=', 'true'],
                    ['status', '=', 'Pending']
                ]);
                $q->orWhere([
                    ['is_credit', '=', 'true'],
                    ['status', '=', 'Partial']
                ]);
            });

            // Get expenses for the period
            $expenses = Expense::where(function ($query) use ($start, $end) {
                $query->whereBetween('date', [$start->toDateString(), $end->toDateString()])
                    ->orWhereBetween('date', [$start, $end]);
            })
                ->get()
                ->map(function ($expense) {
                    return [
                        'category' => $expense->category ?? 'N/A',
                        'item' => $expense->item ?? 'N/A',
                        'date' => $expense->date ?? 'N/A',
                        'total_cost' => (float)$expense->cost * (float)$expense->qty,
                        'total_qty' => (float)$expense->qty,
                    ];
                })
                ->groupBy(function ($item) {
                    return $item['category'] . '|' . $item['item'];
                })
                ->map(function ($expenseGroup) {
                    $first = $expenseGroup->first();
                    return [
                        'category' => $first['category'],
                        'item' => $first['item'],
                        'date' => $first['date'],
                        'total_cost' => $expenseGroup->sum('total_cost'),
                        'total_qty' => $expenseGroup->sum('total_qty'),
                    ];
                })
                ->values();

            // Final response
            return response()->json([
                'data' => [
                    'store' => $cart_items_store,
                    'shopee' => $cart_items_shopee,
                    'credit' => $cart_items_credit,
                    'expenses' => $expenses,
                ],
                'customer' => $customer,
                'user' => $user,
                'product' => $product,
            ], 200);
        } else if ($request->type == "Purchase by Product") {
            $productSales = CartItem::with(['product:id,name', 'cart.customer:id'])
                ->whereBetween('created_at', [$start, $end])
                ->when(!empty($request->customer) && $request->customer !== 'all', function ($query) use ($request) {
                    if ($request->customer == '1') {
                        $query->whereHas('cart', function ($q) {
                            $q->whereNull('customer_id');
                        });
                    } else {
                        $query->whereHas('cart.customer', function ($q) use ($request) {
                            $q->where('id', $request->customer);
                        });
                    }
                })

                ->when(!empty($request->supplier) && $request->supplier !== 'all', function ($query) use ($request) {
                    $query->whereHas('product', function ($q) use ($request) {
                        $q->where('supplier_id', $request->supplier);
                    });
                })
                // ->when(!empty($request->user) && $request->user !== 'all', function ($query) use ($request) {
                //     $query->whereHas('cart', function ($q) use ($request) {
                //         $q->where('user_id', $request->user);
                //     });
                // })
                ->when(!empty($request->product) && $request->product !== 'all', function ($query) use ($request) {
                    $query->where('product_id', $request->product);
                })
                ->when(!empty($request->category) && $request->category !== 'all', function ($query) use ($request) {
                    $query->whereHas('product', function ($q) use ($request) {
                        $q->where('category_id', $request->category);
                    });
                })
                ->get()
                ->groupBy('product_id')
                ->filter(fn($items) => optional($items->first()->product)->name !== null)
                ->map(function ($items) {
                    $firstItem = $items->first();
                    $product = optional($firstItem->product);

                    $totalQuantity = $items->sum('quantity');
                    $totalSales = $items->sum(fn($item) => $item->quantity * $item->price);

                    return [
                        'product_id' => $firstItem->product_id,
                        'product_name' => $product->name ?? 'Unknown',
                        'total_quantity' => $totalQuantity,
                        'total_sales' => $totalSales,
                    ];
                })
                ->sortByDesc('total_sales')
                ->values();

            return response()->json([
                'data' => $productSales,
                'customer' => $customer,
                'user' => $user,
                'product' => $product
            ], 200);
        } else if ($request->type == "Purchase by Supplier") {
            $cart_items = CartItem::select(
                'product_id',
                DB::raw('SUM(quantity) as quantity'),
                DB::raw('SUM(cost) as cost'),
                DB::raw('SUM(profit) as profit'),
                DB::raw('SUM(fixed_price * quantity) as total')
            )
                ->whereBetween('created_at', [$start, $end])
                ->when(!empty($request->customer) && $request->customer !== 'all', function ($query) use ($request) {
                    if ($request->customer == '1') {
                        $query->whereHas('cart', function ($q) {
                            $q->whereNull('customer_id');
                        });
                    } else {
                        $query->whereHas('cart.customer', function ($q) use ($request) {
                            $q->where('id', $request->customer);
                        });
                    }
                })
                ->when(!empty($request->user) && $request->user !== 'all', function ($query) use ($request) {
                    $query->whereHas('cart', function ($q) use ($request) {
                        $q->where('user_id', $request->user);
                    });
                })
                ->when(!empty($request->product) && $request->product !== 'all', function ($query) use ($request) {
                    $query->where('product_id', $request->product);
                })
                ->when(!empty($request->category) && $request->category !== 'all', function ($query) use ($request) {
                    $query->whereHas('product', function ($q) use ($request) {
                        $q->where('category_id', $request->category);
                    });
                })


                ->groupBy('product_id')
                ->with(['product' => function ($query) {
                    $query->select('id', 'name', 'supplier_id');
                }])
                ->get()
                ->map(function ($item) {
                    $margin = $item->total > 0
                        ? round(($item->profit / $item->total) * 100, 2)
                        : 0;

                    return [
                        'product' => $item->product ?? 'N/A',
                        'cost' => $item->cost,
                        'total' => $item->total,
                        'profit' => $item->profit,
                    ];
                });

            return response()->json([
                'data' => $cart_items,
                'customer' => $customer,
                'user' => $user
            ], 200);


            return response()->json([
                'data' => $cart_items,
                'customer' => $customer,
                'user' => $user,
                'product' => $product
            ], 200);
        } else if ($request->type == "Purchase Invoices") {
            $purchaseInvoice = CartItem::with(['product'])
                ->whereBetween('created_at', [$start, $end])
                ->when(!empty($request->customer) && $request->customer !== 'all', function ($query) use ($request) {
                    if ($request->customer == '1') {
                        $query->whereHas('cart', function ($q) {
                            $q->whereNull('customer_id');
                        });
                    } else {
                        $query->whereHas('cart.customer', function ($q) use ($request) {
                            $q->where('id', $request->customer);
                        });
                    }
                })
                ->when(!empty($request->user) && $request->user !== 'all', function ($query) use ($request) {
                    $query->whereHas('cart', function ($q) use ($request) {
                        $q->where('user_id', $request->user);
                    });
                })
                ->when(!empty($request->product) && $request->product !== 'all', function ($query) use ($request) {
                    $query->where('product_id', $request->product);
                })
                ->when(!empty($request->category) && $request->category !== 'all', function ($query) use ($request) {
                    $query->whereHas('product', function ($q) use ($request) {
                        $q->where('category_id', $request->category);
                    });
                })

                ->get()
                ->groupBy('product_id')
                ->map(function ($items) {
                    $totalQuantity = $items->first()->product->sum('quantity');
                    $totalSales = $items->sum(function ($item) {
                        return $item->product->quantity * $item->product->cost;
                    });
                    $totalCost = $items->first()->product->quantity * $items->first()->product->cost;

                    return [
                        'id' => $items->first()->product->id,
                        'product_id' => $items->first()->product_id,
                        'product_name' => $items->first()->product->name ?? 'Unknown',
                        'delivery_receipt_no' => $items->first()->product->delivery_receipt_no,
                        'supplier_name' => $items->first()->product->supplier->name ?? 'Unknown',
                        'date' => $items->first()->product->created_at,
                        'cost' => $totalCost,
                        'total_quantity' => $totalQuantity,
                        'total' => $totalSales,
                    ];
                })
                ->values();

            return response()->json([
                'data' => $purchaseInvoice,
                'customer' => $customer,
                'user' => $user,
                'product' => $product
            ], 200);
        } else if ($request->type == "Sales By Payment Types") {
            $carts = DB::table('carts')
                ->select(
                    DB::raw('DATE(created_at) as date'),
                    'payment_type',
                    DB::raw('SUM(total_price) as total_sales'),
                    DB::raw('COUNT(*) as total_transactions')
                )
                ->when(!empty($request->customer) && $request->customer !== 'all', function ($query) use ($request) {
                    return $request->customer == '1'
                        ? $query->whereNull('carts.customer_id')
                        : $query->where('carts.customer_id', $request->customer);
                })
                ->when(!empty($request->user) && $request->user !== 'all', function ($query) use ($request) {
                    return $query->where('carts.user_id', $request->user);
                })
                ->whereBetween('created_at', [$start, $end])
                // ->whereNotNull('payment_type')
                ->groupBy(DB::raw('DATE(created_at)'), 'payment_type')
                ->orderBy('date', 'asc')
                ->orderByDesc('total_sales')
                ->get();
            return response()->json([
                'data' => $carts,
                'customer' => $customer,
                'user' => $user,
                'product' => $product
            ], 200);
        } else if ($request->type == "Sales By Product") {
            $sales_by_product = DB::table('cart_items')
                ->join('products', 'cart_items.product_id', '=', 'products.id')
                ->join('carts', 'cart_items.cart_id', '=', 'carts.cart_id')
                ->leftJoin('customers', 'carts.customer_id', '=', 'customers.id')
                ->when(!empty($request->customer) && $request->customer !== 'all', function ($query) use ($request) {
                    if ($request->customer == '1') {
                        $query->whereNull('carts.customer_id');
                    } else {
                        $query->where('carts.customer_id', $request->customer);
                    }
                })
                ->when(!empty($request->user) && $request->user !== 'all', function ($query) use ($request) {
                    $query->where('carts.user_id', $request->user);
                })
                ->when(!empty($request->product) && $request->product !== 'all', function ($query) use ($request) {
                    $query->where('cart_items.product_id', $request->product);
                })
                ->when(!empty($request->category) && $request->category !== 'all', function ($query) use ($request) {
                    $query->where('products.category_id', $request->category);
                })
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

            return response()->json([
                'data' => $sales_by_product,
                'customer' => $customer,
                'user' => $user,
                'product' => $product
            ], 200);
        } else if ($request->type == "Unpaid Sales") {
            $unpaidCartsQuery = Customer::with(['carts' => function ($query) use ($start, $end, $request) {
                $query->whereBetween('created_at', [$start, $end])
                    ->where('is_credit', 'true')
                    ->whereIn('status', ['Partial', 'Pending'])
                    ->when(!empty($request->product) && $request->product !== 'all', function ($q) use ($request) {
                        $q->whereHas('cart_items', function ($q2) use ($request) {
                            $q2->where('product_id', $request->product);
                        });
                    })
                    ->when(!empty($request->category) && $request->category !== 'all', function ($q) use ($request) {
                        $q->whereHas('cart_items.product', function ($q2) use ($request) {
                            $q2->where('category_id', $request->category);
                        });
                    });
            }]);

            // Filter customers if needed
            if (!empty($request->customer) && $request->customer !== 'all') {
                if ($request->customer == '1') {
                    $unpaidCartsQuery->whereDoesntHave('carts', function ($q) {
                        $q->whereNotNull('customer_id');
                    });
                } else {
                    $unpaidCartsQuery->where('id', $request->customer);
                }
            }

            $unpaidCarts = $unpaidCartsQuery->get()
                ->filter(fn($customer) => $customer->carts->isNotEmpty())
                ->values();

            return response()->json([
                'data' => $unpaidCarts,
                'customer' => $customer,
                'user' => $user,
                'product' => $product
            ], 200);
        } else if ($request->type == "Payment Types by Customer") {
            if (!empty($request->customer) && $request->customer === '1') {
                // Anonymous carts (no customer_id)
                $carts = Cart::whereNull('customer_id')
                    ->whereBetween('created_at', [$start, $end])
                    ->whereNotNull('payment_type')
                    ->get();

                $byPaymentType = $carts
                    ->groupBy('payment_type')
                    ->map(function ($group, $type) {
                        return [
                            'type' => $type,
                            'count' => $group->count(),
                            'total_amount' => $group->sum(fn($item) => $item->total_price ?? 0),
                        ];
                    })
                    ->values();

                $paymentTypes = [
                    [
                        'customer_id' => null,
                        'customer_name' => 'Walk-In Customer',
                        'payment_types' => $byPaymentType,
                    ]
                ];
            } else {
                // Carts for specific customer(s)
                $paymentTypesQuery = Customer::with(['carts' => function ($query) use ($start, $end) {
                    $query->whereBetween('created_at', [$start, $end])
                        ->whereNotNull('payment_type');
                }]);

                if (!empty($request->customer) && $request->customer !== 'all') {
                    $paymentTypesQuery->where('id', $request->customer);
                }

                $paymentTypes = $paymentTypesQuery->get()
                    ->map(function ($customer) {
                        $byPaymentType = $customer->carts
                            ->groupBy('payment_type')
                            ->map(function ($group, $type) {
                                return [
                                    'type' => $type,
                                    'count' => $group->count(),
                                    'total_amount' => $group->sum(fn($item) => $item->total_price ?? 0),
                                ];
                            })
                            ->values();

                        return [
                            'customer_id' => $customer->id,
                            'customer_name' => $customer->name,
                            'payment_types' => $byPaymentType,
                        ];
                    })
                    ->filter(fn($item) => $item['payment_types']->isNotEmpty())
                    ->values();
            }

            return response()->json([
                'data' => $paymentTypes,
                'customer' => $customer,
                'user' => $user,
                'product' => $product,
            ]);
        } else if ($request->type == 'Expenses') {
            $expenses = Expense::where(function ($query) use ($start, $end) {
                $query->whereBetween('date', [$start->toDateString(), $end->toDateString()])
                    ->orWhereBetween('date', [$start, $end]);
            })
                ->get();
            return response()->json([

                'data' => $expenses,
                'customer' => $customer,
                'user' => $user,
                'product' => $product,
            ]);
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
            $query->where(function ($q) use ($request) {
                $q->where('cart_id', 'like', '%' . $request->search . '%')
                    ->orWhereHas('customer', function ($customerQuery) use ($request) {
                        $customerQuery->where('name', 'like', '%' . $request->search . '%');
                    });
            });
        }

        $carts = $query->paginate(10);

        return response()->json($carts, 200);
    }


    public function update_users_notifications()
    {

        $query = Cart::where('due_date', '<', Carbon::now())
            ->whereIn('status', ['Pending', 'Partial'])
            ->with(['customer']);

        $over_due = $query->get();

        $out_stocks = Product::where('quantity', 0)
            ->notSoftDeleted()
            ->get()
            ->map(function ($product) {
                $product->stock_status = 'Out of Stock';
                return $product;
            });

        $stocks = Product::whereBetween('quantity', [1, 10])
            ->notSoftDeleted()
            ->get()
            ->map(function ($product) {
                $product->stock_status = 'Low Stock';
                return $product;
            });

        $users = User::all();
        foreach ($users as $key => $user) {
            // Handle out of stock notifications
            foreach ($out_stocks as $key => $value) {
                $notif = Notification::where([
                    ['user_id', '=', $user->id],
                    ['cp_id', '=', $value->id],
                    ['type', '=', 'product'],
                    ['status', '=', 'out_stocks'],
                ])->whereDate('date', Carbon::now()->toDateString())->first();

                if (!$notif) {
                    Notification::create([
                        'user_id' => $user->id,
                        'cp_id' => $value->id,
                        'type' => "product",
                        'status' => "out_stocks",
                        'date' => Carbon::now(),
                        'is_read' => "false",
                    ]);
                }
            }

            // Handle low stock notifications
            foreach ($stocks as $key => $value) {
                $notif = Notification::where([
                    ['user_id', '=', $user->id],
                    ['cp_id', '=', $value->id],
                    ['type', '=', 'product'],
                    ['status', '=', 'low_stock'],
                ])->whereDate('date', Carbon::now()->toDateString())->first();

                if (!$notif) {
                    Notification::create([
                        'user_id' => $user->id,
                        'cp_id' => $value->id,
                        'type' => "product",
                        'status' => "low_stock",
                        'date' => Carbon::now(),
                        'is_read' => "false",
                    ]);
                }
            }

            // Handle overdue notifications
            foreach ($over_due as $key => $value) {
                $notif = Notification::where([
                    ['user_id', '=', $user->id],
                    ['cp_id', '=', $value->id],
                    ['type', '=', 'cart'],
                    ['status', '=', 'over_due'],
                ])->whereDate('date', Carbon::now()->toDateString())->first();

                if (!$notif) {
                    Notification::create([
                        'user_id' => $user->id,
                        'cp_id' => $value->id,
                        'type' => "cart",
                        'status' => "over_due",
                        'date' => Carbon::now(),
                        'is_read' => "false",
                    ]);
                }
            }
        }

        return response()->json('success', 200);
    }
    public function get_over_due(Request $request)
    {
        $today = Carbon::now('Asia/Manila')->toDateString();
        $query = Cart::where('due_date', '<', Carbon::now())
            ->whereIn('status', ['Pending', 'Partial'])
            ->with(['customer']);

        // Optional search filter by cart ID
        if ($request->filled('search')) {
            $query->where('cart_id', $request->search);
        }

        $over_due = $query->get();

        $stocks = Product::whereBetween('quantity', [1, 10])
            ->notSoftDeleted()
            ->get()
            ->map(function ($product) {
                $product->stock_status = 'Low Stock';
                return $product;
            });



        $out_stocks = Product::where('quantity', 0)
            ->notSoftDeleted()
            ->get()
            ->map(function ($product) {
                $product->stock_status = 'Out of Stock';
                return $product;
            });




        $today = Carbon::now('Asia/Manila')->toDateString();



        $current_sales = CartItem::whereDate('created_at', $today)
            ->whereHas('cart', function ($query) {
                $query->where('status', 'Paid');
            })
            ->sum('total');

        $current_profit = CartItem::whereDate('created_at', $today)
            ->whereHas('cart', function ($query) {
                $query->where('status', 'Paid');
            })
            ->sum('profit');


        $total_sales = CartItem::whereHas('cart', function ($query) {
            $query->where('status', 'Paid');
        })->sum('total');

        $total_profit = CartItem::whereHas('cart', function ($query) {
            $query->where('status', 'Paid');
        })->sum('profit');

        $total_cost = CartItem::whereHas('cart', function ($query) {
            $query->where('status', 'Paid');
        })->sum('cost');

        $current_credit = Cart::whereDate('created_at', $today)
            ->whereIn('status', ['Pending', 'Partial'])
            ->where('is_credit', 'true')
            ->sum('total_price');


        $total_credit = Cart::where('is_credit', '=', 'true')
            ->whereIn('status', ['Pending', 'Partial'])
            ->sum('total_price');

        $due_date_today = Cart::whereDate('due_date', $today)
            ->whereIn('status', ['Pending', 'Partial'])
            ->with('customer')
            ->count();

        $over_due = Cart::whereDate('due_date', '<', Carbon::today())
            ->whereIn('status', ['Pending', 'Partial'])
            ->with('customer')->count();

        $low_stock = Product::whereBetween('quantity', [1, 10])
            ->notSoftDeleted()
            ->count();

        $out_of_stock = Product::where('quantity', 0)
            ->notSoftDeleted()
            ->count();
        $userAuth = Auth::user();
        $total_overall_inventory_retail_price = Product::selectRaw('SUM(quantity * srp) as total')
            ->notSoftDeleted()
            ->value('total');

        $total_overall_inventory_capital = Product::selectRaw('SUM(quantity * cost) as total')
            ->value('total');

        $current_expenses = Expense::whereDate('created_at', $today)
            ->selectRaw('SUM(cost * qty) as total')
            ->value('total');

        $total_expenses = Expense::selectRaw('SUM(cost * qty) as total')
            ->value('total');
        $notification = Notification::where('user_id', $userAuth->id)->with(['cart', 'product'])->orderBy('id', 'desc')
            ->limit(200)->get();

        return response()->json([
            'notification' => $notification, //
            'over_due' => $over_due, //
            'stocks' => $stocks, //
            'out_stocks' => $out_stocks, //
            'dashboard' => [
                'current_sales' => $current_sales,
                'total_cost' => $total_cost,
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

                'current_expenses' => $current_expenses,
                'total_expenses' => $total_expenses,
            ]
        ], 200);
    }



    public function get_shopee(Request $request)
    {

        $carts = Cart::where('shop', 'Shopee')->with(['cart_items', 'credit_payments']);
        if ($request->filled('search')) {
            $carts->where(function ($query) use ($request) {
                $query->where('cart_id', 'like', '%' . $request->search . '%')
                    ->orWhere('customer', 'like', '%' . $request->search . '%')
                    ->orWhere('order_id', 'like', '%' . $request->search . '%')
                    ->orWhere('status', 'like', '%' . $request->search . '%');
            });
        }

        $carts->orderBy('id', 'desc');

        return response()->json($carts->paginate(10), 200);
    }

    public function get_sales(Request $request)
    {

        $carts = Cart::where([
            ['shop', 'Store'],
            ['is_credit', '<>', 'true']
        ])->with(['cart_items', 'credit_payments', 'customer']);
        if ($request->filled('search')) {
            $carts->where(function ($query) use ($request) {
                $query->where('cart_id', 'like', '%' . $request->search . '%')
                    ->orWhere('customer', 'like', '%' . $request->search . '%')
                    ->orWhere('order_id', 'like', '%' . $request->search . '%')
                    ->orWhere('status', 'like', '%' . $request->search . '%');
            });
        }

        $carts->orderBy('id', 'desc');

        return response()->json($carts->paginate(10), 200);
    }


    public function get_cart_credit(Request $request)
    {

        $carts = Cart::where('is_credit', 'true')->orderBy('id', 'desc')->with(['customer', 'cart_items', 'credit_payments']);
        if ($request->filled('search')) {
            $carts->where(function ($query) use ($request) {
                $query->where('cart_id', 'like', '%' . $request->search . '%')
                    ->orWhere('status', 'like', '%' . $request->search . '%')
                    ->orWhereHas('customer', function ($q) use ($request) {
                        $q->where('name', 'like', '%' . $request->search . '%');
                    });
            });
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

        $cart = Cart::where('cart_id', $request->cart_id ?? $cart_id)->first();
        if ($cart) {
            $cart->update([
                'sub_total' => $cart->sub_total + $request->sub_total,
                // 'customer_total_discount' => $request->customer_total_discount,
                'discount_per_item' => $cart->discount_per_item + $request->total_item_discount,
                'discount_per_order' => $cart->discount_per_order + $request->discount_per_order,
                'total_price' => $cart->total_price + $request->total_price,
                'customer_amount' => $cart->customer_amount +  $request->customer_amount,
                'change' => $cart->change +  $request->change,
                'balance' => $request->is_credit == 'true' ? $cart->total_price + $request->total_price : '0',
            ]);
        } else {
            $cart =  Cart::create([
                'cart_id' => $request->cart_id ?? $cart_id,
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
                'shopee_store' => $request->shopee_store,
                'balance' => $request->is_credit == 'true' ? $request->total_price : '0',
            ]);
        }

        $split_discount = $request->discount_per_order / count($request->cart_items);
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

            CartItem::create([
                'cart_id' => $request->cart_id ?? $cart->cart_id,
                'product_id' => $item['id'],
                'discount' => $discount + $split_discount,
                'customer_discount' => $customer_discount * $quantity,
                'pricing_type' => $pricing_type,
                'quantity' => $quantity,
                'cost' => $item['cost'] * $quantity,
                'profit' => ($price * $quantity) - ($discount + $split_discount) - ($item['cost'] * $quantity),
                'price' => $price,
                'fixed_price' => (($price * $quantity) - ($discount + $split_discount))  / $quantity,
                'total' => ($price * $quantity) - ($discount + $split_discount),
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

    public function update_customer(Request $request, $id)
    {
        $cart = Cart::where('id', $request->id)->first();

        if ($cart) {
            $cart->update([
                'customer_id' => $request->customer_id,
            ]);
        }

        // Optional: return a response
        return response()->json(['message' => 'Cart updated successfully']);
    }
}
