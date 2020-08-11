<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FIxture extends Model
{
    protected $fillable=[
        'TodayDate',
        'date',
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
