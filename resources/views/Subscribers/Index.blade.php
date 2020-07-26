@extends('layouts.user',['pageSlug'=>'subs'])
@section('content')
<div class="container">
<h1 class="text-center">My Subscriptions</h1>
@if(Session::has('success'))
<div class="alert alert-success">
  <a href="#" class="close" data-dismiss="alert">&times;</a>
  {{ Session::get('success') }}
</div>
@endif
<div class="row">
    <div class="col-sm-6">
      <h5 class="text-center">  Renew Subscriptions</h5>
      <form method="POST" action="{{ route('subscribers.store') }}">
        @csrf
          <div class="form-group">
              <label for="TransactionId" class="label-control">Enter Your Transaction Id</label>
              <input type="text" name="TransactionId" class="form-control {{ $errors->has('TransactionId') ? ' is-invalid' : '' }}" placeholder="Eg. UAt9EXW2K0">
              @include('alerts.feedback', ['field' => 'TransactionId'])
          </div>
          <button class="btn btn-primary" type="submit">Post Transaction id</button>
      </form>
    </div>
    <div class="col-sm-6">
      <h5 class="text-center">  My Previous Subscription</h5>
        <table class="table table-bordered table-condensed table-hover">
            <thead>
                <tr class="text-center">
                    <th>Transaction id</th>
                    <th>Expiry</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
              @foreach($subs as $sub)
              <tr>
                <td class="text-center">{{ $sub->TransactionId }}</td>
              <td>{{ $sub->Expiry }}</td>
              <td>
                @if($sub->Status==0)
                <div class="badge badge-success">
                  Active
                </div>
                @elseif($sub->Status==3)
                <div class="badge badge-warning">
                  Pending Approval
                </div>
                @else
                <div class="badge badge-danger">
                  Pending Approval
                </div>
                @endif
              </td>
              </tr>
              @endforeach
            </tbody>
        </table>
    </div>
</div>
</div>
@endsection