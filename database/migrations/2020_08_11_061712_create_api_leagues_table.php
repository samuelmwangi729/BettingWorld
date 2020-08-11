<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApiLeaguesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('api_leagues', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('country')->nullable();
            $table->string('season')->nullable();
            $table->string('start_season')->nullable();
            $table->string('end_season')->nullable();
            $table->string('logo')->nullable();
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
        Schema::dropIfExists('api_leagues');
    }
}
