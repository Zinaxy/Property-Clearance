<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
       // 'property_id' => "required",
        'service_id' => "required",
        'amount_usd' => "required",
        'method' => "required",
        'payment_date' => "required|before:tomorrow",
        "image" => "required|image|mimes:png,jpg,jpeg,webp,svg"
        ];
    }
}
