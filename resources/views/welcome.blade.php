@extends('layouts.app')
@section('content')
<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img class="d-block w-100" src="{{ asset('Slider/1.jpg') }}" alt="First slide">
        <div class="carousel-caption d-none d-md-block">
            <h1 style="font-size:100px;background-color:black;opacity:.5" class="text-right">Feel the precense</h1>
            <p style="font-size:2em;background-color:black;opacity:.5;width:50%">Enjoy the Match. We Got You!!</p>
            <p class="text-left">
            <button class="btn btn-lg" style="background-color:gold;color:purple;font-weight:bold">Join Us Today &rarr;</button>
            </p>
          </div>
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="{{ asset('Slider/2.jpg') }}" alt="Second slide">
        <div class="carousel-caption d-none d-md-block">
            <h1 style="font-size:100px;background-color:black;opacity:.5" class="text-right">Follow Us.</h1>
            <p style="font-size:2em;background-color:black;opacity:.5;width:100%">Dont Be scared to make the Move!!</p>
            <p class="text-left">
            <button class="btn btn-lg" style="background-color:gold;color:purple;font-weight:bold">Login and Upgrade for VIP &rarr;</button>
            </p>
          </div>
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="{{ asset('Slider/3.jpg') }}" alt="Third slide">
        <div class="carousel-caption d-none d-md-block">
            <h1 style="font-size:100px;background-color:black;opacity:.5" class="text-right">Join the World</h1>
            <p style="font-size:2em;background-color:black;opacity:.5;width:100%">Make a Fortune With Us</p>
            <p class="text-left">
            <button class="btn btn-lg" style="background-color:gold;color:purple;font-weight:bold">
            Sign Up today
            </button>
            </p>
          </div>
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="{{ asset('Slider/4.jpg') }}" alt="Third slide">
        <div class="carousel-caption d-none d-md-block">
            <h1 style="font-size:100px;background-color:black;opacity:.5" class="text-right">We are Here.</h1>
            <p style="font-size:2em;background-color:black;opacity:.5;width:100%">To help You Make the Dive</p>
          </div>
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="{{ asset('Slider/5.jpg') }}" alt="Third slide">
        <div class="carousel-caption d-none d-md-block">
            <h1 style="font-size:100px;background-color:black;opacity:.5" class="text-right">Hit'em Hard.</h1>
            <p style="font-size:2em;background-color:black;opacity:.5;width:100%">Feel Confident to walk on your Own</p>
          </div>
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="{{ asset('Slider/6.jpg') }}" alt="Third slide">
        <div class="carousel-caption d-none d-md-block">
            <h1 style="font-size:100px;background-color:black;opacity:.5" class="text-right">We are Accurate.</h1>
            <p style="font-size:2em;background-color:black;opacity:.5;width:100%">No matter the time, We got you!!!</p>
          </div>
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
<welcome-component></welcome-component>
@endsection