<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{

    public function index(Request $request)
    {
        $expenses = Expense::orderBy('id', 'desc');

        if ($request->filled('search')) {
            if ($request->search === 'N/A') {
                // Search for null values in category field
                $expenses->where(function ($query) {
                    $query->whereNull('category')
                          ->orWhere('category', '');
                });
            } else {
                $expenses->where(function ($query) use ($request) {
                    $query->where('item', 'like', '%' . $request->search . '%')
                          ->orWhere('category', 'like', '%' . $request->search . '%');
                });
            }
        }

        return response()->json([
            'result' => $expenses->paginate(10)
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

    public function destroy($id)
    {
        $expense = Expense::where('id', $id)->first();
        if ($expense) {
            $expense->delete();
        }

        return response()->json(['message' => 'Expense deleted successfully']);
    }
}
