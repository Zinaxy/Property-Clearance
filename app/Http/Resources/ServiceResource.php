<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Resources\PropertyResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
        'id' => $this->id,
        'property_id'  => new PropertyResource($this->property),
        "service"  => $this->service,
        "current_amount"  => $this->current_amount,
        "arreas"  => $this->arreas,
        "expire_date" =>  (new Carbon($this->expire_date))->format('F d, Y'),
        "status" => $this->status
        ];
    }
}
