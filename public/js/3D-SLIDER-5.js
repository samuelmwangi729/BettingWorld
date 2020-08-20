		$(function(){
			$('#demo-nav').find('a').tooltip({effect: 'slide'});
		});

		$(window).load(function(){
			$('#slider').ccslider({
				effect: 'random',
                captions: false,
				_3dOptions: {
					imageWidth: 960,
					imageHeight: 350,
					makeShadow: false
				},
				beforeSlideChange: function(index) {
					$(this).find('div.cc-html').children().hide();
				},
				afterSlideChange: function(index) {
					if( index === 0 ) {
						var children = $('#slidehtml1').children();
						children.css({ position: 'relative', top: '-20px'});
						children.filter('h3').animate({ top: 0, opacity: 'toggle'}, 600);
						children.filter('p').eq(0).delay(100).animate({ top: 0, opacity: 'toggle'}, 600);
						children.find('strong').hide().css('left', '50px').delay(300).animate({ left: 0, opacity: 'toggle'}, 600);
					}
					if(index === 1) {
						var children = $('#slidehtml2').children();
						children.css({ position: 'relative', left: '-300px'});
						children.filter('h3').animate({ left: 0, opacity: 'toggle'}, 600);
						children.filter('p').delay(100).animate({ left: 0, opacity: 'toggle'}, 600);
						children.filter('a').delay(200).animate({ left: 0, opacity: 'toggle'}, 600);
					}
				}
			});

			// animation for html content of first slide on page load
			var children = $('#slidehtml1').children().hide();
			children.css({ position: 'relative', top: '-20px'});
			children.filter('h3').animate({ top: 0, opacity: 'toggle'}, 600);
			children.filter('p').eq(0).delay(100).animate({ top: 0, opacity: 'toggle'}, 600);
			children.find('strong').hide().css('left', '50px').delay(300).animate({ left: 0, opacity: 'toggle'}, 600);

			// use ccslider api to go to next slide
			var api = $('#slider').data('ccslider');
			$('#slidehtml2').find('a').click(function(){
				api.next();
			});
		});