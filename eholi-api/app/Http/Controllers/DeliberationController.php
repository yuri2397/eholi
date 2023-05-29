<?php

namespace App\Http\Controllers;

use App\Models\Test;
use App\Models\Student;
use App\Models\ClassLevel;
use App\Models\SchoolYear;
use App\Models\Deliberation;
use Illuminate\Http\Request;
use App\Models\DeliberationItem;
use Illuminate\Support\Facades\DB;
use App\Models\ClassLevelHasCourse;
use App\Models\DeliberationItemResult;
use App\Models\School;

class DeliberationController extends Controller
{
    // index
    public function index(Request $request)
    {
        $query = Deliberation::with($request->with ?? []);

        // filter by semester_id
        if ($request->has('semester_id')) {
            $query->where('semester_id', $request->semester_id);
        }

        // filter by class_level_id
        if ($request->has('class_level_id')) {
            $query->where('class_level_id', $request->class_level_id);
        }

        // school_year_id
        if ($request->has('school_year_id')) {
            $query->where('school_year_id', $request->school_year_id);
        }


        // pagination if needed
        if ($request->has('per_page')) {
            return $query->simplePaginate($request->per_page, $request->columns ?? ['*'], 'page', $request->page ?? 1);
        }



        return $query->get();
    }

    // show
    public function show(Request $request, $id)
    {
        $deliberation = Deliberation::with($request->with ?? [])->findOrFail($id);
        $groupByCourses = [];
        // get results distinct courses
        $results = DeliberationItemResult::whereDeliberationId($deliberation->id)->distinct()->get(['class_level_has_course_id']);
        foreach ($results as $result) {
            // all result with the same class_level_has_course_id
            $results = DeliberationItemResult::whereDeliberationId($deliberation->id)->whereClassLevelHasCourseId($result->class_level_has_course_id)->orderBy('average', 'desc')->get();
            $groupByCourses[] = [
                'course' => $result->classLevelHasCourse->course,
                'professor' => $result->classLevelHasCourse->professor,
                'results' => $results,
            ];
        }

        return [
            'deliberation' => $deliberation,
            'results' => $groupByCourses,
        ];
    }

