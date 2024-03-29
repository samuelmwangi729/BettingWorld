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
Route::get('/Predicted/Games/All',[
	'uses'=>'PredictionsController@PredictedAll'
]);
Route::get('Allpredictions',[
	'uses'=>'PredictionsController@all',
	'as'=>'AllPredictions'
]);
Route::get('/Standings',[
	'uses'=>'StadingsController@standing'
]);
ROute::get('/bigGame/today',[
	'uses'=>'GamesController@Big'
]);
Route::resource('predictions','PredictionsController');
Route::get('/Match/Highlights',[
	'uses'=>'PredictionsController@single',
]);
Route::get('/predict/game/{id}',[
	'uses'=>'PredictionsController@Predict'
]);
Route::get('Yesterday/WonGames',[
	'uses'=>'GamesController@Yesterday'
]);
Route::get('/OnlyTop',[
	'uses'=>'GamesController@OnlyTop',
	'as'=>'only.games'
]);
Route::get('/top/Games',[
	'uses'=>'GamesController@Gtop',
	'as'=>'top.games'
]);
Route::get('Fixtures',[
	'uses'=>'GamesController@tfixtures',
	'as'=>'todays'
]);
Route::get('/Leagues',[
	'uses'=>'LeaguesController@league',
	'as'=>'leagues.view'
]);
Route::get('/All/Leagues',[
	'uses'=>'LeaguesController@All',
	'as'=>'leagues.all'
]);
Route::get('Todays/Games',[
	'uses'=>'GamesController@todaysFixtures',
	'as'=>'Today'
]);
Route::get('Top/Games',[
	'uses'=>'GamesController@Top'
]);

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Auth::routes();
Route::get('/Free/Over',[
    'uses'=>'IndexController@todays',
    'as'=>'free.games'
]);
Route::get('/Free/Over2',[
    'uses'=>'IndexController@over2',
    'as'=>'over2.games'
]);
Route::get('/Free/Under',[
    'uses'=>'IndexController@under',
    'as'=>'under.games'
]);
Route::get('/Free/Draw',[
    'uses'=>'IndexController@draw',
    'as'=>'draw.games'
]);
Route::get('/Premium/Games',[
    'uses'=>'IndexController@premium',
    'as'=>'premium.games'
]);
Route::get('/Get/Completed/Games',[
    'uses'=>'IndexController@completed',
    'as'=>'completed.games'
]);

Route::get('/home', 'HomeController@index')->name('home')->middleware('auth');
Route::group(['middleware' => 'auth'], function () {
	Route::get('/livescore',[
		'uses'=>'IndexController@live'
	]);
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
	Route::post('Subscribers/Suspend/{id}',[
		'uses'=>'SubscribersController@suspend',
		'as'=>'subscribers.suspend'
	]);
	Route::post('Subscribers/Approve/{id}',[
		'uses'=>'SubscribersController@approve',
		'as'=>'subscribers.approve'
	]);
	Route::post('Subscribers/Approve/{id}',[
		'uses'=>'SubscribersController@approve',
		'as'=>'subscribers.renew'
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
	Route::post('Matches/Fixtures',[
		'uses'=>'GamesController@fixtures',
		'as'=>'fixtures'
	]);
	Route::get('/Api/Leagues',[
		'uses'=>'LeaguesController@Api',
		'as'=>'apileagues'
	]);
	Route::post('/Api/Leagues/Post',[
		'uses'=>'LeaguesController@Post',
		'as'=>'apileaguespost'
	]);
	

	Route::resource('league','LeaguesController');
	Route::get('profile', ['as' => 'profile.edit', 'uses' => 'ProfileController@edit']);
	Route::put('profile', ['as' => 'profile.update', 'uses' => 'ProfileController@update']);
	Route::put('profile/password', ['as' => 'profile.password', 'uses' => 'ProfileController@password']);
	Route::get('/IsAdminiistratorOfTheSite',[
		'uses'=>'HomeController@isAdmin',
		'as'=>'isadmin'
	]);
	Route::get('AllTheGamez',[
		'uses'=>'GamesController@all',
	]);
	Route::get('Complete',[
		'uses'=>'GamesController@allC',
	]);
	Route::get('Suspend/{id}',[
		'uses'=>'GamesController@suspend',
	]);
	Route::get('/Get/Today',[
		'uses'=>'SettingsController@today',
	]);
	Route::get('Reset/{id}',[
		'uses'=>'GamesController@Reset',
	]);
	Route::resource('settings','SettingsController');
	Route::get('/Some/Leagues',[
		'uses'=>'LeaguesController@some'
	]);
	Route::get('/Frees/Games',[
		'uses'=>'GamesController@Free'
	]);
	Route::get('/isSub',[
		'uses'=>'SubscribersController@sub'
	]);
	Route::get('/Get/Predictions',[
		'uses'=>'GamesController@Predictions'
	]);
});

Route::post('/LatestData',[
	'uses'=>'PredictionsController@LatestData'
]);
Route::get('/Latest/Data',[
	'uses'=>'PredictionsController@GetData',

]);
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');