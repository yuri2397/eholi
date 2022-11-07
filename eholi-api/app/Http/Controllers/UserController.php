<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function login(LoginRequest $request)
    {
        $request->validated();

        $user = User::whereUsername($request->username)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            return $user->createToken($user->username);
        }

        return response()->json([
            'message' => 'Username or password is invalid.'
        ], 422);
    }

    public function logout()
    {
        return auth()->user();
    }

    public function index(Request $request)
    {
        return User::with($request->with ?: [])
            ->where('username', 'LIKE', '%' . $request->search_query ?: '' . '%')
            ->orderBy($request->order_by ?? 'created_at', $request->order ?? 'DESC')
            ->simplePaginate($request->per_page ?: null, $request->columns ?: '*', $request->page_name ?: null, $request->page ?: null);
    }

    public function currentUser(Request $request)
    {
        return User::with($request->with ?? [])->find(auth()->id());
    }
}
