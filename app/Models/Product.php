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
        'supplier_id',
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
        'delivery_receipt_no',
        'is_soft_deleted'
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
    public function supplier(): HasOne
    {
        return $this->hasOne(Supplier::class, 'id', 'supplier_id');
    }
    
    /**
     * Check if the product is soft deleted
     */
    public function isSoftDeleted()
    {
        return $this->is_soft_deleted == '1' || $this->is_soft_deleted == 1;
    }

    /**
     * Scope to get only non-soft-deleted products
     */
    public function scopeNotSoftDeleted($query)
    {
        return $query->where(function ($q) {
            $q->where('is_soft_deleted', '!=', '1')
              ->orWhereNull('is_soft_deleted');
        });
    }

    /**
     * Scope to get only soft-deleted products
     */
    public function scopeSoftDeleted($query)
    {
        return $query->where('is_soft_deleted', '1');
    }
}
