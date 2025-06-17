<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{

    public function index()
    {
        $expenses = Expense::get();
        return response()->json([
            'result' => $expenses
        ], 200);
    }
 
    public function search_customer(Request $request)
    {
        $search = $request->input('search');

        $results = [];
        if (!empty($search)) {
            $results = Expense::where('item', 'like', '%' . $search . '%')->get();
        }

        return response()->json($results);
    }

    public function store(Request $request)
    {
        Expense::create($request->all());
        return response()->json([
            'response' => 'success',
        ], 200);
    }

    public function update(Request $request,  $id)
    {
        $expense = Expense::where('id', $id)->first();
        if ($expense) {
            $expense->update($request->all());
        }
    }
}
