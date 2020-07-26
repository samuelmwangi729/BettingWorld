@extends('layouts.app',['pageSlug'=>'index'])

@section('content')
<!--Start Today Games Table-->
<div class="col-sm-12">
 <marquee class="h1" style="color:red">Today Free Games</marquee>
  <div class="row">
    <table class="table table-bordered table-condensed table-striped">
      <thead class=" text-primary">
        <tr>
          <th  style="font-size:10px !important">
            GameId
          </th>
          <th  style="font-size:10px !important">
            Match
          </th>
          <th  style="font-size:10px !important">
              League
            </th>
            <th  style="font-size:10px !important">
            Kick Off
          </th>
          <th  style="font-size:10px !important">
            Pick 
          </th>
        </tr>
      </thead>
      <!--End Thead-->
      <!--Start Body-->
      <tbody>
          @if($todays->count()==0)
              <tr>
                    <td colspan="5">
                      <div class="alert alert-danger">
                        Todays Free  Games Are Yet to be posted. Please Check Later
                      </div>
                    </td>
            </tr>
          @else
          @foreach ($todays  as $todays)
          <tr>
          <td>
            {{ $todays->GameId }}
          </td>
          <td>
            {{ $todays->HomeTeam }} Vs   {{ $todays->AwayTeam }}
          </td>
          <td>
             {{ $todays->League }}
            </td>
          <td>
            {{ $todays->KickOff }}
          </td>
          <td style="font-weight:bold;color:blue !important">
            <div class="badge badge-danger">{{$todays->Pick}}</div>
          </td>
          </tr>
          @endforeach
          @endif
      </tbody>
      <!--End Body-->
    </table>
  </div>
  <!--End  Container-->
  <!--Start Today Games Table-->
<div class="col-md-12">
  <marquee class="h1" style="color:red">Past Games And Predictions</marquee>
  <div class="row">
    <table class="table  table-bordered table-condensed">
      <thead class=" text-primary">
        <tr>
          <th  style="font-size:10px !important">
            Game
          </th>
          <th  style="font-size:10px !important">
              League
          </th>
          <th style="font-size:10px !important">
            Kick Off
          </th>
          <th  style="font-size:10px !important">
            Pick 
          </th>
          <th class="text-center"  style="font-size:10px !important">
            Result
          </th>
        </tr>
      </thead>
      <!--End Thead-->
      <!--Start Body-->
      <tbody>
      @foreach($games as $game)
      <tr>
        <td>
          {{ $game->HomeTeam }} Vs   {{ $game->AwayTeam }}
        </td>
        <td>
        {{$game->League}}
          </td>
        <td>
        {{$game->KickOff}}
        </td>
        <td style="font-weight:bold;color:blue !important">
        <div class="badge badge-danger">{{$game->Pick}}</div>
        </td>
        <td class="text-center">
          @if($game->OutCome==1)
        <div class="text-success"  style="font-weight:bolder;font-size:20px">&check;</div>
          @endif
          @if($game->OutCome==2)
        <div  style="color:red;font-weight:bolder;font-size:20px">&times;</div>
          @endif
        </td>
      </tr>
      @endforeach
      </tbody>
      <!--End Body-->
    </table>
  </div>
  {{-- <script type="text/javascript" src="https://widget.enetscores.com/FW8224919A69030DC4"></script> --}}
  </div>
  <!--End  Container-->
@endsection
