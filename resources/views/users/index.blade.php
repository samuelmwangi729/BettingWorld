@extends('layouts.user',['pageSlug'=>'user'])
@section('content')
<div class="content">
    @if(Session::has('success'))
    <div class="alert alert-success">
        <a href="#" class="close" data-dismiss="alert">&times;</a>
        {{ Session::get('success') }}
    </div>
    @endif
    @if(Session::has('error'))
    <div class="alert alert-danger">
        <a href="#" class="close" data-dismiss="alert">&times;</a>
        {{ Session::get('error') }}
    </div>
    @endif
    <div class="row">
<div class="col-md-12">
<div class="card ">
<div class="card-header">
<div class="row">
<div class="col-8">
    <h4 class="card-title">Users</h4>
</div>
<div class="col-4 text-right">
    <a href="#" class="btn btn-sm btn-primary">Add user</a>
</div>
</div>
</div>
<div class="card-body">

<div class="">
<table class="table tablesorter " id="">
    <thead class=" text-primary">
        <tr><th scope="col">Name</th>
        <th scope="col">Email Address</th>
        <th scope="col">Creation Date</th>
        <th scope="col">Status</th>
        <th scope="col">Actions</th>
    </tr></thead>
    <tbody>
        @foreach($users as $user)
        <tr>
            <td>{{ $user->name }}</td>
            <td>
            <a href="javascript::void(0)">{{ $user->email }}</a>
            </td>
            <td>{{ ($user->created_at)->toFormattedDateString() }}</td>
            <td><a href="javascript:void(0)">Active</a></td>
            <td>
                {{-- <button type="button" rel="tooltip" class="btn btn-success btn-sm "  titlle="Edit User" onclick="document.getElementById('suspend').submit()">
                  <i class="fa fa-times"></i>
                </button> --}}
                <form action="{{ route('user.update',[$user->id]) }}" method="POST" id="suspend">
                    @method('PATCH')
                    @csrf
                </form>
               @if($user->IsAdmin=='044535f73f8da4844a0c96f760e6e054e4dddce6')
               <button class="btn btn-primary btn-sm">Admin</button>
               @else
               <button type="button" rel="tooltip" class="btn btn-sm btn-primary" titlle="Delete User" onclick="document.getElementById('delete').submit()">
                <i class="fa fa-trash"></i>
            </button>
            <a href="{{ route('reset',[$user->id]) }}" class="btn btn-danger btn-sm">Reset Password</a>
            <form action="{{ route('user.delete',[$user->id]) }}" method="post" id="delete">
                @method('DELETE')
                @csrf
            </form>
               @endif    
            </td>
        </tr>
        @endforeach
    </tbody>
</table>
</div>
</div>

@endsection