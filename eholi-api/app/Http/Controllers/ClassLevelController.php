<?php

namespace App\Http\Controllers;

use App\Models\ClassLevel;
use App\Models\Level;
use App\Models\Semester;
use App\Models\TimesTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClassLevelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = ClassLevel::with($request->with ?: [])->whereSchoolYearId(
            $request->school_yeard_id ?: school_year()->id
        );

        if ($request->has('search_query')) {
            $query->where('name', 'LIKE', "%{$request->search_query}%");
            if ($request->has('with') && in_array('level', $request->with)) {
                $query->orWhereHas('level', function ($q) use ($request) {
                    $q->where('name', 'LIKE', "%{$request->search_query}%");
                });
            }
        }

        if ($request->has('class_level_id')) {
            $query->where('id', $request->class_level_id);
        }

        if ($request->has('school_id')) {
            $query->where('school_id', $request->school_id);
        }

        $query->orderBy(
            $request->order_by ?: 'created_at',
            $request->order ?: 'DESC'
        );

        if ($request->has('per_page') || $request->has('page')) {
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
        $request->validate([
            'level_id' => 'required',
            'name' => 'required',
            'ids' => ['required', 'array']
        ]);

        DB::beginTransaction();
        try {
            $request->merge([
                'school_year_id' => school_year()->id,
                'school_id' => school()->id,
            ]);

            $class_level = ClassLevel::create($request->all());

            // add semester from level
            $semesters = Semester::find($request->ids);
            $class_level->semesters()->saveManyQuietly($semesters);

            $timesTable = new TimesTable();
            $timesTable->class_level_id = $class_level->id;
            $timesTable->school_year_id = school_year()->id;
            $timesTable->save();

            DB::commit();
            return $class_level->refresh();
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                "message" => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, ClassLevel $classLevel)
    {
        return $classLevel->load($request->with ?: ['school_year', 'level', 'times_table', 'level.cycle']);
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
        $times_tables = TimesTable::where('class_level_id', $classLevel->id)->first();
        if ($times_tables)
            $times_tables->delete();
        $classLevel->delete();
        return $classLevel;
    }

    // get semester

    public function getSemester(Request $request, ClassLevel $classLevel)
    {
        return $classLevel->load($request->with ?: ['level_has_semesters.semester']);
    }
}
