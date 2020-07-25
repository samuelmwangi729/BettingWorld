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
        DB::table('users')->insert([
            'id' => 1,
            'name' => 'Samuel Admin',
            'number' => '0704922042',
            'email_verified_at' => now(),
            'password' => Hash::make('P!@#four5sam'),
            'isAdmin' =>$admin ,
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('users')->insert([
            'id' => 2,
            'name' => 'Dominic Admin',
            'number' => '0792209882',
            'email_verified_at' => now(),
            'password' => Hash::make('0792209882'),
            'isAdmin' =>$admin ,
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
 