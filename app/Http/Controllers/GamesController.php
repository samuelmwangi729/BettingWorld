<?php

namespace App\Http\Controllers;
use App\League;
use Illuminate\Http\Request;
use App\Game;
use App\FIxture;
use App\Setting;
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
    // dd($request->TipType);
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
           $data=['message'=>'updated'];
           return $data;
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
           $game->OutCome=3;
           $game->save();
           $data=['message'=>'success'];
           return $data;
       }
       $data=['message'=>'success'];
       return $data;
    }
    public function suspend($id)
    {
        $game=Game::find($id);
       if($game){
        $game->OutCome=2;
        $game->save();
        $data=['message'=>'success'];
        return $data;
       }
       $data=['message'=>'error'];
       return $data;
    }
    public function Reset($id)
    {
        $game=Game::find($id);
       if($game){
        $game->OutCome=null;
        $game->save();
        $data=['message'=>'success'];
        return $data;
       }
       $data=['message'=>'error'];
       return $data;
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
        Fixture::create([
            'TodayDate'=>date('Y-m-d'),
            'date'=>$request->date,
            'fixture_id'=>$request->fixture_id,
            'venue'=>$request->venue,
            'league'=>$request->league,
            'country'=>$request->country,
            'flag'=>$request->flag,
            'home'=>$request->home,
            'homeFlag'=>$request->homeFlag,
            'away'=>$request->away,
            'awayFlag'=>$request->awayFlag,
        ]);
        $data=['message'=>'Data Successfully Inserted'];
        return $data;
    }

    protected function tfixtures(){
       return view('Fixtures');
    }
    protected function todaysFixtures(){
        $settings=Setting::where('Day','=','Today')->get()->first();
        if(is_null($settings)){
            $data=['message'=>'Unknown Error Occurred'];
            return $data;
        }
        $date= $settings->Date;
        $fixtures=FIxture::where([
            ['TodayDate','=',$date],
            ['Status','=',0]
        ])->get();
        return $fixtures;
    }
    protected function Top(){
        $fixtures=FIxture::orderBy('id','asc')->get()->take(50);
        return $fixtures;
    }
    protected function all(){
        $games=Game::where('OutCome','=',NULL)->get();
        return $games;
    }
    protected function allC(){
        $games=Game::orderBy('id','desc')->where('OutCome','!=',NULL)->get()->take(20);
        return $games;
    }
    protected function Free(){
        $games=Game::where('Type','=',0)->get();
        return $games;
    }
    protected function Yesterday(){
        $settings=Setting::where('Day','=','Yesterday')->get()->first();
        if(is_null($settings)){
            $data=['message'=>'Unknown Error Occurred'];
            return $data;
        }
        $date= $settings->Date;
        //load yesterdays Games
        $Games=Game::where([
            ['DatePosted','=',$date],
            ['OutCome','!=',NULL]
        ])->get();
        $data=['games'=>$Games];
        return $data;
    }
    protected function Predictions(){
        return view('Predictions');
    }
    protected function Gtop(){
        //find the games where status ==1
        return view('Games.Top');
    }
    protected function OnlyTop(){
        $games=FIxture::where('Status','=',1)->get();
        return $games;
    }
}
