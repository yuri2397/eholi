<?php

use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\Route;



/**
 * ROUTE TESTES
 */

Route::any('/tests', function (Request $request) {
    // DB::beginTransaction();
    // try {
    //     $admin = new Admin();
    //     $admin->first_name = "Mor";
    //     $admin->last_name = "Diaw";
    //     $admin->email = "mor.diaw@holi.sn";
    //     $admin->telephone = "771879981";
    //     $admin->save();

    //     $user = new User();
    //     $user->username = 'king';
    //     $user->password = Hash::make('password');
    //     $user->owner()->associate($admin);
    //     $user->save();

    //     $role = Role::whereName('King')->first();
    //     $user->assignRole($role);
    //     $user->syncPermissions($role->permissions);
    //     DB::commit();
    //     return $user;
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
});
