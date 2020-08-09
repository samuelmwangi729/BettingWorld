<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
class CreateGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->string('GameId');
            $table->string('HomeTeam');
            $table->string('AwayTeam');
            $table->string('KickOff');
            $table->string('Pick');
            $table->string('TipType');
            $table->string('League');
            $table->string('OutCome')->nullable();
            $table->string('DatePosted');
            $table->string('Type');
            $table->string('Status')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('games');
    }
}
