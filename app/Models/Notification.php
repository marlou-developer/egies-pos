<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Notification extends Model
{
    //
    protected $fillable = [
        'cp_id',
        'type',
        'status',
        'date',
        'is_read',
    ];

     public function cart(): HasOne
    {
        return $this->hasOne(Cart::class, 'id', 'cp_id')->with(['customer']);
    }
     public function product(): HasOne
    {
        return $this->hasOne(Product::class, 'id', 'cp_id');
    }
}
