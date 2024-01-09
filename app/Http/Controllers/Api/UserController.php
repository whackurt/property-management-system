<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */

     public function createUser(Request $request)
    {
        try{
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:8',
                'status' => 'required|string',
                'address' => 'required|string',
                'contact_number' => 'required|string',
            ]);

            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => bcrypt($validatedData['password']),
                'status' => $validatedData['status'],
                'address' => $validatedData['address'],
                'contact_number' => $validatedData['contact_number'],
            ]);

            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'User created successfully',
                'user_data' => $user,
                'token' => $token,
            ], 201);

        } catch(\Throwable $th){
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
       
    }

    public function getAllUsers(){
         try{
            $users = User::all();

            return response()->json([
                'success' => true,
                'message' => 'Users fetched successfully',
                'users' => $users
            ], 200);

        } catch(\Throwable $th){
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }


    public function updateUser(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            $validatedData = $request->validate([
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|unique:users,email,'.$user->id,
                'password' => 'sometimes|string|min:8',
                'status' => 'sometimes|string',
                'address' => 'sometimes|string',
                'contact_number' => 'sometimes|string',
            ]);

            $user->fill(array_filter($validatedData));

            if ($request->has('password')) {
                $user->password = bcrypt($validatedData['password']);
            }

            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'User updated successfully',
                'user_data' => $user,
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function deleteUser($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();

            return response()->json([
                'success' => true,
                'message' => 'User deleted successfully',
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    
}
