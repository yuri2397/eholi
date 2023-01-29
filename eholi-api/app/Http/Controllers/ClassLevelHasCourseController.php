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
        $filter = array_keys($request->input('filter')) ?? null;
        
        $query = ClassLevelHasCourse::with($request->with ?: [])->whereSchoolId(
            school()->id
        );

        if ($request->has('search_query') && $request->search_query) {
            if ($request->has('with') && in_array('course', $request->with)) {
                $query->whereHas('course', function ($q) use ($request) {
                    $q->where('name', 'LIKE', "%{$request->search_query}%");
                });
            }

            if (
                $request->has('with') &&
                in_array('class_level', $request->with)
            ) {
                $query->orWhereHas('class_level', function ($q) use ($request) {
                    $q->where('name', 'LIKE', "%{$request->search_query}%");
                });
            }
            if ($request->has('with') && in_array('semester', $request->with)) {
                $query->orWhereHas('semester', function ($q) use ($request) {
                    $q->where('name', 'LIKE', "%{$request->search_query}%");
                });
            }
        }

        if ($filter && in_array('professor_id', $filter)) {
            $query->where('professor_id', $request->filter['professor_id']);
        }

        if ($filter && in_array('class_level_id', $filter)) {
            $query->where('class_level_id', $request->filter['class_level_id']);
        }

        if ($request->has('per_page')) {
            #  paginate the results
            return $query->paginate(
                $request->per_page ?: 15,
                $request->columns ?: '*',
                $request->page_name ?: 'page',
                $request->page ?: 1
            );
        }

        return $query->get();
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
    public function update(Request $request, $id)
    {
        // update the course
        $classLevelHasCourse = ClassLevelHasCourse::find($id);
        $classLevelHasCourse->update($request->all());

        return $classLevelHasCourse
            ->refresh()
            ->load(['course', 'class_level', 'semester', 'professor']);
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
