<!DOCTYPE html>
<html>

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>Coming Soon ...</title>
    <link rel="shortcut icon" type="image/png" href="favicon-32x32.png" />
    <link rel="stylesheet" type="text/css" href="{{ asset('Widgets/main-style.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('Widgets/widgetLiveScore.css') }}">
    <script src="{{ asset('Widgets/jquery.js') }}"></script>
    <script src="{{ asset('Widgets/jqueryGlobals.js') }}"></script>
    <script src="{{ asset('Widgets/jquery.widgetLiveScore.js') }}" type="text/javascript"></script>
</head>

<body>
    <div class="container">
        <section id="widgetLiveScore"></section>
    </div>
</body>
<script type="text/javascript">
    $(document).ready(function() {
        $('#widgetLiveScore').widgetLiveScore({
            widgetWidth: '100%'
        });
    });
</script>

</html>