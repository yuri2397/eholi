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
        $school = $request->school ?: school_user()->id;

        $query = SchoolStudent::with($request->with ?? [])
            ->whereSchoolId($school)
            ->join('students as S', 'S.id', "school_students.student_id")
            ->where('S.first_name', 'LIKE', '%' . $request->search_query ?: '' . '%')
            ->orWhere('S.last_name', 'LIKE', '%' . $request->search_query ?: '' . '%')
            ->orWhere('S.reference', $request->search_query ?: '')
            ->orderBy($request->order_by ?: 'S.created_at', $request->order ?: 'DESC');


        return $query->paginate($request->per_page ?: 15, $request->columns ?: '*', $request->page_name ?: 'page', $request->page ?: 1);
    }

    public function dashboard(Request $request)
    {
        $data['nb_students'] = SchoolStudent::whereSchoolId(school_user()->id)
            ->get()
            ->count();

        $data['nb_active_students'] = SchoolStudent::whereStatus(true)
            ->whereSchoolId(school_user()->id)
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
            event(new AssociateCustomerToSchool(school_user(), $student));

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
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function show(Student $student)
    {
        return $student;
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
}
