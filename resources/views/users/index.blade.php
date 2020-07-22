@extends('layouts.app',['pageSlug'=>'user'])
@section('content')
<div class="content">
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
        <th scope="col">Phone Number</th>
        <th scope="col">Creation Date</th>
        <th scope="col">Status</th>
        <th scope="col">Actions</th>
    </tr></thead>
    <tbody>
        @foreach($users as $user)
        <tr>
            <td>{{ $user->name }}</td>
            <td>
            <a href="javascript::void(0)">{{ $user->number }}</a>
            </td>
            <td>{{ ($user->created_at)->toFormattedDateString() }}</td>
            <td><a href="javascript:void(0)">Active</a></td>
            <td>
                <button type="button" rel="tooltip" class="btn btn-info btn-sm btn-round btn-icon"  titlle="Suspend User">
                    <i class="tim-icons icon-single-02"></i>
                </button>
                <button type="button" rel="tooltip" class="btn btn-success btn-sm btn-round btn-icon"  titlle="Edit User">
                    <i class="tim-icons icon-settings"></i>
                </button>
                <button type="button" rel="tooltip" class="btn btn-danger btn-sm btn-round btn-icon" titlle="Delete User">
                    <i class="tim-icons icon-simple-remove"></i>
                </button>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>
</div>
</div>
@endsection