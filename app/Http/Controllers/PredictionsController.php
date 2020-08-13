<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Prediction;
use App\FIxture;
class PredictionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $prediction=Prediction::create([
            'fixture_id'=>$request->fixture_id,
            'advice'=>$request->advice,
            'win_percent'=>$request->win_percent,
             'teams'=>$request->teams,
             'h2h'=>$request->h2h,
        ]);
        if($prediction){
            $data=['message'=>'prediction Successfully Saved'];
            return $data;
        }else{
            $data=['message'=>'the prediction could not be saved. Kndly try again later'];
            return $data;
        }

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
        //
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
    protected function Predict($id){
        //find the game from the fixtures table
        $game=FIxture::where('fixture_id','=',$id)->get()->first();
        if($game){
            $game->Status=1;
            $game->save();
            $data=['message'=>'Game Fixture Successfully Updated'];
        }
    }
}
