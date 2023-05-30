<?php

namespace App\Http\Controllers;

use App\Events\AssociateCustomerToSchool;
use App\Models\Student;
use App\Models\SchoolUser;
use Illuminate\Http\Request;
use App\Models\SchoolStudent;
use App\Events\AssociateUserTo;
use Illuminate\Support\Facades\DB;
use PHPUnit\Framework\MockObject\Builder\Stub;
use Spatie\Permission\Models\Role;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $school = $request->school ?: school()->id;
        $query = SchoolStudent::with($request->with ?? [])
            ->join('students as S', 'S.id', "school_students.student_id")
            ->where('school_students.school_id', $school)
            ->where("school_students.status", true)
            ->where('S.status', true);

        if ($request->has('class_level_id') && $request->class_level_id) {
            $query->join('class_level_has_students as CHS', 'CHS.student_id', 'S.id')
                ->where('CHS.school_id', $school)
                ->where('CHS.class_level_id', $request->class_level_id);
        }

        if ($request->has('search_query') && $request->search_query) {
            $query->where(
                function ($q) use ($request) {
                    $q->where('S.first_name', 'LIKE', "%{$request->search_query}%")
                        ->orWhere('S.last_name', 'LIKE', "%{$request->search_query}%")
                        ->orWhere('S.cni', 'LIKE', "%{$request->search_query}%")
                        ->orWhere('S.email', 'LIKE', "%{$request->search_query}%")
                        ->orWhere('S.telephone', 'LIKE', "%{$request->search_query}%")
                        ->orWhere('S.reference', $request->search_query);
                }
            );
        }

        $query->orderBy($request->order_by ?: 'S.created_at', $request->order ?: 'DESC');

        return $query->paginate($request->per_page ?: 15, $request->columns ?: '*', $request->page_name ?: 'page', $request->page ?: 1);
    }

    public function dashboard(Request $request)
    {
        $data['nb_students'] = SchoolStudent::whereSchoolId(school()->id)
            ->get()
            ->count();

        $data['nb_active_students'] = SchoolStudent::whereStatus(true)
            ->whereSchoolId(school()->id)
            ->get()
            ->count();

        $data['nb_inactive_students'] = $data['nb_students'] - $data['nb_active_students'];

        return $data;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // VALIDATION

        DB::beginTransaction();

        try {
            $request->merge(["reference" => Student::BASE_REFERENCE . time()]);
            $student = Student::create(
                $request->all()
            );

            event(new AssociateUserTo($student));
            event(new AssociateCustomerToSchool(school(), $student));

            DB::commit();
            return $student;
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
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,$id)
    {
        return Student::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Student $student)
    {
        Student::whereId($student->id)->update($request->all());

        return $student->refresh();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function destroy(Student $student)
    {
        $student->delete();
        return $student;
    }

    public function disableStudentInSchool(Student $student)
    {
        $school_student = SchoolStudent::whereStudentId($student->id)
            ->whereSchoolId(school()->id)
            ->first();

        $school_student->update([
            "status" => false
        ]);

        return $school_student->refresh();
    }

    public function metaData(Student $student)
    {
        $metaData = [];

        $room = $student->rooms()
            ->with('room')
            ->where('school_id', school()->id)
            ->first();
        $metaData['room'] = $room ? [
            "id" => $room->room->id,
            "name" => $room->room->name,
        ] : null;

        $class_level = $student->class_levels()
            ->where('school_year_id', school_year()->id)
            ->first();

        $metaData['class_levels'] = $class_level ? [
            "id" => $class_level->id,
            "name" => $class_level->name,
            "level_id" => $class_level->level_id
        ] : null;


        # tutors
        $metaData['tutors'] =  $student->tutors()
            ->with('tutor_type')
            ->where('student_has_tutors.student_id', $student->id)
            ->get()->map(
                fn ($tutor) =>  [
                    'id' => $tutor->id,
                    "name" => $tutor->name,
                    "phone1" => $tutor->phone1,
                    "adress" => $tutor->adress,
                    "type" => $tutor->tutor_type[0]->type ?? null
                ]
            );


        return $metaData;
    }
}
