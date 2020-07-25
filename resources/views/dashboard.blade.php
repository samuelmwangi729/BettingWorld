@extends('layouts.app', ['pageSlug' => 'dashboard'])

@section('content')
<div class="row">
    <div class="card ">
        <div class="card-header">
            <h4 class="card-title text-center">Todays  Games</h4>
        </div>
        <div class="card-body">
            <div class="container">
                <table class="table tablesorter" id="">
                    <thead class=" text-primary">
                        <tr class="text-center">
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
                            @if(Auth::user()->IsAdmin=='044535f73f8da4844a0c96f760e6e054e4dddce6')
                            <th>
                              Actions
                            </th>
                            @endif
                          </tr>
                    </thead>
                    <tbody>
                       @if($isSubscribed==0)
                       @if(is_null($free))
                      <tr>
                          <td colspan="5">
                              <div class="alert alert-danger">
                                  Free Games not Yet Posted! Kindly Pay Subscription Fees to get Access to Paid Matches
                              </div>
                          </td>
                      </tr>
                       @else
                       <tr>
                        <td>
                            {{ $free->GameId }}
                          </td>
                          <td>
                            {{ $free->HomeTeam }}<br> Vs <br>  {{ $free->AwayTeam }}
                          </td>
                          <td>
                             {{ $free->League }}
                            </td>
                          <td>
                            {{ $free->KickOff }}
                          </td>
                          <td style="font-weight:bold;color:yellow !important">
                            {{ $free->Pick }}
                          </td>
                          @if(Auth::user()->IsAdmin=='044535f73f8da4844a0c96f760e6e054e4dddce6')
                         <td>
                           @if($free->OutCome)
                                  @if($free->OutCome==1)
                                    <td><button class="btn btn-primary btn-sm">Won</button></td>
                                  @else
                                  <td><button class="btn btn-danger btn-sm">Lost</button></td>
                                  @endif
                           @else
                           <a href="{{ route('games.update',$free->id) }}" class="btn btn-sm btn-primary">Won</a>
                           <a href="{{ route('games.lost',[$free->id]) }}" class="btn btn-sm btn-danger">Lost</a>
                           @endif
                         </td>
                          @endif
                       </tr>
                       @endif
                       @else
                       {{-- This handles if the client is subscribed
                        *We need to check if the client subscription has expired or not
                        --}}
                                @if($isActive==1)
                                @foreach ($games as $game)
                                <tr>
                                    <td>
                                        {{ $game->GameId }}
                                      </td>
                                      <td>
                                        {{ $game->HomeTeam }} Vs   {{ $game->AwayTeam }}
                                      </td>
                                      <td>
                                         {{ $game->League }}
                                        </td>
                                      <td>
                                        {{ $game->KickOff }}
                                      </td>
                                      <td style="font-weight:bold;color:yellow !important">
                                        {{ $game->Pick }}
                                      </td>
                                   </tr>                                    
                                @endforeach
                                @else
                                <tr>
                                    @if(is_null($free))
                                    <td colspan="5">
                                        <div class="alert alert-danger">
                                            Free Games not Yet Posted! Kindly Pay Subscription Fees to get Access to Paid Matches
                                        </div>
                                    </td>
                                    @else
                                    <td>
                                        {{ $free->GameId }}
                                      </td>
                                      <td>
                                        {{ $free->HomeTeam }} Vs   {{ $free->AwayTeam }}
                                      </td>
                                      <td>
                                         {{ $free->League }}
                                        </td>
                                      <td>
                                        {{ $free->KickOff }}
                                      </td>
                                      <td style="font-weight:bold;color:yellow !important">
                                        {{ $free->Pick }}
                                      </td>
                                    @endif
                                   </tr>
                                   <tr>
                                       <td colspan="5">
                                        <div class="alert alert-danger">
                                            Your Subscription has expired!!! Pay Subscription Fees to access All the matches
                                        </div>
                                       </td>
                                   </tr>
                                @endif
                       @endif
                    </tbody>
                </table>
            </div>
            <hr>
        </div>
    </div>
    <div class="conteiner">
      <h4 class="text-center">All Games</h4>
    </div>
     {{-- This table will be visible by the administrator only --}}
     @if(Auth::user()->IsAdmin=='044535f73f8da4844a0c96f760e6e054e4dddce6')
     <table class="table tablesorter" id="">
       <thead class=" text-primary">
           <tr class="text-center">
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
               <th>
                 Actions
               </th>
             </tr>
       </thead>
     <tbody>
      @foreach ($games as $game)
      <tr>
          <td>
              {{ $game->GameId }}
            </td>
            <td>
              {{ $game->HomeTeam }} Vs   {{ $game->AwayTeam }}
            </td>
            <td>
               {{ $game->League }}
              </td>
            <td>
              {{ $game->KickOff }}
            </td>
            <td style="font-weight:bold;color:yellow !important">
              {{ $game->Pick }}
            </td>
            @if(Auth::user()->IsAdmin=='044535f73f8da4844a0c96f760e6e054e4dddce6')
            <td>
              @if($game->OutCome)
                     @if($game->OutCome==1)
                       <td><button class="btn btn-primary btn-sm btn-block">Won</button></td>
                     @endif
                     @if($game->OutCome==2)
                     <td><button class="btn btn-danger btn-sm btn-block">Lost</button></td>
                     @endif
              @else
              <a href="{{ route('games.update',$game->id) }}" class="btn btn-sm btn-primary">Won</a>
              <a href="{{ route('games.lost',[$game->id]) }}" class="btn btn-sm btn-danger">Lost</a>
              @endif
            </td>
             @endif
         </tr>                                    
      @endforeach
     </tbody>
     </table>
     @endif
</div>
@endsection
