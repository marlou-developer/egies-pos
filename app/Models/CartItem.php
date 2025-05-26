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
        'profit',
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
     public function cart(): HasOne
    {
        return $this->hasOne(Cart::class, 'cart_id', 'cart_id');
    }
}
