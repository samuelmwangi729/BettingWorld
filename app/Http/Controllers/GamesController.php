<?php

namespace App\Http\Controllers;
use App\League;
use Illuminate\Http\Request;
use App\Game;
use Str;
use Session;
class GamesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $leagues=League::all();
        $todays=Game::where([
            ['DatePosted','=',date('Y-m-d')],
        ])->get();
        $games=Game::where('Outcome','!=',null)->get();
        return view('Games.Index')
        ->with('games',$games)
        ->with('todays',$todays)
        ->with('leagues',$leagues);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    //run the validation rules  
    $rules=[
        'HomeTeam'=>'required',
        'AwayTeam'=>'required',
        'KickOff'=>'required',
        'Pick'=>'required',
        'TipType'=>'required',
        'League'=>'required',
        'Type'=>'required',
    ];
    $this->validate($request,$rules);
    $gameId=Str::random(7);
    //it the request is valid, then insert into the database
    Game::create([
        'GameId'=>$gameId,
        'HomeTeam'=>$request->HomeTeam,
        'AwayTeam'=>$request->AwayTeam,
        'KickOff'=>$request->KickOff,
        'Pick'=>$request->Pick,
        'TipType'=>$request->TipType,
        'League'=>$request->League,
        'Type'=>$request->Type,
        'DatePosted'=>date('Y-m-d')
    ]);
    Session::flash('success','The Match BK'.$gameId.' has Been Posted.');
    return back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $game=Game::find($id);
       if($game){
           $game->OutCome=1;
           $game->save();
           Session::flash('success','game successfully Updated');
           return back();
       }
       return back();
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function lost($id)
    {
        $game=Game::find($id);
       if($game){
           $game->OutCome=2;
           $game->save();
           Session::flash('success','game successfully Updated');
           return back();
       }
       return back();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $game=Game::find($id);
        dd($game);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    protected function fixtures(Request $request){
        $data=$request->all();
        return $data;
    }
}
