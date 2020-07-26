<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Game;
class IndexController extends Controller
{
    public function index(){
        $today=date('Y-m-d');
        $yesterday = date('Y-m-d', strtotime($today . '-1 days'));
        $yesterdays=Game::where([
            ['DatePosted','=',$yesterday],
            ['OutCome','=',1]
        ])->get();
        $todays=Game::where([
            ['DatePosted','=',date('Y-m-d')],
            ['Type','=',0],
            ['OutCome','=',null]
        ])->get();
        $premium=Game::where([
            ['DatePosted','=',date('Y-m-d')],
            ['Type','=',1],
            ['OutCome','=',null]
        ])->get()->take(5);
        $games=Game::where('Outcome','=',1)->get();
        return view('welcome')
        ->with('yesterdays',$yesterdays)
        ->with('premium',$premium)
        ->with('games',$games)
        ->with('todays',$todays);
    }
}
