<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{

    public function search_customer(Request $request)
    {
        $search = $request->input('search');

        $results = [];
        if (!empty($search)) {
            $results = Customer::where('name', 'like', '%' . $search . '%')->with(['discount'])->get();
        }

        return response()->json($results);
    }

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

    public function update(Request $request,  $id)
    {
        $customer = Customer::where('id', $id)->first();
        if ($customer) {
            $customer->update($request->all());
        }
    }
}
