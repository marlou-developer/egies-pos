<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CreditPayment extends Model
{
    protected $fillable = [
        'cart_id',
        'amount',
        'payment_type'
    ];
}
