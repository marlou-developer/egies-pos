<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    //
    protected $fillable = [
        'cart_id',
        'customer_id',
        'sub_total',
        'customer_total_discount',
        'discount_per_item',
        'discount_per_order',
        'total_price',
        'payment_type',
        'tax',
        'customer_amount',
        'change',
        'status',
        'is_credit',
        'due_date',
    ];
}
