<?php

namespace App\Http\Controllers;

use App\Http\Requests\SchoolRequest;
use App\Models\School;
use Illuminate\Http\Request;

class SchoolController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return School::with($request->with ?: [])
            ->where('name', 'LIKE', '%' . $request->search_query ?: '' . '%')
            ->orWhere('reference', 'LIKE', '%' . $request->search_query ?: '' . '%')
            ->orWhere('phone', 'LIKE', '%' . $request->search_query ?: '' . '%')
            ->orWhere('email', 'LIKE', '%' . $request->search_query ?: '' . '%')
            ->orderBy($request->order_by ?: 'created_at', $request->order ?: 'DESC')
            ->simplePaginate($request->per_page ?: null, $request->columns ?: '*', $request->page_name ?: null, $request->page ?: null);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SchoolRequest $request)
    {
        // $request->validate();
        $request->merge(['reference' => School::BASE_REFERENCE . time()]);
        $school = School::create($request->all());
        return $school;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\School  $school
     * @return \Illuminate\Http\Response
     */
    public function show(School $school)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\School  $school
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, School $school)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\School  $school
     * @return \Illuminate\Http\Response
     */
    public function destroy(School $school)
    {
    }

    
}