    // store
    public function store(Request $request)
    {
        $data = $request->validate([
            'semester_id' => 'required|uuid|exists:semesters,id',
            'class_level_id' => 'required|uuid|exists:class_levels,id',
            // 'school_year_id' => 'required|uuid|exists:school_years,id',
            // 'deliberation_items' => 'required|array',
            // 'deliberation_items.*.class_level_has_student_id' => 'required|uuid|exists:class_level_has_students,id',
            // 'deliberation_items.*.class_level_has_course_id' => 'required|uuid|exists:class_level_has_courses,id',
            // 'deliberation_items.*.average' => 'required|numeric|min:0|max:20',
            // 'deliberation_items.*.status' => 'required|in:success,append,cancel,remove',
            // 'deliberation_items.*.rang' => 'required|numeric|min:1',
            // 'deliberation_items.*.mention' => 'required|in:any,excellent,very_good,good,passable,mediocre,weak,very_weak',
        ]);

        // test if a deliberation with the class_level_id and semester_id exists
        $deliberation = Deliberation::whereClassLevelId($data['class_level_id'])->whereSemesterId($data['semester_id'])->first();
        if ($deliberation) {
            return response()->json([
                'message' => 'Une délibération existe déjà pour cette classe et ce semestre',
                'deliberation' => $deliberation
            ], 422);
        }

        DB::beginTransaction();
        try {
            $deliberation = Deliberation::create([
                'semester_id' => $request->semester_id,
                'class_level_id' => $request->class_level_id,
                'school_year_id' => ClassLevel::find($request->class_level_id)->school_year_id,
            ]);

            // get all course of this class
            $courses = ClassLevelHasCourse::with(['tests'])->whereClassLevelId($data['class_level_id'])->whereSemesterId($data['semester_id'])->get();
            if ($checker = $this->checkCNTPDeliberation($courses)) {
                return $checker;
            }

            // get all student in this class where class_level_has_students.status = active
            $students = Student::with(['class_level_has_students' => function ($query) {
                $query->where('status', 'active');
            }])->whereHas('class_level_has_students', function ($query) use ($data) {
                $query->where('class_level_id', $data['class_level_id']);
            })->get();

            if (!$students) {
                return response()->json([
                    'message' => 'Il faut ajouter des étudiants dans cette classe avant de faire la délibération',
                ], 422);
            }

            foreach ($courses as $course) {
                $exams = Test::where('type', Test::EXAM)->where('class_level_has_course_id', $course->id)->get();
                $duties = Test::where('type', Test::DUTY)->where('class_level_has_course_id', $course->id)->get();

                foreach ($students as $student) {
                    // duties average for each student
                    $duties_average = 0;
                    foreach ($duties as $duty) {
                        $duties_average += $duty->test_results()->whereClassLevelHasStudentId(
                            $student->class_level_has_students[0]->id
                        )->first()?->note ?? 0;
                    }
                    // moyen de l'etudiant pour les devoirs id duty != 0

                    if ($duties->count() != 0) {
                        $duties_average = $duties_average / $duties->count();
                    } else {
                        $duties_average = 0;
                    }

                    // exams average for each student
                    $exams_average = 0;
                    foreach ($exams as $exam) {
                        $exams_average += $exam->test_results()->whereClassLevelHasStudentId(
                            $student->class_level_has_students[0]->id
                        )->first()?->note ?? 0;
                    }

                    if ($exams->count() != 0) {
                        $exams_average = $exams_average / $exams->count();
                    } else {
                        $exams_average = 0;
                    }

                    // total average for each student
                    $total_average = ($duties_average * $course->duty_percent + $exams_average * $course->exam_percent) / 100;

                    // get mention
                    $mention = $this->getMention($total_average, $course->max_note);


                    // create deliberation item resultat without deliberation_item_id
                    $deliberation_item_result = DeliberationItemResult::create([
                        'average' => $total_average,
                        'status' => DeliberationItem::SUCCESS,
                        'mention' => $mention,
                        'coef' => $course->coef,
                        'duty_average' =>  $duties_average,
                        'exam_average' => $exams_average,
                        'class_level_has_student_id' => $student->class_level_has_students[0]->id,
                        'class_level_has_course_id' => $course->id,
                        'deliberation_id' => $deliberation->id,
                    ]);
                }

                // recalculer les rangs pour ce cours
                $deliberation_item_results = DeliberationItemResult::whereDeliberationId($deliberation->id)->whereClassLevelHasCourseId($course->id)->orderBy('average', 'desc')->get();
                $rang = 1;
                foreach ($deliberation_item_results as $deliberation_item_result) {
                    $deliberation_item_result->rang = $rang;
                    $deliberation_item_result->save();
                    $rang++;
                }
            }

            // for all students, calculate the deliberation_item with average (the average for all courses), mention, status, rang
            foreach ($students as $student) {
                $student_results = DeliberationItemResult::whereDeliberationId($deliberation->id)->whereClassLevelHasStudentId($student->class_level_has_students[0]->id)->get();

                $average = 0;
                foreach ($student_results as $student_result) {
                    $average += $student_result->average;
                }

                $coefs = 0;
                foreach ($student_results as $student_result) {
                    $coefs += $student_result->coef;
                }

                DeliberationItem::create([
                    'average' => $average / $coefs,
                    'status' => DeliberationItem::SUCCESS,
                    'mention' => $this->getMention(($average / $coefs), 10),
                    'class_level_has_student_id' => $student->class_level_has_students[0]->id,
                    'deliberation_id' => $deliberation->id,
                ]);
            }

            // recalculer les rangs pour tous les étudiants
            $deliberation_items = DeliberationItem::whereDeliberationId($deliberation->id)->orderBy('average', 'desc')->get();
            $rang = 1;
            foreach ($deliberation_items as $deliberation_item) {
                $deliberation_item->rang = $rang;
                $deliberation_item->save();
                $rang++;
            }

            DB::commit();
            return $deliberation;
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function checkIfDeliberationIsPossible(Request $request)
    {
        $data = $request->validate([
            'semester_id' => 'required|uuid|exists:semesters,id',
            'class_level_id' => 'required|uuid|exists:class_levels,id',
        ]);

        // test of class_leve_id
        $courses = ClassLevelHasCourse::with('tests')->whereClassLevelId($data['class_level_id'])->whereSemesterId($data['semester_id'])->get();

        if ($checker = $this->checkCNTPDeliberation($courses)) {
            return $checker;
        }

        return response()->json([
            'message' => 'ok'
        ]);
    }

    public function downloadResults(Deliberation $deliberation)
    {
        $deliberation = $deliberation->load(['classLevel', 'semester', 'schoolYear']);
        $rows = [];
        // return DeliberationItemResult::whereDeliberationId($deliberation->id)->distinct()->orderBy('class_level_has_course_id', 'ASC')->get(['class_level_has_course_id'])->toArray();
        $courses = DeliberationItemResult::whereDeliberationId($deliberation->id)->distinct()->orderBy('class_level_has_course_id', 'ASC')->get(['class_level_has_course_id'])->toArray();
        $headers = array_merge(['Matricule','Prénom/Nom'], array_map(fn ($item) => $item['class_level_has_course']["course"]['name'], $courses), ['Moyenne', 'Rang', 'Appréciations']);

        $dels = DeliberationItemResult::whereDeliberationId($deliberation->id)->orderBy('average', 'DESC')->get();
        $del_items = DeliberationItem::with('student')->whereDeliberationId($deliberation->id)->orderBy('average', 'DESC')->get();
        
        foreach ($del_items as $value) {
            $dels = DeliberationItemResult::whereClassLevelHasStudentId($value->class_level_has_student_id)->whereDeliberationId($deliberation->id)->orderBy('class_level_has_course_id', 'ASC')->get();
            $rows[] = [
                "student" => $value->student,
                "notes" => $dels,
                "final_note" => $value
            ];
        }
        // return $rows;
        return view('deliberation.deliberation_result',)->with([
            'semester' => $deliberation->semester,
            'deliberation' => $deliberation,
            'school_year' => $deliberation->schoolYear,
            'school' => School::find("78b4e080-3771-48aa-bffc-275899c3e65a"),
            'semester' => $deliberation->semester,
            'class_level' => $deliberation->classLevel,
            'headers' => $headers,
            'rows' => $rows
        ]);
    }

    private function checkCNTPDeliberation($courses)
    {
        // if courses is empty
        if ($courses->count() == 0) {
            return response()->json([
                'message' => 'Il faut ajouter au moins un cours et faire des examens pour chaque matière avant de faire la délibération',
            ], 422);
        }

        // check if all have one test or more
        foreach ($courses as $course) {
            if ($course->tests->count() == 0) {
                return response()->json([
                    'message' => "Le cours de {$course->course->name} enséigné par {$course->professor->first_name} {$course->professor->last_name} n'a pas de test, il faut ajouter au moins un test pour chaque matière avant de faire la délibération",
                    'course' =>  $course
                ], 422);
            }

            foreach ($course->tests as $test) {
                if (!$test->isFinish) {
                    return response()->json([
                        'message' => 'Il faut corriger tous les tests pour le cours ' . $course->course->name . " enséigné par {$course->professor->first_name} {$course->professor->last_name} avant de faire la délibération",
                        'course' => $course
                    ], 422);
                }
            }
        }
    }

    private function getMention(float $average, float $maxNote)
    {
        if ($average >= $maxNote * 0.9) {
            return DeliberationItem::EXCELLENT;
        } elseif ($average >= $maxNote * 0.8) {
            return DeliberationItem::VERY_GOOD;
        } elseif ($average >= $maxNote * 0.7) {
            return DeliberationItem::GOOD;
        } elseif ($average >= $maxNote * 0.6) {
            return DeliberationItem::PASSABLE;
        } elseif ($average >= $maxNote * 0.5) {
            return DeliberationItem::PASSABLE;
        } elseif ($average >= $maxNote * 0.4) {
            return DeliberationItem::MEDIOCRE;
        } elseif ($average >= $maxNote * 0.3) {
            return DeliberationItem::WEAK;
        }
        return DeliberationItem::VERY_WEAK;
    }
}
