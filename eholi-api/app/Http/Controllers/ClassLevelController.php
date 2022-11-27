<?php

namespace App\Http\Controllers;

use App\Models\ClassLevel;
use Illuminate\Http\Request;

class ClassLevelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = ClassLevel::with($request->with ?: [])
            ->whereSchoolYearId($request->school_yeard_id ?: school_year()->id);

        if ($request->has('search_query')) {
            $query->where('name', 'LIKE', "%{$request->search_query}%");
            if ($request->has('with') && in_array('level', $request->with)) {
                $query->orWhereHas('level', function ($q) use ($request) {
                    $q->where('name', 'LIKE', "%{$request->search_query}%");
                });
            }
        }

        $query->orderBy($request->order_by ?: 'created_at', $request->order ?: 'DESC');
        return $query->paginate($request->per_page ?: 15, $request->columns ?: '*', $request->page_name ?: 'page', $request->page ?: 1);
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
        $request->merge(['school_year_id' => school_year()->id]);
        $class_level = ClassLevel::create($request->all());

        return $class_level->refresh();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(ClassLevel $classLevel)
    {
        return $classLevel->load(['school_year', 'level', 'level.cycle']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ClassLevel $classLevel)
    {
        // validation

        $classLevel->refresh()->update($request->all());
        return $classLevel->refresh();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ClassLevel $classLevel)
    {
        $classLevel->delete();
        return $classLevel;
    }
}
