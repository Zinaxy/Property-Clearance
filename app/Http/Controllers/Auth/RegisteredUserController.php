<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;
use App\Providers\RouteServiceProvider;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register',[
            "status" => Session("status")
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
{
    $request->validate([
        'role' => 'required|string|max:255',
        'name' => 'required|string|max:255|regex:/^[a-zA-Z\s]+$/',
        'surname' => 'required|string|max:255|regex:/^[a-zA-Z\s]+$/',
        'phone' => 'required',
        'account' => 'required|string|exists:properties,account', // Validate that the account exists in properties
        'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    // Find the property with the provided account number and status "available"
    $property = Property::where('account', $request->account)
                        ->where('status', 'available')
                        ->first();

    // If a matching property is found, create the user and assign the property
    if ($property) {
        $user = User::create([
            'role' => $request->role,
            'name' => $request->name,
            'surname' => $request->surname,
            'phone' => $request->phone,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Assign the user to the property and update the property status
        $property->update(['user_id' => $user->id, 'status' => 'assigned']);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    } else {
        return redirect(RouteServiceProvider::REGISTER)
            ->with("status", "Invalid or unavailable account number");
    }
}
}
