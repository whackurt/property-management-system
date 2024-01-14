<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\PropertyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', function(){
    return response()->json([
        "message" => "Welcome to Property Management System"]);
});

Route::controller(AuthController::class)->prefix('auth')->group(function () {
    Route::post('/login', 'login');
});

Route::controller(UserController::class)->prefix('user')->group(function () {
    Route::post('/logout', 'logout');
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/', 'getAllUsers');
    Route::get('/{id}', 'getUserById');
    Route::post('/create', 'createUser');
    Route::put('/update/{id}', 'updateUser');
    Route::delete('/delete/{id}', 'deleteUser');
});

Route::controller(PropertyController::class)->prefix('property')->group(function () {
    Route::get('/', 'getAllProperties');
    Route::post('/create', 'createProperty');
    Route::get('/{id}', 'getPropertyById');
    Route::get('/user/{id}', 'getPropertyByUserId');
    Route::put('/update/{id}', 'updateProperty');
    Route::put('/update-status/{id}', 'updatePropertyStatus');
    Route::delete('/delete/{id}', 'deleteProperty');
});


