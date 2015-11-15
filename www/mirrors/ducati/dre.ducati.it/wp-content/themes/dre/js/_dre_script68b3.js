jQuery(function ($)
{
	/******************/
	/******************/
	/* ! START - VARS */
	/******************/
	/******************/


	/* ! VARS - SWITCHES */
	isMobile = false;
	busy = true;

	if( 1024 > parseInt( $('body').css('min-width') ) )
	{
		isMobile = true;
	}
	/* ! VARS END - SWITCHES */


	/* ! VARS - CAROUSEL */
	var slider_timers = new Array();
	var timeslice = 8000;
	var desktopCarouselStop = function() {};
	var desktopCarouselStart = function() {};
	/* ! VARS END - CAROUSEL */


	/* ! VARS - OVERLAY */
	var enterOverlay = function() {};
	var exitOverlay = function() {};
	/* ! VARS END - OVERLAY */


	/* ! VARS - COURSES DASHBOARD */
	var dashboardTableEnter = function( node ) {};
	var dashboardTableLeave = function( node ) {};
	/* ! VARS END - COURSES DASHBOARD */


	/* ! VARS - COURSES SCHEDULE */
	var scheduleTableEnter = function( node ) {};
	var scheduleTableLeave = function( node ) {};
	/* ! VARS END - COURSES SCHEDULE */


	/* ! VARS - GALLERY */
	gallerSlideR = function( node )
		{
			if( false == busy )
			{
				busy = true;

				var gallery = $(node).parent().next();

				offset = parseInt( $(gallery).children().eq(0).css('margin-left') );

				increase = parseInt($(gallery).css('width'));

				offset = offset-increase;

				maxoffset = -increase * ( $(gallery).children().length-1);

				if( offset < maxoffset )
				{
					busy = false;
				}
				else
				{
					if( offset == maxoffset )
					{
						$(node).removeClass('dre_gallery_control_active');
					}

					$(node).prev().prev().addClass('dre_gallery_control_active');

					$(gallery).children().eq(0).animate( {'marginLeft':  offset + 'px' }, 500, function() { busy = false; } );
				}
			}
		};

	gallerSlideL = function( node )
		{
			if( false == busy )
			{
				busy = true;

				var gallery = $(node).parent().next();

				offset = parseInt( $(gallery).children().eq(0).css('margin-left') );

				increase = parseInt($(gallery).css('width'));

				offset = offset+increase;

				if( offset > 0 )
				{
					busy = false;
				}
				else
				{
					if( offset == 0 )
					{
						$(node).removeClass('dre_gallery_control_active');
					}

					$(node).next().next().addClass('dre_gallery_control_active');

					$(gallery).children().eq(0).animate( {'marginLeft':  offset + 'px' }, 500, function() { busy = false; } );
				}
			}
		};
	/* ! VARS END - GALLERY */


	/* ! VARS - MENU */
	var mobileMenuEnter = function() {};
	var mobileMenuLeave = function() {};
	var desktopMenuEnter = function() {};
	var desktopMenuLeave = function() {};
	/* ! VARS END - MENU */


	/* ! VARS - DONUTS */
	var total = 4;
	var unit = 80;
	var unitH = unit/2;
	var strokeW = 6;
	var R = unitH-16-(strokeW/2);
	var strokeColor =  "#FF0000";
	var strokeBG =  "#CCCCCC";
	var strokeStyle = {"stroke": strokeColor, "stroke-width": strokeW};

	var node1 = "dreDonut1";
	var node2 = "dreDonut2";
	var node3 = "dreDonut3";
	var node4 = "dreDonut4";
	var node5 = "dreDonut5";
	var node6 = "dreDonut6";

	var val1, val2, val3, val4, val5, val6;

	var arcBuilder = function (value)
		{
			var alpha = 360 / total * value,
				a = (90 - alpha) * Math.PI / 180,
				x = unitH + R * Math.cos(a),
				y = unitH - R * Math.sin(a),
				path;
				path = [["M", unitH, unitH - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];

			return {"path": path, "stroke": strokeColor};
		};

	var renderLevelInfo = function()
		{
			$("#"+node1).html("");
			$("#"+node2).html("");
			$("#"+node3).html("");
			$("#"+node4).html("");
			$("#"+node5).html("");
			$("#"+node6).html("");


			var r1 = Raphael(node1, unit, unit);
			var r2 = Raphael(node2, unit, unit);
			var r3 = Raphael(node3, unit, unit);
			var r4 = Raphael(node4, unit, unit);
			var r5 = Raphael(node5, unit, unit);
			var r6 = Raphael(node6, unit, unit);

			var circle1 = r1.circle(unitH, unitH, R);
			circle1.attr("stroke", strokeBG);
			circle1.attr("stroke-width", strokeW);
			//circle1.glow( glowStyle );

			var circle2 = r2.circle(unitH, unitH, R);
			circle2.attr("stroke", strokeBG);
			circle2.attr("stroke-width", strokeW);
			//circle2.glow( glowStyle );

			var circle3 = r3.circle(unitH, unitH, R);
			circle3.attr("stroke", strokeBG);
			circle3.attr("stroke-width", strokeW);
			//circle3.glow( glowStyle );

			var circle4 = r4.circle(unitH, unitH, R);
			circle4.attr("stroke", strokeBG);
			circle4.attr("stroke-width", strokeW);
			//circle4.glow( glowStyle );

			var circle5 = r5.circle(unitH, unitH, R);
			circle5.attr("stroke", strokeBG);
			circle5.attr("stroke-width", strokeW);
			//circle5.glow( glowStyle );

			var circle6 = r6.circle(unitH, unitH, R);
			circle6.attr("stroke", strokeBG);
			circle6.attr("stroke-width", strokeW);
			//circle6.glow( glowStyle );

			r1.customAttributes.arc = function (value) { return arcBuilder(value) };
			r2.customAttributes.arc = function (value) { return arcBuilder(value) };
			r3.customAttributes.arc = function (value) { return arcBuilder(value) };
			r4.customAttributes.arc = function (value) { return arcBuilder(value) };
			r5.customAttributes.arc = function (value) { return arcBuilder(value) };
			r6.customAttributes.arc = function (value) { return arcBuilder(value) };

			var sec1 = r1.path().attr(strokeStyle).attr({arc: [0, total, R]});
			var sec2 = r2.path().attr(strokeStyle).attr({arc: [0, total, R]});
			var sec3 = r3.path().attr(strokeStyle).attr({arc: [0, total, R]});
			var sec4 = r4.path().attr(strokeStyle).attr({arc: [0, total, R]});
			var sec5 = r5.path().attr(strokeStyle).attr({arc: [0, total, R]});
			var sec6 = r6.path().attr(strokeStyle).attr({arc: [0, total, R]});

			sec1.animate({arc: [val1, total, R]}, 1000,
				function() { if( 4 === val1) { circle1.attr("stroke", strokeColor); } });

			sec2.animate({arc: [val2, total, R]}, 1000,
				function() { if( 4 === val2) { circle2.attr("stroke", strokeColor); } });

			sec3.animate({arc: [val3, total, R]}, 1000,
				function() { if( 4 === val3) { circle3.attr("stroke", strokeColor); } });

			sec4.animate({arc: [val4, total, R]}, 1000,
				function() { if( 4 === val4) { circle4.attr("stroke", strokeColor); } });

			sec5.animate({arc: [val5, total, R]}, 1000,
				function() { if( 4 === val5) { circle5.attr("stroke", strokeColor); } });

			sec6.animate({arc: [val6, total, R]}, 1000,
				function() { if( 4 === val6) { circle6.attr("stroke", strokeColor); } });
		}
	/* ! VAR - DONUTS */


	/* ! VARS - RESIZE */
	var winW = 0;
	var winH = 0;
	var resizeHook = function() {};
	var afterReadyHook = function() {};
	/* ! VARS END - RESIZE */




	/****************/
	/****************/
	/* ! END - VARS */
	/****************/
	/****************/



	if( true == isMobile )
	{
	/********************/
	/********************/
	/* ! START - MOBILE */
	/********************/
	/********************/


	/* ! START - CAROUSEL */
	/* ! END - CAROUSEL */


	/*************************************************************/
	/*************************************************************/


	/* ! START - OVERLAY */
	enterOverlay = function( node )
		{
/**/
			$('#dre_overlay').html( $(node).find('iframe').clone().hide() );
			$('#dre_overlay').fadeIn(
				function()
				{
					$('#dre_overlay_quit').fadeIn();
					$('#dre_overlay iframe').attr('src', $('#dre_overlay iframe').attr('src'));

					resizeHook();
				});
/**/		};

	exitOverlay = function()
		{
/**/		$('#dre_overlay_quit').fadeOut();
			$('#dre_overlay_portrait').fadeOut();
			$('#dre_overlay').fadeOut(
				function()
				{
					$('#dre_overlay').html( '' );

				});
/**/		};
	/* ! END - OVERLAY */


	/*************************************************************/
	/*************************************************************/


	/* ! START - COURSES DASHBOARD */
	/* ! END - COURSES DASHBOARD */


	/*************************************************************/
	/*************************************************************/


	/* ! START - COURSES SCHEDULE */
	/* ! END - COURSES SCHEDULE */


	/*************************************************************/
	/*************************************************************/


	/* ! START - GALLERY */
	/* ! END - GALLERY */


	/*************************************************************/
	/*************************************************************/


	/* ! START - MENU */
	mobileMenuEnter = function()
		{
			$('#dre_main_menu').stop().animate({'left': '0%'}, 500);
			$('#dre_main_menu').addClass('shaded');
		};

	mobileMenuLeave = function()
		{
			$('#dre_main_menu').stop().animate({'left': '-75%'}, 500, function() {$('#dre_main_menu').removeClass('shaded');} );
		};
	/* ! END - MENU */


	/*************************************************************/
	/*************************************************************/


	/* ! START - RESIZE */
	resizeHook = function()
		{
			if( $('#dre_overlay').is(':visible') )
			{
				winH = parseInt( $( window ).height() );
				winW = parseInt( $( window ).width() );

				var src = $('#dre_overlay iframe').attr('src');

				src = src.split('&autoplay=1').join('');

				if( winH > winW )
				{
					$('#dre_overlay iframe').fadeOut().attr('src', src );

					$('#dre_overlay_portrait').fadeIn();
				}
				else
				{
					$('#dre_overlay iframe').attr('width', parseInt($( '#dre_overlay' ).width()) - 64 );

					$('#dre_overlay iframe').attr('height', parseInt($( '#dre_overlay' ).height()) - 64 );

					$('#dre_overlay iframe').fadeIn().attr('src', src );

					$('#dre_overlay_portrait').fadeOut();
				}
			}
		};

	afterReadyHook = function()
		{
			$('.dre_image_default').remove();

			if( $('#dreCourseLevel').length > 0 )
			{
				val1 = parseInt($('#' + node1).next().next().text());
				val2 = parseInt($('#' + node2).next().next().text());
				val3 = parseInt($('#' + node3).next().next().text());
				val4 = parseInt($('#' + node4).next().next().text());
				val5 = parseInt($('#' + node5).next().next().text());
				val6 = parseInt($('#' + node6).next().next().text());

				renderLevelInfo();
			}
		};
	/* ! END - RESIZE */


	/******************/
	/******************/
	/* ! END - MOBILE */
	/******************/
	/******************/
	}
	else
	{
	/*********************/
	/*********************/
	/* ! START - DESKTOP */
	/*********************/
	/*********************/


	/* ! START - CAROUSEL */
	desktopCarouselStop = function( node )
		{
				var id = parseInt( $(node).siblings('.dre_carousel_page_placeholder').find('.dre_carousel_page_placeholder_id').html() );

				clearTimeout( slider_timers[id] );
		};

	desktopCarouselStart = function( node )
		{
				var id = parseInt( $(node).siblings('.dre_carousel_page_placeholder').find('.dre_carousel_page_placeholder_id').html() );

				slider_timers[id] = setTimeout(function() { carousel_slider_browse( id ); }, timeslice);
		};
	/* ! END - CAROUSEL */


	/*************************************************************/
	/*************************************************************/


	/* ! START - OVERLAY */
	enterOverlay = function( node )
		{
			$('#dre_overlay').html( $(node).find('iframe').clone() );

			$('#dre_overlay iframe').attr('width', Math.max( 642, winW-256 ) );

			$('#dre_overlay iframe').attr('height', Math.max( 359, winH-256 ) );

			$('#dre_overlay').fadeIn(
				function()
				{
					$('#dre_overlay_quit').fadeIn();
					$('#dre_overlay iframe').attr('src', $('#dre_overlay iframe').attr('src') + '&autoplay=1');
				});
		};

	exitOverlay = function()
		{
			$('#dre_overlay_quit').fadeOut();
			$('#dre_overlay').fadeOut(
				function()
				{
					$('#dre_overlay').html( '' );
					//$('html').removeAttr( 'style' );
				});
		};
	/* ! END - OVERLAY */


	/*************************************************************/
	/*************************************************************/


	/* ! START - COURSES DASHBOARD */
	dashboardTableEnter = function( node )
		{
			$(node).stop().animate({'opacity': '1'}, 500);
			$(node).siblings().stop().animate({'opacity': 0.4}, 500);
		};

	dashboardTableLeave = function( node ) { $(node).find('tr').stop().animate({'opacity': 1}, 500); };
	/* ! END - COURSES DASHBOARD */


	/*************************************************************/
	/*************************************************************/


	/* ! START - COURSES SCHEDULE */
	scheduleTableEnter = function( node )
		{
			$(node).stop().animate({'opacity': '1'}, 500);
			$(node).siblings().stop().animate({'opacity': 0.5}, 500);
		};

	scheduleTableLeave = function( node ) { $(node).find('tr').stop().animate({'opacity': 1}, 500); };
	/* ! END - COURSES SCHEDULE */


	/*************************************************************/
	/*************************************************************/


	/* ! START - GALLERY */
	/* ! END - GALLERY */


	/*************************************************************/
	/*************************************************************/


	/* ! START - MENU */
	desktopMenuEnter = function()
		{
			resizeHook();

			$('#dre_main_menu').stop().animate({'left': '0%'}, 500);
			$('#dre_main_menu').addClass('shaded');
		};

	desktopMenuLeave = function()
		{
			$('#dre_main_menu').stop().animate({'left': '-30%'}, 500, function() {$('#dre_main_menu').removeClass('shaded');} );
		};
	/* ! END - MENU */


	/*************************************************************/
	/*************************************************************/


	/* ! START - RESIZE */
	resizeHook = function()
		{
			$('#dre_main_menu').css('min-height', 0);
			$('#dre_main_menu').css('min-height', $(document).height());

			winH = Math.max( winH, parseInt( $( window ).height() ) );
			winW = Math.max( winW, parseInt( $( window ).width() ) );
		};

	afterReadyHook = function()
		{
			$('.dre_image_mobile').remove();

			winH = Math.max( winH, parseInt( $( window ).height() ) );
			winW = Math.max( winW, parseInt( $( window ).width() ) );

			if( $('#dreCourseLevel').length > 0 )
			{
				val1 = parseInt($('#' + node1).next().next().text());
				val2 = parseInt($('#' + node2).next().next().text());
				val3 = parseInt($('#' + node3).next().next().text());
				val4 = parseInt($('#' + node4).next().next().text());
				val5 = parseInt($('#' + node5).next().next().text());
				val6 = parseInt($('#' + node6).next().next().text());

				renderLevelInfo();
			}
		};
	/* ! END - RESIZE */



	/*******************/
	/*******************/
	/* ! END - DESKTOP */
	/*******************/
	/*******************/
	}




	/**********************/
	/**********************/
	/* ! START - TRIGGERS */
	/**********************/
	/**********************/


	/* ! START - CAROUSEL */
	/* ! NOW */
	function carousel_slider_browse( idString )
	{
		var carousel = $('.dre_carousel_page_placeholder').eq( idString ).parent();

		var activeId = parseInt( $( carousel ).find('.dre_carousel_active_page_index')
									.find('.dre_carousel_page_index_value').html());
		var lastId = parseInt( $( carousel ).find('.dre_carousel_page_index').length );

		activeId++;

		if( activeId == lastId )
		{
			activeId = 0;
		}


		$( carousel ).find('.dre_carousel_active_page_index').removeClass('dre_carousel_active_page_index');

		$( carousel ).find('.dre_carousel_page_index').eq(activeId).addClass('dre_carousel_active_page_index');

		$( carousel ).find('.dre_carousel_active_page').fadeOut( function() { $(this).removeClass('dre_carousel_active_page'); } );

		$( carousel ).find('.dre_carousel_page').eq(activeId).fadeIn( function() { $(this).addClass('dre_carousel_active_page'); } );

		slider_timers[idString] = setTimeout(function() { carousel_slider_browse( idString ); }, timeslice);
	}

	/* ! NOW */
	$(document).on('ready',
		function()
		{
			$('.dre_carousel_page_placeholder').each(
				function()
				{
					var pages = $(this).siblings('.dre_carousel_page');

					if( $(pages).length > 1 )
					{
						$(this).prev().find('.dre_carousel_page_index').eq(0).addClass('dre_carousel_active_page_index');

						$(pages).eq(0).addClass('dre_carousel_active_page');

						var id = parseInt( $(this).find('.dre_carousel_page_placeholder_id').html() );

						slider_timers[id] = setTimeout(function() { carousel_slider_browse( id ); }, timeslice);
					}
				});

			afterReadyHook();

			busy = false;
		});

	$(document).on('click', '.dre_carousel_page_index',
		function()
		{
			var id = parseInt( $(this).parent().next().find('.dre_carousel_page_placeholder_id').html() );

			clearTimeout( slider_timers[id] );

			var activeId = parseInt( $(this).find('.dre_carousel_page_index_value').html() );

			var carousel = $(this).parent().parent();

			$( carousel ).find('.dre_carousel_active_page_index').removeClass('dre_carousel_active_page_index');

			$( carousel ).find('.dre_carousel_page_index').eq(activeId).addClass('dre_carousel_active_page_index');

			$( carousel ).find('.dre_carousel_active_page').fadeOut( function() { $(this).removeClass('dre_carousel_active_page'); } );

			$( carousel ).find('.dre_carousel_page').eq(activeId).fadeIn( function() { $(this).addClass('dre_carousel_active_page'); } );

			slider_timers[id] = setTimeout(function() { carousel_slider_browse( id ); }, timeslice);
		});


	$(document).on('mouseenter', '.dre_carousel_active_page', function() { desktopCarouselStop( this ); });

	$(document).on('mouseleave', '.dre_carousel_active_page', function() { desktopCarouselStart( this ); });
	/* ! END - CAROUSEL */


	/*************************************************************/
	/*************************************************************/


	/* ! START - OVERLAY */
	$(document).on('click', '.dre_contents_slice_composite_block_cta_yt', function() { enterOverlay( this ); });

	$(document).on('click', '#dre_overlay', function() { exitOverlay(); });

	$(document).on('click', '#dre_overlay_quit', function() { exitOverlay(); });

	$(document).on('keyup', function(e) { if ( 27 == e.keyCode && 0 < $('#dre_overlay').find('iframe').length ) { exitOverlay(); } });
	/* ! END - OVERLAY */


	/*************************************************************/
	/*************************************************************/


	/* ! START - COURSES DASHBOARD */
	$(document).on('mouseenter', '.dre_contents_slice_courses_dashboard > table tr', function() { dashboardTableEnter(this); });

	$(document).on('mouseleave', '.dre_contents_slice_courses_dashboard > table', function() { dashboardTableLeave(this); });
	/* ! END - COURSES DASHBOARD */


	/*************************************************************/
	/*************************************************************/


	/* ! START - COURSES SCHEDULE */
	$(document).on('mouseenter', '.dre_contents_slice_courses_schedule > table tr', function() { scheduleTableEnter(this);});

	$(document).on('mouseleave', '.dre_contents_slice_courses_schedule > table', function() { scheduleTableLeave(this); });
	/* ! END - COURSES SCHEDULE */


	/*************************************************************/
	/*************************************************************/


	/* ! START - GALLERY */
	$(document).on('click', '.dre_gallery_control_active.dre_gallery_control_r', function() { gallerSlideR( this ); });

	$(document).on('click', '.dre_gallery_control_active.dre_gallery_control_l', function() { gallerSlideL( this ); });
	/* ! END - GALLERY */


	/*************************************************************/
	/*************************************************************/


	/* ! START - MENU */
	$(document).on('click', '#dre_main_menu_switch', function() { mobileMenuEnter();  });

	$(document).on('click', '#page', function() { mobileMenuLeave(); });

	$(document).on('mouseenter', '#dre_main_menu_switch', function() { desktopMenuEnter(); });

	$(document).on('mouseleave', '#header', function() { desktopMenuLeave(); });
	/* ! END - MENU */


	/*************************************************************/
	/*************************************************************/


	/* ! START - TEST */
	$(document).on('click', '.dre_answer',
		function() {
			$(this).siblings().removeClass('dre_answer_active');
			$(this).addClass('dre_answer_active');
		});



	$(document).on('click', '#dre_test_submit',
		function() {
			var max = -100;
			var maxId = -1;


			$('.dre_course_id').each(
				function() {
					var id = parseInt($(this).html());
					var score = 0;

					$('.dre_answer_score_'+id).each(
						function()
						{
							if( $(this).parent().parent().is('.dre_answer_active') )
							{
								score += parseInt($(this).html());
							}
						});

					if( score > max )
					{
						max = score;
						maxId = id;
					}

					$(this).prev().html( score );
				});

			val1 = parseInt($('#dre_course_levels_' + maxId).children().eq(0).text());
			val2 = parseInt($('#dre_course_levels_' + maxId).children().eq(1).text());
			val3 = parseInt($('#dre_course_levels_' + maxId).children().eq(2).text());
			val4 = parseInt($('#dre_course_levels_' + maxId).children().eq(3).text());
			val5 = parseInt($('#dre_course_levels_' + maxId).children().eq(4).text());
			val6 = parseInt($('#dre_course_levels_' + maxId).children().eq(5).text());

			$(this).parent().animate({ opacity: 0 }, 500,
				function()
				{

					$(".dre_contents_slice_questionnaire_title").animate({ height: 0, padding: 0 }, 500);
					$(".dre_contents_slice_question_wrapper").animate({ height: 0, padding: 0 }, 500);

					$(this).animate({ height: 0, padding: 0 }, 500,
						function()
						{
							$(this).hide();
							$(".dre_test_banner_wrapper").hide();
							$("#dreCourseTestResultWrapper").fadeIn();
							$(".dre_contents_slice_course_test_result h2").text($(".dre_course_title_" + maxId).text());
							$(".dre_test_banner_wrapper_" + maxId).fadeIn(
								function() {
									var offset = $('#dreCourseTestResultWrapper').offset();

									$('html, body').animate( { scrollTop: offset.top }, 500 );

									renderLevelInfo();
								});

						});
				});


		});
	/* ! END - TEST */


	/*************************************************************/
	/*************************************************************/


	/* ! START - RESIZE */
	$(window).on('resize', function() { resizeHook(); });
	/* ! END - RESIZE */


	/*************************************************************/
	/*************************************************************/


	/* ! START - MOBILE GALLERY */
	$(document).on('touchstart', '.dre_contents_slice_gallery_wrapper',
	function(e, ui)
	{
		busy = true;

		startX = e.originalEvent.touches[0].pageX;

		startY = e.originalEvent.touches[0].pageY;

		childwidth = parseInt($(this).children().eq(0).width());

		maxoffset = ($(this).children().length-1) * childwidth;

		offset = parseInt($(this).children().eq(0).css( 'margin-left'));
	}).on("touchmove", ".dre_contents_slice_gallery_wrapper",
	function (e, ui)
	{
		tempX = e.originalEvent.changedTouches[0].pageX;
		tempY = e.originalEvent.changedTouches[0].pageY;

		deltaX = tempX - startX;
		deltaY = tempY - startY;


		if( Math.abs( deltaY ) >= Math.abs( deltaX ) )
		{
			deltaX = 0;
		}
		else
		{
			e.preventDefault();


			if( deltaX > 0 )
			{
				if ( offset >= 0 )
				{
				}
				else
				{
					$(this).children().eq(0).css( 'margin-left', (offset+deltaX)+'px'  );
				}
			}
			else if( deltaX < 0 )
			{
				if ( offset <= -maxoffset )
				{
				}
				else
				{
					$(this).children().eq(0).css( 'margin-left', (offset+deltaX)+'px'  );
				}
			}
		}
	}).on("touchend", ".dre_contents_slice_gallery_wrapper",
	function (e, ui)
	{
		//$(this).children().eq(0).css( 'margin-left', offset+'px'  );
		offset = Math.floor( offset / childwidth ) * childwidth;

		if(  Math.abs( deltaX ) > childwidth/3 ) {
			if( deltaX > 0 )
			{
				if ( offset >= 0 )
				{
					busy = false;
				}
				else
				{
					if( offset+childwidth == 0 )
					{
						$(this).prev().children().eq(0).removeClass('dre_gallery_control_active');
					}

					$(this).prev().children().eq(2).addClass('dre_gallery_control_active');

					$(this).children().eq(0).animate( {'marginLeft':  offset+childwidth + 'px' }, 500, function() { busy = false; } );
				}
			}
			else if( deltaX < 0 )
			{
				if ( offset <= -maxoffset )
				{
					busy = false;
				}
				else
				{
					if( offset-childwidth == -maxoffset )
					{
						$(this).prev().children().eq(2).removeClass('dre_gallery_control_active');
					}

					$(this).prev().children().eq(0).addClass('dre_gallery_control_active');

					$(this).children().eq(0).animate( {'marginLeft':  offset-childwidth + 'px' }, 500, function() { busy = false; } );
				}
			}
		}
		else
		{
			$(this).children().eq(0).animate( {'marginLeft':  offset + 'px' }, 500, function() { busy = false; } );
		}

	});
	/* ! END - MOBILE GALLERY */


	/********************/
	/********************/
	/* ! END - TRIGGERS */
	/********************/
	/********************/
});