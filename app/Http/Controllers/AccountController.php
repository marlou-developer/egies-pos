<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function index()
    {
        $users = User::where('id', '!=', 2)->get();

        return response()->json([
            'result' => $users
        ], 200);
    }


    public function store(Request $request)
    {
        $data =  $request->validate([
            'fname' => 'required|string|max:255',
            'mname' => 'nullable|string|max:255',
            'lname' => 'required|string|max:255',
            'suffix' => 'nullable|string|max:255',
            'user_type' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'title' => 'nullable|string|max:255',
        ]);

        $user = User::create([
            'name' => trim($data['fname'] . ' ' . ($data['mname'] ?? '') . ' ' . $data['lname']),
            'fname' => $data['fname'] ?? null,
            'mname' => $data['mname'] ?? null,
            'lname' => $data['lname'] ?? null,
            'suffix' => $data['suffix'] ?? null,
            'email' => $data['email'] ?? null,
            'user_type' => $data['user_type'] ?? null,
            'title' => $data['title'],
            'password' => bcrypt('egiespos'), // Default password
        ]);



        return response()->json([
            'response' => 'success',
            'user' => $user
        ], 200);
    }

    public function update(Request $request,  $id)
    {
        $user = User::where('id', $id)->first();
        if ($user) {
            $user->update($request->all());
        }
    }

    public function destroy($id)
    {
        $user = User::where('id', $id)->first();
        if ($user) {
            $user->delete();
        }

        return response()->json(['message' => 'User deleted successfully']);
    }
}
