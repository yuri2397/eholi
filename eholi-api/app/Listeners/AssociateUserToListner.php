<?php

namespace App\Listeners;

use App\Events\AssociateUserTo;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Hash;

class AssociateUserToListner
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
     * @param  \App\Events\AssociateUserTo  $event
     * @return void
     */
    public function handle(AssociateUserTo $event)
    {
        $user = new User();
        if ($event->username) {
            $user->username = $event->username;
        } else {
            $user->user = $event->model::BASE_REFERENCE . time();
        }

        if ($event->password) {
            $user->password = Hash::make($event->password);
        } else {
            $user->password = $user->username;
        }

        $user->owner()->associate($event->model);
    }
}
