@extends('layouts.app',['pageSlug'=>'index'])

@section('content')
<!--Start Today Games Table-->
<div class="col-sm-12">
    <div class="card ">
      <div class="card-header">
        <h4 class="card-title text-center" style="font-weight:bold"> Today Free Games</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <table class="table tablesorter table-bordered table-codensed">
            <thead class=" text-primary">
              <tr>
                <th>
                  GameId
                </th>
                <th>
                  Match
                </th>
                <th>
                    League
                  </th>
                <th>
                  Kick Off
                </th>
                <th>
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
                <td style="font-weight:bold;color:yellow !important">
                  {{ $todays->Pick }}
                </td>
                </tr>
                @endforeach
                @endif
            </tbody>
            <!--End Body-->
          </table>
        </div>
      </div>
    </div>
  </div>
  <!--End  Container-->
  <!--Start Today Games Table-->
<div class="col-md-12">
    <div class="card ">
      <div class="card-header">
        <h4 class="card-title text-center" style="font-weight:bold">Past Games And Predictions</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <table class="table tablesorter table-bordered table-codensed">
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
              <td style="font-weight:bold;color:yellow !important">
              {{$game->Pick}}
              </td>
              <td class="text-center">
                @if($game->OutCome==1)
                <i class="fa fa-check" style="color:greenyellow"></i>
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
      </div>
    </div>
  </div>
  <!--End  Container-->
@endsection
