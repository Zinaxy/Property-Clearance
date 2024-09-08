<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'property_no',
        'street',
        'surbub',
        'account',
        'status'
    ];

    /**
     * Get the user that owns the Property
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    /**
     * Get all of the services for the Property
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function services()
    {
        return $this->hasMany(Service::class);
    }
    /**
     * Get all of the clearance for the Property
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function clearance()
    {
        return $this->hasMany(RequestClearance::class);
    }
}
