<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with('products')->get();
        return response()->json([
            'result' => $categories
        ], 200);
    }

    public function store(Request $request)
    {
        Category::create($request->all());
        return response()->json([
            'response' => 'success',
        ], 200);
    }

    public function show($id)
    {
        $category = Category::where('id', $id)->first();

        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Category not found'
            ], 404);
        }

        return response()->json([
            'status' => $category,
            'data' => $category,
        ], 200);
    }


    public function update(Request $request,  $id)
    {
        $category = Category::where('id', $id)->first();
        if ($category) {
            $category->update($request->all());
        }
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json(['message' => 'Category deleted successfully']);
    }
}
