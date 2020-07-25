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
        // $admin=sha1('HetheyAdminYes');
        // DB::table('users')->insert([
        //     'id' => 1,
        //     'name' => 'Samuel Admin',
        //     'number' => '0704922042',
        //     'email_verified_at' => now(),
        //     'password' => Hash::make('P!@#four5sam'),
        //     'isAdmin' =>$admin ,
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ]);
        for($i=21;$i<36;$i++){
            DB::table('games')->insert([
                'id'=>$i,
                'GameId'=>$i.' Game',
                'HomeTeam'=>'Man'.$i,
                'AwayTeam'=>'Away '. $i,
                'KickOff'=>$i.':'.$i,
                'Pick'=>'1',
                'League'=>'league '.$i,
                'OutCome'=>1,
                'DatePosted'=>date('Y-m-d'),
                'Type'=>0,
                'Status'=>0,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
 