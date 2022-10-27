<?php

use App\Models\User;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\SchoolYearController;
use App\Models\School;
use Spatie\Permission\Contracts\Role as ContractsRole;


/**
 * UserController
 */
Route::prefix('users')->middleware('auth:api')->controller(UserController::class)->group(function () {
    Route::post('authenticate', 'login')->withoutMiddleware('auth:api');
    Route::put('logout', 'logout');

    Route::get('/', 'index');
    Route::get('current-user', 'currentUser');
});


/**
 * SchoolController
 */

Route::prefix('schools')->middleware('auth:api')->controller(SchoolController::class)->group(function () {
    Route::get('', 'index');
    Route::get('show', 'show');
    Route::post('store', 'store');
    Route::put('update/{school}', 'update');
    Route::delete('destroy/{school}', 'destroy');
});


/**
 * SchoolYearController
 */

Route::prefix('school-years')->middleware('auth:api')->controller(SchoolYearController::class)->group(function () {
    Route::get('', 'index');
    Route::get('show', 'show');
});

/**
 * ProfessorController
 */

Route::prefix('professors')->middleware('auth:api')->controller(ProfessorController::class)->group(function () {
    Route::get('', 'index');
    Route::get('show/professor', 'show');

    Route::post('create', 'create');
    Route::put('update/professor', 'update');
});
