<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subscriber extends Model
{
    protected $fillable=[
        'TransactionId',
        'UserId',
        'Expiry',
        'Status',
    ];
}
