<?php

namespace App\Http\Controllers;

use App\Models\ClassLevel;
use App\Models\SchoolHasProfessor;
use App\Models\Test;
use App\Models\TestResult;
use App\Models\TimesTable;
use App\Models\TimesTableRow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Test::with($request->with ?? []);

        if ($request->has('class_level_id')) {
            $query->where('class_level_id', $request->class_level_id);
        }

        if ($request->has('school_has_professor_id')) {
            $query->where('school_has_professor_id', $request->school_has_professor_id);
        }

        if ($request->has('level_has_semester_id')) {
            $query->where('level_has_semester_id', $request->level_has_semester_id);
        }

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        if ($request->has('search')) {
            $query->where('title', 'like', "%{$request->search}%");
        }

        if ($request->has('per_page')) {
            return $query->paginate($request->per_page ?: 15, $request->columns ?: '*', $request->page_name ?: 'page', $request->page ?: 1);
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
            "title" => ['required'],
            "max_note" => ['numeric'],
            "type" => ['in:exam,duty'],
            "percent" => ['numeric'],
            "date" => ['date'],
            "class_level_id" => ['required', 'exists:class_levels,id'],
            "school_has_professor_id" => ['required', 'exists:school_has_professors,professor_id'],
            "class_level_has_course_id" => ['required', 'exists:class_level_has_courses,id'],
        ]);
        // merge school_id 
        $request->merge([
            'school_id' => school()->id,
            'school_has_professor_id' => SchoolHasProfessor::whereProfessorId($request->school_has_professor_id)->first()->id,
        ]);

        DB::beginTransaction();

        try {
            $test = Test::create($request->all());

            $timesTable = TimesTable::where('class_level_id', $request->class_level_id)->first();
            if ($timesTable) {
                $timesTable->rows()->create(
                    [
                        'start' => $request->date,
                        'end' => $request->date,
                        'class_level_has_course_id' => $request->class_level_has_course_id,
                        'is_repeated' => false,
                        'school_has_professor_id' => $request->school_has_professor_id,
                    ]
                );
            }

            $class_levels = ClassLevel::with('class_level_has_students')->find($request->class_level_id);

            if ($class_levels) {
                $test->test_results()->createMany(
                    array_map(function ($student) {
                        return [
                            "status" => "pending",
                            "class_level_has_student_id" => $student['id']
                        ];
                    }, $class_levels->class_level_has_students->toArray())
                );
            }

            DB::commit();
            return response()->json([
                "message" => "Test created successfully",
                "data" => $test
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                "message" => $th->getMessage(),
                "error" => $th
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Test  $test
     * @return \Illuminate\Http\Response
     */
    public function show(Test $test)
    {
        return $test->load(['class_level.school_year', 'class_level_has_course.semester', 'class_level_has_course.course', 'class_level_has_course.professor', 'test_results', 'class_level']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Test  $test
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Test $test)
    {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Test  $test
     * @return \Illuminate\Http\Response
     */
    public function destroy(Test $test)
    {
        
        $testResult = TestResult::whereTestId($test->id)->get();
        $testResult->each(function ($item) {
            $item->delete();
        });
        $test->delete();
        return response()->json([
            "message" => "Test deleted successfully",
            "data" => $test
        ]);
    }

    public function updateTestResult(TestResult $testResult, Request $request)
    {
        $request->validate([
            "note" => ['required', 'numeric'],
            "status" => ['required', 'in:pending,cancel,ok'],
        ]);

        $testResult->update($request->only([
            'note',
            'status',
            'explanations'
        ]));

        return response()->json([
            "message" => "Test result updated successfully",
            "data" => $testResult
        ]);
    }
}
