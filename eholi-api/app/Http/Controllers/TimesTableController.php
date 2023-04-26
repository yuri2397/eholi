<?php

namespace App\Http\Controllers;

use App\Models\SchoolHasProfessor;
use App\Models\TimesTable;
use App\Models\TimesTableRow;
use Carbon\Carbon;
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
            'class_room_id' => 'required',
            'is_repeated' => 'required',
            'professor_id' => 'required',
            'times_table_id' => 'required'
        ]);


        $school_has_professor_id = SchoolHasProfessor::where('professor_id', $request->professor_id)->where('school_id', school()->id)->first()->id;
        $request->merge(['school_has_professor_id' => $school_has_professor_id]);
        

        $data = [
            'start' => $this->parseTimeToCurrentDate($request->day_number, $request->start),
            'end' => $this->parseTimeToCurrentDate($request->day_number, $request->end),
            'class_level_has_course_id' => $request->class_level_has_course_id,
            'class_room_id' => $request->class_room_id,
            'is_repeated' => $request->is_repeated,
            'school_has_professor_id' => $request->school_has_professor_id,
            'times_table_id' => $request->times_table_id
        ];

        $row = TimesTableRow::create($data);

        return response()->json($row->refresh());
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

    private function parseTimeToCurrentDate($dayOfWeek, $time)    
    {
        $date = Carbon::now();

        $date->setDay($dayOfWeek);

        $newDate = $date->setTime(Carbon::parse($time)->hour, Carbon::parse($time)->minute, Carbon::parse($time)->second);

        return $newDate;
    }

    public function repeatTimesTable(TimesTable $timesTable)
    {
    }
}
