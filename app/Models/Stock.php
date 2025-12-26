<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Stock extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_id',
        'user_id',
        'supplier_id',
        'date',
        'delivery_id',
        'quantity',
        'remaining',
        'price',
    ];

    public function products(): HasOne
    {
        return $this->hasOne(Product::class, 'id', 'product_id');
    }
    
    public function supplier(): HasOne
    {
        return $this->hasOne(Supplier::class, 'id', 'supplier_id');
    }
     public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
