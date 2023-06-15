<?php

use App\Http\Controllers\DeliberationController;
use App\Http\Controllers\StudentSubscribeController;
use App\Models\User;
use App\Models\Admin;
use App\Models\Ayah;
use App\Models\Deliberation;
use App\Models\School;
use App\Models\SchoolUser;
use App\Models\Surah;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;



/**
 * ROUTE TESTES
 */

Route::get('/deli/{deliberation}', [DeliberationController::class, 'downloadResults']);
Route::get('student-subscribes/class-level-ecard/{classLevel}', [StudentSubscribeController::class, "classLevelEcard"]);

Route::any('/', function () {
    ini_set('max_execution_time', 1200);

    // DB::delete('delete from ayahs');
    // DB::delete('delete from surahs');

    // foreach (Surah::orderBy('number', 'asc')->get() as $surah) {
    //     $url = "http://api.alquran.cloud/v1/surah/{$surah->number}";

    //     $ch = curl_init();
    //     curl_setopt($ch, CURLOPT_URL, $url);
    //     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    //     curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
    //     curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    //     curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
    //     curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
    //     $curl_response = curl_exec($ch);

    //     $result = json_decode($curl_response, true);
    //     $ayahs = $result['data']['ayahs'];
    //     foreach ($ayahs as $ayah) {
    //         $a = new Ayah();
    //         $a->number = $ayah['number'];
    //         $a->text = $ayah['text'];
    //         $a->number_inSurah = (int)$ayah['numberInSurah'];
    //         $a->juz = (int)$ayah['juz'];
    //         $a->manzil = (int)$ayah['manzil'];
    //         $a->page = (int) $ayah['page'];
    //         $a->ruku = (int)$ayah['ruku'];
    //         $a->hizb_quarter = $ayah['hizbQuarter'];
    //         $a->surah_id = $surah->id;
    //         $a->save();
    //     }
    // }

    // return $ayahs;


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
