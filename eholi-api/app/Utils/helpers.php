<?php

use App\Models\SchoolYear;
use App\Models\User;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\App;

if (!function_exists('school_year')) {


    function school_year($with_school = false)
    {
        if (($user = auth()->user())) {
            $school = school();

            $school_year = SchoolYear::with($with_school ? 'school' : [])->whereSchoolId($school->id)
                ->whereStatus(SchoolYear::ACTIVE)
                ->orderBy('created_at')
                ->first();

                if(!$school_year){
                    throw new Exception("Any active school year is available. Start a new school year.", 409);
                }
                return $school_year;
        }

        return throw new Exception('Unauthenticate 401', 401);
    }
}


if (!function_exists('school')) {

    /**
     * Get the authenticated User school instance.
     */

    function school()
    {
        if (auth()->user()) {
            $user = User::with(['owner.school_user.school'])->find(auth()->id());
            if ($user && $user->owner && $user->owner->school_user) {
                return $user->owner->school_user->school;
            }
            return throw new Exception('Not owner for the authenticated user.', 409);
        }

        return throw new Exception('Unauthenticate 401', 401);
    }
}
