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
                'status' => ($cart->balance - $request->amount == 0) ? 'Paid' : 'Partial',
                'balance' => $cart->balance - $request->amount,
                'due_date' => $request->due_date,
            ]);
        }
        return response()->json('success', 200);
    }

    public function destroy($id)
    {
        $creditPayment = CreditPayment::where('id', $id)->first();
        
        if (!$creditPayment) {
            return response()->json(['error' => 'Credit payment not found'], 404);
        }

        $cartId = $creditPayment->cart_id;
        $paymentAmount = $creditPayment->amount;

        $creditPayment->delete();

        $cart = Cart::where('cart_id', $cartId)->first();
        if ($cart) {
            $newBalance = $cart->balance + $paymentAmount;
            
            if ($newBalance <= 0) {
                $newStatus = 'Paid'; 
            } else if ($newBalance < $cart->total_price) {
                $newStatus = 'Partial'; 
            } else {
                $newStatus = 'Pending'; 
            }

            $cart->update([
                'status' => $newStatus,
                'balance' => $newBalance,
            ]);
        }

        return response()->json(['message' => 'Credit payment deleted successfully']);
    }
}
