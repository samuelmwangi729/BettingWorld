<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="{{ config('app.name') }} Games, football, prediction">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="keywords" content="BettingWorld, sure prediction site, best football prediction site in the world, best soccer prediction site, best 1x2, bet prediction site">
    <meta name="description" content="BettingWorld is the world's best prediction site with sure, secure and guaranteed sports betting tips. Trust our 100% free betting tips and predictions.">
    <meta name="author" content="BettingWorld">
    <meta property="og:url"content="https://www.bettingworld.co.ke" />
    <meta property="og:type"  content="Website" />
    <meta property="og:title"content="BettingWorld" />
    <meta property="og:description"   content="BettingWorld is the world's best prediction site with sure, secure and guaranteed sports betting tips. Trust our 100% free betting tips and predictions.">
    <title>{{ config('app.name') }} Is a Sports games prediction website aimed into helping individuals maximize their earning from the world of sports betting. With our 
        complex machine learning Algorithms, we are able to predict matches outcomes with an overall 99% accuracy rate. Be one of Us and get to join the team. 
        Get free football predictions and betting previews for every game in all the major leagues, including match tips and correct scores.
    </title>

    <!-- Scripts -->
    @include('layouts.scripts')
    <!--Start of Tawk.to Script-->
<!--Start of Tawk.to Script-->
<script type="text/javascript">
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/5f2890102da87279037e39bd/default';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
    })();
    </script>
    <style>

.table-hover tbody tr:hover {
  color: white;
  background-color: black;
}

    </style>
    <!--End of Tawk.to Script-->
    <script data-ad-client="ca-pub-6177716716878978" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top">
            <a class="navbar-brand" href="{{ url('/') }}" style="text-shadow: 1px 1px white,2px 2px red;font-size:20px">
                <img src="https://bettingworld.co.ke/dist/img/logo.jpg" height="45px"> BettingWorld
             </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('todays') }}">Fixtures</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('leagues.view') }}">Leagues</a>
                    </li>
                </ul>
                <ul class="navbar-nav .d-none .d-sm-block">
                    <li class="nav-item">
                        <a class="nav-link" href="javascript:void(0)">
                            <i class="fa fa-envelope" style="color:red"></i>&nbsp;dominicmainaw@gmail.com
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="javascript:void(0)">
                            <i class="fa fa-phone-alt" style="color:royalblue"></i>&nbsp;0792209882
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="javascript:void(0)">
                            <i class="fab fa-whatsapp" style="color:green"></i>&nbsp;0792209882
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="javascript:void(0)">
                            <i class="fab fa-facebook-f" style="color:blue"></i>&nbsp;
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="javascript:void(0)">
                            <i class="fab fa-pinterest" style="color:blue"></i>&nbsp;
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="javascript:void(0)">
                            <i class="fab fa-twitter" style="color:blue"></i>&nbsp;
                        </a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                                  <li class="nav-item">
                    <a class="nav-link" href="{{ url('login') }}">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ url('register') }}">Register</a>
                </li>
                                              </ul>
            </div>
        </nav>

        <main class="py-4">
            @yield('content')
        </main>
    </div>

	<!-- ./Footer -->
<!-- Go to www.addthis.com/dashboard to customize your tools -->
<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5dfd935ad1993c93"></script>
</body>
</html>
