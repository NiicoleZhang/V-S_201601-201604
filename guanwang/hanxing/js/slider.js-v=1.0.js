;(function($){
	$.fn.mySlider = function(options){
		var defaults = {
			slideBox 	: '.slider-box',
			slideLi 	: '.banner-item',
			sliderNav 	: '.slide-page .slide-page-item',
			slideTime	: '4000',
			slideRun	: true
		};
		var opt = $.extend(defaults, options || {});
		var slideBox = $(opt['slideBox']),
			slideLi  = $(opt['slideLi']),
			sliderNav= $(opt['sliderNav']),
			slideRun  = opt['slideRun'],
			isRunning= false,
			time 	 = null;
			slideIndex= 0,
			slideTime= opt['slideTime'];
		var autoRun = function(){
			time=setInterval(function(){
				slideIndex++;
				slideIndex=(slideIndex>slideLi.size()-1)?0:slideIndex; run();
			},slideTime);
		}
		var run = function(){
			if(isRunning){
				return;
			};
			isRunning = true;
			sliderNav.removeClass('active');
			sliderNav.eq(slideIndex).addClass('active');
			slideLi.finish().eq(slideIndex).siblings(slideLi).animate({'opacity':0},600, function(){
				$(this).find('.banner-title').css({opacity:0 ,left:-80}).siblings('.banner-text').css({opacity:0 ,left:-80}).siblings('.banner-links').css({opacity:0,left:-80});
				$(this).css('display', 'none');
				isRunning = false;
			});
			slideLi.eq(slideIndex).css('display', 'block').animate({'opacity':1},600,function(){
				isRunning = false;
			}).find('.banner-title').animate({opacity: 1,left: 0},1200).siblings('.banner-text').animate({opacity: 1,left: 0},1500).siblings('.banner-links').animate({opacity: 1,left: 0},1600);
		};
        sliderNav.hover(function(){ slideIndex=$(this).index(); run(); });
        slideBox.hover(function(){clearInterval(time);},function(){if(slideRun){autoRun();}});
        if(slideRun){autoRun();};
	};
})(jQuery);