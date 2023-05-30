<?php

namespace App\Http\Controllers;

use App\Models\Tutor;
use Illuminate\Http\Request;

class TutorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // get all tutors with search from request
        $tutors = Tutor::with($request->with ?: []);

        if ($request->has('search_query') && $request->search_query) {

            $tutors->where('reference', $request->search_query)
                ->orWhere('name', 'LIKE', "%{$request->search_query}%")
                ->orWhere('email', 'LIKE', "%{$request->search_query}%")
                ->orWhere('phone1', $request->search_query)
                ->orWhere('phone2', $request->search_query);
        }

        // order by
        $tutors->orderBy($request->order_by ?: 'created_at', $request->order ?: 'DESC');
        // paginate
        return $tutors->paginate($request->per_page ?: 15, $request->columns ?: '*', $request->page_name ?: 'page', $request->page ?: 1);
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
        $tutor = Tutor::create($request->all());
        // return
        return $tutor->refresh();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tutor  $tutor
     * @return \Illuminate\Http\Response
     */
    public function show(Tutor $tutor)
    {
        // return
        return $tutor;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tutor  $tutor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tutor $tutor)
    {
        // update
        $tutor->update($request->all());
        return $tutor->refresh();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tutor  $tutor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tutor $tutor)
    {
        // delete
        $tutor->delete();
        return $tutor;
    }
}
