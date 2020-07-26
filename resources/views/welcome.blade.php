@extends('layouts.app',['pageSlug'=>'index'])

@section('content')
<div class="container-fluid">
 <div class="row">
   <div class="col-sm-12">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" >
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active" style="border: 5px solid #6e764d">
          <img class="d-block w-100" src="{{ asset('slider/2.jpg') }}" alt="First slide" >
          <div class="carousel-caption d-none d-md-block">
            <h1 style="text-shadow:1px 1px black,2px 2px green;color:red;">We are Here with you</h1>
            <h3>To Help You Make the Dive</h3>
          </div>
        </div>
        <div class="carousel-item" style="border: 5px solid #6e764d">
          <img class="d-block w-100" src="{{ asset('slider/1.jpg') }}" alt="Second slide" >
          <div class="carousel-caption d-none d-md-block">
            <h1 class="pull-right" style="text-shadow:1px 1px black,2px 2px green;color:red;">We Got Accurate Predictions</h1>
            <h3>That You Can Watch A match In Confidence</h3>
          </div>
        </div>
        <div class="carousel-item" style="border: 5px solid #6e764d">
          <img class="d-block w-100"  src="{{ asset('slider/5.jpg') }}" alt="Third slide" >
          <div class="carousel-caption d-none d-md-block">
            <h1 style="text-shadow:1px 1px black,2px 2px green;color:red;">Fill Void  Spaces Available</h1>
          <h3> Making you Feel Warm</h3>
          </div>
        </div>
        <div class="carousel-item" style="border: 5px solid #6e764d">
          <img class="d-block w-100"  src="{{ asset('slider/3.jpg') }}" alt="Third slide" >
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
  <div class="alert alert-secondary" style="margin-top:20px">
    <a href="#" class="close" data-dismiss="alert" style="color:red">&times;</a>
    <blockquote class="blockquote">
      “Gamblers never have enough money." 
      <cite class="blockquote-footer">Bet Responsibly</cite>
    </blockquote>
  </div>
  <div class="row">
    <div class="col-sm-9">
<h1 class="text-center" style="color:red; font-family:'Times New Roman'">Today Free Games</h1>
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
    <div class="col-sm-3">
      <h6 class="text-center" style="box-shadow: 1px 1px red;font-weight:bold">Premium Tips Today</h6>
      <table class="table table-condensed table-bordered table-striped">
        <thead>
          <tr>
            <th>Time</th>
            <th>League</th>
            <th>Tip</th>
          </tr>
        </thead>
        <tbody>
        @foreach($premium as $premium)
        <tr>
          <td>{{ $premium->KickOff }}</td>
          <td>{{ $premium->League }}</td>
          <td>&block;&block;&block;&block;</td>
        </tr>
        @endforeach
        </tbody>
      </table>
    </div>
  </div>
  <!--End  Container-->
  <!--Start Yesterday Games Table-->
  <div class="row">
    <div class="col-sm-9">
      <h1 class="text-center" style="color:red;font-family:'Times New Roman'">Yesterday Games</h1>
      <table class="table  table-bordered table-condensed table-striped">
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
     @if(count($yesterdays)==0)
     <tr>
       <td colspan="5">
         <div class="alert alert-danger">
         No Games Currently Available
         </div>
      </td>
     </tr>
     @else
     @foreach($yesterdays as $game)
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
     @endif
        </tbody>
        <!--End Body-->
      </table>
    </div>
  {{-- End Col-sm-9 --}}
    <div class="col-sm-3">
      <div class="card" style="width: 100%;">
        <img class="card-img-top" src="{{ asset('dist/img/logo.jpg') }}" alt="BettingWorld">
        <div class="card-body">
          <p class="card-text">We offer the 
            most well known football wagering tips day by day  giving you motivation to come back 
           Us. Gain admittance to our free improvement score tips, best HT/FT expectations and combo tips.
        </div>
      </div>
    </div>
  </div>
  <!--Start Other Games Table-->
  <div class="row">
      <div class="col-sm-9">
        <h1 class="text-center" style="color:red;font-family:'Times New Roman'">Previous Games</h1>
        <table class="table  table-bordered table-condensed table-striped">
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
    {{-- End Col-sm-9 --}}
    <div class="col-sm-3">
      <div class="card" style="width: 100%;">
        <img class="card-img-top" src="{{ asset('dist/img/logo.jpg') }}" alt="Daily recovery tips to make you get back on track">
        <div class="card-body">
          <p class="card-text">We offer the 
            most well known football wagering tips day by day  giving you motivation to come back 
           Us. Gain admittance to our free improvement score tips, best HT/FT expectations and combo tips.
        </div>
      </div>
    </div>
    </div>
  <!--End  Container-->
@endsection
