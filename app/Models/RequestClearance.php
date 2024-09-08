<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestClearance extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id",
        "property_id",
        "status",
        "image",
        "final_status",
        "expire_date",
    ];

    /**
     * Get the property that owns the RequestClearance
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function property()
    {
        return $this->belongsTo(Property::class);
    }
    /**
     * Get the user that owns the RequestClearance
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
