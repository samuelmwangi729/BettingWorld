@extends('layouts.user',['pageSlug'=>'subs'])
@section('content')
<div class="container">
  <div class="container">
    <span>
      <u>Steps to Subscribe to our VIP Games</u>
      <ul>
        <li>Go to your M-Pesa</li>
        <li>Select Send Money</li>
        <li>Enter the Phone Number <span style="color:red;font-weight:bold">0792209882</span></li>
        <li>Enter Amount <span style="color:red;font-weight:bold">10 &euro;</span> subject to 
          <a href="https://www.google.com/search?sxsrf=ALeKk031tMFuTRCzG5iXParDqeWM3kczxQ%3A1595745280840&ei=ACQdX8LYMoixU-uvkPAC&q=ksh+to+euro&oq=ksh+to+euro&gs_lcp=CgZwc3ktYWIQAzIHCAAQRhCCAjICCAAyAggAMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB46BwgAEEcQsAM6BwgjEOoCECc6BwguEOoCECc6BAgjECc6BQgAEJECOg4ILhCxAxDHARCvARCRAjoECC4QQzoFCAAQsQM6CAguELEDEIMBOgsILhCxAxDHARCvAToICAAQsQMQgwE6CAgAELEDEJECOgUILhCRAjoHCAAQFBCHAjoFCC4QsQM6CAguEMcBEK8BOgQIABBDOg0IABCxAxCRAhBGEIICOggIABAWEAoQHlCjCljvQmDwRWgEcAB4BIAB-QKIAZomkgEGMi0xMy41mAEAoAEBqgEHZ3dzLXdperABCsABAQ&sclient=psy-ab&ved=0ahUKEwjC2Pa0purqAhWI2BQKHesXBC4Q4dUDCAw&uact=5">
            Conversion Rates Here</a></li>
        <li>Hit Send. Then after you receive a confirmation text,Post the transaction Code to us through the form below. It will take at least 5 minutes for us to verify the transaction</li>
      </ul>
    </span>
  </div>
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
                  Expired
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