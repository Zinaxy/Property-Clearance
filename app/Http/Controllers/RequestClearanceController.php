<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Property;
use Illuminate\Http\Request;
use App\Models\RequestClearance;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\PropertyResource;
use App\Http\Resources\ClearanceResource;

class RequestClearanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         if(Auth::user()->role == "isAdmin")
        {
            return inertia("Backend/Clearance/Index",[
                "clearances" => ClearanceResource::collection(
                 RequestClearance::with("property","user")
                    ->latest()
                    ->paginate(10)
                    ->onEachSide(1)
            ),
                    "success" => Session("success"),
                ]);
        }
        else if(Auth::user()->role == "isSuperAdmin")
        {
            return inertia("DirectorDashboard",[
                 "clearances" => ClearanceResource::collection(
                 RequestClearance::with("property","user")
                 ->where("status","approved")
                    ->latest()
                    ->paginate(10)
                    ->onEachSide(1)
                    ),
                    "success" => Session("success"),
                ]);
        }
        else
        {
        $user = Auth::user();

        return inertia('Frontend/Clearance/Index', [
            "clearances" => ClearanceResource::collection(
                 RequestClearance::where("user_id", $user->id)
                    ->with("property")
                    ->latest()
                    ->paginate(10)
                    ->onEachSide(1)
            ),
             "success" => Session("success"),
         ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         $user = Auth::user();
         return inertia('Frontend/Clearance/Create', [
            "properties" => PropertyResource::collection(
                Property::where("user_id", $user->id)
                    ->with("services")
                    ->latest()
                    ->paginate(10)
                    ->onEachSide(1)
            ),
             "success" => Session("success"),
         ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "property_id" => "required",
            "image" => "required|image|mimes:png,jpg,jpeg,webp,svg",
        ]);

        if ($request->hasFile('image')) {
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $image = time(). '_image'.'.' . $extension;
                $file->move('images/clearence/', $image);
                $data['image'] = $image;
            }
            else
            {
                $data['image'] = "placeholder.png";
            }
        $data["user_id"] = Auth::user()->id;

        RequestClearance::create($data);
        return to_route("clearances.index")->with("success","Clearance Form Requested successfully");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if(Auth::user()->role == "isAdmin")
        {
        $clearance = RequestClearance::FindorFail($id);
         return inertia("Backend/Clearance/Show",[
            "clearance" => $id,
            "property" => new PropertyResource(
                Property::where("id", $clearance->property_id)
                    ->with("services","user")
                    ->first()
            ),
        ]);
        }
        elseif(Auth::user()->role == "isSuperAdmin")
        {
        $clearance = RequestClearance::FindorFail($id);
         return inertia("Backend/Director/Show",[
            "clearance" => $id,
            "property" => new PropertyResource(
                Property::where("id", $clearance->property_id)
                    ->with("services","user")
                    ->first()
            ),
        ]);
        }
        else
        {
        $user = Auth::user();
        $clearance = RequestClearance::FindorFail($id);
            if($clearance->final_status == "approved")
            {
                return inertia('Frontend/Clearance/Show', [
                "clearance" => new ClearanceResource($clearance),
                "property" => new PropertyResource(
                    Property::where("id", $clearance->property_id)
                        ->with("services","user","clearance")
                        ->first()
                ),
            ]);
            }
            else
            {
                $user = Auth::user();

                return inertia('Frontend/Clearance/Index', [
                    "clearances" => ClearanceResource::collection(
                        RequestClearance::where("user_id", $user->id)
                            ->with("property")
                            ->latest()
                            ->paginate(10)
                            ->onEachSide(1)
                    ),
                    "success" => Session("success"),
                ]);
            }
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RequestClearance $requestClearance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            "clearance_id"=>"required",
            "status"=>"required",
            "final_status"=>"required",
            "feedback"=>"nullable",
        ]);
        $clearance = RequestClearance::FindorFail($id);
        $clearance->status = $request->status;
        if($request->status == "approved")
        {
            $clearance->final_status = $request->final_status;
           $clearance->expire_date = Carbon::now()->addMonths(4);
        }
        else{
            $clearance->final_status = "pending";
        }
        if($clearance->feedback == null)
        {
            $clearance->feedback = $request->feedback;
        }

        $clearance->update();
        return to_route("clearances.index")->with("success","Clearance Form ".$request->status." successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $requestClearance = RequestClearance::findorFail($id);
        $requestClearance->delete();
         return to_route("clearances.index")->with("success","Request  Deleted Successfull");
    }
}
