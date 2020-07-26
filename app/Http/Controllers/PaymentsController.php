<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Payment;
use App\Subscriber;
use Session;
class PaymentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $payments=Payment::paginate(10);
        return view('Payments.Index')->with('payments',$payments);
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
        $rules=[
            'TransactionId'=>'required|unique:payments',
            'Amount'=>'required',
            'UserEmail'=>'required'
        ];
        $this->validate($request,$rules);
        //confirm if the user has a subscription of the transactionId
        $user=Subscriber::where('TransactionId','=',$request->TransactionId)->get()->first();
        //if the user exist, then update their details
        if(!is_null($user)){
            $user->Status=0;
            $user->save();
        }
        //if the form is valid, we save everything to the database
        $payment=Payment::create([
            'TransactionId'=>$request->TransactionId,
            'UserId'=>$request->UserEmail,
            'Amount'=>$request->Amount,
            'Status'=>'0',
        ]);
        Session::flash('success','Payments Successfully Recorded');
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
        $payment=Payment::find($id);
        if($payment){
            return view('Payments.Edit')->with('payment',$payment);
        }else{
            Session::flash('error','The Payment Id is Not Found');
            return back();
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
        $payment=Payment::find($id);
        if(is_null($payment)){
            Session::flash('error','The Payment Id Not Found');
            return back();
        }
        //update the record then 
        $rules=[
            'TransactionId'=>'required',
            'Amount'=>'required',
            'UserEmail'=>'required'
        ];
        $this->validate($request,$rules);
        //confirm if the user has a subscription of the transactionId
        $user=Subscriber::where('TransactionId','=',$request->TransactionId)->get()->first();
        //if the user exist, then update their details
        if(!is_null($user)){
            $user->Status=0;
            $user->save();
        }
        //if the payment record exist, then update it 
        $payment->TransactionId=$request->TransactionId;
        $payment->Amount=$request->Amount;
        $payment->UserId=$request->UserEmail;
        $payment->save();
        Session::flash('success','Payments Details Successfully Updated');
        $payments=Payment::all();
        return redirect()->route('payments.index')->with('payments',$payments);
        // dd('update $id');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $payment=Payment::find($id);
        if($payment){
            $payment->delete();
            Session::flash('success','Successfully Deleted');
            return back();
        }
    }
}
