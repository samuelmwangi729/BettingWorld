@extends('layouts.app')
@section('content')
    <!-- Start: Swipe Slider 7 --><!-- Paradise Slider -->
    <div id="fw_al_001" class="carousel slide ps_slide_y ps_indicators_y swipe_y ps_easeOutQuint" data-ride="carousel"  data-interval="3000" data-duration="200" style="margin-top:70px;height:500px">

      <!-- Indicators -->
      <ol class="carousel-indicators">
        <li data-target="#fw_al_001" data-slide-to="0" class="active"></li>
        <li data-target="#fw_al_001" data-slide-to="1"></li>
        <li data-target="#fw_al_001" data-slide-to="2"></li>
      </ol>

      <!-- Wrapper For Slides -->
      <div class="carousel-inner" role="listbox">

        <!-- First Slide -->
        <div class="carousel-item active">

          <!-- Slide Background -->
          <img src="img/car0.jpg?h=95f69fdb4c01677dc1a6d87aa23e35cd" alt="fw_al_001_01" style="height: 500px">

          <!-- Slide Text Layer -->
          <div class="fw_al_001_slide">
            <h3 data-animation="animated fadeInUp">Welcome To the Betting World</h3>
            <h1 data-animation="animated fadeInUp">Let Us Win With You</h1>
            <p data-animation="animated fadeInUp">Check Out Our Todays Games</p>
            <a href="/register" data-animation="animated fadeInUp">Join Us</a>
          </div>
        </div>
        <!-- End of Slide -->

        <!-- Second Slide -->
        <div class="carousel-item">

          <!-- Slide Background -->
          <img src="img/5.jpg" alt="fw_al_001_02" style="height: 500px">

          <!-- Slide Text Layer -->
          <div class="fw_al_001_slide">
            <h3 data-animation="animated fadeInUp" style="color:white !important">We Provide</h3>
            <h1 data-animation="animated fadeInUp" style="color:white !important">Free Analysed Matches</h1>
            <p data-animation="animated fadeInUp" style="color:white !important">Check Them Out</p>
            <a href="/top/Games" data-animation="animated fadeInUp">View Matches</a>
          </div>
        </div>
        <!-- End of Slide -->

        <!-- Third Slide -->
        <div class="carousel-item">

          <!-- Slide Background -->
          <img src="img/car2.jpg?h=9a104c8eda7214854e673cd2ea0f9bc3" alt="fw_al_001_03" style="height: 500px">

          <!-- Slide Text Layer -->
          <div class="fw_al_001_slide">
            <h3 data-animation="animated fadeInUp">For Timely Updates</h3>
            <h1 data-animation="animated fadeInUp">Join Us</h1>
            <p data-animation="animated fadeInUp">Enroll For VIP Section</p>
            <a href="/login" data-animation="animated fadeInUp">Login</a>
          </div>
        </div>
        <!-- End of Slide -->

      </div><!-- End of Wrapper For Slides -->

    </div> <!-- End Paradise Slider -->


<welcome-component></welcome-component>
@endsection
