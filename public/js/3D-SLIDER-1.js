/* jQuery CCSlider Plugin 3.0.2
 * Copyright 2012, Nilok Bose
 * http://codecanyon.net/user/cosmocoder
*/


(function($, document) {
    function CCSlider(elem, options) {

		// Extend the defaults, over-writing them with anything passed by the caller
        var opts = $.extend(true, {}, $.fn.ccslider.defaults, options);

        // slider variables
        var base = this,
        	$slider = $(elem),
			$wrapper = $slider.wrapInner('<div class="slider-innerWrapper"/>').find('div.slider-innerWrapper'),
			width = $slider.width(),
			height = $slider.height(),
			cWidth = width,
			cHeight = height,
			$images = $slider.find('img'),
			slideNum = $images.length,
			effect,
			effectType,
			gridEffect = false,
			fallBackOn = false,
			transitions = [],
			randanim = false,
			imageWidth = opts._3dOptions.imageWidth,
			imageHeight = opts._3dOptions.imageHeight,
			transparentImg = opts._3dOptions.transparentImg,
			innerSideColor = opts._3dOptions.innerSideColor,
			makeShadow = opts._3dOptions.makeShadow,
			shadowColor = opts._3dOptions.shadowColor,
			slices = opts._3dOptions.slices,
			rows = opts._3dOptions.rows,
			columns = opts._3dOptions.columns,
			delay = opts._3dOptions.delay,
			delayDir = opts._3dOptions.delayDir,
			depthOffset = opts._3dOptions.depthOffset,
			sliceGap =  opts._3dOptions.sliceGap,
			easing = opts._3dOptions.easing,
			fallBack = opts._3dOptions.fallBack,
			animSpeed,
			captionPosition,
			index = opts.startSlide,
			pause = false,
			animating = false,
			hover = false,
			clock, median, rowMedian, columnMedian;



		// get the transition parameters declared for each slide
		for( var i = 0; i < slideNum; i++ ) {
			transitions[i] = $images.eq(i).data('transition');
		}




		// set up the correct effect
		if( opts.effectType === '3d' ) {
			if( document.createElement('canvas').getContext ) {
				effectType = '3d';
				effect = opts.effect;
				animSpeed = opts.animSpeed;
			}
			else {
				effectType = '2d';
				effect = fallBack;
				animSpeed = opts._3dOptions.fallBackSpeed;
				fallBackOn = true;
				$slider.addClass('fallback');
			}
		}
		else {
			effectType = '2d';
			effect = opts.effect;
			animSpeed = opts.animSpeed;
		}

		//set class="ccslider" on the slider div
		$slider.addClass('ccslider');



		//add next/prev buttons
		if( opts.directionNav ) {
			var $prev = $('<a class="slider-nav prev"/>').appendTo($slider),
				$next = $('<a class="slider-nav next"/>').appendTo($slider);

			$prev.click(function(){
				base.prev();
			});

			$next.click(function(){
				base.next();
			});
		}


		//set up control links
		if( opts.controlLinks ) {
			var $links = $('<ul class="control-links" />').appendTo($slider),
				linksHtml = '';

			if( opts.controlLinkThumbs ) {
				$slider.addClass('controlThumbs');
			}

			for( var i = 0; i < slideNum; i++ ) {
				if( opts.controlLinkThumbs ) {
					linksHtml += '<li class="linkThumb" data-index="'+ i +'"><img src="'+ opts.controlThumbLocation + $images.eq(i).data('thumbname') +'" /></li>';
				}
				else {
					linksHtml += '<li data-index="'+ i +'">'+ (i+1) +'</li>';
				}
			}

			$links.append(linksHtml).delegate('li', 'click', function(){
				if( ! $(this).hasClass('active') ) {
					base.goToSlide( $(this).data('index') );
				}
			});
		}

		//highlight current control link
		function setActiveLink(){
			if( opts.controlLinks ) {
				$links.find('li').removeClass('active').eq(index).addClass('active');
			}
		}

		setActiveLink();
		
		
		// set up touch events to view slides
		var touchStartPos, touchEndPos;
		$slider.bind('touchstart.ccslider', function(e){
			var touch = e.originalEvent.touches[0];
			touchStartPos = touch.pageX;
		})
		.bind('touchmove.ccslider', function(e){
			var touch = e.originalEvent.touches[0];
			touchEndPos = touch.pageX;
			
			if( touchEndPos - touchStartPos >= 50 ) {
				base.next();
			}
			else if( touchEndPos - touchStartPos <= -50 ) {
				base.prev();
			}
			
			e.preventDefault();
		});


		//set up autoplay
		function startClock() {
			if( !hover && !animating ) {
				clock = setInterval( function() {
					if( effectType === '3d' ) {
						_3dAnimate('next');
					}
					else {
						_2dAnimate('next');
					}
				}, opts.pauseTime);
			}
		}

		function stopClock() {
			clearInterval(clock);
			clock = '';
		}

		if( opts.autoPlay ) {
			startClock();
		}


		//set up autoplay pause on hover
		if( opts.pauseOnHover ) {
			$slider.hover(function() {
				hover = true;
				stopClock();
			}, function() {
				hover = false;
				if( clock === '' && opts.autoPlay && !pause ) {
					startClock();
				}
			});
		}

		//set up play/pause buttons
		if( opts.autoPlay ) {
			var $timer = $('<div class="slider-timer pause"/>').appendTo($slider);

			$timer.click(function(){
				if( $timer.hasClass('pause') ) {
					$timer.removeClass('pause').addClass('play');
					stopClock();
					pause = true;
				}
				else {
					$timer.removeClass('play').addClass('pause');
					startClock();
					pause = false;
				}
			});
		}


		//function to unlock animations and start timer
		function unlock() {
			animating = false;
			if( opts.autoPlay && !pause ) {
				startClock();
			}
		}
		
		
		
		// function get the proper vendor-prefixed page-visibility attribute
		function getHiddenProp() {
			var prefixes = ['webkit','moz','ms','o'];
		
			// if 'hidden' is natively supported just return it
			if ('hidden' in document) {
				return 'hidden';
			}
		
			// otherwise loop over all the known prefixes until we find one
			for (var i = 0; i < prefixes.length; i++){
				if ( (prefixes[i] + 'Hidden') in document ) {
					return prefixes[i] + 'Hidden';
				}
			}
		
			// otherwise it's not supported
			return null;
		}
		
		
		// function to check if the page is hidden
		function isPageHidden() {
			var prop = getHiddenProp();
			if( !prop ) {
				return false;
			}
		
			return document[prop];
		}
		
		// if the browser supports page-visibilty api then attach the visibilitychange event
		var pageVisProp = getHiddenProp();
		if( pageVisProp ) {
			var evtname = pageVisProp.replace(/[H|h]idden/,'') + 'visibilitychange';
			document.addEventListener(evtname, pageVisChange);
		}
		
		function pageVisChange() {
			if( opts.autoPlay ) {
				$timer.trigger('click');
			}
		}



		// slider api functions
		this.next = function() {  //go to next slide
			if( clock ) {
				stopClock();
			}

			if( effectType === '3d' ) {
				_3dAnimate('next');
			}
			else {
				_2dAnimate('next');
			}
		};

		this.prev = function() {  //go to previous slide
			if( clock ) {
				stopClock();
			}

			if( effectType === '3d' ) {
				_3dAnimate('prev');
			}
			else {
				_2dAnimate('prev');
			}
		};

		this.stop = function() {  // stop autoplay
			$timer.trigger('click');
		};

		this.start = function() {  //start autoplay
			$timer.trigger('click');
		};

		this.goToSlide =  function(i) {  // goto a particular slide
			if( effectType === '3d' ) {
				_3dAnimate(i);
			}
			else {
				_2dAnimate(i);
			}
		};

		this.destroy = function() {  // destroy the plugin instance
            $slider.children().not($wrapper).remove();
            $wrapper.children().not($images).remove();
            $images.unwrap().removeAttr('style');
            $wrapper.remove();
            stopClock();
            $slider.removeData('ccslider').removeData('dimensions').removeAttr('style').unbind('.ccslider');
            $(window).unbind('.slider3d .slider2d');
        };

        this.beforeSlideChange = function(i) {  // execute before a slide animation
        	opts.beforeSlideChange.call( $slider[0], i );
        	$slider.trigger('beforeSlideChange', [i]);  // trigger custom event
        };

        this.afterSlideChange = function(i) {  // execute after a slide animation
        	opts.afterSlideChange.call( $slider[0], i );
        	$slider.trigger('afterSlideChange', [i]);  // trigger custom event
        };



		//setup captions
		if( opts.captions ) {
			var $caption = $('<div class="slider-caption"/>').appendTo($slider);
		}


		function showCaption() {
			if( opts.captions ) {
				var curImg = $images.eq(index),
					captionElem = '',
					captionHtml = '';

				if( curImg.data('captionelem') ) {
					captionElem = curImg.data('captionelem');
					captionHtml = $(captionElem)[0].innerHTML;
				}
				else if( curImg[0].alt ) {
					captionHtml = curImg[0].alt;
				}

				if( captionHtml ) {
					$caption[0].innerHTML = captionHtml;
					
					// set caption position
					captionPosition = curImg.data('captionPosition');
					captionPosition = captionPosition ? captionPosition : opts.captionPosition;
					$caption[0].className = 'slider-caption ' + captionPosition;
					$caption.removeAttr('style');
					effectType === '3d' && setCaptionStyle();
					
					// set caption animation
					if( opts.captionAnimation === 'none' ) {
						$caption.show();
					}
					else if( opts.captionAnimation === 'fade' ) {
						$caption.fadeIn( opts.captionAnimationSpeed );
					}
					else if( opts.captionAnimation === 'slide' ) {
						if( captionPosition === 'left' || captionPosition === 'right' ) {
							$caption.animate({ width: 'show', paddingLeft: 'show', paddingRight: 'show'}, opts.captionAnimationSpeed);
						}
						else {
							$caption.slideDown( opts.captionAnimationSpeed );
						}
					}
				}
			}
		}

		showCaption();

		function hideCaption() {
			if( opts.captions ) {
				if( opts.captionAnimation === 'none' ) {
					$caption.hide();
				}
				else if( opts.captionAnimation === 'fade' ) {
					$caption.fadeOut( opts.captionAnimationSpeed );
				}
				else if( opts.captionAnimation === 'slide' ) {
					if( captionPosition === 'left' || captionPosition === 'right' ) {
						$caption.animate({ width: 'hide', paddingLeft: 'hide', paddingRight: 'hide' }, opts.captionAnimationSpeed);
					}
					else {
						$caption.slideUp( opts.captionAnimationSpeed );
					}
				}
			}
		}
		
		// function to set caption styling for 3d effects
		function setCaptionStyle() {
			if( captionPosition === 'bottom' ) {
				$caption.css({
					width: imageWidth - parseInt($caption.css('padding-left'), 10) - parseInt($caption.css('padding-right'), 10),
					left: (cWidth - imageWidth)/2,
					bottom: (cHeight - imageHeight)/2,
					right: 'auto'
				});
			}
			else if( captionPosition === 'top' ) {
				$caption.css({
					width: imageWidth - parseInt($caption.css('padding-left'), 10) - parseInt($caption.css('padding-right'), 10),
					left: (cWidth - imageWidth)/2,
					top: (cHeight - imageHeight)/2,
					right: 'auto'
				});
			}
			else if( captionPosition === 'left' ) {
				$caption.css({
					height: imageHeight - parseInt($caption.css('padding-top'), 10) - parseInt($caption.css('padding-bottom'), 10),
					left: (cWidth - imageWidth)/2,
					top: (cHeight - imageHeight)/2,
					right: 'auto',
					bottom: 'auto'
				});
			}
			else if( captionPosition === 'right' ) {
				$caption.css({
					height: imageHeight - parseInt($caption.css('padding-top'), 10) - parseInt($caption.css('padding-bottom'), 10),
					right: (cWidth - imageWidth)/2,
					top: (cHeight - imageHeight)/2,
					left: 'auto',
					bottom: 'auto'
				});
			}
		}



		// setup custom html content for the slides
		var $htmlWrapper = $('<div class="cc-htmlwrapper"/>').appendTo($slider);

		for( var i = 0; i < slideNum; i++ ) {
			var htmlelem = $images.eq(i).data('htmlelem');
			if( htmlelem ) {
				$htmlWrapper.append( $(htmlelem) );
			}
		}

		function showhtml() {
			var htmlelem = $images.eq(index).data('htmlelem');
			if( htmlelem ) {
				$htmlWrapper.show();
				$(htmlelem).show();
			}
		}

		function hidehtml() {
			$htmlWrapper.hide().children().hide();
		}

		showhtml();



		// open links on clicking slide images by getting url from data-href
		var $sliderLink = $('<a class="slider-link" href="" />').appendTo($slider);
		$sliderLink.hide();

		var dataLinks = [];
		for( var i = 0; i < slideNum; i++ ) {
			dataLinks[i] = $images.eq(i).data('href');
		}

		function addLink(){
			if( dataLinks[index] ) {
				$sliderLink.show();
				$sliderLink[0].href = dataLinks[index];
			}
		}
		addLink();



		//setup for randomly changing effects
		randanim = effect === 'random' ? true : false;

		function randomEffect() {
			var effectArray = [];

			if( effectType === '3d' ) {
				if( makeShadow ) {
					effectArray = ['cubeUp', 'cubeDown', 'cubeRight', 'cubeLeft'];
				}
				else {
					effectArray = ['cubeUp', 'cubeDown', 'cubeRight', 'cubeLeft', 'flipUp', 'flipDown', 'flipRight', 'flipLeft', 'blindsVertical', 'blindsHorizontal', 'gridBlocksUp', 'gridBlocksDown', 'gridBlocksLeft', 'gridBlocksRight'];
				}
			}
			else {
				effectArray = ['fade', 'horizontalOverlap', 'verticalOverlap', 'horizontalSlide', 'verticalSlide', 'horizontalWipe', 'verticalWipe', 'horizontalSplit', 'verticalSplit', 'fadeSlide', 'circle', 'fadeZoom', 'clock', 'zoomInOut', 'spinFade', 'rotate'];
			}

			effect = effectArray[ Math.floor( Math.random()*(effectArray.length + 1) )];
			if( effect === undefined ) {
				effect = effectArray[0];
			}
		}

		if( randanim ) {
			randomEffect();
		}


		//function to run after a slide animation is finished
		function animFinish() {
			addLink();
			showCaption();
			showhtml();
			unlock();
			base.afterSlideChange(index);
			if( randanim ) {
				randomEffect();
				effectType === '3d' ? setup3d() : setup2d();
			}
			else if( transitions[index] ) {
				effectType === '3d' ? setup3d() : setup2d();
			}
		}



		/**********************************  Code for 3d effects **********************************/

		if( effectType === '3d' ) {
			// store the slider dimensions
			$slider.data('dimensions', { width: cWidth, height: cHeight, imageWidth: imageWidth, imageHeight: imageHeight });
			
			// save the prev/next button positions
			if( opts.directionNav ) {
				var prevButtonPos = parseInt($prev.css('left'), 10), nextButtonPos = parseInt($next.css('right'), 10);
			}

			//hide the images
			$wrapper.hide();

			//make slider background transparent
			$slider.css('background','transparent none');


			// function to set slider size in order to make it responsive/fluid
			if( opts.autoPlay ) {
				var timerPosRight = parseInt( $timer.css('right'), 10 ),
					timerPosTop = parseInt( $timer.css('top'), 10 );
			}
			
				
			function setSliderSize() {
				var parent = $slider.parent(),
					parentWidth = (parent.width() + 0.5) | 0,
					sizedata = $slider.data('dimensions'),
					imageGap = sizedata.width - sizedata.imageWidth;
					

				if( parentWidth !== $slider.width() ) {
					var sliderAspect = sizedata.width/sizedata.height,
						imageAspect = sizedata.imageWidth/sizedata.imageHeight;

					if( sizedata.width <= parentWidth ) {
						$slider.width( sizedata.width ).height( sizedata.height );
						cWidth = sizedata.width;
						cHeight = sizedata.height;
						imageWidth = sizedata.imageWidth;
						imageHeight = sizedata.imageHeight;
					}
					else {
						$slider.width( parentWidth ).height( parentWidth/sliderAspect );
						cWidth = parentWidth;
						cHeight = (parentWidth/sliderAspect + 0.5) | 0;

						imageWidth = parentWidth - imageGap;
						imageHeight = (imageWidth/imageAspect + 0.5) | 0;
					}
				}

				// set the css for the various slider elements
				if( opts.directionNav ) {
					$prev.css('left', imageGap/2 + prevButtonPos);
					$next.css('right', imageGap/2 + nextButtonPos);
				}
				setCaptionStyle();
				$timer && $timer.css({ right: timerPosRight + imageGap/2, top: timerPosTop + imageGap/2 });
				$sliderLink.add($htmlWrapper).css({ width: imageWidth, height: imageHeight, left: '50%', top: '50%', marginLeft: -imageWidth/2, marginTop: -imageHeight/2 });
			}

			setSliderSize();



			// check if (cWidth - imageWidth) and (cHeight - imageHeight) is an odd number
			// if the difference is odd then decrease imageWidth and imageHeight by 1px to make the difference even
			// this avoids antialiased lines in the image slices
			function checkSlideSize() {
				( cWidth - imageWidth )%2 !== 0 && ( imageWidth-- );
				( cHeight - imageHeight )%2 !== 0 && ( imageHeight-- );
			}

			checkSlideSize();
			
			
			
			// get the width, height, depth, focal length of the actual 3d boxes based on the chosen effect and also of dummy canvas elements
			var objWidth,
				objHeight,
				objDepth,
				objFocalLength,
				cubeCanvas = [],
				cubeCtx = [],
				cubes = [],
				srcCanvasCur = [],
				srcCanvasNew = [],
				srcCtxCur = [],
				srcCtxNew = [],
				canvasHtml = [];


			function setup3d() {
				// first check for custom transition atributes defined by data-transition
				if( transitions[index] ) {
					effect = transitions[index].effect ? transitions[index].effect : randanim ? effect : opts.effect;
					slices = transitions[index].slices ? transitions[index].slices : opts._3dOptions.slices;
					rows = transitions[index].rows ? transitions[index].rows : opts._3dOptions.rows;
					columns = transitions[index].columns ? transitions[index].columns : opts._3dOptions.columns;
					delay = transitions[index].delay ? transitions[index].delay : opts._3dOptions.delay;
					delayDir = transitions[index].delayDir ? transitions[index].delayDir : opts._3dOptions.delayDir;
					depthOffset = transitions[index].depthOffset ? transitions[index].depthOffset : opts._3dOptions.depthOffset;
					sliceGap = transitions[index].sliceGap ? transitions[index].sliceGap : opts._3dOptions.sliceGap;
					easing = transitions[index].easing ? transitions[index].easing : opts._3dOptions.easing;
					animSpeed = transitions[index].animSpeed ? transitions[index].animSpeed : opts.animSpeed;
				}


				gridEffect = effect.indexOf('grid') !== -1 ? true : false;

				if( effect === 'cubeLeft' || effect === 'cubeRight' ) {
					objWidth = imageWidth;
					objHeight = ((imageHeight/slices) + 0.5) | 0;  // equivalent of Math.round(imageHeight/slices)
					objDepth = imageWidth;
				}
				else if( effect === 'cubeUp' || effect === 'cubeDown' ) {
					objWidth = ((imageWidth/slices) + 0.5) | 0;  // equivalent of Math.round(imageWidth/slices)
					objHeight = imageHeight;
					objDepth = imageHeight;
				}
				else if( effect === 'flipLeft' || effect === 'flipRight' || effect === 'blindsHorizontal' ) {
					objWidth = imageWidth;
					objHeight = ((imageHeight/slices) + 0.5) | 0;  // equivalent of Math.round(imageHeight/slices)
					objDepth = 10;
				}
				else if( effect === 'flipUp' || effect === 'flipDown' || effect === 'blindsVertical' ) {
					objWidth = ((imageWidth/slices) + 0.5) | 0;  // equivalent of Math.round(imageWidth/slices)
					objHeight = imageHeight;
					objDepth = 10;
				}
				else if( gridEffect ) {
					objWidth = ((imageWidth/columns) + 0.5) | 0;  // equivalent of Math.round(imageWidth/columns)
					objHeight = ((imageHeight/rows) + 0.5) | 0;  // equivalent of Math.round(imageHeight/rows)
					objDepth = 10;
					slices = rows*columns;
				}

				objFocalLength = objDepth === 10 ? 500 : imageWidth > 500 ? objDepth + 100 : objDepth + 50;


				// clear out Canvas elements left over from a previous transition
				if( cubeCanvas[0] ) {
					$slider.find('canvas.draw').remove();
				}


				//find the number of the central segment, i.e, median
				median = findMedian(slices);

				if( gridEffect ) {
					rowMedian = findMedian(rows);
					columnMedian = findMedian(columns);
				}


				var i = slices, z, gridXY, cubeWidth, cubeHeight;
				canvasHtml = [];

				while(i--) {
					if( gridEffect ) {
						gridXY = findGridXY(i);

						if( gridXY[0] <=  rowMedian) {
							if( gridXY[1] <= columnMedian ) {
								z = 2 + gridXY[0] + gridXY[1];
							}
							else {
								z = 2 + gridXY[0] + (columns - 1 - gridXY[1]);
							}
						}
						else {
							if( gridXY[1] <= columnMedian ) {
								z = 2 + (rows - 1 - gridXY[0]) + gridXY[1];
							}
							else {
								z = 2 + (rows - 1 - gridXY[0]) + (columns - 1 - gridXY[1]);
							}
						}
					}
					else {
						if( i <=  median ) {
							z = 2 + i;
						}
						else {
							z = 2 + slices - 1 - i;
						}
					}


					cubeCanvas[i] = $('<canvas class="draw"/>').css('z-index', z);
					canvasHtml[i] = cubeCanvas[i][0];
					cubeCtx[i] = cubeCanvas[i][0].getContext('2d');
					cubeCanvas[i][0].width = cWidth;
					cubeCanvas[i][0].height = cHeight;

					if( !srcCanvasCur[i] ) {
						srcCanvasCur[i] = document.createElement('canvas');
						srcCtxCur[i] = srcCanvasCur[i].getContext('2d');
					}

					if( !srcCanvasNew[i] ) {
						srcCanvasNew[i] = document.createElement('canvas');
						srcCtxNew[i] = srcCanvasNew[i].getContext('2d');
					}


					cubeWidth = objWidth;
					cubeHeight = objHeight;

					//determine the position of the cubes based on effect
					if( gridEffect ) {
						if( gridXY[0] === (rows - 1) ) {
							cubeHeight = imageHeight - gridXY[0]*objHeight;
						}

						if( gridXY[1] === (columns - 1) ) {
							cubeWidth = imageWidth - gridXY[1]*objWidth;
						}

						cubes[i] = new Cube(cubeWidth, cubeHeight, objDepth, objFocalLength, cubeCtx[i], innerSideColor, []);
						cubes[i].position.y = imageHeight/2 - cubeHeight/2 - gridXY[0]*objHeight;
						cubes[i].position.x = -imageWidth/2 + cubeWidth/2 + gridXY[1]*objWidth;
					}
					else if( effect.indexOf('Left') !== -1 || effect.indexOf('Right') !== -1 || effect === 'blindsHorizontal' ) {
						if( i === (slices - 1) ) {
							cubeHeight = imageHeight - i*objHeight;
						}

						cubes[i] = new Cube(cubeWidth, cubeHeight, objDepth, objFocalLength, cubeCtx[i], innerSideColor, []);
						cubes[i].position.y = imageHeight/2 - cubeHeight/2 - i*objHeight;
					}
					else if( effect.indexOf('Up') !== -1 || effect.indexOf('Down') !== -1 || effect === 'blindsVertical' ) {
						if( i === (slices - 1) ) {
							cubeWidth = imageWidth - i*objWidth;
						}

						cubes[i] = new Cube(cubeWidth, cubeHeight, objDepth, objFocalLength, cubeCtx[i], innerSideColor, []);
						cubes[i].position.x = -imageWidth/2 + cubeWidth/2 + i*objWidth;
					}

					srcCanvasCur[i].width = srcCanvasNew[i].width = cubeWidth;
					srcCanvasCur[i].height = srcCanvasNew[i].height = cubeHeight;

					//plot the current image on the dummy canvases
					if( gridEffect ) {
						drawImgStrip(srcCtxCur[i], $images[index], gridXY[0], gridXY[1]);
					}
					else {
						drawImgStrip(srcCtxCur[i], $images[index], i);
					}

					//set the dummy canvas as image src for cube
					cubes[i].images[0] = srcCanvasCur[i];
					cubes[i].render();
				}

				$slider.append(canvasHtml);

			}    // end setup3d()

			setup3d();


			// hack to fix a Canvas bug in webkit. This prevents the same image strip being drawn in the first and last slice
			$.browser.webkit && setup3d();


			//declare a shadow
			function createShadow() {
				if( makeShadow && effect.indexOf('cube') === 0 ) {
					var shadowCanvas = $('<canvas class="shadow"/>').appendTo($slider).css('z-index', '1'),
						sctx = shadowCanvas[0].getContext('2d');

					sctx.canvas.width = cWidth;
					sctx.canvas.height = cHeight;

					var	shadow = new Plane(imageWidth, objDepth, objFocalLength, sctx, '#444', '', shadowColor),
						sizedata = $slider.data('dimensions'),
						imageGap = sizedata.width - sizedata.imageWidth;

					shadow.position.y = -imageHeight/2 + 50;
					shadow.position.z = objDepth/2;
					shadow.rotation.x = Math.PI/2;
					shadow.shadowOffsetY = 50 + 25;
					shadow.render();
				}
			}

			createShadow();


			// perform operations on window resize and orientation change to make the slider fluid width
			$(window).bind('resize.slider3d orientationchange.slider3d', function(){
				setSliderSize();
				checkSlideSize();
				opts.autoPlay && base.stop();
				$slider.find('canvas.draw, canvas.shadow').remove();
				setup3d();
				createShadow();
				opts.autoPlay && base.start();
			});

		}


		//function to handle 3d transition animations
		function _3dAnimate(navDir) {
			if( !animating ) {
				if( !hover && clock ) {
					stopClock();
				}

				var curIndex = index,
					curSlide = $images[index],
					newFace,
					direction,
					animAxis,
					angle,
					gridXY,
					i, j, counter;

				//determine the new slide based on navigation direction, i.e. next/prev
				if( typeof(navDir) === 'number' ) {
					index = navDir;
					navDir = curIndex < index ? 'next' : 'prev';
				}
				else {
					index += ~~(navDir === 'next' ) || -1;
					index = index < 0 ? slideNum - 1 : index % slideNum;
				}

				var newSlide = $images[index];


				//call beforeChange function
				base.beforeSlideChange(index);

				//hide caption
				hideCaption();

				//hide custom html content
				hidehtml();

				//highlight new active control link
				setActiveLink();

				//hide a.slider-link used for opening links
				$sliderLink.hide();

				//set the animation variable
				animating = true;


				//set the rotation direction and axis for each transition effect
				switch( effect ) {
					case 'cubeLeft':
						if( navDir === 'next') {
							newFace = 1;
							direction = -1;
						}
						else {
							newFace = 3;
							direction = 1;
						}

						animAxis = 'y';
						break;

					case 'cubeRight':
						if( navDir === 'next') {
							newFace = 3;
							direction = 1;
						}
						else {
							newFace = 1;
							direction = -1;
						}

						animAxis = 'y';
						break;

					case 'cubeUp':
						if( navDir === 'next') {
							newFace = 5;
							direction = 1;
						}
						else {
							newFace = 4;
							direction = -1;
						}

						animAxis = 'x';
						break;

					case 'cubeDown':
						if( navDir === 'next') {
							newFace = 4;
							direction = -1;
						}
						else {
							newFace = 5;
							direction = 1;
						}

						animAxis = 'x';
						break;

					case 'flipLeft':
						if( navDir === 'next') {
							direction = -1;
						}
						else {
							direction = 1;
						}

						newFace = 2;
						animAxis = 'y';
						break;

					case 'flipRight':
						if( navDir === 'next') {
							direction = 1;
						}
						else {
							direction = -1;
						}

						newFace = 2;
						animAxis = 'y';
						break;

					case 'flipUp':
						if( navDir === 'next') {
							direction = 1;
						}
						else {
							direction = -1;
						}

						newFace = 2;
						animAxis = 'x';
						break;

					case 'flipDown':
						if( navDir === 'next') {
							direction = -1;
						}
						else {
							direction = 1;
						}

						newFace = 2;
						animAxis = 'x';
						break;

					case 'blindsVertical':
						if( navDir === 'next') {
							direction = 1;
						}
						else {
							direction = -1;
						}

						newFace = 2;
						animAxis = 'y';
						break;

					case 'blindsHorizontal':
						if( navDir === 'next') {
							direction = -1;
						}
						else {
							direction = 1;
						}

						newFace = 2;
						animAxis = 'x';
						break;

					case 'gridBlocksUp':
						if( navDir === 'next') {
							direction = 1;
						}
						else {
							direction = -1;
						}

						newFace = 2;
						animAxis = 'x';
						break;

					case 'gridBlocksDown':
						if( navDir === 'next') {
							direction = -1;
						}
						else {
							direction = 1;
						}

						newFace = 2;
						animAxis = 'x';
						break;

					case 'gridBlocksLeft':
						if( navDir === 'next') {
							direction = -1;
						}
						else {
							direction = 1;
						}

						newFace = 2;
						animAxis = 'y';
						break;

					case 'gridBlocksRight':
						if( navDir === 'next') {
							direction = 1;
						}
						else {
							direction = -1;
						}

						newFace = 2;
						animAxis = 'y';
						break;
				}


				//Map the current image and new image on proper faces of the boxes
				i = slices;

				while(i--) {
					if( gridEffect ) {
						gridXY = findGridXY(i);

						drawImgStrip(srcCtxCur[i], curSlide, gridXY[0], gridXY[1]);
						drawImgStrip(srcCtxNew[i], newSlide, gridXY[0], gridXY[1]);
					}
					else {
						drawImgStrip(srcCtxCur[i], curSlide, i);
						drawImgStrip(srcCtxNew[i], newSlide, i);
					}

					cubes[i].images[0] = srcCanvasCur[i];
					cubes[i].images[newFace] = srcCanvasNew[i];
				}



				//rotate by 90deg for cube effect and 180deg for flip/blinds/grid effect
				if( effect.indexOf('cube') === 0 ) {
					angle = Math.PI/2;
				}
				else {
					angle = Math.PI;
				}


				//preform rotation
				i = slices;
				var itemDelay, lastItem;

				while(i--) {
					cubes[i].rotation[animAxis] = 0;

					// set the animation delay for individual slices based on delay direction and also find the item number for the last slice to be animated
					if( gridEffect ) {
						gridXY = findGridXY(i);

						switch(delayDir) {
							case 'fromCentre':
								itemDelay = (Math.abs(gridXY[0] - rowMedian))*delay + (Math.abs(gridXY[1] - columnMedian))*delay;
								lastItem = 0;  // because the while loop is running in reverse, otherwise lastItem = slices-1
								break;

							case 'toCentre':
								if( gridXY[0] < rowMedian ) {
									itemDelay = gridXY[0]*delay;
								}
								else{
									itemDelay = (rows - 1 - gridXY[0])*delay;
								}

								if( gridXY[1] < columnMedian ) {
									itemDelay += gridXY[1]*delay;
								}
								else{
									itemDelay += (columns - 1 - gridXY[1])*delay;
								}

								lastItem = median;
								break;

							case 'first-last':
								itemDelay = gridXY[0]*delay + gridXY[1]*delay;
								lastItem = slices - 1;
								break;

							case 'last-first':
								itemDelay = (rows -1 - gridXY[0])*delay + (columns - 1 - gridXY[1])*delay;
								lastItem = 0;
								break;
						}
					}
					else {
						switch(delayDir) {
							case 'fromCentre':
								itemDelay = (Math.abs(i-median))*delay;
								lastItem = 0;  // because the while loop is running in reverse, otherwise lastItem = slices-1
								break;

							case 'toCentre':
								if( i < median ) {
									itemDelay = i*delay;
								}
								else {
									itemDelay = (slices - 1 - i)*delay;
								}

								lastItem = median;
								break;

							case 'first-last':
								itemDelay = i*delay;
								lastItem = slices - 1;
								break;

							case 'last-first':
								itemDelay = (slices - 1 - i)*delay;
								lastItem = 0;
								break;
						}
					}


					$.fx.interval = 25  // set animation fps to 40

					var animObj = {axis: animAxis, angle: 0, z: 0, gap: 0, cubeX: cubes[i].position.x, cubeY: cubes[i].position.y, cubeZ: cubes[i].position.z, cube: cubes[i], cubeNum: i, gridXY: gridXY};

					$(animObj)
					.delay(itemDelay)
					.animate({ angle: direction*angle, gap: 2*sliceGap, z: 2*depthOffset},
					   {
						duration: animSpeed,
						specialEasing: {
							angle: easing,
							z: 'easeInOutCubic',
							gap: 'easeInOutCubic'
						},
						step: animStep3d,
						complete: function() {
							//unlock animations and setup next effect
							if( this.cubeNum === lastItem) {
								$.fx.interval = 16  // set animation fps to 60 after 3d animation is complete
								animFinish();
							}
						}
					});

				}  // end of while loop

			}

		}  // end of _3dAnimate()



		// function to render cube slices at each step of the 3d animation
		function animStep3d( val, fx ) {
			if( fx.prop === 'angle' ) {
				this.cube.rotation[this.axis] = val;
			}
			else if( fx.prop === 'gap' ) {
				if( val > sliceGap ) {
					val = 2*sliceGap - val;
				}

				if( effect === 'blindsHorizontal' ) {
					this.cube.position.y = this.cubeY - (this.cubeNum - median)*val;  // we are subtracting because in Canvas the positive direction of y-axis is downwards
				}
				else if( effect === 'blindsVertical' ) {
					this.cube.position.x = this.cubeX + (this.cubeNum - median)*val;
				}
				else if( gridEffect ) {
					this.cube.position.y = this.cubeY - (this.gridXY[0] - rowMedian)*val;
					this.cube.position.x = this.cubeX + (this.gridXY[1] - columnMedian)*val;
				}
				else if( this.axis === 'y' ) {
					this.cube.position.y = this.cubeY - (this.cubeNum - median)*val;
				}
				else if( this.axis === 'x' ) {
					this.cube.position.x = this.cubeX + (this.cubeNum - median)*val;
				}

			}
			else {
				if( val > depthOffset ) {
					val = 2*depthOffset - val;
				}

				this.cube.position.z = this.cubeZ + val;
				this.cube.render();
			}
		}



		//function to draw image strips on dummy canvases based on effect
		function drawImgStrip(ctx, img, stripNum1, stripNum2) {
			var scWidth = ctx.canvas.width, scHeight = ctx.canvas.height;

			// first clear the canvas (required in case of images with transparent regions, to avoid image "pile up")
			if( transparentImg ) {
				ctx.clearRect(0, 0, scWidth, scHeight);
			}

			// resize the images if their dimensions are not equal to imageWidth and imageHeight parameter values. This avoids pixel shifting due to scaling
			if( img.width !== imageWidth || img.height !== imageHeight ) {
				var resizeCanvas = document.createElement('canvas'),
					resizeCtx = resizeCanvas.getContext('2d');

				resizeCanvas.width = imageWidth;
				resizeCanvas.height = imageHeight;
				resizeCtx.drawImage(img, 0, 0, imageWidth, imageHeight);
				img = resizeCanvas;
			}

			if( effect.indexOf('grid') !== -1 ) {
				var sliceWidth = ((img.width/columns) + 0.5) | 0,  // equivalent of Math.round(img.width/columns)
					sliceHeight = ((img.height/rows) + 0.5) | 0,  // equivalent of Math.round(img.height/rows)
					tempWidth = sliceWidth,
					tempHeight = sliceHeight;

				if( stripNum1 === (rows - 1) ) {
					sliceHeight = img.height - stripNum1*sliceHeight;
				}
				if( stripNum2 === (columns - 1) ) {
					sliceWidth = img.width - stripNum2*sliceWidth;
				}

				ctx.drawImage(img, stripNum2*tempWidth, stripNum1*tempHeight, sliceWidth, sliceHeight, 0, 0, scWidth, scHeight);
			}
			else if( effect.indexOf('Up') !== -1 || effect.indexOf('Down') !== -1 || effect === 'blindsVertical' ) {
				var sliceWidth = ((img.width/slices) + 0.5) | 0,  // equivalent of Math.round(img.width/slices)
					tempWidth = sliceWidth;

				if( stripNum1 === slices - 1 ) {
					sliceWidth = img.width - stripNum1*sliceWidth;
				}

				ctx.drawImage(img, stripNum1*tempWidth, 0, sliceWidth, img.height, 0, 0, scWidth, scHeight);
			}
			else if( effect.indexOf('Left') !== -1 || effect.indexOf('Right') !== -1 || effect === 'blindsHorizontal' ) {
				var sliceHeight = ((img.height/slices) + 0.5) | 0, // equivalent of Math.round(img.height/slices)
					tempHeight = sliceHeight;

				if( stripNum1 === slices - 1 ) {
					sliceHeight = img.height - stripNum1*sliceHeight;
				}

				ctx.drawImage(img, 0, stripNum1*tempHeight, img.width, sliceHeight, 0, 0, scWidth, scHeight);
			}
		}

		// function to find the median value
		function findMedian(num) {
			var m;

			if( num % 2 === 0 ) {
				m = num / 2;
			}
			else {
				m = (num + 1) / 2;
			}

			return (m-1);
		}

		// function to find the grid coordinates of a slice based on its item number
		function findGridXY(itemNum) {
			var gridRow, gridColumn;

			if( itemNum%columns !== 0 ) {
				gridRow = (itemNum/columns) | 0;  // bitwise OR to convert to integer
				gridColumn = itemNum%columns;
			}
			else {
				gridRow = itemNum/columns;
				gridColumn = 0;
			}

			return [gridRow, gridColumn];
		}



		/**********************************  Code for 2d effects **********************************/
		if( effectType === '2d' ) {
			var sizeTest = new Image(),
				maxWidth = 1,
				maxHeight = 1,
				aspectRatio = 0,
				$parent = $slider.parent(),
				prevButtonPos = parseInt($prev.css('left'), 10),
				nextButtonPos = parseInt($next.css('right'), 10),
				gap = (prevButtonPos + nextButtonPos) < 0 ? -(prevButtonPos + nextButtonPos) : 0;

			$images.each(function(){
				sizeTest.src = this.src;

				if( maxWidth < sizeTest.width ) {
					maxWidth = sizeTest.width;
				}

				if( maxHeight < sizeTest.height ) {
					maxHeight = sizeTest.height;
				}
			});
			aspectRatio = maxWidth/maxHeight;

			// remove the loading spinner from the slider background
			$slider.css({ backgroundImage: 'none' });

			// set the slider width and height to that of the largest image but remaining fluid
			$(window).bind('resize.slider2d orientationchange.slider2d', function(){
				opts.autoPlay && base.stop();
				
				if( $parent.width() >= maxWidth + gap ) {
					$slider.width( maxWidth );
					$slider.height( maxHeight );
					width = maxWidth;
					height = maxHeight;
				}
				else {
					var sliderWidth = $parent.is('body') ? ($parent.width() - gap) : $parent.width(),
						sliderHeight = sliderWidth/aspectRatio;
					$slider.width( sliderWidth );
					$slider.height( sliderHeight );
					width = sliderWidth;
					height = sliderHeight;
				}

				// reset the css clock effect elements
				if( $clockMaskLeft ) {
					$clockOuterRight.css({
						left: -width,
						width: width,
						height: (Math.sqrt(width*width + height*height)),
						marginTop: -(Math.sqrt(width*width + height*height))/2
					});

					$clockOuterLeft.css({
						right: -width,
						width: width,
						height: (Math.sqrt(width*width + height*height)),
						marginTop: -(Math.sqrt(width*width + height*height))/2
					});

					$clockInnerRight.add($clockInnerLeft).css({
						width: width,
						height: height,
						marginTop: -height/2
					});
				}

				opts.autoPlay && base.start();
			})
			.trigger('resize.slider2d');


			//set the z-index of the starting image and fade it into view
			$images.eq(index).css('z-index', '3').fadeIn( 600, function(){
				$images.show();  // this makes other images visible
			});


			var $wipeDiv,
				$split1, $split2,
				$circleDiv,
				$clockMaskLeft, $clockMaskRight, $clockOuterLeft, $clockOuterRight, $clockInnerLeft, $clockInnerRight;

			function setup2d() {
				// first check for custom transition atributes defined by data-transition
				if( transitions[index] && !fallBackOn ) {
					effect = transitions[index].effect ? transitions[index].effect : randanim ? effect : opts.effect;
					animSpeed = transitions[index].animSpeed ? transitions[index].animSpeed : opts.animSpeed;
				}

				// "fadeSlide" effect for old IE versions that don't support CSS3
				if( (effect === 'clock' || effect === 'circle' || effect === 'spinFade' || effect === 'rotate') && ($.browser.msie && $.browser.version < 9) ) {
					effect = 'fadeSlide';
				}


				//create dummy element for 'wipe' effect
				if( effect.indexOf('Wipe') !== -1 ) {
					if( !$wipeDiv ) {
						$wipeDiv = $('<div class="wipe-div"/>').appendTo($slider);
					}
				}

				//create dummy elements for 'split' effect
				if( effect.indexOf('Split') !== -1 ) {
					if( !$split1 ) {
						$split1 = $('<div class="split1-div"/>').appendTo($slider);
						$split2 = $('<div class="split2-div"/>').appendTo($slider);
					}
				}

				//create dummy element for 'circle' effect
				if( effect.indexOf('circle') !== -1 ) {
					if( !$circleDiv ) {
						$circleDiv = $('<div class="circle-div"/>').appendTo($wrapper);
					}
				}

				//create dummy elements for 'clock' effect
				if( effect.indexOf('clock') !== -1 ) {
					if( !$clockMaskLeft ) {

						$clockMaskLeft = $('<div class="clock-mask left"/>').appendTo($slider);
						$clockOuterLeft = $('<div class="clock-outer"/>').appendTo($clockMaskLeft);
						$clockInnerLeft = $('<div class="clock-inner"/>').appendTo($clockOuterLeft);
						$clockMaskRight = $('<div class="clock-mask right"/>').appendTo($slider);
						$clockOuterRight = $('<div class="clock-outer"/>').appendTo($clockMaskRight);
						$clockInnerRight = $('<div class="clock-inner"/>').appendTo($clockOuterRight);

						$clockOuterRight.css({
							left: -width,
							width: width,
							height: (Math.sqrt(width*width + height*height)),
							marginTop: -(Math.sqrt(width*width + height*height))/2
						});

						$clockOuterLeft.css({
							right: -width,
							width: width,
							height: (Math.sqrt(width*width + height*height)),
							marginTop: -(Math.sqrt(width*width + height*height))/2
						});

						$clockInnerRight.add($clockInnerLeft).css({
							width: width,
							height: height,
							marginTop: -height/2
						});
					}
				}
			}    // end setup2d()

			setup2d();
		}



		//2d animation function
		function _2dAnimate( navDir ) {
			if( !animating ) {
				if( !hover && clock ) {
					stopClock();
				}

				var curIndex = index,
					curSlide = $images.eq(index),
					newSlide;

				//find the new image
				if( typeof(navDir) === 'number' ) {
					index = navDir;
					navDir = curIndex < index ? 'next' : 'prev';
				}
				else {
					index += ~~(navDir === 'next' ) || -1;
					index = index < 0 ? slideNum - 1 : index % slideNum;
				}

				newSlide = $images.eq(index);

				//call beforeChange function
				base.beforeSlideChange(index);

				//hide the caption
				hideCaption();

				//hide custom html content
				hidehtml();

				//highlight new active link
				setActiveLink();

				//hide a.slider-link used for opening links
				$sliderLink.hide();

				//set the animation variable
				animating = true;

				//first reset the z-index of all images
				$images.css('z-index','1');

				//then set the z-index of the current image
				curSlide.css('z-index','2');


				//now animate the new image
				switch( effect ) {
					case 'fade':
						newSlide.css({ opacity: 0, zIndex: 3 })
								.animate({ opacity: 1 }, animSpeed, animFinish);

						break;

					case 'horizontalOverlap':
						if( navDir === 'next' ) {
							newSlide.css({ left: width, zIndex: 3 })
									.animate({ left: 0 }, animSpeed, animFinish);
						}
						else {
							newSlide.css({ left: -width, zIndex: 3 })
									.animate({ left: 0 }, animSpeed, animFinish);
						}

						break;

					case 'verticalOverlap':
						if( navDir === 'next' ) {
							newSlide.css({ top: -height, zIndex: 3 })
									.animate({ top: 0 }, animSpeed, animFinish);
						}
						else {
							newSlide.css({ top: height, zIndex: 3 })
									.animate({ top: 0 }, animSpeed, animFinish);
						}

						break;

					case 'horizontalSlide':
						if( navDir === 'next' ) {
							newSlide.css({ left: width, zIndex: 3 })
									.animate({ left: 0 }, animSpeed, animFinish);

							curSlide.animate({ left: -width }, animSpeed, function(){ curSlide.css('left', '0'); });
						}
						else {
							newSlide.css({ left: -width, zIndex: 3 })
									.animate({ left: 0 }, animSpeed, animFinish);

							curSlide.animate({ left: width }, animSpeed, function(){ curSlide.css('left', '0'); });
						}

						break;

					case 'verticalSlide':
						if( navDir === 'next' ) {
							newSlide.css({ top: -height, zIndex: 3 })
									.animate({ top: 0 }, animSpeed, animFinish);

							curSlide.animate({ top: height }, animSpeed, function(){ curSlide.css('top', '0'); });
						}
						else {
							newSlide.css({ top: height, zIndex: 3 })
									.animate({ top: 0 }, animSpeed, animFinish);

							curSlide.animate({ top: -height }, animSpeed, function(){ curSlide.css('top', '0'); });
						}

						break;

					case 'horizontalWipe':
						newSlide.hide();
						$wipeDiv.css({ background: 'url('+ newSlide[0].src + ') no-repeat', height: height })
						.animate({ width: width }, animSpeed, function(){
							$wipeDiv.css({ width: 0, height: 0 });
							newSlide.css('z-index','3').show();
							animFinish();
						});

						break;

					case 'verticalWipe':
						newSlide.hide();
						$wipeDiv.css({ background: 'url('+ newSlide[0].src + ') no-repeat', width: width })
						.animate({ height: height }, animSpeed, function(){
							$wipeDiv.css({ width: 0, height: 0 });
							newSlide.css('z-index','3').show();
							animFinish();
						});

						break;

					case 'verticalSplit':
						curSlide.css({ opacity: 0 });
						newSlide.css({ zIndex: 3 });
						$split1.css({ width: width/2, height: height, top: 0, left: 0, background: 'url('+ curSlide[0].src + ') no-repeat' });
						$split2.css({ width: width/2, height: height, top: 0, right: 0, background: 'url('+ curSlide[0].src + ') -50% 0 no-repeat' });

						$split1.animate({ width: 0 }, animSpeed);
						$split2.animate({ width: 0 },
										{ duration: animSpeed,
										  step: function(val){
										      $split2.css('background-position', val - width +'px 0');
										  },
										  complete: function(){
											curSlide.css('opacity','1');
											$split1.add($split2).css({ top: 'auto', bottom: 'auto', left: 'auto', right: 'auto'});
											animFinish();
											}
										});

						break;

					case 'horizontalSplit':
						curSlide.css({ opacity: 0 });
						newSlide.css({ zIndex: 3 });
						$split1.css({ width: width, height: height/2, top: 0, left: 0, background: 'url('+ curSlide[0].src + ') no-repeat' });
						$split2.css({ width: width, height: height/2, bottom: 0, left: 0, background: 'url('+ curSlide[0].src + ') 0 -50% no-repeat' });

						$split1.animate({ height: 0 }, animSpeed);
						$split2.animate({ height: 0 },
										{ duration: animSpeed,
										  step: function(val){
										      $split2.css('background-position', '0' + (val - height) +'px');
										  },
										  complete: function(){
											curSlide.css('opacity','1');
											$split1.add($split2).css({ top: 'auto', bottom: 'auto', left: 'auto', right: 'auto'});
											animFinish();
											}
										});

						break;

					case 'fadeSlide':
						newSlide.css('z-index', '3');
						curSlide.css('z-index', '4');

						if( navDir === 'next' ) {
							curSlide.animate({ left: - width, opacity: 0 }, animSpeed, function(){
								curSlide.css({ left: 0, opacity: 1, zIndex: 1 });
								animFinish();
							});
						}
						else {
							curSlide.animate({ left: width, opacity: 0 }, animSpeed, function(){
								curSlide.css({ left: 0, opacity: 1, zIndex: 1 });
								animFinish();
							});
						}

						break;

					case 'circle':
						var diameter = Math.round(Math.sqrt(width*width + height*height));

						if( navDir === 'next' ) {
							newSlide.hide();
							$circleDiv.css({ background: 'url('+ newSlide[0].src + ') center center no-repeat', '-webkit-background-size': width+'px '+height+'px', 'background-size': width+'px '+height+'px' })
							.animate({ width: diameter, height: diameter, marginLeft: -diameter/2, marginTop: -diameter/2 }, animSpeed, function(){
								$circleDiv.css({ width: 0, height: 0, marginLeft: 0, marginTop: 0 });
								newSlide.css('z-index','3').show();
								animFinish();
							});
						}
						else {
							newSlide.css('z-index', '3');
							curSlide.css('z-index', '2');
							$circleDiv.css({ background: 'url('+ curSlide[0].src + ') center center no-repeat', '-webkit-background-size': width+'px '+height+'px', 'background-size': width+'px '+height+'px', width: diameter, height: diameter, marginLeft: -diameter/2, marginTop: -diameter/2, zIndex: 4 })
							.animate({ width: 0, height: 0, marginLeft: 0, marginTop: 0 }, animSpeed, function(){
								$circleDiv.css('z-index', '3');
								animFinish();
							});
						}

						break;

					case 'fadeZoom':
						newSlide.css('z-index', '3');
						curSlide.css({'z-index': '4', maxWidth: 'none', width: width});

						var curWidth = width,
							curHeight = height;

						curSlide.animate({ top: -curHeight/2, left: -curWidth/2, width: 2*curWidth, height: 2*curHeight, opacity: 0 }, animSpeed, function(){
							curSlide.css({ top: 0, left: 0, maxWidth: '100%', width: 'auto', height: 'auto', opacity: 1, zIndex: 2 });
							animFinish();
						});

						break;

					case 'clock':
						$clockMaskLeft.add($clockMaskRight).show();
						$clockInnerLeft.add($clockInnerRight).css({ background: 'url('+ newSlide[0].src + ') center center no-repeat' });
						var angle = {deg: 0};

						$(angle).animate({deg: 358},    // we animate to 358 instead of 360 to avoid a flicker in Firefox at animation end
							{
								duration: animSpeed,
								step: function(val) {
									if( val <= 180 ) {
										$clockOuterRight.css({ '-moz-transform': 'rotate('+val+'deg)', '-webkit-transform': 'rotate('+val+'deg)', '-o-transform': 'rotate('+val+'deg)', '-ms-transform': 'rotate('+val+'deg)' });
										$clockInnerRight.css({ '-moz-transform': 'rotate(-'+val+'deg)', '-webkit-transform': 'rotate(-'+val+'deg)', '-o-transform': 'rotate(-'+val+'deg)', '-ms-transform': 'rotate(-'+val+'deg)' });
									}
									else {
										$clockOuterRight.css({ '-moz-transform': 'rotate(180deg)', '-webkit-transform': 'rotate(180deg)', '-o-transform': 'rotate(180deg)', '-ms-transform': 'rotate(180deg)' });
										$clockInnerRight.css({ '-moz-transform': 'rotate(-180deg)', '-webkit-transform': 'rotate(-180deg)', '-o-transform': 'rotate(-180deg)', '-ms-transform': 'rotate(-180deg)' });

										val = val - 180;
										$clockOuterLeft.css({ '-moz-transform': 'rotate('+val+'deg)', '-webkit-transform': 'rotate('+val+'deg)', '-o-transform': 'rotate('+val+'deg)', '-ms-transform': 'rotate('+val+'deg)' });
										$clockInnerLeft.css({ '-moz-transform': 'rotate(-'+val+'deg)', '-webkit-transform': 'rotate(-'+val+'deg)', '-o-transform': 'rotate(-'+val+'deg)', '-ms-transform': 'rotate(-'+val+'deg)' });
									}
								},
								complete: function(){
									$clockMaskLeft.add($clockMaskRight).hide();
									$clockOuterLeft.add($clockOuterRight).add($clockInnerLeft).add($clockInnerRight).css({ '-moz-transform': 'rotate(0)', '-webkit-transform': 'rotate(0)', '-o-transform': 'rotate(0)', '-ms-transform': 'rotate(0)' });
									newSlide.css('z-index', '3');
									animFinish();
								}
							});

						break;

					case 'zoomInOut':
						$images.hide();
						newSlide.css('z-index', '3').show();
						curSlide.css('z-index', '4').show();

						var curWidth = curSlide[0].width,
							curHeight = curSlide[0].height,
							newWidth = newSlide[0].width,
							newHeight = newSlide[0].height;

						newSlide.css({ top: newHeight/2, left: newWidth/2, width: 0, height: 0, opacity: 0 });

						curSlide.animate({ top: curHeight/2, left: curWidth/2, width: 0, height: 0, opacity: 0 }, animSpeed/2, function(){
							newSlide.animate({ top: 0, left: 0, width: newWidth, height: newHeight, opacity: 1 }, animSpeed/2, function(){
								curSlide.css({ top: 0, left: 0, width: 'auto', height: 'auto', opacity: 1, zIndex: 2 });
								newSlide.css({ width: 'auto', height: 'auto' });
								$images.show();
								animFinish();
							});
						});

						break;

					case 'spinFade':
						newSlide.css('z-index', '3');
						curSlide.css({'z-index': '4', '-moz-transform-origin': 'center center', '-webkit-transform-origin': 'center center', '-o-transform-origin': 'center center', '-ms-transform-origin': 'center center'});

						var curWidth = curSlide[0].width,
							curHeight = curSlide[0].height,
							angle = {deg: 0};

						$(angle).animate({deg: 1080},
							{
								duration: animSpeed,
								step: function(val) {
									curSlide.css({ '-moz-transform': 'rotate('+val+'deg)', '-webkit-transform': 'rotate('+val+'deg)', '-o-transform': 'rotate('+val+'deg)', '-ms-transform': 'rotate('+val+'deg)' });
								}
							});

						curSlide.animate({ top: curHeight/2, left: curWidth/2, width: 0, height: 0, opacity: 0 }, animSpeed, function(){
							curSlide.css({ top: 0, left: 0, width: 'auto', height: 'auto', opacity: 1, zIndex: 2 });
							animFinish();
						});

						break;

					case 'rotate':
						newSlide.css({
							'z-index': '3',
							'-moz-transform-origin': '0 0', '-moz-transform': 'rotate(-90deg)',
							'-webkit-transform-origin': '0 0', '-webkit-transform': 'rotate(-90deg)',
							'-o-transform-origin': '0 0', '-o-transform': 'rotate(-90deg)',
							'-ms-transform-origin': '0 0', '-ms-transform': 'rotate(-90deg)'
						});

						var angle = {deg: -90};

						$(angle).animate({ deg: 0 },
							{
								duration: animSpeed,
								step: function(val) {
									newSlide.css({ '-moz-transform': 'rotate('+val+'deg)', '-webkit-transform': 'rotate('+val+'deg)', '-o-transform': 'rotate('+val+'deg)', '-ms-transform': 'rotate('+val+'deg)' });
								},
								complete: animFinish
							});
				}
			}
		}   // end _2dAnimate()

    }



    $.fn.ccslider = function(options) {
        return this.each(function () {
            //prevent against multiple instantiations
            if (!$.data(this, 'ccslider')) {
                $.data(this, 'ccslider', new CCSlider( this, options ));
            }
        });
    }



    // Plugin Defaults
    $.fn.ccslider.defaults = {
		effectType: '3d',
		effect: 'cubeUp',
		_3dOptions: { imageWidth: 600,
					  imageHeight: 300,
					  transparentImg: false,
					  innerSideColor: '#444',
					  makeShadow: true,
					  shadowColor: 'rgba(0, 0, 0, 0.7)',
					  slices: 3,
					  rows: 3,
					  columns: 3,
					  delay: 200,
					  delayDir: 'first-last',
					  depthOffset: 400,
					  sliceGap: 20,
					  easing: 'easeInOutCubic',
					  fallBack: 'fadeSlide',
					  fallBackSpeed: 1200
					},
		animSpeed: 1200,
		startSlide: 0,
		directionNav: true,
		controlLinks: true,
		controlLinkThumbs: false,
		controlThumbLocation: '',
		autoPlay: true,
		pauseTime: 3000,
		pauseOnHover: true,
		captions: true,
		captionPosition: 'bottom',
		captionAnimation: 'slide',
		captionAnimationSpeed: 600,
		beforeSlideChange: function(index){},
		afterSlideChange: function(index){}
    };


})(jQuery, document);    // Closure Closed




