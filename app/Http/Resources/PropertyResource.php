<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\ClearanceResource;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyResource extends JsonResource
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
        'user_id'=> new UserResource($this->user),
        "services" => ServiceResource::collection($this->whenLoaded('services')),
        'property_no'  => $this->property_no,
        'street' => $this->street,
        'surbub' => $this->surbub,
        'account' => $this->account,
        'status' => $this->status,
        ];
    }
}
