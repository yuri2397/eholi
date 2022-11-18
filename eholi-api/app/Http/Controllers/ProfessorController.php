<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfessorRequest;
use App\Models\Professor;
use App\Models\SchoolHasProfessor;
use Illuminate\Http\Request;

class ProfessorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = SchoolHasProfessor::with($request->with ?: [])
            ->where('school_id', school()->id)
            ->join('professors', 'professors.id', '=', 'school_has_professors.professor_id');

        if ($request->has('search_query') && $request->search_query) {
            $query->where(
                function ($q) use ($request) {
                    $q->where('professors.name', 'LIKE', "%{$request->search_query}%")
                        ->orWhere('professors.email', 'LIKE', "%{$request->search_query}%")
                        ->orWhere('professors.phone', 'LIKE', "%{$request->search_query}%");
                }
            );
        }

        return $query->paginate($request->per_page ?: 15, $request->columns ?: '*', $request->page_name ?: 'page', $request->page ?: 1);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProfessorRequest $request)
    {
        // $request->validate();

        if ($request->has('professor_id')) {
            $professor = Professor::find($request->professor_id);
        } else {
            $request->merge([
                'school_id' => school()->id,
                'reference' => Professor::BASE_REFERENCE . time()
            ]);
            $professor = Professor::create($request->all());
        }

        // attach professor to school
        SchoolHasProfessor::create([
            'school_id' => school()->id,
            'professor_id' => $professor->id,
            'type' => SchoolHasProfessor::TYPE_FULL,
            'post' => $request->post
        ]);

        return $professor->refresh();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Professor  $professor
     * @return \Illuminate\Http\Response
     */
    public function show(Professor $professor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Professor  $professor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Professor $professor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Professor  $professor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Professor $professor)
    {
        //
    }
}
