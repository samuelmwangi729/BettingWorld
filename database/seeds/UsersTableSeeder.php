<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin=sha1('HetheyAdminYes');
        // DB::table('users')->insert([
        //     'id' => 5,
        //     'name' => 'Samuel Admin',
        //     'email' => 'samuelmwangi729@gmail.com',
        //     'email_verified_at' => now(),
        //     'password' => Hash::make('P!@#four5sam'),
        //     'isAdmin' =>$admin ,
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ]);
        // DB::table('users')->insert([
        //     'id' => 2,
        //     'name' => 'Dominic Admin',
        //     'email' => 'wanjikudominic@gmail.com',
        //     'email_verified_at' => now(),
        //     'password' => Hash::make('0792209882'),
        //     'isAdmin' =>$admin ,
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ]);
        //migrate the games
        // for($i=0;$i<10;$i++){
        //     DB::table('games')->insert([
        //         'GameId'=>$i.'id',
        //         'HomeTeam'=>'Home team'.$i,
        //         'AwayTeam'=>'AwayTeam'.$i,
        //         'KickOff'=>'time'.$i,
        //         'Pick'=>'1',
        //         'League'=>'league'.$i,
        //         'Outcome'=>null,
        //         'DatePosted'=>date('Y-m-d'),
        //         'Type'=>'1',
        //         'Status'=>'0'
        //         ]);
        }
    }
}
 