
//鏂囧瓧澶у皬鍒囨崲

function fontZoom(size)
{
   document.getElementById('con').style.fontSize=size+'px';
}


//璇诲彇璇︽儏缈婚〉
(function($){
	$.fn.contentPages = function(newsid){
	
	$("div#contentpages").empty();
		
		$.ajax({
			type: "POST",
			url:PDV_RP+"news/post.php",
			data: "act=contentpages&newsid="+newsid,
			success: function(msg){
				$("div#contentpages").append("<ul>");
				$("div#contentpages").append("<li id='pl' class='cbutton'>涓婁竴椤�</li>");
				$("div#contentpages").append(msg);
				$("div#contentpages").append("<li id='pn' class='pbutton'>涓嬩竴椤�</li>");
				$("div#contentpages").append("</ul>");
				//$("li#pl").hide();
				
				
				var getObj = $('li.pages');

				if(getObj.length<2){
					$("div#contentpages").hide();
					$().setBg();
					return false;
				}
				
				$('li.pages')[0].className='pagesnow';
				
				getObj.each(function(id) {
					
					var obj = this.id;
					
					$("li#"+obj).click(function() {
						
						$('li.pagesnow')[0].className="pages";
						this.className='pagesnow';
						var clickid=obj.substr(2);
						$().getContent(newsid,clickid);
						if($(".pagesnow").next()[0].id=="pn"){$("li#pn")[0].className="cbutton";}else{$("li#pn")[0].className="pbutton";}
						if($(".pagesnow").prev()[0].id=="pl"){$("li#pl")[0].className="cbutton";}else{$("li#pl")[0].className="pbutton";}
						
						
					});

				});

				
				//涓婁竴椤�
				$("li#pl").click(function() {
					if($("li#pl")[0].className=="pbutton"){
						var nowObj=$(".pagesnow").prev()[0].id;
						var nextpageid=nowObj.substr(2);
						$().getContent(newsid,nextpageid);
						$('li.pagesnow')[0].className="pages";
						$("#"+nowObj)[0].className="pagesnow";
						if($(".pagesnow").prev()[0].id=="pl"){$("li#pl")[0].className="cbutton";}else{$("li#pl")[0].className="pbutton";}
						if($(".pagesnow").next()[0].id=="pn"){$("li#pn")[0].className="cbutton";}else{$("li#pn")[0].className="pbutton";}
						
					}else{
						return false;
					}
					
					
				});

				
				//涓嬩竴椤�
				$("li#pn").click(function() {
					if($("li#pn")[0].className=="pbutton"){
						var nowObj=$(".pagesnow").next()[0].id;
						var nextpageid=nowObj.substr(2);
						$().getContent(newsid,nextpageid);
						$('li.pagesnow')[0].className="pages";
						$("#"+nowObj)[0].className="pagesnow";
						if($(".pagesnow").prev()[0].id=="pl"){$("li#pl")[0].className="cbutton";}else{$("li#pl")[0].className="pbutton";}
						if($(".pagesnow").next()[0].id=="pn"){$("li#pn")[0].className="cbutton";}else{$("li#pn")[0].className="pbutton";}
						
					}else{
						return false;
					}
				});

			}
		});
	};
})(jQuery);


//璇诲彇璇︾粏鍐呭

(function($){
	$.fn.getContent = function(newsid,newspageid){
		
		$.ajax({
			type: "POST",
			url:PDV_RP+"news/post.php",
			data: "act=getcontent&newspageid="+newspageid+"&newsid="+newsid+"&RP="+PDV_RP,
			success: function(msg){
				$("#con").html(msg);
				$("#con").find("img").each(function(){
					if(this.offsetWidth>600){
						this.style.width="600px";
					}
				});
				$().setBg();
			}
		});
	};
})(jQuery);


//璇︽儏鍥剧墖灏哄澶勭悊
$(document).ready(function(){
	$("#con").find("img").hide();
	var w=$("#con")[0].offsetWidth;
	$("#con").find("img").each(function(){
		$(this).show();
		if(this.offsetWidth>w){
			this.style.width=w + "px";
			$().setBg();
		}
	});
		
});


