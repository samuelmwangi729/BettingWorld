<?php

namespace App\Http\Controllers;
use App\Subscriber;
use App\Game;
use Auth;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        //check if the last subscription is active or not 
        $userNumber=Auth::user()->number;
        $isActive=Subscriber::where('UserId','=',$userNumber)->get()->last();
        $subscribed=true;
        $active='';
        if(is_null($isActive)){
            //then the user have not subscribed
            $subscribed=0;
        }else{
            if($isActive->Status==0){
                //subscription is active 
                $active=true;
            }else{
                $active=false;
            }
        }
         
        //get all todays games 
        $games=Game::where('DatePosted','=',date('Y-m-d'))->get();
        $free=Game::where([
            ['DatePosted','=',date('Y-m-d')],
            ['Type','=',0]
        ])->get()->last();
        return view('dashboard')
        ->with('isSubscribed',$subscribed)
        ->with('isActive',$active)
        ->with('free',$free)
        ->with('games',$games);
    }
}