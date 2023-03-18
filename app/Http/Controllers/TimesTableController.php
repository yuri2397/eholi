<?php

namespace App\Http\Controllers;

use App\Models\TimesTable;
use App\Models\TimesTableRow;
use Illuminate\Http\Request;

class TimesTableController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $timesTables = TimesTable::with($request->with ?? []);

        if ($request->has('class_level_id')) {
            $timesTables->where('class_level_id', $request->class_level_id);
        }

        if ($request->has('school_year_id')) {
            $timesTables->where('school_year_id', $request->school_year_id);
        }

        if ($request->has("per_page")) {
            return $timesTables->paginate($request->per_page, $request->columns ?? ['*'], $request->page_name ?? 'page', $request->page ?? null);
        } else {
            return $timesTables->get();
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            "start" => 'required',
            'end' => 'required',
            'class_level_has_course_id' => 'required',
            'school_has_professor_id' => 'required',
            'class_room_id' => 'required',
            'class_level_id' => 'required',
            'times_table_id' => 'required'
        ]);

        $row = TimesTableRow::create($request->all());

        return response()->json($row);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TimesTable  $timesTable
     * @return \Illuminate\Http\Response
     */
    public function show(TimesTable $timesTable)
    {
        return TimesTable::with('rows', 'class_level')->find($timesTable->id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TimesTable  $timesTable
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TimesTable $timesTable)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TimesTable  $timesTable
     * @return \Illuminate\Http\Response
     */
    public function destroy(TimesTable $timesTable)
    {
        //
    }
}