//鏀寔鍙嶅鎶曠エ
$(document).ready(function(){

	$("span#zhichi").click(function(){
		
		var newsid=$("input#newsid")[0].value;

		$.ajax({
			type: "POST",
			url:PDV_RP+"news/post.php",
			data: "act=zhichi&newsid="+newsid,
			success: function(msg){
				if(msg=="L0"){
					$().popLogin(0);
				}else if(msg=="L1"){
					$().alertwindow("瀵逛笉璧凤紝鎮ㄥ凡缁忔姇杩囩エ浜�","");
				}else{
					$("span#zhichinum").html(msg);
				}
			}
		});
	});


	$("span#fandui").click(function(){
		
		var newsid=$("input#newsid")[0].value;

		$.ajax({
			type: "POST",
			url:PDV_RP+"news/post.php",
			data: "act=fandui&newsid="+newsid,
			success: function(msg){
				if(msg=="L0"){
					$().popLogin(0);
				}else if(msg=="L1"){
					$().alertwindow("瀵逛笉璧凤紝鎮ㄥ凡缁忔姇杩囩エ浜�","");
				}else{
					$("span#fanduinum").html(msg);
				}
			}
		});
	});
		
});


//鍔犲叆鏀惰棌
$(document).ready(function(){

	$("div#addfav").click(function(){
		
		var newsid=$("input#newsid")[0].value;

		$.ajax({
			type: "POST",
			url:PDV_RP+"news/post.php",
			data: "act=addfav&newsid="+newsid+"&url="+window.location.href,
			success: function(msg){
				if(msg=="L0"){
					$().popLogin(0);
				}else if(msg=="L1"){
					$().alertwindow("鎮ㄥ凡缁忔敹钘忎簡褰撳墠缃戝潃","");
				}else if(msg=="OK"){
					$().alertwindow("宸茬粡鍔犲叆鍒版敹钘忓す",PDV_RP+"member/member_fav.php");
				}else{
					alert(msg);
				}
			}
		});
	});
		
});


//闄勪欢涓嬭浇鎵ｇ偣
$(document).ready(function(){
	var downcentstr=$("input#downcent")[0].value;
	if(downcentstr!=""){
		$("#downcentnotice").html("(涓嬭浇鏈檮浠堕渶瑕�"+downcentstr+")");
	}
	$("#downlink").click(function(){
		var newsid=$("input#newsid")[0].value;

		$.ajax({
			type: "POST",
			url:PDV_RP+"news/post.php",
			data: "act=download&newsid="+newsid+"&RP="+PDV_RP,
			success: function(msg){
				if(msg=="1000"){
					alert("涓嬭浇鏈檮浠惰鍏堢櫥褰�");
				}else if(msg=="1001"){
					alert("涓嬭浇鏈檮浠堕渶瑕�"+downcentstr);
				}else{
					window.location=msg;
				}
			}
		});

	});
});


//鐗堜富绠＄悊
$(document).ready(function(){

		var newsid=$("input#newsid")[0].value;

		$.ajax({
			type: "POST",
			url:PDV_RP+"news/post.php",
			data: "act=ifbanzhu&newsid="+newsid,
			success: function(msg){
				if(msg=="YES"){
					$("#banzhu").append("鐗堜富绠＄悊 | <span id='banzhutj'>鎺ㄨ崘</span> | <span id='banzhudel'>鍒犻櫎</span> | <span id='banzhudelmincent'>鍒犻櫎骞舵墸鍒�</span> |").show();
					$().setBg();

					//鎺ㄨ崘鎿嶄綔
					$("#banzhutj").click(function(){
						$.ajax({
							type: "POST",
							url:PDV_RP+"news/post.php",
							data: "act=banzhutj&newsid="+newsid,
							success: function(msg){
								if(msg=="OK"){
									$().alertwindow("鎺ㄨ崘鎴愬姛","");
								}else{
									alert(msg);
								}
							}
						});
						
					});

					//鍒犻櫎鎿嶄綔
					$("#banzhudel").click(function(){
						$.ajax({
							type: "POST",
							url:PDV_RP+"news/post.php",
							data: "act=banzhudel&newsid="+newsid,
							success: function(msg){
								if(msg=="OK"){
									$().alertwindow("鍒犻櫎鎴愬姛","../class/");
								}else{
									alert(msg);
								}
							}
						});
						
					});


					//鍒犻櫎骞舵墸鍒嗘搷浣�
					$("#banzhudelmincent").click(function(){
						$.ajax({
							type: "POST",
							url:PDV_RP+"news/post.php",
							data: "act=banzhudel&koufen=yes&newsid="+newsid,
							success: function(msg){
								if(msg=="OK"){
									$().alertwindow("鍒犻櫎骞舵墸鍒嗘垚鍔�","../class/");
								}else{
									alert(msg);
								}
							}
						});
						
					});
				
				}else{
					$("#banzhu").empty().hide();
				}
			}
		});

});

