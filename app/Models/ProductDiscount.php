<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductDiscount extends Model
{
    //
    protected $fillable = [
        'customer_id',
        'product_id',
        'customer_discount',
    ];
}
