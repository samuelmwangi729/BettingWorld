@extends('layouts.user',['pageSlug'=>'SubsManage'])
@section('content')
@if(Session::has('error'))
<div class="alert alert-danger">
    <a href="#" class="close" data-dismiss="alert">
        &times;
    </a>
    {{ Session::get('error') }}
</div>
@endif
@if(Session::has('success'))
<div class="alert alert-success">
    <a href="#" class="close" data-dismiss="alert">
        &times;
    </a>
    {{ Session::get('success') }}
</div>
@endif
<div class="container">
    <h3 class="text-center">Manage Subscribers</h3>
    <table class="table table-striped table-condensed">
        <thead>
            <th>Phone Number</th>
            <th>Amount Paid</th>
            <th>Expiry Date</th>
            <th>Status</th>
            <th>Actions</th>
        </thead>
        <tbody>
            @foreach ($Subscribers as $subscriber )
                <tr>
                    <td>{{ $subscriber->UserId }}</td>
                    <td>{{ $subscriber->TransactionId }}</td>
                    <td>{{ $subscriber->Expiry }}</td>
                    <td>
                        @if($subscriber->Status==0)
                        <div class="badge badge-success">Active</div>
                        @elseif($subscriber->Status==3)
                            <div class="badge badge-warning">Pending Approval</div>
                        @else
                        <div class="badge badge-danger">Expired</div>
                        @endif
                    </td>
                    <td>
                        @if($subscriber->Status==0)
                            <button class="btn btn-danger btn-sm" onclick="document.getElementById('suspend').submit()">Suspend</button>
                            <form method="post" action="{{ route('subscribers.suspend',[$subscriber->id]) }}" id="suspend">
                                @csrf
                            </form>
                        @elseif($subscriber->Status==1)
                            <div class="badge badge-warning" onclick="document.getElementById('renew').submit()">Renew</div>
                            <form method="post" action="{{ route('subscribers.renew',[$subscriber->id]) }}" id="renew">
                                @method('PUT')
                                @csrf
                            </form>
                        @else
                        <button class="btn btn-primary btn-sm"  onclick="document.getElementById('approve').submit()">Approve</button>
                        <form method="post" action="{{ route('subscribers.update',[$subscriber->id]) }}" id="approve">
                            @method('PUT')
                            @csrf
                        </form>
                        @endif
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection