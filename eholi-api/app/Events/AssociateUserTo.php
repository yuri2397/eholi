<?php

namespace App\Events;

use App\Models\AbstractModel;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AssociateUserTo
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public AbstractModel $model;
    public $username;
    public $password;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(AbstractModel $model, string $username = null, string $password = null)
    {
        $this->model = $model;
        $this->username = $username;
        $this->password = $password;
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
