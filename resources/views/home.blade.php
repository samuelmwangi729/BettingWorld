@extends('layouts.master')
@section('content')
<div class="container-fluid">
    @if(Auth::user()->IsAdmin=='044535f73f8da4844a0c96f760e6e054e4dddce6')
<home-component></home-component>
@else
<user-component></user-component>
@endif
</div>
@endsection