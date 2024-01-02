<?php

namespace App\Http\Controllers;

use App\Models\Ayah;
use Illuminate\Http\Request;

class AyahController extends Controller
{
    public function index(Request $request){
        $query = Ayah::query();

        if($request->has('hizb_quarter') && $request->hizb_quarter){
            $query->where('hizb_quarter', $request->hizb_quarter);
        }

        return $query->get();
    }

    public function show(Request $request, Ayah $ayah){


    }

    public function store(Request $request){

    }

    public function update(Request $request, Ayah $ayah)
    {

    }

}
