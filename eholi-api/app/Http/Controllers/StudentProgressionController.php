<?php

namespace App\Http\Controllers;

use App\Models\Ayah;
use App\Models\Student;
use App\Models\StudentProgression;
use App\Models\StudentProgressionItem;
use App\Models\Surah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    public function store(Request $request)
    {
        $data = $request->validate([
            "student_id" => ['required'],
            "surah_id" => ['required', 'exists:surahs,id'],
        ]);

        DB::beginTransaction();

        try {
            $alreadyExists = StudentProgression::whereStudentId($data['student_id'])->whereSurahId($data['surah_id'])->get();

            if ($alreadyExists && count($alreadyExists) > 0) {
                return response()->json([
                    "message" => Surah::find($data['surah_id'])->name . " est déjà ajouté pour cet étudiant."
                ], 422);
            }
            $progression = new StudentProgression();
            $progression->student_id = $data['student_id'];
            $progression->surah_id = $data['surah_id'];
            $progression->progression = 0;
            $progression->save();

            DB::commit();
            return response()->json($progression->load('studentProgressionItems'));
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                "message" => $th->getMessage(),
                "error" => $th
            ], 500);
        }
    }

    public function attachNewAyah(Request $request)
    {
        $data = $request->validate([
            "start" => ['required', 'numeric'],
            "end" => ['required', 'numeric'],
            "progression_id" => ["required"],
        ]);

        $progression = StudentProgression::find($data['progression_id']);

        $surah = Surah::find($progression->surah_id);
        $ayatsCount = count($surah->ayahs);

        if ($data['start'] >= $data['end']) {
            return response()->json([
                "message" => "Le début du ayat ne pas être supperieur à la fin.",
            ], 422);
        }

        if ($data['end'] > $ayatsCount) {
            return response()->json([
                "message" => "Le Sourat " . $surah->name . " ne compte que $ayatsCount." . "Choissir une fin plus petite que $ayatsCount."
            ], 422);
        }

        $item = new StudentProgressionItem();
        $item->start_ayah_number = $data['start'] + $surah->ayahs()->orderBy('number', 'asc')->first()->number - 1;
        $item->end_ayah_number = $data['end'] + $surah->ayahs()->orderBy('number', 'asc')->first()->number - 1;
        $item->student_progression_id = $progression->id;
        $item->save();

        return response()->json($progression->load(['studentProgressionItems']));
    }

}
