<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\TutorController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\BuildingController;
use App\Http\Controllers\SemesterController;
use App\Http\Controllers\AdmissionController;
use App\Http\Controllers\AyahController;
use App\Http\Controllers\ClassRoomController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\ClassLevelController;
use App\Http\Controllers\SchoolYearController;
use App\Http\Controllers\StudentSubscribeController;
use App\Http\Controllers\ClassLevelHasCourseController;
use App\Http\Controllers\DeliberationController;
use App\Http\Controllers\LevelHasSemesterController;
use App\Http\Controllers\StudentProgressionController;
use App\Http\Controllers\SurahController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\TimesTableController;
use App\Models\TestResult;

//Route::post('/add-new-school', [SuperAdminController::class, 'newSchool']);

/**
 * UserController
 */
Route::prefix('users')
    ->middleware(['auth:api', 'cors'])
    ->controller(UserController::class)
    ->group(function () {
        Route::post('authenticate', 'login')->withoutMiddleware(['auth:api']);
        Route::put('logout', 'logout');

        Route::get('/', 'index');
        Route::get('current-user', 'currentUser');
        Route::put('change-password', 'changePassword');
        Route::put('update-owner-data', 'updateUserOwnerData');
    });

/**
 * SchoolController
 */
Route::prefix('schools')
    ->middleware('auth:api')
    ->controller(SchoolController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::get('/{school}', 'show');
        Route::post('/', 'store');
        Route::put('/{school}', 'update');
        Route::delete('/{school}', 'destroy');
    });

/**
 * Courses
 */
Route::prefix('courses')
    ->middleware(['auth:api', 'cors'])
    ->controller(CourseController::class)
    ->group(function () {
        // CRUD
        Route::get('', 'index');
        Route::get('/{course}', 'show');
        Route::post('/', 'store');
        Route::put('/{course}', 'update');
        Route::delete('/{course}', 'destroy');
    });

/**
 * SchoolYearController
 */

Route::prefix('school-years')
    ->middleware(['auth:api', 'cors'])
    ->controller(SchoolYearController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::get('show', 'show');
        Route::get('/current-school-year', 'currentSchoolYear');
    });

/**
 * ProfessorController
 */

Route::prefix('professors')
    ->middleware(['auth:api', 'cors'])
    ->controller(ProfessorController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::get('/{professor}', 'show');

        Route::post('/', 'store');
        Route::put('/{professor}', 'update');
        Route::post('/{professor}/avatar', 'attachAvatar')->withoutMiddleware(
            'auth:api'
        );
    });

/**
 * StudentController
 */

Route::prefix('students')
    ->middleware(['auth:api', 'cors'])
    ->controller(StudentController::class)
    ->group(function () {
        Route::get('/', 'index');
        Route::get('{id}', 'show');
        Route::get('dashboard', 'dashboard');
        Route::post('/update-avatar/{student}', 'updateAvatar');
        Route::post('', 'store');
        Route::put('/{student}', 'update');
        Route::get('/{student}/meta-data', 'metaData');
        Route::delete('/{student}', 'destroy');
        // disable student in school
        Route::put('/{student}/disable', 'disableStudentInSchool');
    });

/**
 * ClassRoom
 */
Route::prefix('class-rooms')
    ->middleware(['auth:api', 'cors'])
    ->apiResource('class-rooms', ClassRoomController::class);

/**
 * ClassRoom
 */
Route::prefix('times-tables')
    ->middleware(['auth:api', 'cors'])
    ->apiResource('times-tables', TimesTableController::class);

/**
 * StudentSbscribe
 */
Route::prefix('student-subscribes')
    ->middleware(['auth:api', 'cors'])
    ->controller(StudentSubscribeController::class)
    ->group(function () {
        Route::get('/', 'index');
        Route::get('class-level-ecard/{classLevel}', 'classLevelEcard');
        Route::post('my-ecard', 'myECard');
        Route::get('/{id}', 'show');
        Route::put('/{id}', 'update');
    });

/**
 * ClassRoom
 */
Route::prefix('tutors')
    ->middleware(['auth:api', 'cors'])
    ->apiResource('tutors', TutorController::class);

/**
 * ClassLevelHasCourse
 */
Route::prefix('class-level-courses')
    ->middleware(['auth:api', 'cors'])
    ->apiResource('class-level-courses', ClassLevelHasCourseController::class);

/**
 * Semester Controller
 */
Route::prefix('semesters')
    ->middleware(['auth:api', 'cors'])
    ->apiResource('semesters', SemesterController::class);

/**
 * Level
 */
Route::prefix('levels')
    ->middleware(['auth:api', 'cors'])
    ->apiResource('levels', LevelController::class);

/**
 * ClassLevel
 */
Route::prefix('class-levels')
    ->middleware(['auth:api', 'cors'])
    ->apiResource('class-levels', ClassLevelController::class);


/**
 * Tests
 */
Route::prefix('tests')
    ->middleware(['auth:api', 'cors'])
    ->controller(TestController::class)
    ->group(function () {
        Route::get('/', 'index');
        Route::get('/student-tests-result', 'studentTests');
        Route::post('/download-results', "downloadResults");
        Route::get('/{test}', 'show');
        Route::post('/', 'store');
        Route::put('/{test}', 'update');
        Route::delete('/{test}', 'destroy');
        Route::put('/update-test-result/{testResult}', 'updateTestResult');
    });

