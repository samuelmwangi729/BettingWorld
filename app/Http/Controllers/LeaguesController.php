<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\League;
use App\ApiLeagues;
use Session;
class LeaguesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $leagues=League::all();
        return view('League.Index')->with('leagues',$leagues);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function Api()
    {
        return view('League.Api');
    }

    public function Post(Request $request){
        ApiLeagues::create($request->all());
        return back();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rule=[
            'League'=>'required|unique:leagues'
        ];
        $this->validate($request,$rule);
        //if the field is then valid and the league is not in the database, then add it to the database 
        $league=League::create([
            'League'=>$request->League
        ]);
        Session::flash('success','the League '.$request->League.' has been successfully Added');
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $league=League::find($id);
        $leagues=League::all();
        if(is_null($league)){
            Session::flash('error','The league Id Is not found');
            return back();
        }else{
            return view('League.Edit')
            ->with('leagues',$leagues)
            ->with('league',$league);
        }
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
        $this->validate($request,[
            'League'=>'required'
        ]);
        $league=League::find($id);
        if(is_null($league)){
            Session::flash('error','The league Id Is not found');
            return back();
        }else{
           $league->League=$request->League;
           $league->save();
            Session::flash('success','League Successfully Updated');
            return redirect()->route('league.index')->with('leagues',League::all());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //first find  the league by id
        $league=League::find($id);
        if(is_null($league)){
            Session::flash('error','The league Id Is not found');
            return back();
        }else{
            $league->destroy($id);
            Session::flash('error','League Successfully Deleted');
            return back();
        }
    }
    protected function league(){
        return view('League.League');
    }
    protected function All(){
        $leagues=ApiLeagues::paginate(15);
        return $leagues;
    }
}
