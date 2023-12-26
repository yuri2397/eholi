<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Admin;
use App\Models\School;
use App\Models\SchoolUser;
use App\Models\SchoolYear;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class SuperAdminController extends Controller
{
    public function newSchool(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'name' => ['required'],
            'address' => ['required'],
            'phone' => 'required',
            'first_name' => ['required'],
            'last_name' => ['required'],
            'password' => ['required'],
            'start_at' => ['required'],
            'end_at' => ['required']
        ]);

        DB::beginTransaction();
        try {

            $request->merge(['reference' => School::generateReference()]);
            $school = School::create($request->only(['reference', 'name', 'address', 'phone', 'email']));


            $admin1 = new Admin();
            $admin1->first_name = $request->first_name;
            $admin1->last_name = $request->last_name;
            $admin1->email = $request->email;
            $admin1->telephone = $request->phone;
            $admin1->save();

            $user = new User();
            $user->username = $request->email;
            $user->password = Hash::make($request->password);
            $user->owner()->associate($admin1);
            $user->save();

            $role = Role::whereName('Super Admin')->first();
            $user->assignRole($role);
            $user->syncPermissions($role->permissions);

            $schoolUser = new SchoolUser();
            $schoolUser->user()->associate($admin1);
            $schoolUser->school_id = $school->id;
            $schoolUser->save();

             SchoolYear::create([
                "start_at" => $request->start_at,
                "end_at" => $request->end_at,
                "school_id" => $school->id,
                "status" => SchoolYear::ACTIVE
            ]);

            DB::commit();
            return $schoolUser->load(['user', 'school']);
        } catch (\Throwable $th) {
            DB::rollBack();
            return $th;
        }
    }
}
