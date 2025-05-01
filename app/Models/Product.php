<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'category_id',
        'quantity',
        'status',
        'cost',
        'srp',
        'reseller',
        'city_distributor',
        'district_distributor',
        'provincial_distributor',
    ];
}
