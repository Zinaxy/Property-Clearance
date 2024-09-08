<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
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
        'serviceId' => $this->service_id,
        'service_id' => new ServiceResource($this->service),
        'amount_usd' => $this->amount_usd,
        'method' => $this->method,
        'payment_date' => (new Carbon($this->payment_date))->format('F d, Y'),
        'paymentDate' => $this->payment_date,
        "image" => $this->image,
        "status" => $this->status,
        'created_at' => $this->created_at->format('F d, Y'),
        'updated_at' => $this->updated_at->format('F d, Y'),
        ];
    }
}
