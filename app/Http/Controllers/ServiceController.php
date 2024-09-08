<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function show(Service $service)
    {


    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
{
    $request->validate([
        "service_id" => "required",
        "amount_usd" => "required",
        "status" => "required",
    ]);

    if ($request->status == "approved") {
        $service->arreas -= $request->amount_usd;
        if ($service->arreas <= 0) {
            $service->current_amount -= abs($service->arreas);
            $service->arreas = 0;
        } else {
            $service->current_amount += $request->amount_usd;
        }
        $service->save(); // Save the updated service model
    }

    // Retrieve the Payment instance first
    $payment = Payment::where("service_id", $request->service_id)->first();

    if ($payment) {
        $payment->status = $request->status;
        $payment->save(); // Save the updated payment model
    }

    return to_route("payments.index")->with("success", "Payment " . $request->status);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        //
    }
}