//Defining the 3d objects and required 3d math

//define the Cube object
function Cube(width, height, depth, focalLength, ctx, color, images) {
	this.width = width;
	this.height = height;
	this.depth = depth;
	this.focalLength = focalLength;
	this.ctx = ctx;
	this.color = color;
	this.images = images;

	// Cube rotation angles
	this.rotation = {
		x: 0,
		y: 0,
		z: 0,
		parent: this
	};

	// Cube position coordinates
	this.position = {
		x : 0,
		y : 0,
		z : 0,
		parent: this
	};

	this.canvas = this.ctx.canvas;
	this.cwidth = this.canvas.width;
	this.cheight = this.canvas.height;
	this.centerx = this.cwidth/2;
	this.centery = this.cheight/2;
	this.maxX = 0; this.minX = 0; this.maxY = 0; this.minY = 0; this.drawWidth = 0; this.drawHeight = 0;


	//the coordinates of the vertices
	this.vertexPoints = [
		make3DPoint(-this.width/2, this.height/2, -this.depth/2),
		make3DPoint(this.width/2, this.height/2, -this.depth/2),
		make3DPoint(this.width/2, -this.height/2, -this.depth/2),
		make3DPoint(-this.width/2, -this.height/2, -this.depth/2),
		make3DPoint(-this.width/2, this.height/2, this.depth/2),
		make3DPoint(this.width/2, this.height/2, this.depth/2),
		make3DPoint(this.width/2, -this.height/2, this.depth/2),
		make3DPoint(-this.width/2, -this.height/2, this.depth/2)
	];

	this.position.z += this.depth/2;
}

