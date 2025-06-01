<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function index()
    {
        $suppliers = Supplier::get();
        return response()->json([
            'result' => $suppliers
        ], 200);
    }

    public function store(Request $request)
    {
        Supplier::create($request->all());
        return response()->json([
            'response' => 'success',
        ], 200);
    }

    public function destroy($id)
    {
        $supplier = Supplier::where('id', $id)->first();
        if ($supplier) {
            $supplier->delete();
        }

        return response()->json(['message' => 'Supplier deleted successfully']);
    }
}
