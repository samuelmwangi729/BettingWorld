@extends('layouts.app',['pageSlug'=>'index'])

@section('content')
<div class="container-fluid">
 <div class="row">
   <div class="col-sm-12">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="{{ asset('slider/1.jpg') }}" alt="First slide" >
          <div class="carousel-caption d-none d-md-block">
            <h1 style="text-shadow:1px 1px black,2px 2px green;color:red;">We are Here with you</h1>
            <h3>To Help You Make the Dive</h3>
          </div>
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="{{ asset('slider/2.jpg') }}" alt="Second slide" >
          <div class="carousel-caption d-none d-md-block">
            <h1 class="pull-right" style="text-shadow:1px 1px black,2px 2px green;color:red;">We Got Accurate Predictions</h1>
            <h3>That You Can Watch A match In Confidence</h3>
          </div>
        </div>
        <div class="carousel-item">
          <img class="d-block w-100"  src="{{ asset('slider/3.jpg') }}" alt="Third slide" >
          <div class="carousel-caption d-none d-md-block">
            <h1 style="text-shadow:1px 1px black,2px 2px green;color:red;">Fill Void  Spaces Available</h1>
          <h3> Making you Feel Warm</h3>
          </div>
        </div>
        <div class="carousel-item">
          <img class="d-block w-100"  src="{{ asset('slider/5.jpg') }}" alt="Third slide" >
          <div class="carousel-caption d-none d-md-block">
            <h1 style="text-shadow:1px 1px black,2px 2px green;color:red;">Lets Hit It Hard</h1>
          <h3> Feel Free To Start The Game</h3>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
   </div>
 </div>
</div>

<!-- Go to www.addthis.com/dashboard to customize your tools -->
<div class="addthis_inline_share_toolbox"></div>
            
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
  </div>
  <!--End  Container-->
@endsection
