$(function(){
var foot_game = $(".foot-right");
	foot_game.hover(function(){
		$(this).children('p').addClass('hover');
		$(this).children('ul').css({'display':'block'});
	},function(){
		$(this).children('p').removeClass('hover');
		$(this).children('ul').css({'display':'none'});
	});
var warpHight = $('#warp-right').height();
$('#warp-left').height(warpHight);
$('.nav-links li').last().css({'padding-bottom':'35px'});
$('.foot-li li').last().css({'border-right':'1px #2A2C2E solid'});
// var slideH = $('.slider-box').height();
// var vxylogo = $('#vxylogo').height();
// var navH	= (slideH - vxylogo) ? (slideH - vxylogo) : 'auto';
// $('#nav').height(navH);
var myDate = new Date();
$('#my_Date').html(myDate.getFullYear());
$('.tabs-ul li').bind('click',function(){
	index=$(this).index();
	$(this).siblings().removeClass('hover');
	$(this).addClass('hover');
	$(".reg-form").css({'display':'none','ime-mode':'disabled'});	
	$(".reg-form").eq(index).removeAttr('style');
	$('.tabs-ul b').stop().animate({'left':230*index});
});
$('.news-item').each(function(index, el) {index++;$(this).prepend('<b class="news-number">0'+ index+'.</b>');});
var sizeFn = function(){  var w = $(window).width();if(w < 1440){$('.kf').css({'width':'65%','marginLeft':'10%'});}else{$('.kf').removeAttr('style');};};
sizeFn();
$(window).on('resize', function(){sizeFn();});
});