//render the cube on the canvas
Cube.prototype.render = function() {
	var points = Transform3DTo2D(this.vertexPoints, this.rotation, this.position, this.focalLength, this.centerx, this.centery);

	//refresh the canvas before drawing
	this.ctx.clearRect(this.minX, this.minY, this.drawWidth, this.drawHeight);

	var ptarray;

	if( isVisible( points[3], points[0], points[1] ) ) {
		ptarray = [ points[0], points[1], points[3], points[2] ];
		mapTexture(this.ctx, ptarray, this.images[0]);
	}

	if( isVisible( points[6], points[5], points[4] ) ) {
		if( this.rotation.x === 0) {
			ptarray = [ points[5], points[4], points[6], points[7] ];
		}
		else {
			ptarray = [ points[7], points[6], points[4], points[5] ];
		}

		mapTexture(this.ctx, ptarray, this.images[2]);
	}

	if( isVisible( points[2], points[1], points[5] ) && this.depth !== 0 ) {
		if( this.images[1] ) {
			ptarray = [ points[1], points[5], points[2], points[6] ];
			mapTexture(this.ctx, ptarray, this.images[1]);
		}
		else {
			this.ctx.fillStyle = this.color;
			drawPlane(this.ctx, points[1], points[5], points[6], points[2]);
			this.ctx.fill();
		}
	}

	if( isVisible( points[7], points[4], points[0] ) && this.depth !== 0 ) {
		if( this.images[3] ) {
			ptarray = [ points[4], points[0], points[7], points[3] ];
			mapTexture(this.ctx, ptarray, this.images[3]);
		}
		else {
			this.ctx.fillStyle = this.color;
			drawPlane(this.ctx, points[4], points[0], points[3], points[7]);
			this.ctx.fill();
		}
	}

	if( isVisible( points[0], points[4], points[5] ) && this.depth !== 0 ) {
		if( this.images[4] ) {
			ptarray = [ points[4], points[5], points[0], points[1] ];
			mapTexture(this.ctx, ptarray, this.images[4]);
		}
		else {
			this.ctx.fillStyle = this.color;
			drawPlane(this.ctx, points[4], points[5], points[1], points[0]);
			this.ctx.fill();
		}
	}

	if( isVisible( points[7], points[3], points[2] ) && this.depth !== 0 ) {
		if( this.images[5] ) {
			ptarray = [ points[3], points[2], points[7], points[6] ];
			mapTexture(this.ctx, ptarray, this.images[5]);
		}
		else {
			this.ctx.fillStyle = this.color;
			drawPlane(this.ctx, points[3], points[2], points[6], points[7]);
			this.ctx.fill();
		}
	}

	// save the draw region area to clear the canvas at the next animation frame
	var Mathmax = Math.max, Mathmin = Math.min;
	this.maxX = (Mathmax(points[0].x, points[1].x, points[2].x, points[3].x, points[4].x, points[5].x, points[6].x, points[7].x) + 1) | 0;
	this.minX = Mathmin(points[0].x, points[1].x, points[2].x, points[3].x, points[4].x, points[5].x, points[6].x, points[7].x) | 0;
	this.maxY = (Mathmax(points[0].y, points[1].y, points[2].y, points[3].y, points[4].y, points[5].y, points[6].y, points[7].y) + 1) | 0;
	this.minY = Mathmin(points[0].y, points[1].y, points[2].y, points[3].y, points[4].y, points[5].y, points[6].y, points[7].y) | 0;
	this.drawWidth = this.maxX - this.minX;
	this.drawHeight = this.maxY - this.minY;
};