/**
 * Tests Results
 */
Route::prefix('test-results')
    ->middleware(['auth:api', 'cors'])
    ->apiResource('test-results', TestResult::class);

Route::prefix('level-semesters')
    ->middleware(['auth:api', 'cors'])
    ->apiResource('level-semesters', LevelHasSemesterController::class);
/**
 * Tests Results
 */
Route::prefix('deliberations')
    ->middleware(['auth:api', 'cors'])->controller(DeliberationController::class)->group(function () {
        // crud
        Route::get('/', 'index');
        Route::get('/student-results', 'studentDeliberation');
        Route::put('/confirm-deliberation/{deliberation}', 'confirmDeliberation');
        Route::post('/recreate-deliberation/{deliberation}', "reCreateDeliberation");
        Route::post('/download-builtin', 'downloadStudentBultin');
        Route::get('/{deliberation}', 'show');
        Route::post('/', 'store');
        Route::put('/{deliberation}', 'update');
        Route::delete('/{deliberation}', 'destroy');
        Route::post('/check-deliberation', 'checkIfDeliberationIsPossible');
        Route::post('/download-results/{deliberation}', 'downloadResults');
    });

/**
 * Room
 */
Route::prefix('rooms')
    ->middleware(['auth:api', 'cors'])
    ->apiResource('rooms', RoomController::class);

/**
 * Surahs
 */
Route::prefix('surahs')
    ->middleware(['auth:api', 'cors'])
    ->controller(SurahController::class)->group(function(){
        Route::get('/', 'index');
        Route::get("/{surah}", "show");
    });

/**
 * Ayats
 */
Route::prefix('ayats')
    ->middleware(['auth:api', 'cors'])
    ->apiResource('ayats', AyahController::class);


Route::prefix('progressions')
    ->middleware(['auth:api', 'cors'])->controller(StudentProgressionController::class)->group(function () {
        Route::get('/student-progressions/{student}', 'studentProgression');
        Route::get('/student-progression-details/{studentProgression}', 'studentProgressionDetails');

        Route::post('/store', 'store');
        Route::delete('/delete/{studentProgression}', 'destroy');
        Route::put('/valid/{studentProgression}', 'valid');
        Route::post('/attach-new-ayah', 'attachNewAyah');
    });

/**
 * Admissions
 */
Route::prefix('admissions')
    ->middleware(['auth:api', 'cors'])
    ->apiResource('admissions', AdmissionController::class);

/**
 * Building
 */
Route::prefix('buildings')
    ->middleware(['auth:api', 'cors'])
    ->apiResource('buildings', BuildingController::class);



/**
 * TEST URL
 */
// Route::any(
//     'local',
//     function (Request $request) {
//         // $timesTable = TimesTable::find('cd249943-76fc-49ab-b4ec-23cb35a43171');

//         $school = School::first();
//         // $student = SchoolStudent::with($request->with ?? [])
//         //     ->join('students as S', 'S.id', 'school_students.student_id')
//         //     ->whereSchoolId($school->id)
//         //     ->where('school_students.status', true)
//         //     ->where('S.status', true)
//         //     ->limit(3)
//         //     ->get();

//         // foreach ($student as $value) {
//         //     $clhs = new ClassLevelHasStudent();
//         //     $clhs->student_id = $value->id;
//         //     $clhs->class_level_id = '005107dc-8949-4ea0-80b8-da7945dfec4a';
//         //     $clhs->save();
//         // }
//         // foreach (Student::all() as $value) {
//         //     event(new AssociateCustomerToSchool($school, $value));
//         // }

//         // return SchoolStudent::all();

//         // $sy = new SchoolYear();
//         // $sy->start_at = now()->subYear();
//         // $sy->end_at = now();
//         // $sy->status = SchoolYear::INACTIVE;
//         // $sy->school_id = $school->id;
//         // $sy->save();

//         // return school_year(true);

//     //     $school = new School();

//     // $school->reference = time();
//     // $school->name = "Cours Privé Seydi Jamil";
//     // $school->address = "Yeumbeul Nord, Route de Boune";
//     // $school->email = "seydijamil.cp@digita.com";
//     // $school->phone = "338340405";
//     // $school->save();

//     //     DB::beginTransaction();
//     //     try {
//     //         $admin = new Admin();
//     //         $admin->first_name = "Sophiatou";
//     //         $admin->last_name = "Mbathie";
//     //         $admin->email = "sophie.mbathie@holi.sn";
//     //         $admin->telephone = "786739908";
//     //         $admin->save();

//     //         $user = new User();
//     //         $user->username = 'sophie';
//     //         $user->password = Hash::make('password');
//     //         $user->owner()->associate($admin);
//     //         $user->save();

//     //         $role = Role::whereName('Super Admin')->first();
//     //         $user->assignRole($role);
//     //         $user->syncPermissions($role->permissions);

//     //         $school = School::first();

//     //         $schoolUser = new SchoolUser();
//     //         $schoolUser->user()->associate($admin);
//     //         $schoolUser->school_id = $school->id;
//     //         $schoolUser->save();

//     //         DB::commit();
//     //         return $schoolUser->load(['user', 'school']);
//     //     } catch (\Throwable $th) {
//     //         DB::rollBack();
//     //         return $th;
//     //     }
//     }
// )->middleware(['cors']);
