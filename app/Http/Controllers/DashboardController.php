<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Payment;
use App\Models\Property;
use Illuminate\Http\Request;
use App\Models\RequestClearance;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\PropertyResource;
use App\Http\Resources\ClearanceResource;

class DashboardController extends Controller
{
    public function index()
    {
        if(Auth::user()->role == "isAdmin")
        {
            return inertia("AdminDashboard",[
                "propertyCount" => Property::where("status","assigned")->count(),
                "paymentsCount" => Payment::where("status","pending")->count(),
                "owners" => User::where("role","isOwner")->count(),
                "clearance" => RequestClearance::where("status","pending")->count(),
            ]);
        }
        elseif(Auth::user()->role == "isSuperAdmin")
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

        return inertia('Dashboard', [
            "users" => new UserResource($user->load("properties")),
            "clearanceP" => RequestClearance::where("status", "pending")
                               ->where("user_id", $user->id)
                               ->count(),
            "clearanceA" => RequestClearance::where("status", "approved")
                               ->where("user_id", $user->id)
                               ->count(),
            "properties" => PropertyResource::collection(
                Property::where("user_id", $user->id)
                    ->with("services")
                    ->latest()
                    ->paginate(1)
                    ->onEachSide(1)
            ),
            "payments" => Payment::where("status","pending")->where("user_id", $user->id)
                               ->count(),
         ]);
        }
    }
}
