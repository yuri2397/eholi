<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClassRoomRequest;
use App\Models\ClassRoom;
use Illuminate\Http\Request;

class ClassRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = ClassRoom::with($request->with ?: [])
            ->whereSchoolId(school_user()->id);

        if ($request->has('search_query')) {
            $query->where('name', 'LIKE', "%{$request->search_query}%");
        }

        return  $query->simplePaginate($request->per_page ?: 15, $request->columns ?: '*', $request->page_name ?: 'page', $request->page ?: 1);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ClassRoomRequest $request)
    {
        $request->validated();

        $request->merge(['school_id' => school_user()->id]);
        $class_room = ClassRoom::create($request->all());
        return $class_room;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ClassRoom  $class_room
     * @return \Illuminate\Http\Response
     */
    public function show(ClassRoom $class_room)
    {
        return $class_room;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ClassRoom  $class_room
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ClassRoom $class_room)
    {
        $request->merge(['school_id' => school_user()->id]);
        ClassRoom::whereId($class_room->id)->update($request->all());

        return $class_room->refresh();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ClassRoom  $class_room
     * @return \Illuminate\Http\Response
     */
    public function destroy(ClassRoom $class_room)
    {
        $class_room->delete();

        return $class_room;
    }
}
