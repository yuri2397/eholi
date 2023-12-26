<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfessorRequest;
use App\Models\Media;
use App\Models\Professor;
use App\Models\SchoolHasProfessor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
            ->join(
                'professors as P',
                'P.id',
                '=',
                'school_has_professors.professor_id'
            );
        if ($request->has('search_query') && $request->search_query) {
            $query->where(function ($q) use ($request) {
                $q
                    ->where(
                        'P.first_name',
                        'LIKE',
                        "%{$request->search_query}%"
                    )
                    ->orWhere(
                        'P.last_name',
                        'LIKE',
                        "%{$request->search_query}%"
                    )
                    ->orWhere(
                        'P.telephone',
                        'LIKE',
                        "%{$request->search_query}%"
                    );
            });
        }

        return $query->paginate(
            $request->per_page ?: 15,
            $request->columns ?: '*',
            $request->page_name ?: 'page',
            $request->page ?: 1
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\ProfessorRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $request->validated();

        DB::beginTransaction();

        try {
            if ($request->has('professor_id')) {
                $professor = Professor::find($request->professor_id);
            } else {
                $request->merge([
                    'school_id' => school()->id,
                    'reference' => Professor::generateReference(),
                ]);
                $professor = Professor::create($request->all());
            }

            // attach professor to school
            SchoolHasProfessor::create([
                'school_id' => school()->id,
                'professor_id' => $professor->id,
                'type' => SchoolHasProfessor::TYPE_FULL,
                'poste' => $request->poste,
            ]);
            DB::commit();
            return SchoolHasProfessor::where('school_id', school()->id)
                ->join(
                    'professors',
                    'professors.id',
                    'school_has_professors.professor_id'
                )
                ->first();
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'message' => $th->getMessage(),
                'code' => $th->getCode(),
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Professor  $professor
     * @return \Illuminate\Http\Response
     */
    public function show(Professor $professor)
    {
        if (school()) {
            return SchoolHasProfessor::with('professor')
                ->where('school_id', school()->id)
                ->where('professor_id', $professor->id)
                ->first();
        }
        return $professor;
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

    public function attachAvatar(Request $request, $professor_id)
    {
        if ($request->hasFile('avatar')) {
            $professor = Professor::find($professor_id);
            foreach ($professor->media as $media) {
                $media->delete();
            }
            $professor->setAvatar($request->file('avatar'));

            return $professor->refresh();
        }
        return response()->json(
            [
                'message' => 'No avatar found',
            ],
            422
        );
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
