<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Subscriber;
use Session;
use Auth;
class SubscribersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $mySubs=Subscriber::where('UserId','=',Auth::user()->email)->get();
        return view('Subscribers.Index')->with('subs',$mySubs);
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
        $rule=['TransactionId'=>'required|unique:subscribers'];
        $this->validate($request,$rule);
        //get the end date of the subscription
        $today=date('Y-m-d');
        $endDate = date('Y-m-d', strtotime($today . '+7 days'));
        $sub=Subscriber::create([
            'TransactionId'=>$request->TransactionId,
            'UserId'=>Auth::user()->email,
            'Expiry'=>$endDate,
            'Status'=>'3',
        ]);
        Session::flash('success','Transaction Id Successfully Saved. Kindly Wait as we verify it. Thanks');
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
        $today=date('Y-m-d');
        $endDate = date('Y-m-d', strtotime($today . '+7 days'));
        $subscriber=Subscriber::findOrFail($id);
        if(is_null($subscriber)){
            Session::flash('error','Unknown Error Occurred');
            return back();
        }
        //if the user is found, then update the expiry date 
        $subscriber->Status=0;
        $subscriber->Expiry=$endDate;
        $subscriber->save();
        Session::flash('success','Subscription Successfully Approved');
        return back();
    }
    protected function suspend($id){
        $subscriber=Subscriber::findOrFail($id);
        if(is_null($subscriber)){
            Session::flash('error','Unknown Error Occurred');
            return back();
        }
        //if the user is found, then update the expiry date 
        $subscriber->Status=3;
        $subscriber->save();
        Session::flash('success','Subscription Successfully Suspended');
        return back();
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

    protected function manage(){
        return view('Subscribers.Manage')->with('Subscribers',Subscriber::all());
    }
    protected function sub(){
        $mySubs=Subscriber::where('UserId','=',Auth::user()->email)->get()->last();
        if($mySubs->count()==0){
            $data=['message','You are not subscribed for VIP. Subscribe to view Our VIP Games'];
            return $data;
        }
        if( $mySubs->Status==1){
            $data=['message','Your Subscription Has Expired. Kidly Consider Renew It To Continue Accessing VIP Games'];
            return $data;
        }
        if( $mySubs->Status==0){
            $data=['success','Your Subscription Is Still Active'];
            return $data;
        }

    }
}
