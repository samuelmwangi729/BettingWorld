@extends('layouts.app',['pageSlug' => 'league'])
@section('content')
<div class="section">
    <h2>Update {{ $league->League }} </h2>
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
        <div class="col-sm-6">
            <h4>Update League</h4>
            <form method="POST" action="{{ route('league.updates',[$league->id]) }}">
                @csrf
                <div class="form-group">
                    <label class="label-control" for="League" style="color:white !important">League</label>
                    <input type="text" class="form-control input-md {{ $errors->has('League') ? ' is-invalid' : '' }}" name="League" value="{{ $league->League }}">
                    @include('alerts.feedback', ['field' => 'League'])
                </div>
                <button class="btn btn-primary">Update League</button>
            </form>
        </div>
        <div class="col-sm-6">
           <h4> Available Leagues</h4>
           <table class="table tablesorter table-bordered table-codensed">
            <thead class=" text-primary">
              <tr>
                <th>
                League
                </th>
                <th>
                    Actions
                </th>
              </tr>
            </thead>
            <!--End Thead-->
            <!--Start Body-->
            <tbody>
              @foreach($leagues as $league)
              <tr>
                <td>
               {{$league->League}}
                </td>
                <td>
                    <a href="{{ route('league.edit',[$league->id]) }}" class="badge badge-primary fa fa-edit">&nbsp;Edit</a>
                    <a href="{{ route('league.delete',[$league->id]) }}" class="badge badge-danger fa fa-trash">&nbsp;Delete</a>
                  </td>
              </tr>
              @endforeach
            </tbody>
            <!--End Body-->
          </table>
        </div>
    </div>
</div>
@endsection