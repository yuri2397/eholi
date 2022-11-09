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
        $query = ClassLevel::with($request->with ?: []);

        if ($request->has('search_query')) {
            $query->where('name', 'LIKE', "%{$request->search_query}%");
        }

        $query->orderBy($request->order_by ?: 'created_at', $request->order ?: 'DESC');
        return $query->simplePaginate($request->per_page ?: 15, $request->columns ?: '*', $request->page_name ?: 'page', $request->page ?: 1);
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

        $class_level = ClassLevel::create($request->all());

        return $class_level;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(ClassLevel $classLevel)
    {
        return $classLevel->with(['school_year', 'level']);
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
