<?php

namespace App\Http\Controllers;

use App\Models\LevelHasSemester;
use Illuminate\Http\Request;

class LevelHasSemesterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = LevelHasSemester::query();

        if ($request->has('level_id')) {
            $query->whereLevelId($request->level_id);
        }

        // filter by class_level_id
        if($request->has('class_leve_id')){
            // get the level_has_semester where class_level.level_id == level_has_semester.level_id
            $query->whereHas('level', function($q) use ($request){
                $q->where('level_id', $request->class_level_id);
            });
        }   

        if ($request->has('semester_id')) {
            $query->whereSemesterId($request->semester_id);
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
        //
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
