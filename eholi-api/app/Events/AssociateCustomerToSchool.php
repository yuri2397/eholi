<?php

namespace App\Events;

use App\Models\AbstractModel;
use App\Models\School;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AssociateCustomerToSchool
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public AbstractModel $customer;
    public School $school;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(School $school, AbstractModel $customer)
    {
        $this->customer = $customer;
        $this->school = $school;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
