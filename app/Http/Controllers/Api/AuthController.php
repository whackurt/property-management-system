<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    

    public function login(Request $request)
    {
        try{
             $validatedData = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            if (!Auth::attempt($validatedData)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Provided email or password is incorrect'
                ], 422);
            }

            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'User logged in successfully',
                'user_data' => $user,
                'token' => $token,
            ], 200);

        } catch(\Throwable $th){
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
        
       
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
