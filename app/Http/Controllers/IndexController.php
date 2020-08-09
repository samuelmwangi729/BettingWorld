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
        // dd($yesterday);
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
    protected function todays(){
        //gets over 1.5 today
        $todays=Game::where([
            ['DatePosted','=',date('Y-m-d')],
            ['Type','=',0],
            ['OutCome','=',null],
            ['TipType','=','OV1.5']
        ])->get();
        return $todays;
    }
    protected function live(){
        return view('livescore');
    }
    public function premium()
    {
        $todays=Game::where([
            ['DatePosted','=',date('Y-m-d')],
            ['Type','=',1],
            ['OutCome','=',null]
        ])->get();
        return $todays;
    }
    public function completed()
    {
        $games=Game::where('Outcome','=',1)->get();
        return $games;
    }
    protected function under(){
        $under=Game::where([
            ['DatePosted','=',date('Y-m-d')],
            ['Type','=',0],
            ['OutCome','=',null],
            ['TipType','=','UD1.5']
        ])->get();
        return $under;
    }
    protected function over2(){
        $over=Game::where([
            ['DatePosted','=',date('Y-m-d')],
            ['Type','=',0],
            ['OutCome','=',null],
            ['TipType','=','OV2.5']
        ])->get();
        return $over;
    }
    protected function draw(){
        $draw=Game::where([
            ['DatePosted','=',date('Y-m-d')],
            ['Type','=',0],
            ['OutCome','=',null],
            ['TipType','=','DRAW']
        ])->get();
        return $draw;
    }

}
