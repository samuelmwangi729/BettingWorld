// ---------------------------------
// ---------- widgetMatchResults ----------
// ---------------------------------
// Widget for MatchResults Display
// ------------------------
;
(function($, window, document, undefined) {

    var widgetMatchResults = 'widgetMatchResults';

    function Plugin(element, options) {
        this.element = element;
        this._name = widgetMatchResults;
        this._defaults = $.fn.widgetMatchResults.defaults;
        this.options = $.extend({}, this._defaults, options);

        this.init();
    }

    $.extend(Plugin.prototype, {

        // Initialization logic
        init: function() {
            this.buildCache();
            this.bindEvents();
            this.initialContent(this.options.matchResultsDetailsAjaxURL, this.options.matchId, this.options.method, this.options.widgetKey, this.options.leagueLogo);
        },

        // Remove plugin instance completely
        destroy: function() {
            this.unbindEvents();
            this.$element.removeData();
        },

        // Cache DOM nodes for performance
        buildCache: function() {
            this.$element = $(this.element);
        },

        // Bind events that trigger methods
        bindEvents: function() {
            var plugin = this;
        },

        // Unbind events that trigger methods
        unbindEvents: function() {
            this.$element.off('.' + this._name);
        },

        initialContent: function(matchResultsDetailsAjaxURL, matchId, method, widgetKey, leagueLogo) {

            // Get widget location
            var matchResultsLocation = $(this.element);

             // Adding the "widgetMatchResults" class for styling and easyer targeting
            matchResultsLocation.addClass('widgetMatchResults');

            // If backgroundColor setting is set, here we activate the color
            if (this.options.backgroundColor) {
                matchResultsLocation.css('background-color', this.options.backgroundColor);
            }

            // If widgetWidth setting is set, here we set the width of the list
            if (this.options.widgetWidth) {
                matchResultsLocation.css('width', this.options.widgetWidth);
            }

            // We send a request to server for Match infos
            $.ajax({
                url: matchResultsDetailsAjaxURL,
                cache: false,
                data: {
                    met: method,
                    widgetKey: widgetKey,
                    matchId: matchId,
                    timezone: getTimeZone()
                },
                dataType: 'json'
            }).done(function(res) {
                // If server send results we populate HTML with sended information
                if (res.result) {
                    // Check if we get the time
                    var seeWhatMatchDetailsToShow = setInterval(function() {
                        if (timeForFixtures.length > 0) {
                            // If date is in local storage or event status dose not exist we show predefined HTML
                            if ((sessionStorage.getItem('fixturesDate') > timeForFixtures) || (res.result[0].event_status == null)) {
                                // Hide loading screen
                                $('.loading').hide();
                                // Details for match
                                var otherMatchDetails = '<div class="otherMatchDetails">';
                                otherMatchDetails += '<div class="otherMatchDetailsInfos">';
                                otherMatchDetails += '<div class="leagueImg" style="background-image: url(\'' + (((leagueLogo == '') || (leagueLogo == 'null') || (leagueLogo == null) || (leagueLogo == 'https://allsportsapi.com/logo/logo_leagues/-1')) ? 'img/no-img.png' : leagueLogo) + '\');"></div>';
                                otherMatchDetails += '<div>' + res.result[0].country_name + ': ' + res.result[0].league_name + '</div>';
                                otherMatchDetails += '</div>';
                                var formattedDate = new Date(res.result[0].event_date);
                                var d = formattedDate.getDate();
                                var m = formattedDate.getMonth() + 1;
                                var y = formattedDate.getFullYear();
                                otherMatchDetails += '<div>' + (d < 10 ? '0' + d : d) + '.' + (m < 10 ? '0' + m : m) + '.' + y + ' ' + res.result[0].event_time + '</div>';
                                otherMatchDetails += '</div>';
                                $(matchResultsLocation).prepend(otherMatchDetails);

                                // Add hook in HTML for Match Results Tab content infos
                                $(matchResultsLocation).append('<section id="matchResultsContentTable"></section>');
                                var htmlConstructor = '<div id="matchResultsDates">';
                                htmlConstructor += '<div id="matchResultsDatesTitle">';
                                if (res.result) {
                                    htmlConstructor += '<div class="event_home_team">';
                                    htmlConstructor += '<div class="event_home_team_part">';
                                    htmlConstructor += '<div class="event_home_team_part_img">';
                                    htmlConstructor += '<div class="image-style-for-flag" style="background-image: url(\'' + ((!res.result[0].home_team_logo) ? 'img/no-img.png' : ((res.result[0].home_team_logo == '') ? 'img/no-img.png' : res.result[0].home_team_logo)) + '\');"></div>';
                                    htmlConstructor += '</div>';
                                    htmlConstructor += '<div class="event_home_team_part_name">';
                                    htmlConstructor += '<div>' + res.result[0].event_home_team + '</div>';
                                    htmlConstructor += '</div>';
                                    htmlConstructor += '</div>';
                                    htmlConstructor += '<div class="event_info">';
                                    htmlConstructor += '<div class="event_info_score">';
                                    htmlConstructor += '<div>-</div>';
                                    htmlConstructor += '</div>';
                                    htmlConstructor += '<div class="event_info_status">';
                                    htmlConstructor += '<div>' + ((res.result[0].event_status) ? res.result[0].event_status : '') + '</div>';
                                    htmlConstructor += '</div>';
                                    htmlConstructor += '</div>';
                                    htmlConstructor += '<div class="event_away_team_part">';
                                    htmlConstructor += '<div class="event_away_team_part_img">';
                                    htmlConstructor += '<div class="image-style-for-flag" style="background-image: url(\'' + ((!res.result[0].away_team_logo) ? 'img/no-img.png' : ((res.result[0].away_team_logo == '') ? 'img/no-img.png' : res.result[0].away_team_logo)) + '\');"></div>';
                                    htmlConstructor += '</div>';
                                    htmlConstructor += '<div class="event_away_team_part_name">';
                                    htmlConstructor += '<div>' + res.result[0].event_away_team + '</div>';
                                    htmlConstructor += '</div>';
                                    htmlConstructor += '</div>';
                                    htmlConstructor += '</div>';
                                }
                                htmlConstructor += '</div>';
                                htmlConstructor += '<div class="nav-tab-wrapper-all">';
                                htmlConstructor += '<ul class="nav-tab-wrapper-all-container">';
                                htmlConstructor += '<li><span><a href="#matchSummary" class="matchResults-h2 nav-tab nav-tab-active">Match Summary</a></span></li>';
                                htmlConstructor += '</ul>';
                                htmlConstructor += '</div>';
                                htmlConstructor += '<section id="matchSummary" class="tab-content active">';
                                htmlConstructor += '<div class="tab-container futureMatch">';
                                htmlConstructor += '<p>No live score information available now.</p>';
                                htmlConstructor += '</div>';
                                htmlConstructor += '</section>';
                                $('#matchResultsContentTable').append(htmlConstructor);

                                // Remove Fixture Date from local storage
                                sessionStorage.removeItem('fixturesDate');

                                // Added close button in HTML
                                $('#matchResultsContentTable').append('<p class="closeWindow">close window</p>');
                                // Added click function to close window
                                $('.closeWindow').click(function() {
                                    window.close();
                                });

                                // Added click function to header close window
                                $('.backButton').click(function() {
                                    window.close();
                                });

                            } else {

                                // If server send details for match we populate HTML
                                // Set key for Home Team
                                var hometeamKeyMain = res.result[0].home_team_key;
                                // Set key for Away Team
                                var awayteamKeyMain = res.result[0].away_team_key;

                                // Hide loading sreen
                                $('.loading').hide();

                                // Details for match
                                var otherMatchDetails = '<div class="otherMatchDetails">';
                                otherMatchDetails += '<div class="otherMatchDetailsInfos">';
                                otherMatchDetails += '<div class="leagueImg" style="background-image: url(\'' + (((leagueLogo == '') || (leagueLogo == 'null') || (leagueLogo == null) || (leagueLogo == 'https://allsportsapi.com/logo/logo_leagues/-1')) ? 'img/no-img.png' : leagueLogo) + '\');"></div>';
                                otherMatchDetails += '<div>' + res.result[0].country_name + ': ' + res.result[0].league_name + '</div>';
                                otherMatchDetails += '</div>';
                                var formattedDate = new Date(res.result[0].event_date);
                                var d = formattedDate.getDate();
                                var m = formattedDate.getMonth() + 1;
                                var y = formattedDate.getFullYear();
                                otherMatchDetails += '<div>' + (d < 10 ? '0' + d : d) + '.' + (m < 10 ? '0' + m : m) + '.' + y + ' ' + res.result[0].event_time + '</div>';
                                otherMatchDetails += '</div>';
                                $(matchResultsLocation).prepend(otherMatchDetails);
                                // Added click function to header close window
                                $('.backButton').click(function() {
                                    window.close();
                                });
                                // Add hook in HTML for Match Results Tab content infos
                                $(matchResultsLocation).append('<section id="matchResultsContentTable"></section>');
                                var htmlConstructor = '<div id="matchResultsDates">';
                                htmlConstructor += '<div id="matchResultsDatesTitle">';
                                if (res.result) {
                                    htmlConstructor += '<div class="event_home_team">';
                                    htmlConstructor += '<div class="event_home_team_part">';
                                    htmlConstructor += '<div class="event_home_team_part_img">';
                                    htmlConstructor += '<div class="image-style-for-flag" style="background-image: url(\'' + (((res.result[0].home_team_logo == '') || (res.result[0].home_team_logo == 'null') || (res.result[0].home_team_logo == null)) ? 'img/no-img.png' : res.result[0].home_team_logo) + '\');"></div>';
                                    htmlConstructor += '</div>';
                                    htmlConstructor += '<div class="event_home_team_part_name">';
                                    htmlConstructor += '<div>' + res.result[0].event_home_team + '</div>';
                                    htmlConstructor += '</div>';
                                    htmlConstructor += '</div>';
                                    htmlConstructor += '<div class="event_info">';
                                    htmlConstructor += '<div class="event_info_score">';
                                    htmlConstructor += '<div>' + res.result[0].event_final_result + '</div>';
                                    htmlConstructor += '</div>';
                                    htmlConstructor += '<div class="event_info_status">';
                                    var removeNumericAdd = res.result[0].event_status.replace('+', '');
                                    htmlConstructor += '<div class="' + (($.isNumeric(removeNumericAdd) || (removeNumericAdd == 'Half Time')) ? 'matchIsLive' : '') + '"> ' + (($.isNumeric(removeNumericAdd) || (removeNumericAdd == 'Half Time')) ? res.result[0].event_status + ((removeNumericAdd == 'Half Time') ? '' : '\'') : res.result[0].event_status) + '</div>';
                                    htmlConstructor += '</div>';
                                    htmlConstructor += '</div>';
                                    htmlConstructor += '<div class="event_away_team_part">';
                                    htmlConstructor += '<div class="event_away_team_part_img">';
                                    htmlConstructor += '<div class="image-style-for-flag" style="background-image: url(\'' + (((res.result[0].away_team_logo == '') || (res.result[0].away_team_logo == 'null') || (res.result[0].away_team_logo == null)) ? 'img/no-img.png' : res.result[0].away_team_logo) + '\');"></div>';
                                    htmlConstructor += '</div>';
                                    htmlConstructor += '<div class="event_away_team_part_name">';
                                    htmlConstructor += '<div>' + res.result[0].event_away_team + '</div>';
                                    htmlConstructor += '</div>';
                                    htmlConstructor += '</div>';
                                    htmlConstructor += '</div>';
                                }
                                htmlConstructor += '</div>';
                                htmlConstructor += '<div class="nav-tab-wrapper-all">';
                                htmlConstructor += '<ul class="nav-tab-wrapper-all-container">';
                                htmlConstructor += '<li><span><a href="#matchSummary" class="matchResults-h2 nav-tab nav-tab-active">Match Summary</a></span></li>';
                                htmlConstructor += '<li><span><a href="#matchStatistics" class="matchResults-h2 nav-tab">Statistics</a></span></li>';
                                htmlConstructor += '<li><span><a href="#lineups" class="matchResults-h2 nav-tab">Lineups</a></span></li>';
                                htmlConstructor += '<li><span><a href="#matchh2h" class="matchResults-h2 nav-tab">H2H</a></span></li>';
                                htmlConstructor += '<li><span><a href="#matchStandings" class="matchResults-h2 nav-tab">Standings</a></span></li>';
                                htmlConstructor += '<li><span><a href="#matchTopScorers" class="matchResults-h2 nav-tab">Top Scorers</a></span></li>';
                                htmlConstructor += '</ul>';
                                htmlConstructor += '</div>';

                                // Populate Match Summary section
                                htmlConstructor += '<section id="matchSummary" class="tab-content active">';
                                htmlConstructor += '<div class="tab-container">';
                                var multipleArrays = [res.result[0].goalscorers, res.result[0].substitutes, res.result[0].cards];
                                var flatArray = [].concat.apply([], multipleArrays);
                                var nrArray = flatArray;
                                nrArray.sort(naturalCompare);
                                if (nrArray.length == 0) {
                                    htmlConstructor += '<p class="" style="border-left: solid 0px transparent; margin-left:auto; margin-right:auto; margin-top: 13px; text-align:center;">Sorry, no data!</p>';
                                } else {
                                    var htmlCC = 0;
                                    var htmlCC2 = 0;
                                    $.each(nrArray, function(key, value) {
                                        if ((value.time < 46) || (value.time.indexOf("45+") >= 0)) {
                                            if (htmlCC == 0) {
                                                htmlConstructor += '<div class="lineupsTitle">1st Half</div>';
                                            }
                                            if ((value.home_scorer || value.away_scorer) && value.score !== "substitution") {
                                                htmlConstructor += '<div class="' + ((value.home_scorer) ? 'action_home' : 'action_away') + '">' + ((value.home_scorer) ? value.time + '\'<div class="imgMatchSummary" style="background-image: url(img/ball.png);"></div>' + value.home_scorer : '') + ' ' + ((value.away_scorer) ? value.time + '\'' + '<div class="imgMatchSummary" style="background-image: url(img/ball.png);"></div>' + value.away_scorer : '') + '</div>';
                                            }
                                            if ((value.home_scorer == '') && (value.away_scorer == '')) {
                                                htmlConstructor += '<div class="action_unknown">' + (value.time + '\'<div class="imgMatchSummary" style="background-image: url(img/ball.png);"></div>') + '</div>';
                                            }
                                            if (value.home_fault || value.away_fault) {
                                                htmlConstructor += '<div class="' + ((value.home_fault) ? 'action_home' : 'action_away') + '">' + ((value.home_fault) ? value.time + '\' ' + ((value.card == 'yellow card') ? '<div class="imgMatchSummary" style="background-image: url(img/yellow_card.svg);"></div>' : '<div class="imgMatchSummary" style="background-image: url(img/red_card.svg);"></div>') + ' ' + value.home_fault : '') + ' ' + ((value.away_fault) ? value.time + '\'' + ' ' + ((value.card == 'yellow card') ? '<div class="imgMatchSummary" style="background-image: url(img/yellow_card.svg);"></div>' : '<div class="imgMatchSummary" style="background-image: url(img/red_card.svg);"></div>') + ' ' + value.away_fault : '') + '</div>';
                                            }
                                            if ((value.home_fault == '') && (value.away_fault == '')) {
                                                htmlConstructor += '<div class="action_unknown">' + ((value.card == 'yellow card') ? '<div class="imgMatchSummary" style="background-image: url(img/yellow_card.svg);"></div>' : '<div class="imgMatchSummary" style="background-image: url(img/red_card.svg);"></div>') + '</div>';
                                            }
                                            if (value.score === "substitution") {
                                                htmlConstructor += '<div class="' + ((value.home_scorer.in) ? 'action_home' : 'action_away') + '">' + ((value.home_scorer.in) ? value.time + '\'<div class="imgMatchSummary" style="background-image: url(img/match_green.png);"></div>' + value.home_scorer.in + '<div class="imgMatchSummary" style="background-image: url(img/match_red.png);"></div>' + value.home_scorer.out : '') + ' ' + ((value.away_scorer.in) ? value.time + '\'' + '<div class="imgMatchSummary" style="background-image: url(img/match_green.png);"></div>' + value.away_scorer.in + '<div class="imgMatchSummary" style="background-image: url(img/match_red.png);"></div>' + value.away_scorer.out : '') + '</div>';
                                            }
                                            htmlCC++;
                                        } else {
                                            if (htmlCC == 0) {
                                                htmlConstructor += '<div class="lineupsTitle">1st Half</div>';
                                                htmlConstructor += '<div class="noHalfEvent">-</div>';
                                            }
                                            htmlCC++
                                        }
                                        if ((value.time > 45) || (value.time.indexOf("90+") >= 0)) {
                                            if (htmlCC2 == 0) {
                                                htmlConstructor += '<div class="lineupsTitle">2nd Half</div>';
                                            }
                                            if ((value.home_scorer || value.away_scorer) && value.score !== "substitution") {
                                                htmlConstructor += '<div class="' + ((value.home_scorer) ? 'action_home' : 'action_away') + '">' + ((value.home_scorer) ? value.time + '\'<div class="imgMatchSummary" style="background-image: url(img/ball.png);"></div>' + value.home_scorer : '') + ' ' + ((value.away_scorer) ? value.time + '\'' + '<div class="imgMatchSummary" style="background-image: url(img/ball.png);"></div>' + value.away_scorer : '') + '</div>';
                                            }
                                            if ((value.home_scorer == '') && (value.away_scorer == '')) {
                                                htmlConstructor += '<div class="action_unknown">' + (value.time + '\'<div class="imgMatchSummary" style="background-image: url(img/ball.png);"></div>') + '</div>';
                                            }
                                            if (value.home_fault || value.away_fault) {
                                                htmlConstructor += '<div class="' + ((value.home_fault) ? 'action_home' : 'action_away') + '">' + ((value.home_fault) ? value.time + '\' ' + ((value.card == 'yellow card') ? '<div class="imgMatchSummary" style="background-image: url(img/yellow_card.svg);"></div>' : '<div class="imgMatchSummary" style="background-image: url(img/red_card.svg);"></div>') + ' ' + value.home_fault : '') + ' ' + ((value.away_fault) ? value.time + '\'' + ' ' + ((value.card == 'yellow card') ? '<div class="imgMatchSummary" style="background-image: url(img/yellow_card.svg);"></div>' : '<div class="imgMatchSummary" style="background-image: url(img/red_card.svg);"></div>') + ' ' + value.away_fault : '') + '</div>';
                                            }
                                            if (value.score === "substitution") {
                                                htmlConstructor += '<div class="' + ((value.home_scorer.in) ? 'action_home' : 'action_away') + '">' + ((value.home_scorer.in) ? value.time + '\'<div class="imgMatchSummary" style="background-image: url(img/match_green.png);"></div>' + value.home_scorer.in + '<div class="imgMatchSummary" style="background-image: url(img/match_red.png);"></div>' + value.home_scorer.out : '') + ' ' + ((value.away_scorer.in) ? value.time + '\'' + '<div class="imgMatchSummary" style="background-image: url(img/match_green.png);"></div>' + value.away_scorer.in + '<div class="imgMatchSummary" style="background-image: url(img/match_red.png);"></div>' + value.away_scorer.out : '') + '</div>';
                                            }
                                            htmlCC2++;
                                        }
                                    });
                                }
                                htmlConstructor += '</div>';
                                if ((res.result[0].event_referee != '') || (res.result[0].event_stadium != '')) {
                                    htmlConstructor += '<div>';
                                    htmlConstructor += '<div class="matchExtraInfosTitle">Match Information</div>';
                                    htmlConstructor += '<div class="matchExtraInfos">' + ((res.result[0].event_referee != '') ? 'Referee: ' + res.result[0].event_referee : '') + ' ' + ((res.result[0].event_stadium != '') ? 'Stadium: ' + res.result[0].event_stadium : '') + '</div>';
                                    htmlConstructor += '</div>';
                                }
                                htmlConstructor += '</section>';

                                // Populate Match Statistics section
                                htmlConstructor += '<section id="matchStatistics" class="tab-content">';
                                htmlConstructor += '<div class="tab-container">';
                                if (res.result[0].statistics.length == 0) {
                                    htmlConstructor += '<p class="" style="border-left: solid 0px transparent; margin-left:auto; margin-right:auto; margin-top: 13px; text-align:center;">Sorry, no data!</p>';
                                } else {
                                    $.each(res.result[0].statistics, function(key, value) {
                                        if (JSON.stringify(value).indexOf('%') > -1) {
                                            htmlConstructor += '<div class="matchStatisticsRow">';
                                            htmlConstructor += '<div class="matchStatisticsRowText">';
                                            htmlConstructor += '<div class="matchStatisticsRowHome">' + value.home + '</div>';
                                            htmlConstructor += '<div class="matchStatisticsRowType">' + value.type + '</div>';
                                            htmlConstructor += '<div class="matchStatisticsRowAway">' + value.away + '</div>';
                                            htmlConstructor += '</div>';
                                            htmlConstructor += '<div class="matchStatisticsRowBar">';
                                            htmlConstructor += '<div class="matchStatisticsRowBarHome">';
                                            htmlConstructor += '<div class="matchStatisticsRowBarHomeBg">';
                                            htmlConstructor += '<div class="matchStatisticsRowHomeLine" style="width:' + value.home + ';background-color:' + ((value.home > value.away) ? 'red' : '') + ';"></div>';
                                            htmlConstructor += '</div>';
                                            htmlConstructor += '</div>';
                                            htmlConstructor += '<div class="matchStatisticsRowBarAway">';
                                            htmlConstructor += '<div class="matchStatisticsRowBarAwayBg">';
                                            htmlConstructor += '<div class="matchStatisticsRowAwayLine" style="width:' + value.away + ';background-color:' + ((value.away > value.home) ? 'red' : '') + ';"></div>';
                                            htmlConstructor += '</div>';
                                            htmlConstructor += '</div>';
                                            htmlConstructor += '</div>';
                                            htmlConstructor += '</div>';
                                        } else {
                                            var x = parseInt(value.home) + parseInt(value.away);
                                            var xx = 100 / x;
                                            var tt = xx * value.home;
                                            var vv = xx * value.away;
                                            htmlConstructor += '<div class="matchStatisticsRow">';
                                            htmlConstructor += '<div class="matchStatisticsRowText">';
                                            htmlConstructor += '<div class="matchStatisticsRowHome">' + value.home + '</div>';
                                            htmlConstructor += '<div class="matchStatisticsRowType">' + value.type + '</div>';
                                            htmlConstructor += '<div class="matchStatisticsRowAway">' + value.away + '</div>';
                                            htmlConstructor += '</div>';
                                            htmlConstructor += '<div class="matchStatisticsRowBar">';
                                            htmlConstructor += '<div class="matchStatisticsRowBarHome">';
                                            htmlConstructor += '<div class="matchStatisticsRowBarHomeBg">';
                                            htmlConstructor += '<div class="matchStatisticsRowHomeLine" style="width:' + tt + '%;background-color:' + ((tt > vv) ? 'red' : '') + ';"></div>';
                                            htmlConstructor += '</div>';
                                            htmlConstructor += '</div>';
                                            htmlConstructor += '<div class="matchStatisticsRowBarAway">';
                                            htmlConstructor += '<div class="matchStatisticsRowBarAwayBg">';
                                            htmlConstructor += '<div class="matchStatisticsRowAwayLine" style="width:' + vv + '%;background-color:' + ((vv > tt) ? 'red' : '') + ';"></div>';
                                            htmlConstructor += '</div>';
                                            htmlConstructor += '</div>';
                                            htmlConstructor += '</div>';
                                            htmlConstructor += '</div>';
                                        }
                                    });
                                }
                                htmlConstructor += '</div>';
                                htmlConstructor += '</section>';

                                // Populate Match Lineups section
                                htmlConstructor += '<section id="lineups" class="tab-content">';
                                htmlConstructor += '<div class="tab-container">';
                                htmlConstructor += '<div class="lineupsTitle">Starting Lineups</div>';
                                htmlConstructor += '<div class="lineupsContainer">';
                                if ((res.result[0].lineups.home_team.starting_lineups.length == 0) || (res.result[0].lineups.away_team.starting_lineups.length == 0)) {
                                    htmlConstructor += '<p class="" style="border-left: solid 0px transparent; margin-left:auto; margin-right:auto; margin-top: 13px;">Sorry, no data!</p>';
                                } else {
                                    htmlConstructor += '<div class="col-left">';
                                    $.each(res.result[0].lineups.home_team.starting_lineups, function(key, value) {
                                        htmlConstructor += '<div class="lineupsContainerHome"><div class="lineupsNb">' + ((value.player_number == '-1' ? ' ' : value.player_number)) + '</div> <div class="lineupsFlag" style="background-image: url(\'' + res.result[0].home_team_logo + '\');"></div> <div class="lineupsPlayer">' + value.player + '</div></div>';
                                    });
                                    htmlConstructor += '</div>';
                                    htmlConstructor += '<div class="col-right">';
                                    $.each(res.result[0].lineups.away_team.starting_lineups, function(key, value) {
                                        htmlConstructor += '<div class="lineupsContainerAway"><div class="lineupsPlayer">' + value.player + '</div> <div class="lineupsFlag" style="background-image: url(\'' + res.result[0].away_team_logo + '\');"></div> <div class="lineupsNb">' + ((value.player_number == '-1' ? ' ' : value.player_number)) + '</div></div>';
                                    });
                                    htmlConstructor += '</div>';
                                }
                                htmlConstructor += '</div>';

                                // Populate Match Substitutes section
                                htmlConstructor += '<div class="lineupsTitle">Substitutes</div>';
                                htmlConstructor += '<div class="lineupsContainer">';
                                if ((res.result[0].lineups.home_team.substitutes.length == 0) || (res.result[0].lineups.away_team.substitutes.length == 0)) {
                                    htmlConstructor += '<p class="" style="border-left: solid 0px transparent; margin-left:auto; margin-right:auto; margin-top: 13px;">Sorry, no data!</p>';
                                } else {
                                    htmlConstructor += '<div class="col-left">';
                                    $.each(res.result[0].lineups.home_team.substitutes, function(key, value) {
                                        htmlConstructor += '<div class="lineupsContainerHome"><div class="lineupsNb">' + ((value.player_number == '-1' ? ' ' : value.player_number)) + '</div> <div class="lineupsFlag" style="background-image: url(\'' + res.result[0].home_team_logo + '\');"></div> <div class="lineupsPlayer">' + value.player + '</div></div>';
                                    });
                                    htmlConstructor += '</div>';
                                    htmlConstructor += '<div class="col-right">';
                                    $.each(res.result[0].lineups.away_team.substitutes, function(key, value) {
                                        htmlConstructor += '<div class="lineupsContainerAway"><div class="lineupsPlayer">' + value.player + '</div> <div class="lineupsFlag" style="background-image: url(\'' + res.result[0].away_team_logo + '\');"></div> <div class="lineupsNb">' + ((value.player_number == '-1' ? ' ' : value.player_number)) + '</div></div>';
                                    });
                                    htmlConstructor += '</div>';
                                }
                                htmlConstructor += '</div>';
                                htmlConstructor += '<div class="lineupsTitle">Coaches</div>';
                                htmlConstructor += '<div class="lineupsContainer">';
                                if ((res.result[0].lineups.home_team.coaches.length == 0) || (res.result[0].lineups.away_team.coaches.length == 0)) {
                                    htmlConstructor += '<p class="" style="border-left: solid 0px transparent; margin-left:auto; margin-right:auto; margin-top: 13px;">Sorry, no data!</p>';
                                } else {
                                    htmlConstructor += '<div class="col-left">';
                                    $.each(res.result[0].lineups.home_team.coaches, function(key, value) {
                                        htmlConstructor += '<div class="lineupsContainerHome"><div class="lineupsNb"></div> <div class="lineupsFlag" style="background-image: url(\'' + res.result[0].home_team_logo + '\');"></div> <div class="lineupsPlayer">' + value.coache + '</div></div>';
                                    });
                                    htmlConstructor += '</div>';
                                    htmlConstructor += '<div class="col-right">';
                                    $.each(res.result[0].lineups.away_team.coaches, function(key, value) {
                                        htmlConstructor += '<div class="lineupsContainerAway"><div class="lineupsPlayer">' + value.coache + '</div> <div class="lineupsFlag" style="background-image: url(\'' + res.result[0].away_team_logo + '\');"></div> <div class="lineupsNb"></div></div>';
                                    });
                                    htmlConstructor += '</div>';
                                }
                                htmlConstructor += '</div>';
                                htmlConstructor += '</div>';
                                htmlConstructor += '</section>';

                                // Populate Match H2H (Head to head) section
                                htmlConstructor += '<section id="matchh2h" class="tab-content">';
                                htmlConstructor += '<div class="tab-container">';
                                var htmlInsideTabsConstructorh2h = '';
                                // Send server request for H2H
                                $.ajax({
                                    url: matchResultsDetailsAjaxURL,
                                    cache: false,
                                    data: {
                                        met: 'H2H',
                                        widgetKey: widgetKey,
                                        firstTeamId: res.result[0].home_team_key,
                                        secondTeamId: res.result[0].away_team_key
                                    },
                                    dataType: 'json'
                                }).done(function(res2) {
                                    // If server send results we populate HTML with sended information
                                    if(!res2.error){
                                        htmlInsideTabsConstructorh2h += '<div class="flex-table header">';
                                        htmlInsideTabsConstructorh2h += '<div title="hh22hh" class="flex-row matchh2hHeader fix-width" role="columnheader">Last matches: ' + res.result[0].event_home_team + '</div>';
                                        htmlInsideTabsConstructorh2h += '</div>';
                                        htmlInsideTabsConstructorh2h += '<div class="tablele-container">';
                                        htmlInsideTabsConstructorh2h += '<div class="table__body">';
                                        $.each(res2.result.firstTeamResults, function(key, value) {
                                            var event_final_result_class_var = value.event_final_result;
                                            var event_final_result_class = event_final_result_class_var.replace(/:/g, '-');
                                            var event_final_result_class_away = $.trim(event_final_result_class.substr(event_final_result_class.indexOf("-") + 1));
                                            var event_final_result_class_home = $.trim(event_final_result_class.substr(0, event_final_result_class.indexOf('-')));
                                            var formattedDate = new Date(value.event_date);
                                            var d = formattedDate.getDate();
                                            var m = formattedDate.getMonth() + 1;
                                            var y = formattedDate.getFullYear().toString().substr(-2);
                                            var value_country_name = value.country_name.toString().toLowerCase();
                                            htmlInsideTabsConstructorh2h += '<div class="flex-table row" role="rowgroup">';
                                            htmlInsideTabsConstructorh2h += '<div class="flex-row matchh2hDate" role="cell">' + (d < 10 ? '0' + d : d) + '.' + (m < 10 ? '0' + m : m) + '.' + y + '</div>';
                                            htmlInsideTabsConstructorh2h += '<div class="flex-row matchh2hFlags" role="cell"><div class="matchh2hFlag" style="background-image: url(\'' + (((leagueLogo == '') || (leagueLogo == 'null') || (leagueLogo == null) || (leagueLogo == 'https://allsportsapi.com/logo/logo_leagues/-1')) ? 'img/no-img.png' : leagueLogo) + '\');"></div></div>';
                                            htmlInsideTabsConstructorh2h += '<div class="flex-row countryNameStyle" role="cell">' + value_country_name + '</div>';
                                            if (event_final_result_class_home > event_final_result_class_away) {
                                                htmlInsideTabsConstructorh2h += '<div class="teamClassStyleH2hWinnerHome flex-row fix-width ' + (((res.result[0].event_home_team == value.event_home_team)) ? 'selectedMatchH2H' : '') + '" role="cell">' + value.event_home_team + '</div>';
                                                htmlInsideTabsConstructorh2h += '<div class="flex-row fix-width ' + (((res.result[0].event_home_team == value.event_away_team)) ? 'selectedMatchH2H' : '') + '" role="cell">' + value.event_away_team + '</div>';
                                            } else if (event_final_result_class_home < event_final_result_class_away) {
                                                htmlInsideTabsConstructorh2h += '<div class="flex-row fix-width ' + (((res.result[0].event_home_team == value.event_home_team)) ? 'selectedMatchH2H' : '') + '" role="cell">' + value.event_home_team + '</div>';
                                                htmlInsideTabsConstructorh2h += '<div class="teamClassStyleH2hWinnerAway flex-row fix-width ' + (((res.result[0].event_home_team == value.event_away_team)) ? 'selectedMatchH2H' : '') + '" role="cell">' + value.event_away_team + '</div>';
                                            } else if (event_final_result_class_home == event_final_result_class_away) {
                                                htmlInsideTabsConstructorh2h += '<div class="teamClassStyleH2hEqual flex-row fix-width ' + (((res.result[0].event_home_team == value.event_home_team)) ? 'selectedMatchH2H' : '') + '" role="cell">' + value.event_home_team + '</div>';
                                                htmlInsideTabsConstructorh2h += '<div class="teamClassStyleH2hEqual flex-row fix-width ' + (((res.result[0].event_home_team == value.event_away_team)) ? 'selectedMatchH2H' : '') + '" role="cell">' + value.event_away_team + '</div>';
                                            }
                                            htmlInsideTabsConstructorh2h += '<div class="flex-row matchh2hEventFinalResult" role="cell">' + event_final_result_class + '</div>';
                                            htmlInsideTabsConstructorh2h += '</div>';
                                        });
                                        htmlInsideTabsConstructorh2h += '</div>';
                                        htmlInsideTabsConstructorh2h += '</div>';
                                        htmlInsideTabsConstructorh2h += '<div class="flex-table header">';
                                        htmlInsideTabsConstructorh2h += '<div title="hh22hh" class="flex-row matchh2hHeader fix-width" role="columnheader">Last matches: ' + res.result[0].event_away_team + '</div>';
                                        htmlInsideTabsConstructorh2h += '</div>';
                                        htmlInsideTabsConstructorh2h += '<div class="tablele-container">';
                                        htmlInsideTabsConstructorh2h += '<div class="table__body">';
                                        $.each(res2.result.secondTeamResults, function(key, value) {
                                            var event_final_result_class_var = value.event_final_result;
                                            var event_final_result_class = event_final_result_class_var.replace(/:/g, '-');
                                            var event_final_result_class_away = $.trim(event_final_result_class.substr(event_final_result_class.indexOf("-") + 1));
                                            var event_final_result_class_home = $.trim(event_final_result_class.substr(0, event_final_result_class.indexOf('-')));
                                            var formattedDate = new Date(value.event_date);
                                            var d = formattedDate.getDate();
                                            var m = formattedDate.getMonth() + 1;
                                            var y = formattedDate.getFullYear().toString().substr(-2);
                                            var value_country_name = value.country_name.toString().toLowerCase();
                                            htmlInsideTabsConstructorh2h += '<div class="flex-table row" role="rowgroup">';
                                            htmlInsideTabsConstructorh2h += '<div class="flex-row matchh2hDate" role="cell">' + (d < 10 ? '0' + d : d) + '.' + (m < 10 ? '0' + m : m) + '.' + y + '</div>';
                                            htmlInsideTabsConstructorh2h += '<div class="flex-row matchh2hFlags" role="cell"><div class="matchh2hFlag" style="background-image: url(\'' + (((leagueLogo == '') || (leagueLogo == 'null') || (leagueLogo == null) || (leagueLogo == 'https://allsportsapi.com/logo/logo_leagues/-1')) ? 'img/no-img.png' : leagueLogo) + '\');"></div></div>';
                                            htmlInsideTabsConstructorh2h += '<div class="flex-row countryNameStyle" role="cell">' + value_country_name + '</div>';
                                            if (event_final_result_class_home > event_final_result_class_away) {
                                                htmlInsideTabsConstructorh2h += '<div class="teamClassStyleH2hWinnerHome flex-row fix-width ' + (((res.result[0].event_away_team == value.event_home_team)) ? 'selectedMatchH2H' : '') + '" role="cell">' + value.event_home_team + '</div>';
                                                htmlInsideTabsConstructorh2h += '<div class="flex-row fix-width ' + (((res.result[0].event_away_team == value.event_away_team)) ? 'selectedMatchH2H' : '') + '" role="cell">' + value.event_away_team + '</div>';
                                            } else if (event_final_result_class_home < event_final_result_class_away) {
                                                htmlInsideTabsConstructorh2h += '<div class="flex-row fix-width ' + (((res.result[0].event_away_team == value.event_home_team)) ? 'selectedMatchH2H' : '') + '" role="cell">' + value.event_home_team + '</div>';
                                                htmlInsideTabsConstructorh2h += '<div class="teamClassStyleH2hWinnerAway flex-row fix-width ' + (((res.result[0].event_away_team == value.event_away_team)) ? 'selectedMatchH2H' : '') + '" role="cell">' + value.event_away_team + '</div>';
                                            } else if (event_final_result_class_home == event_final_result_class_away) {
                                                htmlInsideTabsConstructorh2h += '<div class="teamClassStyleH2hEqual flex-row fix-width ' + (((res.result[0].event_away_team == value.event_home_team)) ? 'selectedMatchH2H' : '') + '" role="cell">' + value.event_home_team + '</div>';
                                                htmlInsideTabsConstructorh2h += '<div class="teamClassStyleH2hEqual flex-row fix-width ' + (((res.result[0].event_away_team == value.event_away_team)) ? 'selectedMatchH2H' : '') + '" role="cell">' + value.event_away_team + '</div>';
                                            }
                                            htmlInsideTabsConstructorh2h += '<div class="flex-row matchh2hEventFinalResult" role="cell">' + event_final_result_class + '</div>';
                                            htmlInsideTabsConstructorh2h += '</div>';
                                        });
                                        htmlInsideTabsConstructorh2h += '</div>';
                                        htmlInsideTabsConstructorh2h += '</div>';
                                        htmlInsideTabsConstructorh2h += '<div class="flex-table header">';
                                        htmlInsideTabsConstructorh2h += '<div title="hh22hh" class="flex-row matchh2hHeader fix-width" role="columnheader">Head-to-head matches: ' + res.result[0].event_home_team + ' - ' + res.result[0].event_away_team + '</div>';
                                        htmlInsideTabsConstructorh2h += '</div>';
                                        htmlInsideTabsConstructorh2h += '<div class="tablele-container">';
                                        htmlInsideTabsConstructorh2h += '<div class="table__body">';
                                        $.each(res2.result.H2H, function(key, value) {
                                            var event_final_result_class_var = value.event_final_result;
                                            var event_final_result_class = event_final_result_class_var.replace(/:/g, '-');
                                            var event_final_result_class_away = $.trim(event_final_result_class.substr(event_final_result_class.indexOf("-") + 1));
                                            var event_final_result_class_home = $.trim(event_final_result_class.substr(0, event_final_result_class.indexOf('-')));
                                            var formattedDate = new Date(value.event_date);
                                            var d = formattedDate.getDate();
                                            var m = formattedDate.getMonth() + 1;
                                            var y = formattedDate.getFullYear().toString().substr(-2);
                                            var value_country_name = value.country_name.toString().toLowerCase();
                                            htmlInsideTabsConstructorh2h += '<div class="flex-table row" role="rowgroup">';
                                            htmlInsideTabsConstructorh2h += '<div class="flex-row matchh2hDate" role="cell">' + (d < 10 ? '0' + d : d) + '.' + (m < 10 ? '0' + m : m) + '.' + y + '</div>';
                                            htmlInsideTabsConstructorh2h += '<div class="flex-row matchh2hFlags" role="cell"><div class="matchh2hFlag" style="background-image: url(\'' + (((leagueLogo == '') || (leagueLogo == 'null') || (leagueLogo == null) || (leagueLogo == 'https://allsportsapi.com/logo/logo_leagues/-1')) ? 'img/no-img.png' : leagueLogo) + '\');"></div></div>';
                                            htmlInsideTabsConstructorh2h += '<div class="flex-row countryNameStyle" role="cell">' + value_country_name + '</div>';
                                            if (event_final_result_class_home > event_final_result_class_away) {
                                                htmlInsideTabsConstructorh2h += '<div class="teamClassStyleH2hWinnerHome flex-row fix-width" role="cell">' + value.event_home_team + '</div>';
                                                htmlInsideTabsConstructorh2h += '<div class="flex-row fix-width" role="cell">' + value.event_away_team + '</div>';
                                            } else if (event_final_result_class_home < event_final_result_class_away) {
                                                htmlInsideTabsConstructorh2h += '<div class="flex-row fix-width" role="cell">' + value.event_home_team + '</div>';
                                                htmlInsideTabsConstructorh2h += '<div class="teamClassStyleH2hWinnerAway flex-row fix-width" role="cell">' + value.event_away_team + '</div>';
                                            } else if (event_final_result_class_home == event_final_result_class_away) {
                                                htmlInsideTabsConstructorh2h += '<div class="teamClassStyleH2hEqual flex-row fix-width" role="cell">' + value.event_home_team + '</div>';
                                                htmlInsideTabsConstructorh2h += '<div class="teamClassStyleH2hEqual flex-row fix-width" role="cell">' + value.event_away_team + '</div>';
                                            }
                                            htmlInsideTabsConstructorh2h += '<div class="flex-row matchh2hEventFinalResult" role="cell">' + event_final_result_class + '</div>';
                                            htmlInsideTabsConstructorh2h += '</div>';
                                        });
                                        htmlInsideTabsConstructorh2h += '</div>';
                                        htmlInsideTabsConstructorh2h += '</div>';
                                        $('#matchh2h .tab-container').append(htmlInsideTabsConstructorh2h);
                                    } else {
                                        htmlInsideTabsConstructorh2h += '<p class="" style="border-left: solid 0px transparent; margin-left:auto; margin-right:auto; margin-top: 13px; text-align:center;">Sorry, no data!</p>';
                                        $('#matchh2h .tab-container').append(htmlInsideTabsConstructorh2h);
                                    }
                                });
                                htmlConstructor += '</div>';
                                htmlConstructor += '</section>';

                                // Populate Match Top Scorers section
                                htmlConstructor += '<section id="matchTopScorers" class="tab-content">';
                                htmlConstructor += '<div class="tab-container">';
                                var htmlInsideTabsConstructorTS = '';
                                // Send server request for Topscorers
                                $.ajax({
                                    url: matchResultsDetailsAjaxURL,
                                    cache: false,
                                    data: {
                                        met: 'Topscorers',
                                        widgetKey: widgetKey,
                                        leagueId: res.result[0].league_key
                                    },
                                    dataType: 'json'
                                }).done(function(res) {
                                    // If server send results we populate HTML with sended information
                                    if (res.result) {
                                        htmlInsideTabsConstructorTS += '<div class="tablele-container">';
                                        htmlInsideTabsConstructorTS += '<div class="flex-table header">';
                                        htmlInsideTabsConstructorTS += '<div title="Rank" class="flex-row first fix-width" role="columnheader">#</div>';
                                        htmlInsideTabsConstructorTS += '<div title="Player" class="flex-row players" role="columnheader">Player</div>';
                                        htmlInsideTabsConstructorTS += '<div title="Team" class="flex-row playerTeam fix-width" role="columnheader">Team</div>';
                                        htmlInsideTabsConstructorTS += '<div title="Goals" class="flex-row goals" role="columnheader">G</div>';
                                        htmlInsideTabsConstructorTS += '</div>';
                                        htmlInsideTabsConstructorTS += '<div class="table__body">';
                                        $.each(res.result, function(key, value) {
                                            htmlInsideTabsConstructorTS += '<div class="flex-table row" role="rowgroup">';
                                            htmlInsideTabsConstructorTS += '<div class="flex-row first fix-width" role="cell">' + value.player_place + '.</div>';
                                            htmlInsideTabsConstructorTS += '<div class="flex-row players" role="cell"><a href="#">' + value.player_name + '</a></div>';
                                            htmlInsideTabsConstructorTS += '<div class="flex-row playerTeam" role="cell"><a href="#">' + value.team_name + '</a></div>';
                                            htmlInsideTabsConstructorTS += '<div class="flex-row goals fix-width" role="cell">' + value.goals + '</div>';
                                            htmlInsideTabsConstructorTS += '</div>';
                                        });
                                        htmlInsideTabsConstructorTS += '</div>';
                                        htmlInsideTabsConstructorTS += '</div>';
                                    } else {
                                        htmlInsideTabsConstructorTS += '<p class="" style="border-left: solid 0px transparent; margin-left:auto; margin-right:auto; margin-top: 13px; text-align:center;">Sorry, no data!</p>';
                                    }
                                    $('#matchTopScorers .tab-container').append(htmlInsideTabsConstructorTS);
                                });
                                htmlConstructor += '</div>';
                                htmlConstructor += '</section>';

                                // Populate Match Standings section
                                htmlConstructor += '<section id="matchStandings" class="tab-content">';
                                htmlConstructor += '<div class="tab-container">';
                                // Send server request for Standings
                                $.ajax({
                                    url: matchResultsDetailsAjaxURL,
                                    cache: false,
                                    data: {
                                        met: 'Standings',
                                        widgetKey: widgetKey,
                                        leagueId: res.result[0].league_key
                                    },
                                    dataType: 'json'
                                }).done(function(res) {
                                    // If server send results hide loading
                                    $('.loading').hide();
                                    var htmlInsideTabsConstructorS = '<div class="nav-tab-wrapper">';
                                    var firstElementInJson = 0;
                                    var htmlConstructorS = '';
                                    $.each(res.result, function(key, value) {
                                        var sorted = sortByKey(res.result[key], 'key');
                                        var sorted_array = sortByKeyAsc(sorted, "league_round");
                                        var groubedByTeam = groupBy(sorted_array, 'league_round');
                                        var leagueRoundMatchResult = '';
                                        var leagueRoundName = '';
                                        $.each(groubedByTeam, function(keyss, valuess) {
                                            $.each(valuess, function(keyssss, valuessss) {
                                                if (valuessss.team_key == hometeamKeyMain) {
                                                    leagueRoundName = valuessss.league_round;
                                                    leagueRoundMatchResult = valuessss.league_round;
                                                }
                                            });
                                        });
                                        var onlySelectedGroup = groubedByTeam[leagueRoundMatchResult];
                                        if (firstElementInJson == 0) {
                                            htmlConstructorS += '<a href="#' + key + '" class="standing-h2 nav-tab nav-tab-active">' + key + '</a>';
                                            htmlInsideTabsConstructorS += '<section id="' + key + '" class="tab-content active">';
                                            htmlInsideTabsConstructorS += '<div class="tablele-container">';
                                            if ($.isEmptyObject(onlySelectedGroup)) {
                                                htmlInsideTabsConstructorS += '<div class="flex-table header" role="rowgroup">';
                                                htmlInsideTabsConstructorS += '<div title="Rank" class="flex-row first fix-width" role="columnheader">#</div>';
                                                htmlInsideTabsConstructorS += '<div title="Team" class="flex-row teams" role="columnheader">Team</div>';
                                                htmlInsideTabsConstructorS += '<div title="Matches Played" class="flex-row fix-width" role="columnheader">MP</div>';
                                                htmlInsideTabsConstructorS += '<div title="Wins" class="flex-row fix-width" role="columnheader">W</div>';
                                                htmlInsideTabsConstructorS += '<div title="Draws" class="flex-row fix-width" role="columnheader">D</div>';
                                                htmlInsideTabsConstructorS += '<div title="Losses" class="flex-row fix-width" role="columnheader">L</div>';
                                                htmlInsideTabsConstructorS += '<div title="Goals" class="flex-row goals" role="columnheader">G</div>';
                                                htmlInsideTabsConstructorS += '<div title="Points" class="flex-row fix-width" role="columnheader">Pts</div>';
                                                htmlInsideTabsConstructorS += '</div>';
                                                htmlInsideTabsConstructorS += '<div class="table__body">';
                                                htmlInsideTabsConstructorS += '<div class="flex-table-error row" role="rowgroup">';
                                                htmlInsideTabsConstructorS += '<p class="" style="border-left: solid 0px transparent; margin-left:auto; margin-right:auto; margin-top: 5px;">Sorry, no data!</p>';
                                                htmlInsideTabsConstructorS += '</div>';
                                                htmlInsideTabsConstructorS += '</div>';
                                            } else {
                                                htmlInsideTabsConstructorS += '<div class="flex-table header">';
                                                htmlInsideTabsConstructorS += '<div title="Rank" class="flex-row first fix-width" role="columnheader">#</div>';
                                                htmlInsideTabsConstructorS += '<div title="' + ((!leagueRoundName) ? "Team" : leagueRoundName) + '" class="flex-row teams" role="columnheader">' + ((!leagueRoundName) ? "Team" : leagueRoundName) + '</div>';
                                                htmlInsideTabsConstructorS += '<div title="Matches Played" class="flex-row fix-width" role="columnheader">MP</div>';
                                                htmlInsideTabsConstructorS += '<div title="Wins" class="flex-row fix-width" role="columnheader">W</div>';
                                                htmlInsideTabsConstructorS += '<div title="Draws" class="flex-row fix-width" role="columnheader">D</div>';
                                                htmlInsideTabsConstructorS += '<div title="Losses" class="flex-row fix-width" role="columnheader">L</div>';
                                                htmlInsideTabsConstructorS += '<div title="Goals" class="flex-row goals" role="columnheader">G</div>';
                                                htmlInsideTabsConstructorS += '<div title="Points" class="flex-row fix-width" role="columnheader">Pts</div>';
                                                htmlInsideTabsConstructorS += '</div>';
                                                htmlInsideTabsConstructorS += '<div class="table__body">';
                                                var colorForStanding = ['colorOne', 'colorTwo', 'colorThree', 'colorFour', 'colorFive', 'colorSix', 'colorSeven', 'colorEight', 'colorNine', 'colorTen'];
                                                var colorStringValue = -1;
                                                var stringToCompareStandings = '';
                                                $.each(onlySelectedGroup, function(keys, values) {
                                                    htmlInsideTabsConstructorS += '<div class="flex-table row" role="rowgroup">';
                                                    if (values.standing_place_type) {
                                                        if (stringToCompareStandings != values.standing_place_type) {
                                                            stringToCompareStandings = values.standing_place_type;
                                                            colorStringValue++;
                                                            colorForStanding[colorStringValue];
                                                            htmlInsideTabsConstructorS += '<div class="flex-row first-sticky fix-width ' + colorForStanding[colorStringValue] + '" title="' + values.standing_place_type + '" role="cell">' + values.standing_place + '.</div>';
                                                        } else if (stringToCompareStandings == values.standing_place_type) {
                                                            colorForStanding[colorStringValue];
                                                            htmlInsideTabsConstructorS += '<div class="flex-row first-sticky fix-width ' + colorForStanding[colorStringValue] + '" title="' + values.standing_place_type + '" role="cell">' + values.standing_place + '.</div>';
                                                        }
                                                    } else if (!values.standing_place_type) {
                                                        colorStringValue = $(colorForStanding).length / 2;
                                                        htmlInsideTabsConstructorS += '<div class="flex-row first-sticky fix-width ' + (((hometeamKeyMain == values.team_key) || (awayteamKeyMain == values.team_key)) ? 'selectedMatchStandings' : '') + '" role="cell">' + values.standing_place + '.</div>';
                                                    }
                                                    htmlInsideTabsConstructorS += '<div class="' + (((hometeamKeyMain == values.team_key) || (awayteamKeyMain == values.team_key)) ? 'selectedMatchStandings' : '') + ' flex-row teams" role="cell"><a href="#" onclick="windowPreventOpening()">' + values.standing_team + '</a></div>';
                                                    htmlInsideTabsConstructorS += '<div class="' + (((hometeamKeyMain == values.team_key) || (awayteamKeyMain == values.team_key)) ? 'selectedMatchStandings' : '') + ' flex-row fix-width" role="cell">' + values.standing_P + '</div>';
                                                    htmlInsideTabsConstructorS += '<div class="' + (((hometeamKeyMain == values.team_key) || (awayteamKeyMain == values.team_key)) ? 'selectedMatchStandings' : '') + ' flex-row fix-width" role="cell">' + values.standing_W + '</div>';
                                                    htmlInsideTabsConstructorS += '<div class="' + (((hometeamKeyMain == values.team_key) || (awayteamKeyMain == values.team_key)) ? 'selectedMatchStandings' : '') + ' flex-row fix-width" role="cell">' + values.standing_D + '</div>';
                                                    htmlInsideTabsConstructorS += '<div class="' + (((hometeamKeyMain == values.team_key) || (awayteamKeyMain == values.team_key)) ? 'selectedMatchStandings' : '') + ' flex-row fix-width" role="cell">' + values.standing_L + '</div>';
                                                    htmlInsideTabsConstructorS += '<div class="' + (((hometeamKeyMain == values.team_key) || (awayteamKeyMain == values.team_key)) ? 'selectedMatchStandings' : '') + ' flex-row goals" role="cell">' + values.standing_F + ':' + values.standing_A + '</div>';
                                                    htmlInsideTabsConstructorS += '<div class="' + (((hometeamKeyMain == values.team_key) || (awayteamKeyMain == values.team_key)) ? 'selectedMatchStandings' : '') + ' flex-row fix-width" role="cell">' + values.standing_PTS + '</div>';
                                                    htmlInsideTabsConstructorS += '</div>';
                                                });
                                                htmlInsideTabsConstructorS += '</div>';
                                            }
                                            htmlInsideTabsConstructorS += '</div>';
                                            htmlInsideTabsConstructorS += '</section>';
                                            firstElementInJson++
                                        } else {
                                            htmlConstructorS += '<a href="#' + key + '" class="standing-h2 nav-tab">' + key + '</a>';
                                            htmlInsideTabsConstructorS += '<section id="' + key + '" class="tab-content">';
                                            htmlInsideTabsConstructorS += '<div class="tablele-container">';
                                            if ($.isEmptyObject(onlySelectedGroup)) {
                                                htmlInsideTabsConstructorS += '<div class="flex-table header" role="rowgroup">';
                                                htmlInsideTabsConstructorS += '<div title="Rank" class="flex-row first fix-width" role="columnheader">#</div>';
                                                htmlInsideTabsConstructorS += '<div title="Team" class="flex-row teams" role="columnheader">Team</div>';
                                                htmlInsideTabsConstructorS += '<div title="Matches Played" class="flex-row fix-width" role="columnheader">MP</div>';
                                                htmlInsideTabsConstructorS += '<div title="Wins" class="flex-row fix-width" role="columnheader">W</div>';
                                                htmlInsideTabsConstructorS += '<div title="Draws" class="flex-row fix-width" role="columnheader">D</div>';
                                                htmlInsideTabsConstructorS += '<div title="Losses" class="flex-row fix-width" role="columnheader">L</div>';
                                                htmlInsideTabsConstructorS += '<div title="Goals" class="flex-row goals" role="columnheader">G</div>';
                                                htmlInsideTabsConstructorS += '<div title="Points" class="flex-row fix-width" role="columnheader">Pts</div>';
                                                htmlInsideTabsConstructorS += '</div>';
                                                htmlInsideTabsConstructorS += '<div class="table__body">';
                                                htmlInsideTabsConstructorS += '<div class="flex-table-error row" role="rowgroup">';
                                                htmlInsideTabsConstructorS += '<p class="" style="border-left: solid 0px transparent; margin-left:auto; margin-right:auto; margin-top: 5px;">Sorry, no data!</p>';
                                                htmlInsideTabsConstructorS += '</div>';
                                                htmlInsideTabsConstructorS += '</div>';
                                            } else {
                                                htmlInsideTabsConstructorS += '<div class="flex-table header">';
                                                htmlInsideTabsConstructorS += '<div title="Rank" class="flex-row first fix-width" role="columnheader">#</div>';
                                                htmlInsideTabsConstructorS += '<div title="' + ((!leagueRoundName) ? "Team" : leagueRoundName) + '" class="flex-row teams" role="columnheader">' + ((!leagueRoundName) ? "Team" : leagueRoundName) + '</div>';
                                                htmlInsideTabsConstructorS += '<div title="Matches Played" class="flex-row fix-width" role="columnheader">MP</div>';
                                                htmlInsideTabsConstructorS += '<div title="Wins" class="flex-row fix-width" role="columnheader">W</div>';
                                                htmlInsideTabsConstructorS += '<div title="Draws" class="flex-row fix-width" role="columnheader">D</div>';
                                                htmlInsideTabsConstructorS += '<div title="Losses" class="flex-row fix-width" role="columnheader">L</div>';
                                                htmlInsideTabsConstructorS += '<div title="Goals" class="flex-row goals" role="columnheader">G</div>';
                                                htmlInsideTabsConstructorS += '<div title="Points" class="flex-row fix-width" role="columnheader">Pts</div>';
                                                htmlInsideTabsConstructorS += '</div>';
                                                htmlInsideTabsConstructorS += '<div class="table__body">';
                                                $.each(onlySelectedGroup, function(keys, values) {
                                                    htmlInsideTabsConstructorS += '<div class="flex-table row" role="rowgroup">';
                                                    htmlInsideTabsConstructorS += '<div class="flex-row first fix-width" role="cell">' + values.standing_place + '.</div>';
                                                    htmlInsideTabsConstructorS += '<div class="' + (((hometeamKeyMain == values.team_key) || (awayteamKeyMain == values.team_key)) ? 'selectedMatchStandings' : '') + ' flex-row teams" role="cell"><a href="#" onclick="windowPreventOpening()">' + values.standing_team + '</a></div>';
                                                    htmlInsideTabsConstructorS += '<div class="' + (((hometeamKeyMain == values.team_key) || (awayteamKeyMain == values.team_key)) ? 'selectedMatchStandings' : '') + ' flex-row fix-width" role="cell">' + values.standing_P + '</div>';
                                                    htmlInsideTabsConstructorS += '<div class="' + (((hometeamKeyMain == values.team_key) || (awayteamKeyMain == values.team_key)) ? 'selectedMatchStandings' : '') + ' flex-row fix-width" role="cell">' + values.standing_W + '</div>';
                                                    htmlInsideTabsConstructorS += '<div class="' + (((hometeamKeyMain == values.team_key) || (awayteamKeyMain == values.team_key)) ? 'selectedMatchStandings' : '') + ' flex-row fix-width" role="cell">' + values.standing_D + '</div>';
                                                    htmlInsideTabsConstructorS += '<div class="' + (((hometeamKeyMain == values.team_key) || (awayteamKeyMain == values.team_key)) ? 'selectedMatchStandings' : '') + ' flex-row fix-width" role="cell">' + values.standing_L + '</div>';
                                                    htmlInsideTabsConstructorS += '<div class="' + (((hometeamKeyMain == values.team_key) || (awayteamKeyMain == values.team_key)) ? 'selectedMatchStandings' : '') + ' flex-row goals" role="cell">' + values.standing_F + ':' + values.standing_A + '</div>';
                                                    htmlInsideTabsConstructorS += '<div class="' + (((hometeamKeyMain == values.team_key) || (awayteamKeyMain == values.team_key)) ? 'selectedMatchStandings' : '') + ' flex-row fix-width" role="cell">' + values.standing_PTS + '</div>';
                                                    htmlInsideTabsConstructorS += '</div>';
                                                });
                                                htmlInsideTabsConstructorS += '</div>';
                                            }
                                            htmlInsideTabsConstructorS += '</div>';
                                            htmlInsideTabsConstructorS += '</section>';
                                        }
                                    });
                                    htmlInsideTabsConstructorS += '</div>';
                                    $('#matchStandings .tab-container').append(htmlInsideTabsConstructorS);
                                    $('#matchStandings .nav-tab-wrapper').prepend(htmlConstructorS);

                                    // Switching tabs on click
                                    $('#matchStandings .nav-tab').unbind('click').on('click', function(e) {
                                        e.preventDefault();
                                        //Toggle tab link
                                        $(this).addClass('nav-tab-active').siblings().removeClass('nav-tab-active');
                                        //Toggle target tab
                                        $($(this).attr('href')).addClass('active').siblings().removeClass('active');
                                    });
                                });
                                htmlConstructor += '</div>';
                                htmlConstructor += '</section>';
                                htmlConstructor += '</div>';
                                htmlConstructor += '</div>';
                                $('#matchResultsContentTable').append(htmlConstructor);
                                // Added close button in HTML
                                $('#matchResultsContentTable').append('<p class="closeWindow">close window</p>');
                                // Added click function to close window
                                $('.closeWindow').click(function() {
                                    window.close();
                                });
                                // Switching tabs on click
                                $('.nav-tab').unbind('click').on('click', function(e) {
                                    e.preventDefault();
                                    //Toggle tab link
                                    $(this).addClass('nav-tab-active').parent().parent().siblings().find('a').removeClass('nav-tab-active');
                                    //Toggle target tab
                                    $($(this).attr('href')).addClass('active').siblings().removeClass('active');
                                });
                            }
                            clearInterval(seeWhatMatchDetailsToShow);
                        }
                    }, 10);
                } else {
                    // If server not sending data, show pop-up and after click closing window
                    alert('Sorry, no data!');
                    window.close();
                }

            }).fail(function(error) {

            });
        },

        callback: function() {

        }

    });

    $.fn.widgetMatchResults = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + widgetMatchResults)) {
                $.data(this, "plugin_" + widgetMatchResults, new Plugin(this, options));
            }
        });
        return this;
    };

    $.fn.widgetMatchResults.defaults = {
        // WidgetKey will be set in jqueryGlobals.js and can be obtained from your account
        widgetKey: widgetKey,
        // Motod for this widget
        method: 'Fixtures',
        // Link to server data
        matchResultsDetailsAjaxURL: 'https://allsportsapi.com/api/football/?',
        // Background color for your Leagues Widget
        backgroundColor: null,
        // Width for your widget
        widgetWidth: '100%',
        // Set the match Id (it will be set automaticaly when you click on a match)
        matchId: (sessionStorage.getItem('matchDetailsKey') ? sessionStorage.getItem('matchDetailsKey') : null),
        // Set the match league logo (it will be set automaticaly when you click on a match)
        leagueLogo: (sessionStorage.getItem('leagueLogo') ? sessionStorage.getItem('leagueLogo') : 'img/no-img.png')
    };

})(jQuery, window, document);