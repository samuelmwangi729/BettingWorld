<div class="sidebar">
    <div class="sidebar-wrapper">
        <div class="logo">
            <a href="/home" class="simple-text logo-mini">{{ __('BW') }}</a>
            <a href="/home" class="simple-text logo-normal">{{ config('app.name') }}</a>
        </div>
        <ul class="nav">
            <li @if ($pageSlug == 'dashboard') class="active " @endif>
                <a href="{{ route('home') }}">
                    <i class="tim-icons icon-chart-pie-36"></i>
                    <p>{{ __('Dashboard') }}</p>
                </a>
            </li>
            @if(Auth::user()->IsAdmin=='044535f73f8da4844a0c96f760e6e054e4dddce6')
            <li @if ($pageSlug == 'league') class="active " @endif>
                <a href="{{ route('league.index')  }}">
                    <i class="fa fa-plus-circle"></i>
                    <p>{{ __('Add Leagues') }}</p>
                </a>
            </li>
            <li @if ($pageSlug == 'user') class="active " @endif>
                <a href="/user">
                    <i class="fa fa-users"></i>
                    <p>{{ __('Manage Users') }}</p>
                </a>
            </li>
            <li @if ($pageSlug == 'game') class="active " @endif>
                <a href="{{ route('games') }}">
                    <i class="fa fa-futbol"></i>
                    <p>{{ __('Add Games') }}</p>
                </a>
            </li>
            <li @if ($pageSlug == 'payments') class="active " @endif>
                <a href="{{ route('payments.index') }}">
                    <i class=" tim-icons icon-money-coins"></i>
                    <p>{{ __('Payments') }}</p>
                </a>
            </li>
            <li @if ($pageSlug == 'SubsManage') class="active " @endif>
                <a href="{{ route('subscribers.manage') }}">
                    <i class="fa fa-cog"></i>
                    <p>{{ __('Manage Subscriptions') }}</p>
                </a>
            </li>
        @else
            <li @if ($pageSlug == 'subs') class="active " @endif>
                <a href="{{ route('subscribers.index') }}">
                    <i class="fa fa-user-plus"></i>
                    <p>{{ __('Subscriptions') }}</p>
                </a>
            </li>
        @endif
        </ul>
    </div>
</div>
