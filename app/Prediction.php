<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Prediction extends Model
{
    protected $fillable=[
     'fixture_id',
     'advice',
     'win_percent',
      'teams',
      'h2h',
     'Status',
    ];
    protected $casts = [
        'win_percent' => 'array',
        'teams' => 'array',
        'h2h' => 'array',
    ];
}
