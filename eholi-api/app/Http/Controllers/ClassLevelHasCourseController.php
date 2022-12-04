<?php

namespace App\Http\Controllers;

use App\Models\ClassLevelHasCourse;
use App\Models\Course;
use Illuminate\Http\Request;

class ClassLevelHasCourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = ClassLevelHasCourse::with($request->with ?: []);

        if ($request->has('search_query') && $request->search_query) {
            if (
                $request->has('with') &&
                in_array('class_level', $request->with)
            ) {
                $query->whereHas('class_level', function ($q) use ($request) {
                    $q->where('name', 'LIKE', "%{$request->search_query}%");
                });
            }

            if ($request->has('with') && in_array('semester', $request->with)) {
                $query->orwhereHas('semester', function ($q) use ($request) {
                    $q->where('name', 'LIKE', "%{$request->search_query}%");
                });
            }
        }

        #  paginate the results
        return $query->paginate(
            $request->per_page ?: 15,
            $request->columns ?: '*',
            $request->page_name ?: 'page',
            $request->page ?: 1
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $course_id =
            $request->course_id ??
            Course::create([
                'name' => $request->name,
                'reference' => Course::generateReference(),
            ])->id;

        $request->merge([
            'course_id' => $course_id,
            'school_id' => school()->id,
        ]);

        $classLevelHasCourse = ClassLevelHasCourse::create($request->all());

        return $classLevelHasCourse
            ->refresh()
            ->load(['course', 'class_level', 'semester']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ClassLevelHasCourse  $classLevelHasCourse
     * @return \Illuminate\Http\Response
     */
    public function show(ClassLevelHasCourse $classLevelHasCourse)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ClassLevelHasCourse  $classLevelHasCourse
     * @return \Illuminate\Http\Response
     */
    public function update(
        Request $request,
        ClassLevelHasCourse $classLevelHasCourse
    ) {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ClassLevelHasCourse  $classLevelHasCourse
     * @return \Illuminate\Http\Response
     */
    public function destroy(ClassLevelHasCourse $classLevelHasCourse)
    {
        //
    }
}
