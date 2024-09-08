<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Resources\PropertyResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
             "id" => $this->id,
            "name" => $this->name,
            "surname" => $this->surname,
            "phone" => $this->surname,
            "email" => $this->email,
            "role" => $this->role,
            "properties" => PropertyResource::collection($this->whenLoaded('properties')),
            'created_at' => (new Carbon($this->created_at))->format('F d, Y'),
            'updated_at' => (new Carbon($this->updated_at))->format('F d, Y'),
        ];
    }
}
