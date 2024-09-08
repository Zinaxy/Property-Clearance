<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\PropertyRequest;
use App\Http\Resources\PropertyResource;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if(Auth::user()->role == "isAdmin")
        {
            return inertia("Backend/Property/Index",[
                "properties" => PropertyResource::collection(
                Property::where("status","assigned")->with("services")
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
            "properties" => PropertyResource::collection(
                Property::where("user_id", $user->id)
                    ->with("services")
                    ->latest()
                    ->paginate(1)
                    ->onEachSide(1)
            ),
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
    public function store(PropertyRequest $request)
    {
        $validated = $request->validated();
        //dd($validated);
        Property::create($validated);
        return to_route("property.index")->with("success", "Property Created Successfull");
    }

    /**
     * Display the specified resource.
     */
    public function show(Property $property)
    {
        return inertia("Backend/Property/Show",[
            //"users" => new UserResource($user->load("properties")),
            "property" => new PropertyResource(
                Property::where("id", $property->id)
                    ->with("services","user")
                    ->first()
            ),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Property $property)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Property $property)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Property $property)
    {
        //
    }
}
