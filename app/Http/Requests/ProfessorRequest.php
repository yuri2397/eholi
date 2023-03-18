<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfessorRequest extends FormRequest
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
            'first_name' => ['required' | 'string'],
            'last_name' => ['required' | 'string'],
            'email' => ['email'],
            'telephone' => ['string', 'regex:^(77|78|75|70|76)[0-9]{7}$'],
            'cni' => ['string', 'size:13'],
            'sexe' => ['required', 'in:m,w'],
            'adress' => ['required', 'string'],
            'last_degre' => ['string'],
        ];
    }
}
