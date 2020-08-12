 <!-- Main Sidebar Container -->
 <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="{{ route('home') }}" class="brand-link">
      <img src="https://bettingworld.co.ke/dist/img/logo.jpg"
           alt="{{ config('app.name') }}"
           class="brand-image img-circle elevation-3"
           style="opacity: .8">
      <span class="brand-text font-weight-light">{{ config('app.name') }}</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="info">
          <a href="/profile" class="d-block">{{ Auth::user()->name }}</a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Quick Access
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="../../index.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Games</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="../../index2.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Subscription</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="../../index3.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Payments</p>
                </a>
              </li>
            </ul>
          </li>
        @if(Auth::user()->IsAdmin=='044535f73f8da4844a0c96f760e6e054e4dddce6')
        <li class="nav-link">
            <a href="{{ route('league.index')  }}">
                <i class="fa fa-plus-circle"></i>
                <p>{{ __('Add Leagues') }}</p>
            </a>
        </li>
        <li class="nav-link">
            <a href="/user">
                <i class="fa fa-users"></i>
                <p>{{ __('Manage Users') }}</p>
            </a>
        </li>
        <li class="nav-link">
            <a href="{{ route('games') }}">
                <i class="fa fa-futbol"></i>
                <p>{{ __('Add Games') }}</p>
            </a>
        </li>
        <li class="nav-link">
            <a href="{{ route('payments.index') }}">
               <i class="fa fa-money-bill"></i>
                <p>{{ __('Payments') }}</p>
            </a>
        </li>
        <li class="nav-link">
            <a href="{{ route('subscribers.manage') }}">
                <i class="fa fa-cog"></i>
                <p>{{ __('Manage Subscriptions') }}</p>
            </a>
        </li>
    @else
        <li class="nav-link">
            <a href="{{ route('subscribers.index') }}">
                <i class="fa fa-user-plus"></i>
                <p>{{ __('Subscriptions') }}</p>
            </a>
        </li>
    @endif
    <li class="nav-link">
      <a href="/profile">
          <i class="fa fa-user-cog"></i>
          <p>{{ __('My Account') }}</p>
      </a>
  </li>
    <li class="nav-link">
        <a  href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                                      <i class="fa fa-power-off"></i>
                                      <p>  {{ __('Logout') }}</p>
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
    </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>