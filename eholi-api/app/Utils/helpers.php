<?php

use App\Models\SchoolYear;
use App\Models\User;

if (!function_exists('school_year')) {


    function school_year($with_school = false)
    {
        if (($user = auth()->user())) {
            $school = school_user();
            return SchoolYear::with($with_school ? 'school' : [])->whereSchoolId($school->id)
                ->whereStatus(SchoolYear::ACTIVE)
                ->orderBy('created_at')
                ->first();
        }

        return throw new Exception('Unauthenticate 401', 401);
    }
}


if (!function_exists('school_user')) {


    function school_user()
    {
        if (auth()->user()) {
            $owner = User::with(['owner.school_user.school'])->find(auth()->id());
            if ($owner && $owner->owner && $owner->owner->school_user) {
                return $owner->owner->school_user->school;
            }
            return throw new Exception('Not owner for the authenticated user.', 409);
        }

        return throw new Exception('Unauthenticate 401', 401);
    }
}
