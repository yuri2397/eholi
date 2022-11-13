<?php

use App\Models\User;
use App\Models\Admin;
use App\Models\School;
use App\Models\Student;
use App\Models\SchoolUser;
use App\Models\SchoolYear;
use Illuminate\Http\Request;
use App\Models\SchoolStudent;
use App\Events\AssociateUserTo;
use App\Models\StudentSubscribe;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Events\AssociateCustomerToSchool;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\BuildingController;
use App\Http\Controllers\ClassLevelController;
use App\Http\Controllers\ClassRoomController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\SchoolYearController;
use App\Models\ClassLevel;
use Spatie\Permission\Contracts\Role as ContractsRole;


/**
 * UserController
 */
Route::prefix('users')->middleware(['auth:api', 'cors'])->controller(UserController::class)->group(function () {
    Route::post('authenticate', 'login')->withoutMiddleware(['auth:api']);
    Route::put('logout', 'logout');

    Route::get('/', 'index');
    Route::get('current-user', 'currentUser');
});


/**
 * SchoolController
 */
Route::prefix('schools')->middleware('auth:api')->controller(SchoolController::class)->group(function () {
    Route::get('', 'index');
    Route::get('/{school}', 'show');
    Route::post('/', 'store');
    Route::put('/{school}', 'update');
    Route::delete('/{school}', 'destroy');
});

/**
 * Courses
 */
Route::prefix('courses')->middleware(['auth:api', 'cors'])->controller(CourseController::class)->group(function () {
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

Route::prefix('school-years')->middleware(['auth:api', 'cors'])->controller(SchoolYearController::class)->group(function () {
    Route::get('', 'index');
    Route::get('show', 'show');
});

/**
 * ProfessorController
 */

Route::prefix('professors')->middleware(['auth:api', 'cors'])->controller(ProfessorController::class)->group(function () {
    Route::get('', 'index');
    Route::get('/{professor}', 'show');

    Route::post('/', 'create');
    Route::put('/{professor}', 'update');
});

/**
 * StudentController
 */

Route::prefix('students')->middleware(['auth:api', 'cors'])->controller(StudentController::class)->group(function () {
    Route::get('', 'index');
    Route::get('/dashboard', 'dashboard');
    Route::get('/{student}', 'show');

    Route::post('', 'store');
    Route::put('/{student}', 'update');
});

/**
 * ClassRoom
 */
Route::prefix('class-rooms')
    ->middleware(['auth:api', 'cors'])
    ->apiResource('class-rooms', ClassRoomController::class);

/**
 * ClassLevel
 */
Route::prefix('class-levels')
    ->middleware(['auth:api', 'cors'])
    ->apiResource('class-levels', ClassLevelController::class);

/**
 * Room
 */
Route::prefix('rooms')
    ->middleware(['auth:api', 'cors'])
    ->apiResource('rooms', RoomController::class);



/**
 * Building
 */
Route::prefix("buildings")->middleware(['auth:api', 'cors'])
    ->apiResource('buildings', BuildingController::class);



/**
 * TEST URL
 */
Route::any('tests', function (Request $request) {

    $school = school_user();
    // foreach (Student::all() as $value) {
    //     event(new AssociateCustomerToSchool($school, $value));
    // }

    // return SchoolStudent::all();

    // $sy = new SchoolYear();
    // $sy->start_at = now()->subYear();
    // $sy->end_at = now();
    // $sy->status = SchoolYear::INACTIVE;
    // $sy->school_id = $school->id;
    // $sy->save();

    return school_year(true);

    // DB::beginTransaction();
    // try {
    //     $admin = new Admin();
    //     $admin->first_name = "Sophiatou";
    //     $admin->last_name = "Mbathie";
    //     $admin->email = "sophie.mbathie@holi.sn";
    //     $admin->telephone = "786739908";
    //     $admin->save();

    //     $user = new User();
    //     $user->username = 'sophie';
    //     $user->password = Hash::make('password');
    //     $user->owner()->associate($admin);
    //     $user->save();

    //     $role = Role::whereName('Super Admin')->first();
    //     $user->assignRole($role);
    //     $user->syncPermissions($role->permissions);

    //     $school = School::first();

    //     $schoolUser = new SchoolUser();
    //     $schoolUser->user()->associate($admin);
    //     $schoolUser->school_id = $school->id;
    //     $schoolUser->save();

    //     DB::commit();
    //     return $schoolUser->load(['user', 'school']);
    // } catch (\Throwable $th) {
    //     DB::rollBack();
    //     return $th;
    // }
})->middleware(['auth:api', 'cors']);
