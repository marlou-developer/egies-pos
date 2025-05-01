<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Upload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::get();

        foreach ($products as $product) {
            if ($product->quantity == 0) {
                $product->status = 'Out of Stock';
            } elseif ($product->quantity >= 1 && $product->quantity <= 10) {
                $product->status = 'Low Stock';
            } else {
                $product->status = 'In Stock';
            }
        }

        return response()->json([
            'result' => $products
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id',
            'quantity' => 'nullable|string',
            'status' => 'nullable|string',
            'cost' => 'nullable|string',
            'srp' => 'nullable|string',
            'reseller' => 'nullable|string',
            'city_distributor' => 'nullable|string',
            'district_distributor' => 'nullable|string',
            'provincial_distributor' => 'nullable|string',
        ]);

        $product = Product::create($request->only([
            'name',
            'category_id',
            'quantity',
            'status',
            'cost',
            'srp',
            'reseller',
            'city_distributor',
            'district_distributor',
            'provincial_distributor',
        ]));

        $this->handleFileUploads($request, 'uploads', $product);

        return response()->json([
            'status' => 'success',
            'data' => $product,
        ], 200);
    }

    private function handleFileUploads(Request $request, string $fileType, Product $product)
    {
        if ($request->hasFile($fileType)) {
            $files = $request->file($fileType);
            foreach ($files as $file) {
                // Store the file in S3
                $path = $file->store('Personal-' . date("Y"), 's3'); // Store in year-based folder
                $url = Storage::disk('s3')->url($path); // Get file URL from S3

                // Save file information in the FileUpload model
                Upload::create([
                    'product_id' => $product->id, // Link the file to the application using its ID
                    'file' => $url, // Save the file URL
                ]);
            }
        }
    }
}
