<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       if(Auth::user()->role == "isAdmin")
        {
            return inertia("Backend/Owners/Index",[
                "users" => UserResource::collection(
                User::where("role","isOwner")->with("properties")
                    ->latest()
                    ->paginate(20)
                    ->onEachSide(1)
             ),
            ]);
        }
        else
        {
        $user = Auth::user();

        return inertia('Dashboard', [
            "users" => new UserResource($user->load("properties")),
           /*  "properties" => PropertyResource::collection(
                Property::where("user_id", $user->id)
                    ->with("services")
                    ->latest()
                    ->paginate(1)
                    ->onEachSide(1)
            ), */
         ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
