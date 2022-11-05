<?php

namespace App\Listeners;

use App\Models\SchoolUser;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\AssociateCustomerToSchool;
use App\Models\SchoolStudent;
use Illuminate\Contracts\Queue\ShouldQueue;

class AssociateCustomerToSchoolListner
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\AssociateCustomerToSchool  $event
     * @return void
     */
    public function handle(AssociateCustomerToSchool $event)
    {
        $schoolUser = new SchoolStudent();
        $schoolUser->student_id = $event->customer->id;
        $schoolUser->school_id = $event->school->id;
        $schoolUser->save();
    }
}
