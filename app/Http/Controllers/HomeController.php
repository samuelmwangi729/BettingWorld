<?php

namespace App\Http\Controllers;
use App\Subscriber;
use App\Game;
use Auth;
use Illuminate\Http\Request;

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
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
      //check if the last subscription is active or not 
      $userEmail=Auth::user()->email;
      $isActive=Subscriber::where('UserId','=',$userEmail)->get()->last();
      $subscribed=true;
      $active='';
      if(is_null($isActive)){
          //then the user have not subscribed
          $subscribed=0;
      }
      elseif($isActive->Expiry>=date('Y-m-d')){
        $isActive->Status=1;
        $isActive->save();
        $subscribed=0;
        // dd($isActive>date('Y-m-d'));
    }
      else{
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
      return view('home')
      ->with('isSubscribed',$subscribed)
      ->with('isActive',$active)
      ->with('free',$free)
      ->with('games',$games);
    }
}
