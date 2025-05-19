<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ProductDiscount extends Model
{
    //
    protected $fillable = [
        'customer_id',
        'product_id',
        'customer_discount',
    ];

        public function product(): HasOne
    {
        return $this->hasOne(Product::class, 'id', 'product_id');
    }
}
