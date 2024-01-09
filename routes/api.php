<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
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

Route::controller(UserController::class)->prefix('users')->group(function () {
    Route::post('/logout', 'logout');
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/', 'getAllUsers');
});

Route::controller(AuthController::class)->prefix('auth')->group(function () {
    Route::post('/signup', 'signup');
    Route::post('/login', 'login');
});

