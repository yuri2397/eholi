<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateAdmissionRequest extends FormRequest
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
            'student' => 'required|array',
            'student.first_name' => 'required|string',
            'student.last_name' => 'required|string',
            'student.birth_at' => 'required|date',
            'student.birth_in' => 'required|string',
            'student.departement' => 'string',
            'tutors' => 'required|array',
            'tutors.*.name' => 'required|string',
            'tutors.*.email' => 'email',
            'tutors.*.phone1' => 'required|string',
            'tutors.*.phone2' => 'string',
            'tutors.*.address' => 'string',
            'tutors.*.type' => 'required|in:father,mother,other',
            'class_level_id' => 'required|uuid|exists:class_levels,id',
        ];
    }
}
