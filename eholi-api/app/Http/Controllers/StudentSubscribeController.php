<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StudentSubscribe;
use Illuminate\Support\Facades\DB;
use App\Models\ClassLevelHasStudent;

class StudentSubscribeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // validation

        DB::beginTransaction();

        try {

            # create class level has student
            $class_level_has_student = ClassLevelHasStudent::create([
                "class_level_id" => $request->class_level_id,
                "student_id" => $request->student_id,
                "school_id" => school()->id,
            ]);

            $request->merge([
                "reference" => StudentSubscribe::BASE_REFERENCE . time(),
                "class_level_has_student_id" => $class_level_has_student->id,
                "status" => "success"
            ]);

            $studentSubscribe = StudentSubscribe::create(
                $request->all()
            );

            DB::commit();
            return response()->json([
                "message" => "Student subscribed successfully",
                "data" => $studentSubscribe
            ], 201);
        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json([
                "message" => $th->getMessage(),
                "code" => $th->getCode()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StudentSubscribe  $studentSubscribe
     * @return \Illuminate\Http\Response
     */
    public function show(StudentSubscribe $studentSubscribe)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\StudentSubscribe  $studentSubscribe
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, StudentSubscribe $studentSubscribe)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StudentSubscribe  $studentSubscribe
     * @return \Illuminate\Http\Response
     */
    public function destroy(StudentSubscribe $studentSubscribe)
    {
        //
    }
}
