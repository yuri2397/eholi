<?php

namespace App\Http\Controllers;

use App\Models\Surah;
use Illuminate\Http\Request;

class SurahController extends Controller
{
    public function index(Request $request)
    {
        $query = Surah::with($request->with ?? []);

        if ($request->has('search') && $request->search) {
            $query->where('name', 'LIKE', "%$request->search%")
            ->orWhere('number', $request->search);
        }


        $query->orderBy('number', 'ASC');

        if ($request->has('per_page') && $request->has('page')) {
            return $query->paginate($request->per_page ?: 15, $request->columns ?: '*', $request->page_name ?: 'page', $request->page ?: 1);
        }

        return $query->get();
    }

    public function show(Request $request, Surah $surah)
    {
    }

    public function store(Request $request)
    {
    }

    public function update(Request $request, Surah $surah)
    {
    }
}
