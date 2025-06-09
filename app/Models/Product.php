<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'category_id',
        'quantity',
        'status',
        'barcode',
        'brand',
        'cost',
        'srp',
        'shopee',
        'customer',
        'reseller',
        'city_distributor',
        'district_distributor',
        'provincial_distributor',
        'delivery_receipt_no'
    ];

    public function uploads(): HasMany
    {
        return $this->hasMany(Upload::class, 'product_id', 'id');
    }
    public function stocks(): HasMany
    {
        return $this->hasMany(Stock::class, 'product_id', 'id')->with('supplier');
    }
    public function categories(): HasOne
    {
        return $this->hasOne(Category::class, 'id', 'category_id');
    }

}
