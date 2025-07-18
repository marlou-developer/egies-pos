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
            $results = Customer::where('name', 'like', '%' . $search . '%')->with(['discounts'])->get();
        }

        return response()->json($results);
    }

    public function index(Request $request)
    {
        $query = Customer::with(['customer_ids'])->orderBy('created_at', 'desc');

        if ($request->filled('brgy') && $request->brgy !== 'undefined') {
            $query->where('brgy', $request->brgy);
        }

        if ($request->filled('name') && $request->name !== 'undefined') {
            $query->where('name', $request->name);
        }
        if ($request->filled('city') && $request->city !== 'undefined') {
            $query->where('city', $request->city);
        }
        if ($request->filled('province') && $request->province !== 'undefined') {
            $query->where('province', $request->province);
        }
        if ($request->filled('email') && $request->email !== 'undefined') {
            $query->where('email', $request->email);
        }

        // Add search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                  ->orWhere('email', 'like', '%' . $search . '%')
                  ->orWhere('mobile_no', 'like', '%' . $search . '%')
                  ->orWhere('street', 'like', '%' . $search . '%')
                  ->orWhere('brgy', 'like', '%' . $search . '%')
                  ->orWhere('city', 'like', '%' . $search . '%')
                  ->orWhere('province', 'like', '%' . $search . '%');
            });
        }

        // Paginate the results
        $perPage = $request->input('per_page', 10);
        $customers = $query->paginate($perPage);

        return response()->json($customers, 200);
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
