<?php

namespace App\Http\Controllers;

use App\Models\Ayah;
use App\Models\Student;
use App\Models\StudentProgression;
use App\Models\Surah;
use Illuminate\Http\Request;

class StudentProgressionController extends Controller
{
    public function index(Request $request)
    {
    }

    public function studentProgression(Student $student)
    {
        $progression = $student->progressions;

        if (!$progression) {
            $progression = new StudentProgression();
            $progression->student_id = $student->id;
            $progression->surah_id = Surah::whereNumber(1)->first()->id;
            $progression->progression = 0;
            $progression->save();
        }

        return $student->load(['progressions']);
    }

    public function studentProgressionDetails(StudentProgression $studentProgression)
    {
        /**
         * @var StudentProgressionItem $studentProgressionItem
         */

        $ayahs = array_map(function ($studentProgressionItem) use ($studentProgression) {
            return [
                "config" => $studentProgressionItem,
                "data" => Ayah::whereSurahId($studentProgression->surah_id)
                    ->whereBetween('number', [$studentProgressionItem['start_ayah_number'], $studentProgressionItem['end_ayah_number']])
                    ->orderBy('number')
                    ->get()
            ];
        },  $studentProgression->studentProgressionItems()->orderBy('created_at', 'asc')->get()->toArray());

        return response()->json([
            "ayahs" => $ayahs,
            "progression" => $studentProgression
        ]);
    }
}
