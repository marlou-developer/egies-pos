<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CartItem extends Model
{
    protected $fillable = [
        'cart_id',
        'product_id',
        'discount',
        'customer_discount',
        'cost',
        'pricing_type',
        'quantity',
        'price',
        'fixed_price',
        'total',
    ];

      public function product(): HasOne
    {
        return $this->hasOne(Product::class, 'id', 'product_id');
    }
}
