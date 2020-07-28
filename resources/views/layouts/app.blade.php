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
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link href="{{ asset('dist/img/logo.jpg') }}" rel="icon">
    <link rel="apple-touch-icon-precomposed" href="{{ asset('dist/img/logo.jpg') }}">
    <link rel="stylesheet" href="{{ asset('plugins/fontawesome-free/css/all.min.css') }}">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
</head>
<body>
      <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top">
        <a class="navbar-brand" href="{{ url('/') }}" style="text-shadow: 1px 1px white,2px 2px red;font-size:20px">
            <img src="{{ asset('dist/img/logo.jpg') }}" height="45px"> {{ config('app.name') }}
         </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="javascript:void(0)">Features</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="javascript:void(0)">Pricing</a>
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
               @guest
               <li class="nav-item">
                <a class="nav-link" href="{{ url('/login') }}">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="{{ url('/register') }}">Register</a>
            </li>
               @endguest
               @auth
               <li class="nav-item">
                <a class="nav-link" href="/home">MyAccount</a>
            </li>
            <li class="nav-item dropdown">
                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                    {{ Auth::user()->name }} <span class="caret"></span>
                </a>

                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="{{ route('logout') }}"
                       onclick="event.preventDefault();
                                     document.getElementById('logout-form').submit();">
                        {{ __('Logout') }}
                    </a>

                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                        @csrf
                    </form>
                </div>
            </li>
               @endauth
            </ul>
        </div>
    </nav>
    <div id="app" class="row">
        <main class="py-4">
            @yield('content')
        </main>
    </div>
    <div class="row" id="footer">
        <div class="col-xs-12 col-sm-4 col-md-4">
            <img class="card-img-top" src="{{ asset('dist/img/logo.jpg') }}" alt="BettingWorld" style="width:150px;border-radius:75px">
            <p class="text-white">
           We provide Selected Soccer betting Tips and predictions. You probably would need to pick at most 3 games and stake highly. 99% chances of winning guaranteed.
           We also  aim to promote responsibility in gambling. We provide information to help you make informed decisions about your gambling.
            </p>
        </div>
        <div class="col-xs-12 col-sm-4 col-md-4">
            <h5>Quick links</h5>
            <ul class="list-unstyled quick-links">
                <li><a href="javascript:void(0)"><i class="fa fa-angle-double-right"></i>Home</a></li>
                <li><a href="javascript:void(0)"><i class="fa fa-angle-double-right"></i>About</a></li>
                <li><a href="javascript:void(0)"><i class="fa fa-angle-double-right"></i>Livescore</a></li>
                <li><a href="javascript:void(0)"><i class="fa fa-angle-double-right"></i>Match Results</a></li>
                <li><a href="javascript:void(0)"><i class="fa fa-angle-double-right"></i>JackPots</a></li>
            </ul>
        </div>
        <div class="col-xs-12 col-sm-4 col-md-4">
            <h5>Tips</h5>
            <ul class="list-unstyled quick-links">
                <li><a href="javascript:void(0)"><i class="fa fa-angle-double-right"></i>HT/FT</a></li>
                <li><a href="javascript:void(0)"><i class="fa fa-angle-double-right"></i>Asian Handicap</a></li>
                <li><a href="javascript:void(0)"><i class="fa fa-angle-double-right"></i>Correct Score</a></li>
                <li><a href="javascript:void(0)"><i class="fa fa-angle-double-right"></i>Combos</a></li>
            </ul>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
            <ul class="list-unstyled list-inline social">
                <li class="list-inline-item" style="padding-left:30px"><a href="javascript:void(0)"><i class="fab fa-facebook"></i></a></li>
                <li class="list-inline-item"><a href="javascript:void(0)"><i class="fab fa-twitter"></i></a></li>
                <li class="list-inline-item"><a href="javascript:void(0)"><i class="fab fa-instagram"></i></a></li>
                <li class="list-inline-item"><a href="javascript:void(0)"><i class="fab fa-google-plus"></i></a></li>
                <li class="list-inline-item"><a href="javascript:void(0)" target="_blank"><i class="fa fa-envelope"></i></a></li>
            </ul>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
            <p> © Copyrights  <?php echo date('Y');?> {{ config('app.name') }}| All Rights Reserved &nbsp;<br> Design by <a href="mailto:samuelmwangi729@gmail.com" style="color:white;text-style:none !mportant">Samuel Mwangi</a></p>
        </div>
	</div>
	<!-- ./Footer -->
<!-- Go to www.addthis.com/dashboard to customize your tools -->
<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5dfd935ad1993c93"></script>
</body>
</html>
