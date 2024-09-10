<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LinkController;
Route::get('/', function () {
    return view('welcome');
});

Route::get('/links', [LinkController::class, 'createLink']);