//define the Plane object
function Plane(width, height, focalLength, ctx, color, img, shadowColor) {
	this.width = width;
	this.height = height;
	this.focalLength = focalLength;
	this.ctx = ctx;
	this.color = color;
	this.shadowColor = shadowColor;

	// Plane rotation angles
	this.rotation = {
		x: 0,
		y: 0,
		z: 0
	};

	// Plane position coordinates
	this.position = {
		x : 0,
		y : 0,
		z : 0
	};

	this.canvas = this.ctx.canvas,
	this.cWidth = this.canvas.width,
	this.cHeight = this.canvas.height,
	this.centerx = this.cWidth/2,
	this.centery = this.cHeight/2;


	//coordinates of the vertices
	this.vertexPoints = [
		make3DPoint(-this.width/2, this.height/2, 0),
		make3DPoint(this.width/2, this.height/2, 0),
		make3DPoint(this.width/2, -this.height/2, 0),
		make3DPoint(-this.width/2, -this.height/2, 0)
	];
}

//render the plane on the canvas
Plane.prototype.render = function() {
	var points = Transform3DTo2D(this.vertexPoints, this.rotation, this.position, this.focalLength, this.centerx, this.centery),
		maxY = (Math.max(points[0].y, points[1].y, points[2].y, points[3].y) + 1) | 0,
		minY = Math.min(points[0].y, points[1].y, points[2].y, points[3].y) | 0;  //equivalent to Math.floor

	//refresh the canvas before drawing
	this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
		
	drawPlane(this.ctx, make2DPoint(0, this.cHeight), make2DPoint(this.cWidth, this.cHeight), make2DPoint(this.cWidth, maxY), make2DPoint(0, maxY));
	this.ctx.clip();

	this.ctx.shadowOffsetX = 0;
	this.ctx.shadowOffsetY = (maxY - minY) >= 25 ? this.shadowOffsetY : this.shadowOffsetY - 25 + (maxY - minY);
	this.ctx.shadowBlur    = 15;
	this.ctx.shadowColor   = this.shadowColor;

	this.ctx.fillStyle = this.color;
	drawPlane(this.ctx, points[0], points[1], points[2], points[3]);
	this.ctx.fill();
};




