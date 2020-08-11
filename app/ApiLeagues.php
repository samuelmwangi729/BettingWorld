<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ApiLeagues extends Model
{
    protected $fillable=[
       'name',
       'country',
       'season',
       'start_season',
       'end_season',
       'logo',
       'Status',
    ];
}
