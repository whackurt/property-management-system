<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'articles',
        'description',
        'accountable_person',
        'date_of_assumption',
        'quantity_per_property',
        'quantity_per_physical',
        'shortage_overage_quantity',
        'shortage_overage_value',
        'unit_of_measure',
        'unit_value',
        'physical_value',
        'property_number',
        'remarks',
        'status'
    ];

     public function accountablePerson()
    {
        return $this->belongsTo(User::class, 'accountable_person');
    }
}
