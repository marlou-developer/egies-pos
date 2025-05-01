<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::get();
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
}