//function that returns a 3d point
function make3DPoint(x,y,z) {
	var point = {
		x : x,
		y : y,
		z : z
	};
	return point;
}


//function that returns a 2d point
function make2DPoint(x,y) {
	var point = {
		x : x,
		y : y
	}
	return point;
}


//function to transform 3d points into a 2d context
function Transform3DTo2D(points, axisRotations, position, focalLength, centerx, centery) {
	var TransformedPoints = [],
		Mathsin = Math.sin,
		Mathcos = Math.cos,
		sx = Mathsin(axisRotations.x),
		cx = Mathcos(axisRotations.x),
		sy = Mathsin(axisRotations.y),
		cy = Mathcos(axisRotations.y),
		sz = Mathsin(axisRotations.z),
		cz = Mathcos(axisRotations.z),
		x,y,z, xy,xz, yx,yz, zx,zy, scaleFactor;

	var i = points.length;

	while (i--) {
		x = points[i].x;
		y = points[i].y;
		z = points[i].z;

		xy = cx*y - sx*z;
		xz = sx*y + cx*z;

		yz = cy*xz + sy*x;
		yx = -sy*xz + cy*x;

		zx = cz*yx - sz*xy;
		zy = sz*yx + cz*xy;

		x = zx + position.x;
		y = zy + position.y;
		z = yz + position.z;

		scaleFactor = focalLength/(focalLength + z);
		x = x*scaleFactor + centerx;
		y = -(y*scaleFactor) + centery;

		TransformedPoints[i] = {x: x, y: y};
	}
	return TransformedPoints;
}



