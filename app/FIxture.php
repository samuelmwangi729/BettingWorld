<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FIxture extends Model
{
    protected $fillable=[
        'TodayDate',
        'date',
        'fixture_id',
        'venue',
        'league',
        'country',
        'flag',
        'home',
        'homeFlag',
        'away',
        'awayFlag',
        'Status',
    ];
}
