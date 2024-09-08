<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePaymentRequest extends FormRequest
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
        'service_id' => "required",
        'amount_usd' => "required",
        'method' => "required",
        'payment_date' => "required",
        "image" => "nullable|image|mimes:png,jpg,jpeg,webp",
        "status" => "nullable"
        ];
    }
}
