<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Game;
class IndexController extends Controller
{
    public function index(){
        $todays=Game::where([
            ['DatePosted','=',date('Y-m-d')],
            ['Type','=',0],
            ['OutCome','=',null]
        ])->get();
        $games=Game::where('Outcome','!=',null)->get();
        return view('welcome')
        ->with('games',$games)
        ->with('todays',$todays);
    }
}
