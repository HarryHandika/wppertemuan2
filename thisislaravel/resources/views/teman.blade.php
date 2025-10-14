<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('Oho');
});
Route::get('/temansiapa', function () {
    return view ('/teman');
});