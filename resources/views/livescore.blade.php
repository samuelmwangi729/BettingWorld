@extends('layouts.app')
@section('content')
<livescore-component :csrf-token="{{ csrf_token() }}"></livescore-component>
@stop