//function to draw a path for a plane
function drawPlane(ctx, a, b, c, d){
	ctx.beginPath();
	ctx.moveTo(a.x, a.y);
	ctx.lineTo(b.x, b.y);
	ctx.lineTo(c.x, c.y);
	ctx.lineTo(d.x, d.y);
	ctx.closePath();
}



//function to check the visibility of a face
function isVisible(a, b, c) {
	if ( ( (b.y - a.y)/(b.x - a.x) - (c.y - a.y)/(c.x - a.x) < 0 ) ^ (a.x <= b.x === a.x > c.x)) {
		return true;
	} else {
		return false;
	}
}





/*
 * Projective texturing using Canvas.
 * (c) Steven Wittens 2008
 * http://www.acko.net/
 */
 
/*
 * Modified by Nilok Bose, (c) 2011
 * http://codecanyon.net/user/cosmocoder
 */


/**
 * Update the display to match a new point configuration.
 */
function mapTexture(ctx, points, img) {
  var subdivisionLimit = 5,
	  patchSize = 64,
	  transform = getProjectiveTransform(points);
 
  var ptl = transform.transformProjectiveVector([0, 0, 1]),
	  ptr = transform.transformProjectiveVector([1, 0, 1]),
	  pbl = transform.transformProjectiveVector([0, 1, 1]),
	  pbr = transform.transformProjectiveVector([1, 1, 1]);

  
  ctx.save();
  
  ctx.beginPath();
  ctx.moveTo(ptl[0], ptl[1]);
  ctx.lineTo(ptr[0], ptr[1]);
  ctx.lineTo(pbr[0], pbr[1]);
  ctx.lineTo(pbl[0], pbl[1]);
  ctx.closePath();
  ctx.clip();

  divide(0, 0, 1, 1, ptl, ptr, pbl, pbr, transform, subdivisionLimit, patchSize, ctx, img);
 
  ctx.restore();
}

