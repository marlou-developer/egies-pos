<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Customer extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'street',
        'brgy',
        'city',
        'province',
        'postal',
        'mobile_no',
        'email',
        'due_period',
    ];

    public function customer_ids(): HasOne
    {
        return $this->hasOne(CustomerId::class, 'customer_id', 'id');
    }

    public function discount(): HasMany
    {
        return $this->hasMany(ProductDiscount::class, 'customer_id', 'id');
    }
}
