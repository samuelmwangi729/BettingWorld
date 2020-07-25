<footer class="footer">
    <div class="container-fluid">
        <ul class="nav">
            <li class="nav-item">
                <a href="https://creative-tim.com" target="blank" class="nav-link">
                    {{ __(config('app.name')) }}
                </a>
            </li>
        </ul>
        <div class="copyright">
            &copy; {{ now()->year }} {{ __('made with') }} <i class="tim-icons icon-heart-2" style="color:red"></i> {{ __('by') }}
          {{_('samuel mwangi')}}
        </div>
    </div>
</footer>
