<?php

namespace App\Http\Controllers;

use App\Models\Tutor;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\CreateAdmissionRequest;

class AdmissionController extends Controller
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
    public function store(CreateAdmissionRequest $request)
    {
        # validation
        $validated = $request->validated();

        # start transaction
        DB::beginTransaction();

        try {
            # create student from request
            $request->merge(['student' => array_merge($request->student, ['reference' => Student::generateReference()])]);
            $student = Student::create($request->student);
            # create new tutors
            $tutors = collect($request->tutors)->map(function ($tutor) use ($student) {
                # check if tutor already exists
                # update tutor if exists or create new
                $newTutor = Tutor::updateOrCreate(['reference' => $tutor['reference'] ?? ''], $tutor);

                // $newTutor->user()->create([
                //     'username' => $newTutor->reference,
                //     'password' => bcrypt($newTutor->reference),
                // ]);

                return [
                    'tutor_id' => $newTutor->id,
                    'type' => $tutor['type'],
                ];
            });

            # create student_has_tutors
            $student->tutors()->attach($tutors);


            # create school_student from request
            $student->school_students()->create([
                'school_id' => school()->id,
            ]);

            # attach student to class level has student when class level school year is the current school year
            $student->class_level_has_student()->create([
                'class_level_id' => $request->class_level_id
            ]);


            # create users for student
            $student->user()->create([
                'username' => $student->reference,
                'password' => bcrypt($student->reference),
            ]);

            # commit transaction
            DB::commit();

            return response()->json([
                'message' => 'Admission created successfully',
                'student' => $student,
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return response()->json([
                'message' => 'Admission creation failed',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
