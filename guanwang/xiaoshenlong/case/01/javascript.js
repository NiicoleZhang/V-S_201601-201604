// JavaScript Document
$(document).ready(function(){
	$("#inner>ul>li").hover(function(){
		
		$("#inner>ul>li").find("div").css({"display":"none"});	
		$(this).find("div").css({"display":"block"});							
                     })
		 })
$(document).ready(function(){
	$(".topnav>ul>li").click(function(){
		
		$(".topnav>ul>li").find("#bignav").css({"display":"none"});	
		$(this).find("#bignav").css({"display":"block"});					
	                     })
		})
		
	$(function(){
         $('#marquee6').kxbdSuperMarquee({
				isMarquee:true,
				isEqual:false,
				scrollDelay:20,
				controlBtn:{up:'#goUM',down:'#goDM'},
				direction:'up'
			        });
		$('#marquee5').kxbdSuperMarquee({
				isEqual:false,
				distance:100,
				time:1,
				//btnGo:{up:'#goU',down:'#goD'},
				direction:'up'
			});
     })	