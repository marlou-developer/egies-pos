<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::with('customer_ids')->get();
        return response()->json([
            'result' => $customers
        ], 200);
    }

    public function store(Request $request)
    {
        Customer::create($request->all());
        return response()->json([
            'response' => 'success',
        ], 200);
    }
}