/**
 * Render a projective patch.
 */
function divide(u1, v1, u4, v4, p1, p2, p3, p4, transform, limit, patchSize, ctx, img) {
  var Mathabs = Math.abs,
	  Mathmax = Math.max,
	  Mathmin = Math.min,
	  Mathsqrt = Math.sqrt;
  
  
  if (limit) {
    var d1 = [p2[0] + p3[0] - 2 * p1[0], p2[1] + p3[1] - 2 * p1[1]],
        d2 = [p2[0] + p3[0] - 2 * p4[0], p2[1] + p3[1] - 2 * p4[1]],
        d3 = [d1[0] + d2[0], d1[1] + d2[1]],
        r = Mathabs((d3[0] * d3[0] + d3[1] * d3[1]) / (d1[0] * d2[0] + d1[1] * d2[1]));
    
    d1 = [p2[0] - p1[0] + p4[0] - p3[0], p2[1] - p1[1] + p4[1] - p3[1]];
    d2 = [p3[0] - p1[0] + p4[0] - p2[0], p3[1] - p1[1] + p4[1] - p2[1]];
    var area = Mathabs(d1[0] * d2[1] - d1[1] * d2[0]);

   
    if ((u1 === 0 && u4 === 1) || ((.25 + r * 5) * area > (patchSize * patchSize))) {
      var umid = (u1 + u4) / 2,
          vmid = (v1 + v4) / 2,
          pmid = transform.transformProjectiveVector([umid, vmid, 1]),
          pt = transform.transformProjectiveVector([umid, v1, 1]),
          pb = transform.transformProjectiveVector([umid, v4, 1]),
          pl = transform.transformProjectiveVector([u1, vmid, 1]),
          pr = transform.transformProjectiveVector([u4, vmid, 1]);
      
      --limit;
      divide(u1, v1, umid, vmid, p1, pt, pl, pmid, transform, limit, patchSize, ctx, img);
      divide(umid, v1, u4, vmid, pt, p2, pmid, pr, transform, limit, patchSize, ctx, img);
      divide(u1, vmid, umid, v4, pl, pmid, p3, pb, transform, limit, patchSize, ctx, img);
      divide(umid, vmid, u4, v4, pmid, pr, pb, p4, transform, limit, patchSize, ctx, img);
    
      return;
    }
  }
  
  ctx.save();
  
  ctx.beginPath();
  ctx.moveTo(p1[0], p1[1]);
  ctx.lineTo(p2[0], p2[1]);
  ctx.lineTo(p4[0], p4[1]);
  ctx.lineTo(p3[0], p3[1]);
  ctx.closePath();
  
 
  var d12 = [p2[0] - p1[0], p2[1] - p1[1]],
      d24 = [p4[0] - p2[0], p4[1] - p2[1]],
      d43 = [p3[0] - p4[0], p3[1] - p4[1]],
      d31 = [p1[0] - p3[0], p1[1] - p3[1]];
  
   var a1 = Mathabs(d12[0] * d31[1] - d12[1] * d31[0]),
       a2 = Mathabs(d24[0] * d12[1] - d24[1] * d12[0]),
       a4 = Mathabs(d43[0] * d24[1] - d43[1] * d24[0]),
       a3 = Mathabs(d31[0] * d43[1] - d31[1] * d43[0]),
       amax = Mathmax(Mathmax(a1, a2), Mathmax(a3, a4)),
       dx = 0, dy = 0, padx = 0, pady = 0;
  
  switch (amax) {
    case a1:
      ctx.transform(d12[0], d12[1], -d31[0], -d31[1], p1[0], p1[1]);
      if (u4 !== 1) padx = 1.05 / Mathsqrt(d12[0] * d12[0] + d12[1] * d12[1]);
      if (v4 !== 1) pady = 1.05 / Mathsqrt(d31[0] * d31[0] + d31[1] * d31[1]);
      break;
    case a2:
      ctx.transform(d12[0], d12[1],  d24[0],  d24[1], p2[0], p2[1]);
      if (u4 !== 1) padx = 1.05 / Mathsqrt(d12[0] * d12[0] + d12[1] * d12[1]);
      if (v4 !== 1) pady = 1.05 / Mathsqrt(d24[0] * d24[0] + d24[1] * d24[1]);
      dx = -1;
      break;
    case a4:
      ctx.transform(-d43[0], -d43[1], d24[0], d24[1], p4[0], p4[1]);
      if (u4 !== 1) padx = 1.05 / Mathsqrt(d43[0] * d43[0] + d43[1] * d43[1]);
      if (v4 !== 1) pady = 1.05 / Mathsqrt(d24[0] * d24[0] + d24[1] * d24[1]);
      dx = -1;
      dy = -1;
      break;
    case a3:
      ctx.transform(-d43[0], -d43[1], -d31[0], -d31[1], p3[0], p3[1]);
      if (u4 !== 1) padx = 1.05 / Mathsqrt(d43[0] * d43[0] + d43[1] * d43[1]);
      if (v4 !== 1) pady = 1.05 / Mathsqrt(d31[0] * d31[0] + d31[1] * d31[1]);
      dy = -1;
      break;
  }
  
  
  var du = (u4 - u1),
      dv = (v4 - v1),
      padu = padx * du,
      padv = pady * dv;
  
   
  var iw = img.width,
	  ih = img.height;
  
  ctx.drawImage(
    img,
    u1 * iw,
    v1 * ih,
    Mathmin(u4 - u1 + padu, 1) * iw,
    Mathmin(v4 - v1 + padv, 1) * ih,
    dx, dy,
    1 + padx, 1 + pady
  );
  ctx.restore();
}


