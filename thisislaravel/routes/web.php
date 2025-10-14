<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controller\temanController;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/teman',[temanController::class, 'index'])->name('sahron');
