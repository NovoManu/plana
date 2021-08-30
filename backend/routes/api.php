<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmissionController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('products.json', [EmissionController::class, 'getProducts']);

Route::prefix('{product}')->group(function () {
    Route::get('average.json', [EmissionController::class, 'getProductAverage'])
        ->whereAlpha('product');

    Route::get('geo.json', function ($product) {
        return $product . ' Geo';
    })->whereAlpha('product');

    Route::get('statistics.json', function ($product) {
        return $product . ' Statistics';
    })->whereAlpha('product');
});
