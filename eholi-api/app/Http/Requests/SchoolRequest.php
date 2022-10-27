<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SchoolRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string'],
            'address' => ['string'],
            'email' => ['email'],
            'phone' => ['string', 'regex:(77|78|75|70|76|33)[0-9]{7}$'],
            'reference' => ['numeric']
        ];
    }
}
