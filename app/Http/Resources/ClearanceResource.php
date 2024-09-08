<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Resources\PropertyResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ClearanceResource extends JsonResource
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
        'property_id' => $this->property_id,
        'user_Id' => $this->user_id,
        'property' => new PropertyResource($this->property),
        'user' => new UserResource($this->user),
        'expire_date' => $this->expire_date ? Carbon::parse($this->expire_date)->format('F d, Y') : 'waiting...',
        'expireDate' => $this->expire_date,
        "status" => $this->status,
        "image" => $this->image,
        "final_status" => $this->final_status,
        "feedback" => $this->feedback,
        'created_at' => $this->created_at->format('F d, Y'),
        'updated_at' => $this->updated_at->format('F d, Y'),
        ];
    }
}
