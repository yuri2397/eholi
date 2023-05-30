<?php

use App\Http\Controllers\DeliberationController;
use App\Models\User;
use App\Models\Admin;
use App\Models\Deliberation;
use App\Models\School;
use App\Models\SchoolUser;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;



/**
 * ROUTE TESTES
 */

 Route::get('/deli/{deliberation}',[ DeliberationController::class, 'downloadResults']);

Route::any('/', function () {

    


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

    // $school = new School();

    // $school->reference = time();
    // $school->name = "Cours Privé Seydi Jamil";
    // $school->address = "Yeumbeul Nord, Route de Boune";
    // $school->email = "seydijamil.cp@gmail.com";
    // $school->phone = "338340405";
    // $school->save();
    // return $school;

    // return SchoolUser::with(['user'])->where('school_id', '78b4e080-3771-48aa-bffc-275899c3e65a')->get(['user_id', 'user_type']);

    // $user = User::create([]);

    // return $user;
});
