<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/',[
	'uses'=>'IndexController@index',
	'as'=>'index'
]);

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home')->middleware('auth');
Route::group(['middleware' => 'auth'], function () {
	Route::resource('user', 'UserController', ['except' => ['show']]);
	Route::get('/Leagues/Delete/{id}',[
		'uses'=>'LeaguesController@destroy',
		'as'=>'league.delete'
	]);
	Route::get('/Games',[
		'uses'=>'GamesController@index',
		'as'=>'games'
	]);
	Route::get('/Games/Lost/{id}',[
		'uses'=>'GamesController@lost',
		'as'=>'games.lost'
	]);
	Route::delete('/User/delete/{id}',[
		'uses'=>'UserController@delete',
		'as'=>'user.delete'
	]);
	Route::get('/User/Reset/{id}',[
		'uses'=>'UserController@reset',
		'as'=>'reset'
	]);
	Route::resource('games','GamesController');
	Route::resource('payments','PaymentsController');
	Route::get('Subscribers/Manage',[
		'uses'=>'SubscribersController@manage',
		'as'=>'subscribers.manage'
	]);
	Route::post('Subscribers/Renew/{id}',[
		'uses'=>'SubscribersController@suspend',
		'as'=>'subscribers.suspend'
	]);
	Route::post('Subscribers/Approve/{id}',[
		'uses'=>'SubscribersController@approve',
		'as'=>'subscribers.approve'
	]);
	Route::resource('subscribers','SubscribersController');
	Route::post('/Leagues/Update/{id}',[
		'uses'=>'LeaguesController@update',
		'as'=>'league.updates'
	]);
	Route::delete('/Payment/Delete/{id}',[
		'uses'=>'PaymentsController@destroy',
		'as'=>'payments.delete'
	]);
	Route::resource('league','LeaguesController');
	Route::get('profile', ['as' => 'profile.edit', 'uses' => 'ProfileController@edit']);
	Route::put('profile', ['as' => 'profile.update', 'uses' => 'ProfileController@update']);
	Route::put('profile/password', ['as' => 'profile.password', 'uses' => 'ProfileController@password']);
});


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
