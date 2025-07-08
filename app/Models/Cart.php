<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Cart extends Model
{
    //
    protected $fillable = [
        'cart_id',
        'customer_id',
        'user_id',
        'order_id',
        'customer',
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
        'shop',
        'shopee_store',
        'balance',
        'due_date',
        'is_read'
    ];

    public function customer(): HasOne
    {
        return $this->hasOne(Customer::class, 'id', 'customer_id');
    }
    public function cart_items(): HasMany
    {
        return $this->hasMany(CartItem::class, 'cart_id', 'cart_id')->with(['product']);
    }
      public function credit_payments(): HasMany
    {
        return $this->hasMany(CreditPayment::class, 'cart_id', 'cart_id');
    }
}
