@extends('layouts.user',['pageSlug'=>'game'])
@section('content')
<div class="container">
    @if(Session::has('success'))
    <div class="alert alert-success">
        <a href="#" class="close" data-dismiss="alert">&times;</a>
        {{ Session::get('success') }}
    </div>
    @endif
  <h3 class="text-center">  Add Games</h3>
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-body">
                  <form method="post" action="{{ route('games.store') }}">
                    @csrf
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="inputEmail4">Home Team</label>
                        <input type="text" name="HomeTeam" class="form-control {{ $errors->has('HomeTeam') ? ' is-invalid' : '' }}"  placeholder="Eg. Man City">
                        @include('alerts.feedback', ['field' => 'HomeTeam'])
                      </div>
                      <div class="form-group col-md-6">
                        <label for="inputPassword4">Away Team</label>
                        <input type="text" name="AwayTeam" class="form-control {{ $errors->has('AwayTeam') ? ' is-invalid' : '' }}"  placeholder="Eg.Chelsea">
                        @include('alerts.feedback', ['field' => 'AwayTeam'])
                      </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="inputAddress">Kick Off time</label>
                                <input type="time" class="form-control {{ $errors->has('KickOff') ? ' is-invalid' : '' }}" name="KickOff" >
                                @include('alerts.feedback', ['field' => 'KickOff'])
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="inputAddress">Pick</label>
                                <input type="text" class="form-control {{ $errors->has('Pick') ? ' is-invalid' : '' }}" name="Pick"  placeholder="Eg.GG ">
                                @include('alerts.feedback', ['field' => 'Pick'])
                              </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="inputAddress2">League</label>
                               <select class="form-control {{ $errors->has('League') ? ' is-invalid' : '' }}" style="color:red;font-weight:bold !important" name="League">
                                @include('alerts.feedback', ['field' => 'League'])
                                <option label="Choose the League of The Game"></option>
                                @foreach($leagues as $league)
                                <option value="{{ $league->League }}">{{ $league->League }}</option>
                                @endforeach
                               </select>
                              </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="inputAddress2">Type(Free/Paid)</label>
                               <select class="form-control {{ $errors->has('Type') ? ' is-invalid' : '' }}" style="color:red;font-weight:bold !important" name="Type">
                                    @include('alerts.feedback', ['field' => 'Type'])
                                   <option label="Choose the Type of The Game"></option>
                                   <option value="0">Free</option>
                                   <option value="1">Paid</option>
                               </select>
                              </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Post Game</button>
                  </form>
                </div>
              </div>
        </div>
        <div class="col-sm-12">
            <h1 class="text-center">Todays Games</h1>
            <table class="table table-bordered table-condensed table-hover">
                <thead>
                    <tr class="text-center">
                        <th class="text-center">BettingWordId</th>
                        <th>Match</th>
                        <th>KickOff</th>
                        <th>League</th>
                        <th>Pick</th>
                        <th>Type</th>
                        @if(Auth::user()->IsAdmin=='044535f73f8da4844a0c96f760e6e054e4dddce6')
                        <th class="text-right">Actions</th>
                        @endif
                    </tr>
                </thead>
                <tbody>
                   @foreach ($todays  as  $todays)
                   <tr class="text-center">
                    <td class="text-center">{{ $todays->GameId }}</td>
                    <td>{{ $todays->HomeTeam }} Vs. {{ $todays->AwayTeam }}</td>
                    <td>{{ $todays->KickOff }}</td>
                    <td>{{ $todays->League }}</td>
                    <td class="text-right">{{ $todays->Pick }}</td>
                    <td class="text-right">
                        @if($todays->Type==0)
                        <span style="color:red">Free</span>
                        @else
                        <span style="color:greenyellow">Paid</span>
                        @endif
                    </td>
                    @if(Auth::user()->IsAdmin =='044535f73f8da4844a0c96f760e6e054e4dddce6')
                        <td class="td-actions text-right">
                            <button type="button" rel="tooltip" class="btn btn-success btn-sm btn-icon">
                                <i class="fa fa-edit"></i>
                            </button>
                            <button type="button" rel="tooltip" class="btn btn-danger btn-sm btn-icon">
                               <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    @endif
                </tr>
                   @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection