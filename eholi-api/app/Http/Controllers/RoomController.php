<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Room::with($request->with ?: []);

        if ($request->has('search_query')) {
            $query->where('label', 'LIKE', "%{$request->seach_query}%");
        }

        $query->orderBy($request->order_by ?: 'created_at', $request->order ?: 'DESC');

        return $query->simplePaginate($request->per_page ?: 15, $request->columns ?: '*', $request->page_name ?: 'page', $request->page ?: 1);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // validation
        $request->merge(['school_id', school_user()->id]);
        $room = Room::create($request->all());
        return $room;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function show(Room $room)
    {
        return $room->load(['school', 'building']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Room $room)
    {
        // validation

        $room->refresh()->update($request->all());
        return $room->refresh();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function destroy(Room $room)
    {
        $room->delete();
        return $room;
    }
}
