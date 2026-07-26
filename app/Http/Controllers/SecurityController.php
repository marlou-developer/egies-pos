<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class SecurityController extends Controller
{
    private function requireSuperAdmin()
    {
        if (Auth::user()?->user_type !== 'Super Admin') {
            abort(403, 'Only Super Admin can manage the security PIN.');
        }
    }

    /**
     * Return whether ANY Super Admin has a PIN configured.
     * Accessible by any authenticated user (used by VerifyPinModal).
     */
    public function status()
    {
        $hasPinConfigured = User::where('user_type', 'Super Admin')
            ->whereNotNull('security_pin')
            ->exists();

        return response()->json(['has_pin' => $hasPinConfigured]);
    }

    /**
     * Return whether the Super Admin has a PIN set (superadmin only).
     */
    public function index()
    {
        $this->requireSuperAdmin();
        $user = Auth::user();
        return response()->json([
            'has_pin' => !is_null($user->security_pin),
        ]);
    }

    /**
     * Set or update the security PIN.
     */
    public function store(Request $request)
    {
        $this->requireSuperAdmin();
        $user = Auth::user();

        $rules = [
            'pin'         => 'required|digits_between:4,8',
            'confirm_pin' => 'required|same:pin',
        ];

        if ($user->security_pin) {
            $rules['current_pin'] = 'required';
        }

        $request->validate($rules);

        if ($user->security_pin) {
            if (!Hash::check($request->current_pin, $user->security_pin)) {
                return response()->json(['message' => 'Current PIN is incorrect.'], 422);
            }
        }

        $user->security_pin = Hash::make($request->pin);
        $user->save();

        return response()->json(['message' => 'Security PIN has been saved.']);
    }

    /**
     * Remove the security PIN.
     * Accepts either current_pin or password for verification.
     */
    public function destroy(Request $request)
    {
        $this->requireSuperAdmin();
        $user = Auth::user();

        $request->validate([
            'verify_by' => 'required|in:pin,password',
            'current_pin' => 'required_if:verify_by,pin',
            'password'    => 'required_if:verify_by,password',
        ]);

        if ($request->verify_by === 'pin') {
            if (!$user->security_pin || !Hash::check($request->current_pin, $user->security_pin)) {
                return response()->json(['message' => 'PIN is incorrect.'], 422);
            }
        } else {
            if (!Hash::check($request->password, $user->password)) {
                return response()->json(['message' => 'Password is incorrect.'], 422);
            }
        }

        $user->security_pin = null;
        $user->save();

        return response()->json(['message' => 'Security PIN has been removed.']);
    }

    /**
     * Verify a PIN against the Super Admin's stored PIN.
     * Used by other users before performing sensitive actions.
     */
    public function verify(Request $request)
    {
        $request->validate(['pin' => 'required']);

        $superAdmin = User::where('user_type', 'Super Admin')->whereNotNull('security_pin')->first();

        if (!$superAdmin) {
            // No PIN configured — allow the action
            return response()->json(['verified' => true]);
        }

        if (Hash::check($request->pin, $superAdmin->security_pin)) {
            return response()->json(['verified' => true]);
        }

        return response()->json(['verified' => false, 'message' => 'Incorrect PIN.'], 401);
    }
}
