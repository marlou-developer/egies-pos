<?php

namespace App\Http\Controllers;

use App\Models\ExpenseCategory;
use Illuminate\Http\Request;

class ExpenseCategoryController extends Controller
{
    public function index()
    {
        $expense_category = ExpenseCategory::get();
        return response()->json([
            'result' => $expense_category
        ], 200);
    }

    public function store(Request $request)
    {
        ExpenseCategory::create($request->all());
        return response()->json([
            'response' => 'success',
        ], 200);
    }

    public function show($id)
    {
        $expense_category = ExpenseCategory::where('id', $id)->first();

        if (!$expense_category) {
            return response()->json([
                'status' => false,
                'message' => 'ExpenseCategory not found'
            ], 404);
        }

        return response()->json([
            'status' => $expense_category,
            'data' => $expense_category,
        ], 200);
    }


    public function update(Request $request,  $id)
    {
        $expense_category = ExpenseCategory::where('id', $id)->first();
        if ($expense_category) {
            $expense_category->update($request->all());
        }
    }

    public function destroy(ExpenseCategory $expense_category)
    {
        $expense_category->delete();
        return response()->json(['message' => 'ExpenseCategory deleted successfully']);
    }
}
