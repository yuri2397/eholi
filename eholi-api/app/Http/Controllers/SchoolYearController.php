<?php

namespace App\Http\Controllers;

use App\Models\ClassLevel;
use App\Models\Deliberation;
use App\Models\School;
use App\Models\SchoolYear;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SchoolYearController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return SchoolYear::with($request->with ?? [])
            ->orderBy($request->order_by ?? 'created_at', $request->order ?? 'DESC')
            ->simplePaginate($request->per_page ?: null, $request->columns ?: '*', $request->page_name ?: null, $request->page ?: null);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "start_at" => ['required', 'date'],
            "end_at" => ['required', 'date'],
            "school_id" => ['exists:schools,id']
        ]);

        try {
            DB::beginTransaction();
            $school = isset($data['school_id']) ? School::find($data['school_id']) : school();

            $last_school_year = SchoolYear::whereSchoolId($school->id)->whereStatus('active')->orderBy('created_at', 'DESC')->first();
            if ($last_school_year) {
                // test if all semester of all class_levels have deliberation 
                $class_levels = ClassLevel::whereSchoolId($school->id)->whereSchoolYearId(school_year()->id)->get();

                foreach ($class_levels as $class_level) {
                    $semesters = $class_level->semesters;
                    foreach ($semesters as $semester) {
                        $sem_deliberation = Deliberation::whereSemesterId($semester->id)->whereClassLevelId($class_level->id)->whereSchoolYearId($last_school_year->id)->whereStatus(Deliberation::FINISH)->first();
                        if (!$sem_deliberation) {
                            return response()->json([
                                "message" => "Le semestre {$semester->number} de la classe {$class_level->name} n'est pas encore terminé. Il faut finir les examens et faire la délibération avant de clôturer l'année scolaire " . school_year()->start_end . ". Merci"
                            ]);
                        }
                    }
                }
            }

            $new_school_year = SchoolYear::create([
                "start_at" => $data['start_at'],
                "end_at" => $data['end_at'],
                "school_id" => $school->id,
                "status" => SchoolYear::ACTIVE
            ]);

            $last_school_year->status = SchoolYear::INACTIVE;
            $last_school_year->save();

            DB::commit();
            return $new_school_year;
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                "message" => $th->getMessage(),
                "error" => $th
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SchoolYear  $schoolYear
     * @return \Illuminate\Http\Response
     */
    public function show(SchoolYear $schoolYear)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SchoolYear  $schoolYear
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SchoolYear $schoolYear)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SchoolYear  $schoolYear
     * @return \Illuminate\Http\Response
     */
    public function destroy(SchoolYear $schoolYear)
    {
        //
    }

    public function currentSchoolYear(Request $request)
    {
        return school_year();
    }
}
