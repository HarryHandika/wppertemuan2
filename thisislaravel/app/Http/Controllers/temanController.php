<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class temanController extends Controller {
    public function index(){
        return view('teman');
    }
}