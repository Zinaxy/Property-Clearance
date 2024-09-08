<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Payment;
use App\Models\Property;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\PaymentRequest;
use App\Http\Resources\PaymentResource;
use App\Http\Resources\PropertyResource;
use App\Http\Requests\UpdatePaymentRequest;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         if(Auth::user()->role == "isAdmin")
        {
            return inertia("Backend/Payment/Index",[
                    "payments" => PaymentResource::collection(
                        Payment::with("service")
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

        return inertia('Frontend/Payment/Index', [
            "users" => new UserResource($user->load("properties")),
            "payments" => PaymentResource::collection(
                Payment::where("user_id", $user->id)
                    ->with("service")
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
        return inertia("Frontend/Payment/Create",[
            "properties" => PropertyResource::collection(
                Property::where("user_id", Auth::user()->id)
                    ->with("services")
                    ->latest()
                    ->get()
            ),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PaymentRequest $request)
    {
        $data = $request->validated();
         if ($request->hasFile('image')) {
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $image = time(). '_image'.'.' . $extension;
                $file->move('images/payments/', $image);
                $data['image'] = $image;
            }
            else
            {
                $data['image'] = "placeholder.png";
            }
            $data['user_id'] = Auth::user()->id;
        Payment::create($data);
        return to_route("payments.index")->with("success","Payment Upploaded Successfull");
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
          return inertia("Backend/Payment/Show",[
            "payment" => new PaymentResource($payment),
            "properties" => PropertyResource::collection(
                Property::where("user_id", Auth::user()->id)
                    ->with("services")
                    ->latest()
                    ->get()
            ),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        return inertia("Frontend/Payment/Edit",[
            "payment" => new PaymentResource($payment),
            "properties" => PropertyResource::collection(
                Property::where("user_id", Auth::user()->id)
                    ->with("services")
                    ->latest()
                    ->get()
            ),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaymentRequest $request, Payment $payment)
    {
         $data = $request->validated();
        // dd($data);
         if ($request->hasFile('image')) {
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $image = time(). '_image'.'.' . $extension;
                $file->move('images/payments/', $image);
                $data['image'] = $image;
            }
            else
            {
                $data['image'] = $payment->image;
            }
            //$data['user_id'] = Auth::user()->id;
        $payment->update($data);
        return to_route("payments.index")->with("success","Payment Updated Successfull");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        $payment->delete();
         return to_route("payments.index")->with("success","Payment Deleted Successfull");
    }
}
