<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable=[
        'GameId',
        'HomeTeam',
        'AwayTeam',
        'KickOff',
        'Pick',
        'League',
        'OutCome',
        'DatePosted',
        'Type',
        'Status',
    ];
}
