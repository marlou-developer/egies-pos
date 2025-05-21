<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CreditPayment;
use Illuminate\Http\Request;

class CreditPaymentController extends Controller
{
    public function store(Request $request)
    {

        $cp = CreditPayment::create([
            'cart_id' => $request->cart_id,
            'amount' => $request->amount,
            'payment_type' => $request->payment_type,
        ]);
        $cart =  Cart::where('cart_id', $cp->cart_id)->first();
        if ($cart) {
            $cart->update([
                'status'=>'Partial',
                'balance' => $cart->balance - $request->amount
            ]);
        }
        return response()->json('success', 200);
    }
}
