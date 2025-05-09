<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    //
    protected $fillable = [
        'cart_id',
        'sub_total',
        'discount_per_item',
        'discount_per_order',
        'total_price',
        'payment_type',
        'tax',
        'customer_amount',
        'change',
        'status',
    ];

 
}
