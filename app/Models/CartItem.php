<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
