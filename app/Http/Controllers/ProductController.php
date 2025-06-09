<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Upload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{

   
    public function index(Request $request)
    {
        $query = Product::with(['categories', 'uploads', 'stocks'])
            ->orderBy('created_at', 'asc');

        if ($request->search) {
            if ($request->search === 'In Stock') {
                $query->where('quantity', '>=', 10);
            } elseif ($request->search === 'Low Stock') {
                $query->whereBetween('quantity', [1, 9]);
            } elseif ($request->search === 'Out of Stock') {
                $query->where('quantity', '<=', 0);
            } else {
                $query->where(function ($q) use ($request) {
                    $q->where('id', $request->search)
                        ->orWhere('name', 'like', '%' . $request->search . '%')
                        ->orWhere('brand', 'like', '%' . $request->search . '%')
                        ->orWhere('delivery_receipt_no', 'like', '%' . $request->search . '%')
                        ->orWhereHas('categories', function ($catQuery) use ($request) {
                            $catQuery->where('name', 'like', '%' . $request->search . '%');
                        });
                });
            }
        }



        if ($request->filled('category_id') && $request->category_id !== 'undefined') {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('name') && $request->name !== 'undefined') {
            $query->where('name', $request->name);
        }
        if ($request->filled('delivery_receipt_no') && $request->delivery_receipt_no !== 'undefined') {
            $query->where('delivery_receipt_no', $request->delivery_receipt_no);
        }

        if ($request->filled('quantity') && $request->quantity !== 'undefined') {
            $quantity = (int) $request->quantity;
            if ($quantity === 0) {
                $query->where('quantity', 0);
            } elseif ($quantity <= 10) {
                $query->whereBetween('quantity', [1, 10]);
            } elseif ($quantity >= 11) {
                $query->where('quantity', '>=', 11);
            }
        }



        return response()->json([
            'all' => $query->get(),
            'data' => $query->paginate(10),
        ], 200);
    }




    public function store(Request $request)
    {
        $data =  $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'nullable|string',
            'quantity' => 'nullable|string',
            'barcode' => 'nullable',
            'brand' => 'nullable|string',
            'cost' => 'nullable|string',
            'srp' => 'nullable|string',
            'shopee' => 'nullable|string',
            // 'customer' => 'nullable|string',
            'reseller' => 'nullable|string',
            'city_distributor' => 'nullable|string',
            'district_distributor' => 'nullable|string',
            'provincial_distributor' => 'nullable|string',
            'delivery_receipt_no' => 'nullable|string',
            'supplier_id' => 'nullable|string',
            
        ]);

        $product = Product::create($data);

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


    public function update_product(Request $request)
    {
        $product = Product::where('id', $request->product_id)->first();

        // Update product data excluding uploads
        if ($product) {
            $product->update($request->all());
            $this->handleUpdateUploads($request, 'uploads', $product);
        }


        // Handle file updates

        return response()->json(['message' => 'succes']);
    }

    private function handleUpdateUploads(Request $request, string $fileKey, Product $product)
    {
        if ($request->hasFile($fileKey)) {
            $files = $request->file($fileKey);

            foreach ($files as $file) {
                $path = $file->store('Personal-' . date("Y"), 's3');
                $url = Storage::disk('s3')->url($path);

                $upload = Upload::where('product_id', $product->id)->first();

                if ($upload) {
                    $upload->update([
                        'file' => $url
                    ]);
                } else {
                    // Create a new upload if no existing one
                    Upload::create([
                        'product_id' => $product->id,
                        'file' => $url,
                    ]);
                }
            }
        }
    }






    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
}
