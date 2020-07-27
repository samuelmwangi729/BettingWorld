@extends('layouts.user', ['pageSlug' => 'dashboard'])

@section('content')
<div class="row">
<div class="container">
  <a href="{{ route('subscribers.index') }}" class="btn btn-danger btn-lg">Subscribe to VIP</a>
</div>
  <marquee>Todays Free Games</marquee>
  <table class="table table-striped table-bordered table-condensed" id="">
    <thead>
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
      <tr class="text-center">
          <td colspan="6">
              <div class="alert alert-danger">
                  Free Games not Yet Posted! Kindly Pay Subscription Fees to get Access to Paid Matches
              </div>
          </td>
      </tr>
       @else
          @foreach($free as $free)
          <tr class="text-center">
            <td>
                {{ $free->GameId }}
              </td>
              <td style="font-size:13px;font-family:'Courier New', Courier, monospace'">
                {{ $free->HomeTeam }} Vs   {{ $free->AwayTeam }}
              </td>
              <td>
                 {{ $free->League }}
                </td>
              <td>
                {{ $free->KickOff }}
              </td>
              <td style="font-weight:bold;color:red !important">
                {{ $free->Pick }}
              </td>
                      @if(Auth::user()->IsAdmin=='044535f73f8da4844a0c96f760e6e054e4dddce6')
                    <td>
                                  @if($free->OutCome)
                                          @if($free->OutCome==1)
                                          <div class="badge badge-success">&check; &nbsp;Won</div>
    
                                          @else
                                          <div class="badge badge-danger">&times; &nbsp;Lost</div>
    
                                          @endif
                                  @else
                                  <a href="{{ route('games.update',$free->id) }}" class="btn btn-sm btn-primary">Won</a>
                                  <a href="{{ route('games.lost',[$free->id]) }}" class="btn btn-sm btn-danger">Lost</a>
                                  @endif
                    </td>
                      @endif
           </tr>
          @endforeach
       @endif
       @else
       {{-- This handles if the client is subscribed
        *We need to check if the client subscription has expired or not
        --}}
                @if($isActive==1)
                @foreach ($games as $game)
                <tr class="text-center">
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
                      <td style="font-weight:bold;color:red !important">
                        {{ $game->Pick }}
                      </td>
                   </tr>                                    
                @endforeach
                @else
                <tr class="text-center">
                    @if(is_null($free))
                    <td colspan="5">
                        <div class="alert alert-danger">
                            Free Games not Yet Posted! Kindly Pay Subscription Fees to get Access to Paid Matches
                        </div>
                    </td>
                    @else
                   @foreach($free as $free)
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
                  <td style="font-weight:bold;color:red !important">
                    {{ $free->Pick }}
                  </td>
                   @endforeach
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
    <div class="container">
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
      <tr class="text-center">
          <td>
              {{ $game->GameId }}
            </td>
            <td style="font-size:13px;font-family:'Courier New', Courier, monospace'">
              {{ $game->HomeTeam }} Vs   {{ $game->AwayTeam }}
            </td>
            <td>
               {{ $game->League }}
              </td>
            <td>
              {{ $game->KickOff }}
            </td>
            <td style="font-weight:bold;color:red !important">
              {{ $game->Pick }}
            </td>
            @if(Auth::user()->IsAdmin=='044535f73f8da4844a0c96f760e6e054e4dddce6')
            <td>
              @if($game->OutCome)
                     @if($game->OutCome==1)
                     <div class="badge badge-success">&check; &nbsp;Won</div>
                     @endif
                     @if($game->OutCome==2)
                     <div class="badge badge-danger">&times; &nbsp;Lost</div>
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