/**
 * Calculate a projective transform that maps [0,1]x[0,1] onto the given set of points.
 */
function getProjectiveTransform(points) {
  var eqMatrix = new Matrix(9, 8, [
    [ 1, 1, 1,   0, 0, 0, -points[3].x,-points[3].x,-points[3].x ],
    [ 0, 1, 1,   0, 0, 0,  0,-points[2].x,-points[2].x ],
    [ 1, 0, 1,   0, 0, 0, -points[1].x, 0,-points[1].x ],
    [ 0, 0, 1,   0, 0, 0,  0, 0,-points[0].x ],

    [ 0, 0, 0,  -1,-1,-1,  points[3].y, points[3].y, points[3].y ],
    [ 0, 0, 0,   0,-1,-1,  0, points[2].y, points[2].y ],
    [ 0, 0, 0,  -1, 0,-1,  points[1].y, 0, points[1].y ],
    [ 0, 0, 0,   0, 0,-1,  0, 0, points[0].y ]

  ]);
  
  var kernel = eqMatrix.rowEchelon().values;
  var transform = new Matrix(3, 3, [
    [-kernel[0][8], -kernel[1][8], -kernel[2][8]],
    [-kernel[3][8], -kernel[4][8], -kernel[5][8]],
    [-kernel[6][8], -kernel[7][8],             1]
  ]);
  return transform;
}




/*
 * Generic matrix class.
 * (c) Steven Wittens 2008
 * http://www.acko.net/
 */
 
/*
 * Modified by Nilok Bose, (c) 2011
 * http://codecanyon.net/user/cosmocoder
 */

 
var Matrix = function (w, h, values) {
  this.w = w;
  this.h = h;
  this.values = values || Matrix.allocate(h);
};

Matrix.allocate = function (w, h) {
  var values = [],
	  i = h,
	  j = w;
	  
  while(i--) {
    values[i] = [];
    while(j--) {
      values[i][j] = 0;
    }
  }
  return values;
}

Matrix.cloneValues = function (values) {
  var clone = [], i = values.length;
  while (i--) {
    clone[i] = [].concat(values[i]);
  }
  return clone;
}

Matrix.prototype.transformProjectiveVector = function (operand) {
  var out = [];
  for (var y = 0; y < this.h; ++y) {
    out[y] = 0;
    for (var x = 0; x < this.w; ++x) {
      out[y] += this.values[y][x] * operand[x];
    }
  }
  var iz = 1 / (out[out.length - 1]);
  for (var y = 0; y < this.h; ++y) {
    out[y] *= iz;
  }
  return out;
}


Matrix.prototype.rowEchelon = function () {
  if (this.w <= this.h) {
    throw "Matrix rowEchelon size mismatch";
  }
  
  var temp = Matrix.cloneValues(this.values);

  // Do Gauss-Jordan algorithm.
  for (var yp = 0; yp < this.h; ++yp) {
    // Look up pivot value.
    var pivot = temp[yp][yp];
    while (pivot == 0) {
      // If pivot is zero, find non-zero pivot below.
      for (var ys = yp + 1; ys < this.h; ++ys) {
        if (temp[ys][yp] != 0) {
          // Swap rows.
          var tmpRow = temp[ys];
          temp[ys] = temp[yp];
          temp[yp] = tmpRow;
          break;
        }
      }
      if (ys == this.h) {
        // No suitable pivot found. Abort.
        return new Matrix(this.w, this.h, temp);
      }
      else {
        pivot = temp[yp][yp];
      }
    };
    // Normalize this row.
    var scale = 1 / pivot;
    for (var x = yp; x < this.w; ++x) {
      temp[yp][x] *= scale;
    }
    // Subtract this row from all other rows (scaled).
    for (var y = 0; y < this.h; ++y) {
      if (y == yp) continue;
      var factor = temp[y][yp];
      temp[y][yp] = 0;
      for (var x = yp + 1; x < this.w; ++x) {
        temp[y][x] -= factor * temp[yp][x];
      }
    }
  }

  return new Matrix(this.w, this.h, temp);
}