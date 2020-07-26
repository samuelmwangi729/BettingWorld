<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Session;
class UserController extends Controller
{
    /**
     * Display a listing of the users
     *
     * @param  \App\User  $model
     * @return \Illuminate\View\View
     */
    public function index(User $model)
    {
        return view('users.index')->with('users',User::all());
        // return view('users.index', ['users' => $model->paginate(15)]);
    }
    public function update(Request $request, $id){
        $user=User::find($id);
        if($user){
            $user->isAdmin=1;
            $user->save();
            Session::flash('success','User Successfully Suspended');
            return back();
        }
    }
        public function delete($id){
            //find the user 
            $user=User::find($id);
            if($user){
                $user->delete();
                Session::flash('error','User Successfully Deleted');
                return back();
            }
        }
        protected function reset($id){
            $user=User::findOrFail($id);
            // dd($user->number);
            $newPass=bcrypt($user->email);
            $user->password=$newPass;
            $user->save();
            Session::flash('success','We have reset Users password to their Email Address');
            return back();
        }
}
