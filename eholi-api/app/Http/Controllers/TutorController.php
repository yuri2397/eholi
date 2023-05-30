<?php

namespace App\Http\Controllers;

use App\Models\Tutor;
use Illuminate\Http\Request;
use App\Models\SchoolStudent;

class TutorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $school = school()->id;
        $tutors = Tutor::select('tutors.*')
            ->distinct()
            ->join('student_has_tutors', 'tutors.id', '=', 'student_has_tutors.tutor_id')
            ->join('students', 'student_has_tutors.student_id', '=', 'students.id')
            ->join('school_students', 'students.id', '=', 'school_students.student_id')
            ->where('school_students.school_id', '=', $school);

        if ($request->has('search_query') && $request->search_query) {

            $tutors->where('reference', $request->search_query)
                ->orWhere('name', 'LIKE', "%{$request->search_query}%")
                ->orWhere('email', 'LIKE', "%{$request->search_query}%")
                ->orWhere('phone1', $request->search_query)
                ->orWhere('phone2', $request->search_query);
        }

        // order by
        $tutors->orderBy($request->order_by ?: 'created_at', $request->order ?: 'DESC');
        // paginate
        return $tutors->paginate($request->per_page ?: 15, $request->columns ?: '*', $request->page_name ?: 'page', $request->page ?: 1);
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
        $tutor = Tutor::create($request->all());
        // return
        return $tutor->refresh();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tutor  $tutor
     * @return \Illuminate\Http\Response
     */
    public function show(Tutor $tutor)
    {
        // return
        return $tutor;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tutor  $tutor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tutor $tutor)
    {
        // update
        $tutor->update($request->all());
        return $tutor->refresh();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tutor  $tutor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tutor $tutor)
    {
        // delete
        $tutor->delete();
        return $tutor;
    }
}
