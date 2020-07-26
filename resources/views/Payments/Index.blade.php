@extends('layouts.user',['pageSlug'=>'payments'])
@section('content')
<div class="section">
    @if(Session::has('success'))
    <div class="alert alert-success">
        <a href="#" class="close" data-dismiss="alert">&times;</a>
        {{ Session::get('success') }}
    </div>
    @endif
    <h1 class="text-center">Manage Payments</h1>
    <div class="container">
        <form method="post" action="{{ route('payments.store') }}">
            @csrf
            <div class="row">
                <!--Start Col-->
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="TransactionId" class="label-control">
                            Transaction Id
                        </label>
                        <input type="text" class="form-control {{ $errors->has('TransactionId') ? ' is-invalid' : '' }}" placeholder="Transaction Id " name="TransactionId">
                        @include('alerts.feedback', ['field' => 'TransactionId'])
                    </div>
                </div>
                {{-- End the column --}}
                <!--Start Col-->
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="Amount Paid" class="label-control">
                            Amount Paid
                        </label>
                        <input type="number" class="form-control {{ $errors->has('Amount') ? ' is-invalid' : '' }}" placeholder="Amount Paid " name="Amount">
                        @include('alerts.feedback', ['field' => 'Amount'])
                    </div>
                </div>
                {{-- End the column --}}
                <!--Start Col-->
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="TransactionId" class="label-control">
                            User Email
                        </label>
                        <input type="email" class="form-control {{ $errors->has('UserEmail') ? ' is-invalid' : '' }}" placeholder="Leave it Empty " name="UserEmail" readonly value="Leave it Empty">
                        @include('alerts.feedback', ['field' => 'UserEmail'])
                    </div>
                </div>
                {{-- End the column --}}
                <!--Start Col-->
                <div class="col-sm-6">
                    <div class="form-group">
                       <button class="btn btn-primary btn-block" style="margin-top:30px">Submit</button>
                    </div>
                </div>
                {{-- End the column --}}
            </div>
        </form>
    </div>
    <div class="container">
        <h3 class="text-center" style="font-family:'Times New Roman'">Payments Made</h3>
        <table class="table table-condensed table-bordered">
            <tr class="text-center">
                <td>TransactionId</td>
                <td>Amount</td>
                <td>Actions</td>
            </tr>
            @foreach($payments as $payment)
            <tr>
                <td>{{ $payment->TransactionId }}</td>
                <td>{{ $payment->Amount }}</td>
                <td class="text-center">
                <a href="{{ route('payments.edit',[$payment->id]) }}" class=" btn btn-sm btn-primary"><i class="fa fa-edit"></i></a> &nbsp;
                <a href="#" class=" btn btn-sm btn-primary" onclick="document.getElementById('form').submit()"><i class="fa fa-trash"></i></a> &nbsp;
                <form 
                method="post" 
                action="{{route('payments.delete',[$payment->id])}}"  onsubmit="return confirm('Are you sure?')" id="form"> 
                @method('delete')
                @csrf
                {{-- {!! Form::token() !!}
                {{ method_field('DELETE') }} --}}
              </form>
                </a>
                </td>
            </tr>
            @endforeach
        </table>
    </div>
</div>
@endsection