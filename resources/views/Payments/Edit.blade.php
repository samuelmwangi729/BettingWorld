@extends('layouts.user',['pageSlug'=>'payments'])
@section('content')
<div class="container">
    <h1 class="text-center">Edit payment Details</h1>
    <form method="post" action="{{ route('payments.update',[$payment->id]) }}">
        @method('patch')
        @csrf
        <div class="row">
            <!--Start Col-->
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="TransactionId" class="label-control">
                        Transaction Id
                    </label>
                    <input type="text" class="form-control {{ $errors->has('TransactionId') ? ' is-invalid' : '' }}" value="{{ $payment->TransactionId }} " name="TransactionId">
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
                    <input type="number" class="form-control {{ $errors->has('Amount') ? ' is-invalid' : '' }}" value="{{ $payment->Amount }}" name="Amount">
                    @include('alerts.feedback', ['field' => 'Amount'])
                </div>
            </div>
            {{-- End the column --}}
            <!--Start Col-->
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="TransactionId" class="label-control">
                        User Number
                    </label>
                    <input type="number" class="form-control {{ $errors->has('UserNumber') ? ' is-invalid' : '' }}" value="{{ $payment->UserId }}"  name="UserNumber">
                    @include('alerts.feedback', ['field' => 'UserNumber'])
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
@endsection