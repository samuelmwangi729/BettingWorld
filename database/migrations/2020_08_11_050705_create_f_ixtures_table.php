<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFIxturesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('f_ixtures', function (Blueprint $table) {
            $table->id();
            $table->string('TodayDate')->default(date('Y-m-d'));
            $table->string('fixture_id')->nullable();
            $table->string('date')->nullable();
            $table->string('venue')->nullable();
            $table->string('league')->nullable();
            $table->string('country')->nullable();
            $table->string('flag')->nullable();
            $table->string('home')->nullable();
            $table->string('homeFlag')->nullable();
            $table->string('away')->nullable();
            $table->string('awayFlag')->nullable();
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
        Schema::dropIfExists('f_ixtures');
    }
}
