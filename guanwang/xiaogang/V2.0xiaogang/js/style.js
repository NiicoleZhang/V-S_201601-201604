var globelVary={languageId:1,
				sessionTimeBool:0,//1表示超时,0表示未超时
				timeMashine:""
};

$(function(){
	if(isNaN($("#itemLanguage").val()))
		globelVary.languageId=1;
	else
		globelVary.languageId=parseInt($("#itemLanguage").val());	
	})

/********购物产品数量********/
function shopingCount(obj,type){
	var changeObj=obj.siblings(".text_shoping");
	var count=changeObj.val();
	if(isNaN(count)){createDialog({title:transKeyWords(globelVary.languageId,12),con:transKeyWords(globelVary.languageId,26),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}]);return;}
	if(type=="add")	changeObj.val(++count);		
	else if(type=="remove"){
		if(count<=0)
		return;
		else changeObj.val(--count);
			
		}
}
/********竖形菜单************/
function ShowMenu(obj,noid){
	if($(obj).hasClass("selected")){
		$(obj).removeClass("selected");
		$("#"+noid).css("display","none");
	}else{
		$(obj).addClass("selected");
		$("#"+noid).show();
	}
}
/********文章列表效果2************/
function item_list2(idName){
	$(".id"+idName+ " ul>li:first-child").addClass("over");
	$(".id"+idName+ " ul>li").live("mouseover",function(){
		$(this).siblings().andSelf().removeClass("over");
		$(this).addClass("over");
	});
}
/********文章列表效果3************/
function item_list3(idName){
	$(".id"+idName+ " ul>li").live("mouseover",function(){
		$(this).addClass("p02");
	});
	$(".id"+idName+ " ul>li").live("mouseout",function(){
		$(this).removeClass("p02");
	});
}
/********文章列表效果5************/
function item_list5(idName){
	$(".id"+idName+ " ul>li").live("mouseover",function(){
		$("#img"+idName).show();												
	});
	$(".id"+idName+ " ul>li").live("mouseout",function(){
		$("#img"+idName).css("display","none");											   
	});
}

/********导航二级竖向以及横向效果*********/
function navStyle(ind,num){
	var nav= jQuery(".fwnavlink"+num);
	var init = jQuery(".fwnavlink"+num+" .m").eq(ind);
	var block = jQuery(".fwnavlink"+num+" .block"); //滑块
	block.css({"left":init.position().left-3}); //初始化滑块位置
	nav.hover(function(){},function(){ block.animate({"left":init.position().left-3},100); }); //移出导航滑块返回

	jQuery(".fwnavlink"+num).slide({ 
			type:"menu", //效果类型
			titCell:".m", // 鼠标触发对象
			targetCell:".sub", // 效果对象，必须被titCell包含
			delayTime:300, // 效果时间
			triggerTime:0, //鼠标延迟触发时间
			returnDefault:true,//on返回初始位置
			defaultIndex:ind,//初始位置
			startFun:function(i,c,s,tit){ //控制当前滑块位置
				jQuery(".fwnavlink"+num+" .block").animate({"left":tit.eq(i).position().left-3},100);
			}
		});
}
/********导航三级效果*********/
function navStyle4(ind){
	jQuery(".fwnavlink4").slide({ 
			type:"menu",
			titCell:".m",
			targetCell:".sub",
			effect:"slideDown",
			delayTime:300,
			triggerTime:0,
			defaultIndex:ind,
			returnDefault:true
		});
}
var sweetTitles = {
	x : 10,	
	y : 20,	
	init : function(idName) {
		$(".id"+idName+ " ul>li a").live("mouseover",function(e){
			this.myTitle = this.title;
			this.myHref = this.href;
			this.myHref = (this.myHref.length > 200 ? this.myHref.toString().substring(0,200)+"..." : this.myHref);
			this.title = "";
			var tooltip = "";
			if(this.myTitle == "")
			{
			    tooltip = "";
			}
			else
			{
			    tooltip = "<div id='tooltip'><p>"+this.myTitle+"</p></div>";
			}
			$('body').append(tooltip);
			$('#tooltip')
				.css({
					"opacity":"0.8",
					"top":(e.pageY+20)+"px",
					"left":(e.pageX+10)+"px"
				}).show('fast');	
		}).live("mouseout",function(){
			this.title = this.myTitle;
			$('#tooltip').remove();
		}).live("mousemove",function(e){
			$('#tooltip')
			.css({
				"top":(e.pageY+20)+"px",
				"left":(e.pageX+10)+"px"
			});
		});
	}
};
/****头部搜索分类显示*****/
function displaySiteSearch(obj){
	var objSpanFirst=obj.find("span:first");
	//var offset=objSpanFirst.offset();
	var offset=objSpanFirst.position();
	var top=offset.top;
	var left=offset.left;	
	var inputH=objSpanFirst.outerHeight();
	top+=inputH;
	$("#select_siteSearch").css({"display":"block","top":top+"px","left":left+"px"});
}
/****头部搜索分类隐藏*****/
function hideSiteSearch(event,obj){
	$("#select_siteSearch").hide()//.css({"display":"none"});	
}

/****语言显示*****/
function displayLanguage(obj){
	var objSpanFirst=obj.find("span:first");
	var offset=objSpanFirst.position();
	var top=offset.top;
	var left=offset.left;	
	var inputH=objSpanFirst.outerHeight();
	top+=inputH;
	$("#select_language").css({"top":top+"px","left":left+"px"}).show();
}
/****语言隐藏*****/
function hideLanguage(event,obj){
	$("#select_language").hide();//.css({"display":"none"});	
}
$(function(){
	$("#select_language,#select_siteSearch ul>li").live("click",function(){
		$("#select_language,#select_siteSearch").hide();
		});
	})

/******头部搜索******/
function siteSearch(){
	$("#siteSearchSubmit").click(function(){ 
		var siteSearchClass = $("#siteSelect_info").find("a").attr("rel");											   
		var siteSearchContent = $("#siteSearchContent").val(); 
		//window.open("/default.asp?act=contentfind&searchClass="+siteSearchClass+"&searchContent="+siteSearchContent); //跳转新页面
		window.open("/search/"+siteSearchClass+"/"+siteSearchContent); //跳转新页面	
	})
	$("#select_siteSearch").find("a").click(function(){														 
		var sitePageName = $(this).attr("rel");
		$("#siteSelect_info").children().replaceWith("<a href='javascript:void(0)' rel='"+sitePageName+"'>"+sitePageName+"</a>");
	})	
}
/******多语******/
function siteLanguage(){
	$("#select_language").find("a").click(function(){														 
		var languageId = $(this).attr("rel");
		//window.location.href="http://www.yatouhome.com/default.asp?siteLanguage="+languageId; //跳转本页面
		window.location.href="http://www.yatouhome.com/siteLanguage="+languageId; //跳转本页面
	})	
}

/******通用搜索******/
function commonSearch(userLabelId){	
	$("#searchSubmit"+userLabelId).click(function(){ 
		var searchClass = $("#select_info"+userLabelId).find("a").attr("rel");											   
		var searchContent = $("#searchContent"+userLabelId).val(); 
		//window.open("/default.asp?act=contentfind&searchClass="+searchClass+"&searchContent="+searchContent); //跳转新页面
		window.open("/search/"+searchClass+"/"+searchContent); //跳转新页面	
	})
	var obj=$("#select_search"+userLabelId);
	$("a",obj).click(function(){									 
		var pageName = $(this).attr("rel");
		$("#select_info"+userLabelId).children().replaceWith("<a href='javascript:void(0)' rel='"+pageName+"'>"+pageName+"</a>");
		obj.hide();
	})	
}
/****公共搜索分类显示*****/
function displaySearch(obj,userLabelId){
	var objSpanFirst=obj.find("span:first");
	var position=objSpanFirst.position();
	var top=position.top;
	var left=position.left;	
	var inputH=objSpanFirst.outerHeight();
	top+=inputH;
	$("#select_search"+userLabelId).css({"display":"block","top":top+"px","left":left+"px"});
}
/****公共搜索分类隐藏*****/
function hideSearch(event,obj,userLabelId){
	$("#select_search"+userLabelId).css({"display":"none"});	
}
/******发表留言******/
function messageOperate(userLabelId){
	$("#msgSubmit"+userLabelId).click(function(){ 	 
		var msgUser = $("#msgUser"+userLabelId).val(); 
		var msgContent = $("#msgContent"+userLabelId).val(); 
		var msgUserTel = $("#msgUserTel"+userLabelId).val(); 
		var msgUserEmail = $("#msgUserEmail"+userLabelId).val(); 
		var msgSex = $("input[name=msgSex"+userLabelId+"]:checked").val();
		var msgCheckcode = $("#msgCheckcode"+userLabelId).val();
		var data = {msgUser:msgUser,msgContent:msgContent,msgUserTel:msgUserTel,msgUserEmail:msgUserEmail,msgSex:msgSex,msgCheckcode:msgCheckcode,userLabelId:userLabelId}; 
		$.ajax({ 
			type: "POST", 
			url: "http://www.yatouhome.com/apply/messages/message_add.asp", 
			data:data, 
			cache:false, 
			error:function(){ 
			createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,1),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}]); 
				return false; 
			}, 
			success: function(data){ 	
				try{
					var dataMsg=eval("("+data+")"); 							
					if(dataMsg.status=="failed"){ 
					createDialog({title:transKeyWords(globelVary.languageId,8),con:dataMsg.msg,type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}]);
						return false; 
					}
				}catch(error){				
					$("#"+userLabelId).replaceWith(data);
					var ccImg = document.getElementById("imgcheckcode"+userLabelId);//刷新验证码
					if (ccImg)
					{
						ccImg.src = "/inc/checkcode.asp?t="+(new Date().getTime());
					}
					createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,32),type:"success",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}]);
				}
			} 
		});			
	}) 
	$("#msgReset"+userLabelId).click(function(){ 
		$("#msgUser"+userLabelId).attr("value",""); 
		$("#msgContent"+userLabelId).attr("value",""); 
		$("#msgUserTel"+userLabelId).attr("value",""); 
		$("#msgUserEmail"+userLabelId).attr("value","");
		$("#msgCheckcode"+userLabelId).attr("value","");
	}) 
} 


/******在线表单******/
function messageOperate1(userLabelId){
	$("#msgSubmit"+userLabelId).click(function(){ 	
	var data = {userLabelId:userLabelId}; 
	var result=$.Control({objs:$(".paraName")});	
	for(var i=1;i<=10;i++){		
		data["parameter"+i]=(result["parameter"+i]?result["parameter"+i]:"");
		}
		var msgCheckcode = $("#msgCheckcode"+userLabelId).val();
		data["msgCheckcode"]=msgCheckcode;
		$.ajax({ 
			type: "POST", 
			url: "http://www.yatouhome.com/apply/messages/onlineForm_add.asp", 
			data:data, 
			cache:false, 
			error:function(){ 
			createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,1),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}]); 
				return false; 
			}, 
			success: function(data){ 
				try{
					var dataMsg=eval("("+data+")"); 							
					if(dataMsg.status=="failed"){ 
					createDialog({title:transKeyWords(globelVary.languageId,8),con:dataMsg.msg,type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}]);
						return false; 
					}
				}catch(error){				
					$("#"+userLabelId).replaceWith(data);
					var ccImg = document.getElementById("imgcheckcode"+userLabelId);//刷新验证码
					if (ccImg)
					{
						ccImg.src = "/inc/checkcode.asp?t="+(new Date().getTime());
					}
					createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,46),type:"success",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}]);
				}
			} 
		});			
	}) 
	
} 

/******发表评论******/
function discussOperate(userLabelId,distype,disId){
	var disContentObj=$("#saytext"+userLabelId+"dis"+disId);
		var disContent =$.trim(disContentObj.html()); 
		if(disContent==="")	return;	
				var disCheckcodeObj=$("#disCheckCode"+userLabelId+"dis"+disId);
		var disCheckcode =$.trim(disCheckcodeObj.val());
		if(disCheckcode==="") {
			createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,11),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}]); 
			return;
			}
		var data = {userLabelId:userLabelId,disType:distype,disId:disId,disContent:disContent,disCheckcode:disCheckcode}; 
		$.ajax({ 
			type: "POST", 
			url: "http://www.yatouhome.com/apply/discuss/discuss_add.asp", 
			data:data, 
			cache:false, 
			error:function(){ 
			createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,1),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}]); 
				return false; 
			}, 
			success: function(data){ 	
				try{
					var dataMsg=eval("("+data+")"); 							
					if(dataMsg.status=="failed"){ 
					createDialog({title:transKeyWords(globelVary.languageId,8),con:dataMsg.msg,type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}]);
						return false; 
					}
				}catch(error){
					disContentObj.html("");
					disCheckcodeObj.attr("value","");
					var disImg = document.getElementById("imgcheckcode"+userLabelId+"dis"+disId);//刷新验证码
					if (disImg)
					{
						disImg.src = "/inc/checkcode.asp?t="+(new Date().getTime());
					}
					createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,31),type:"success",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}]);
				}
			} 
		});			 
}
///******会员注册******/

/******会员登陆******/
function userLogin(userLabelId){
	$("#userSubmitLogin"+userLabelId).click(function(){
		var userNameLogin = $("#userNameLogin"+userLabelId).val(); 
		var passwordLogin = $.md5($("#passwordLogin"+userLabelId).val()); 
		var userLoginCheckcode = $("#userLoginCheckcode"+userLabelId).val();
		var data = {userNameLogin:userNameLogin,passwordLogin:passwordLogin,userLoginCheckcode:userLoginCheckcode,userLabelId:userLabelId}; 
		$.ajax({ 
			type: "POST", 
			url: "http://www.yatouhome.com/apply/member/userLogin.asp", 
			data:data, 
			cache:false, 
			error:function(){ 
				createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,1),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}]);
				return false; 
			}, 
			success: function(data){ 	
				try{
					var dataMsg=eval("("+data+")"); 							
					if(dataMsg.status=="failed"){
						createDialog({title:transKeyWords(globelVary.languageId,8),con:dataMsg.msg,type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}]);						 
						return false; 
					}
				}catch(error){				
					$(".user_login_sub2").replaceWith(data);
					var ccImg = document.getElementById("imgcheckcode"+userLabelId);//刷新验证码
					if (ccImg)
					{
						ccImg.src = "/inc/checkcode.asp?t="+(new Date().getTime());
					}
					createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,3),type:"success",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}]);					
				}
			} 
		});												 
	})
}

/**
 * jQuery jPages v0.4
 * Client side pagination with jQuery
 * http://luis-almeida.github.com/jPages
 *
 * Licensed under the MIT license.
 * Copyright 2012 Luís Almeida
 * https://github.com/luis-almeida
 */

(function ( $, window, document, undefined ) {

    var name = "jPages",
        instance = null,
        defaults = {
            containerID  : "",
            first        : false,
            previous     : "&#8592; previous",
            next         : "next &#8594;",
            last         : false,
            links        : "numeric", // blank || title
            startPage    : 1,
            perPage      : 10,
            midRange     : 5,
            startRange   : 1,
            endRange     : 1,
            keyBrowse    : false,
            scrollBrowse : false,
            pause        : 0,
            clickStop    : false,
            delay        : 50,
            direction    : "forward", // backwards || auto || random ||
            animation    : "", // http://daneden.me/animate/ - any entrance animations
            fallback     : 400,
            minHeight    : true,
            callback     : undefined // function( pages, items ) { }
        };


    function Plugin( element, options ) {
        this.options = $.extend( {}, defaults, options );
this.options.perPage=(this.options.perPage==0?1:this.options.perPage);
        this._container = $( "#" + this.options.containerID );
        if ( !this._container.length ) { 
            return; 
        }

        this.jQwindow = $(window);
        this.jQdocument = $(document);
        
        this._holder = $( element );
        this._nav = {};

        this._first = $( this.options.first );
        this._previous = $( this.options.previous );
        this._next = $( this.options.next );
        this._last = $( this.options.last );
        
        /* only visible items! */
        //this._items = this._container.children(":visible");
		this._items = this._container.children();
        this._itemsShowing = $([]);
        this._itemsHiding = $([]);

        this._numPages = Math.ceil( this._items.length / this.options.perPage );
        this._currentPageNum = this.options.startPage;

        this._clicked = false;
        this._cssAnimSupport = this.getCSSAnimationSupport();

        this.init();
        
    }

    Plugin.prototype.getCSSAnimationSupport = function () {
        var animation = false,
            animationstring = 'animation',
            keyframeprefix = '',
            domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
            pfx  = '',
            elm = this._container.get(0);

        if( elm.style.animationName ) { animation = true; } 

        if( animation === false ) {
            for( var i = 0; i < domPrefixes.length; i++ ) {
                if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
                    pfx = domPrefixes[ i ];
                    animationstring = pfx + 'Animation';
                    keyframeprefix = '-' + pfx.toLowerCase() + '-';
                    animation = true;
                    break;
                }
            }
        }

        return animation;
    };

    Plugin.prototype.init = function () {
        this.setStyles();
        this.setNav();
        this.paginate( this._currentPageNum );
        this.setMinHeight();
    };

    Plugin.prototype.setStyles = function () {

        var requiredStyles = "<style>" + 
        ".jp-invisible { visibility: hidden !important; } " +
        ".jp-hidden { display: none !important; }" + 
        "</style>";

        $( requiredStyles ).appendTo("head");

        if ( this._cssAnimSupport && this.options.animation.length ) { 
            this._items.addClass("animated jp-hidden");
        } else {
            this._items.hide();
        }
        
    };

    Plugin.prototype.setNav = function () {
        var navhtml = this.writeNav();

        this._holder.each( this.bind( function( index, element ) {
            var holder = $( element );
            holder.html( navhtml );
            this.cacheNavElements( holder, index );
            this.bindNavHandlers( index );
            this.disableNavSelection( element );
        }, this) );

        if ( this.options.keyBrowse ) this.bindNavKeyBrowse(); 
        if ( this.options.scrollBrowse ) this.bindNavScrollBrowse();
    };

    Plugin.prototype.writeNav = function () {
        var i = 1, navhtml;

        navhtml = this.writeBtn( "first" ) + this.writeBtn( "previous" );

        for ( ; i <= this._numPages; i++ ) {

            if ( i === 1 && this.options.startRange === 0 ) {
                navhtml += "<span>...</span>";
            }

            if ( i > this.options.startRange && i <= this._numPages - this.options.endRange ) {
                navhtml += "<a href='#' class='jp-hidden'>";
            } else {
                navhtml += "<a>";
            }

            switch ( this.options.links ) {
                case "numeric" :
                    navhtml += i;
                    break;
                case "blank" :
                    break;
                case "title" :
                    var title = this._items.eq(i-1).attr("data-title");
                    navhtml += title !== undefined ? title : "";
                    break;
            }

            navhtml += "</a>";

            if ( i === this.options.startRange || i === this._numPages - this.options.endRange ) {
                navhtml += "<span>...</span>";
            }
        }
        
        navhtml += this.writeBtn( "next" ) + this.writeBtn( "last" ) + "</div>";

        return navhtml;
    };

    Plugin.prototype.writeBtn = function ( which ) {

        return this.options[which] !== false && !$( this[ "_" + which ] ).length ? 
            "<a class='jp-" + which + "'>" + this.options[which] + "</a>" : "";

    };

    Plugin.prototype.cacheNavElements = function ( holder, index ) {
        this._nav[index] = {};

        this._nav[index].holder = holder;

        this._nav[index].first = this._first.length ? this._first : this._nav[index].holder.find("a.jp-first");
        this._nav[index].previous = this._previous.length ? this._previous : this._nav[index].holder.find("a.jp-previous");
        this._nav[index].next = this._next.length ? this._next : this._nav[index].holder.find("a.jp-next");
        this._nav[index].last = this._last.length ? this._last : this._nav[index].holder.find("a.jp-last");

        this._nav[index].fstBreak = this._nav[index].holder.find("span:first");
        this._nav[index].lstBreak = this._nav[index].holder.find("span:last");

        this._nav[index].pages = this._nav[index].holder.find("a").not(".jp-first, .jp-previous, .jp-next, .jp-last");
        this._nav[index].permPages = this._nav[index].pages.slice(0, this.options.startRange)
            .add( this._nav[index].pages.slice(this._numPages - this.options.endRange, this._numPages) );
        this._nav[index].pagesShowing = $([]);
        this._nav[index].currentPage = $([]);
    };

    Plugin.prototype.bindNavHandlers = function ( index ) {
        var nav = this._nav[index];

        // default nav
        nav.holder.bind( "click.jPages", this.bind( function( evt ) {
            var newPage = this.getNewPage( nav, $(evt.target) );
            if ( this.validNewPage( newPage ) ) {
                this._clicked = true;
                this.paginate( newPage );
            }
            evt.preventDefault();
        }, this ) );

        // custom first
        if ( this._first.length ) {
            this._first.bind( "click.jPages", this.bind( function() {
                if ( this.validNewPage( 1 ) ) {
                    this._clicked = true;
                    this.paginate( 1 );
                }
            }, this ) );
        }

        // custom previous
        if ( this._previous.length ) {
            this._previous.bind( "click.jPages", this.bind( function() {
                var newPage = this._currentPageNum - 1;
                if ( this.validNewPage( newPage ) ) {
                    this._clicked = true;
                    this.paginate( newPage );
                }
            }, this ) );
        }

        // custom next
        if ( this._next.length ) {
            this._next.bind( "click.jPages", this.bind( function() {
                var newPage = this._currentPageNum + 1;
                if ( this.validNewPage( newPage ) ) {
                    this._clicked = true;
                    this.paginate( newPage );
                }
            }, this ) );
        }

        // custom last
        if ( this._last.length ) {
            this._last.bind( "click.jPages", this.bind( function() {
                if ( this.validNewPage( this._numPages ) ) {
                    this._clicked = true;
                    this.paginate( this._numPages );
                }
            }, this ) );
        }

    };

    Plugin.prototype.disableNavSelection = function ( element ) {
        if ( typeof element.onselectstart != "undefined" ) {
            element.onselectstart = function() { 
                return false; 
            };
        } else if (typeof element.style.MozUserSelect != "undefined") {
            element.style.MozUserSelect = "none";
        } else {
            element.onmousedown = function() { 
                return false; 
            };
        }
    };

    Plugin.prototype.bindNavKeyBrowse = function () {
        this.jQdocument.bind( "keydown.jPages", this.bind( function( evt ) {
            var target = evt.target.nodeName.toLowerCase();
            if ( this.elemScrolledIntoView() && target !== "input" && target != "textarea" ) {
                var newPage = this._currentPageNum;
                
                if ( evt.which == 37 ) newPage = this._currentPageNum - 1;
                if ( evt.which == 39 ) newPage = this._currentPageNum + 1;

                if ( this.validNewPage( newPage ) ) {
                    this._clicked = true;
                    this.paginate( newPage );
                }
            }
        }, this ) );
    };

    Plugin.prototype.elemScrolledIntoView = function () {
        var docViewTop, docViewBottom, elemTop, elemBottom;

        docViewTop = this.jQwindow.scrollTop();
        docViewBottom = docViewTop + this.jQwindow.height();

        elemTop = this._container.offset().top;
        elemBottom = elemTop + this._container.height();

        return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));

        // comment above and uncomment below if you want keyBrowse to happen 
        // only when container is completely visible in the page 

        /*return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && 
            (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop) );*/
    };

    Plugin.prototype.bindNavScrollBrowse = function () {

        this._container.bind( "mousewheel.jPages DOMMouseScroll.jPages", this.bind( function( evt ) {
            var newPage = ( evt.wheelDelta || -evt.detail ) > 0 ? 
                ( this._currentPageNum - 1 ) : ( this._currentPageNum + 1 );

            if ( this.validNewPage( newPage ) ) {
                this._clicked = true;
                this.paginate( newPage );
            }

            return false;

        }, this ) );

    };

    Plugin.prototype.getNewPage = function ( nav, target ) {

        if ( target.is( nav.currentPage ) ) return this._currentPageNum;
        if ( target.is( nav.pages ) ) return nav.pages.index(target) + 1;
        if ( target.is( nav.first ) ) return 1;
        if ( target.is( nav.last ) ) return this._numPages;
        if ( target.is( nav.previous ) ) return nav.pages.index(nav.currentPage);
        if ( target.is( nav.next ) ) return nav.pages.index(nav.currentPage) + 2;

    };

    Plugin.prototype.validNewPage = function ( newPage ) {
        return newPage !== this._currentPageNum && newPage > 0 && newPage <= this._numPages ? 
            true : false;
    };

    Plugin.prototype.paginate = function ( page ) {
        var itemRange, pageInterval;

        itemRange = this.updateItems( page );
        pageInterval = this.updatePages( page );

        this._currentPageNum = page;
        
        if ( $.isFunction( this.options.callback ) ) {
            this.callback( page, itemRange, pageInterval );
        }
        
        this.updatePause();
    };

    Plugin.prototype.updateItems = function ( page ) {
        var range = this.getItemRange( page );

        this._itemsHiding = this._itemsShowing;
        this._itemsShowing = this._items.slice(range.start, range.end);
        
        if ( this._cssAnimSupport && this.options.animation.length ) { 
            this.cssAnimations( page );
        } else {
            this.jQAnimations( page );
        }

        return range;
    };

    Plugin.prototype.getItemRange = function ( page ) {
        var range = {};

        range.start = ( page - 1 ) * this.options.perPage;
        range.end = range.start + this.options.perPage;
        
        if ( range.end > this._items.length ) {
            range.end = this._items.length;
        }

        return range;
    };

    Plugin.prototype.cssAnimations = function ( page ) {
        clearInterval( this._delay );

        this._itemsHiding
            .removeClass( this.options.animation + " jp-invisible" )
            .addClass("jp-hidden");

        this._itemsShowing
            .removeClass("jp-hidden")
            .addClass("jp-invisible");
        
        this._itemsOriented = this.getDirectedItems( page );
        this._index = 0;

        this._delay = setInterval( this.bind( function() {

            if ( this._index === this._itemsOriented.length ) {
                clearInterval( this._delay );
            } else {
                this._itemsOriented
                    .eq(this._index)
                    .removeClass("jp-invisible")
                    .addClass(this.options.animation);
            }

            this._index = this._index + 1;

        }, this ), this.options.delay );
    };


    Plugin.prototype.jQAnimations = function ( page ) {
        clearInterval( this._delay );

        this._itemsHiding.addClass("jp-hidden");
        this._itemsShowing.fadeTo(0, 0).removeClass("jp-hidden");

        this._itemsOriented = this.getDirectedItems( page );
        this._index = 0;

        this._delay = setInterval( this.bind( function() {

            if ( this._index === this._itemsOriented.length ) {
                clearInterval( this._delay );
            } else {
                this._itemsOriented
                    .eq(this._index)
                    .fadeTo(this.options.fallback, 1);
            }

            this._index = this._index + 1;

        }, this ), this.options.delay );
    };

    Plugin.prototype.getDirectedItems = function ( page ) {
        var itemsToShow;

        switch ( this.options.direction ) {
            case "backwards" : 
                itemsToShow = $( this._itemsShowing.get().reverse() );
                break;
            case "random" :
                itemsToShow = $( this._itemsShowing.get().sort( function() { 
                    return ( Math.round( Math.random() ) - 0.5 );
                } ) );
                break;
            case "auto" :
                itemsToShow = page >= this._currentPageNum ? 
                    this._itemsShowing : $( this._itemsShowing.get().reverse() );
                break;
            default :
                itemsToShow = this._itemsShowing;
        }

        return itemsToShow;
    };

    Plugin.prototype.updatePages = function ( page ) {
        var interval, index, nav;

        interval = this.getInterval( page );

        for( index in this._nav ) {
            if ( this._nav.hasOwnProperty( index ) ) {
                nav = this._nav[index];
                this.updateBtns( nav, page );
                this.updateCurrentPage( nav, page );
                this.updatePagesShowing( nav, interval );
                this.updateBreaks( nav, interval );
            }
        }

        return interval;
    };

    Plugin.prototype.getInterval = function ( page ) {
        var neHalf, upperLimit, start, end;
        
        neHalf = Math.ceil( this.options.midRange / 2 );
        upperLimit = this._numPages - this.options.midRange;
        start = page > neHalf ? Math.max( Math.min( page - neHalf, upperLimit ), 0 ) : 0;
        end = page > neHalf ? Math.min( page + neHalf - ( this.options.midRange % 2 > 0 ? 1 : 0 ), this._numPages ) : Math.min( this.options.midRange, this._numPages );
        
        return { start: start, end: end };
    };

    Plugin.prototype.updateBtns = function ( nav, page ) {
        
        if ( page === 1 ) {
            nav.first.addClass("jp-disabled");
            nav.previous.addClass("jp-disabled");
        }

        if ( page === this._numPages ) {
            nav.next.addClass("jp-disabled");
            nav.last.addClass("jp-disabled");
        }

        if ( this._currentPageNum === 1 && page > 1 ) {
            nav.first.removeClass("jp-disabled");
            nav.previous.removeClass("jp-disabled");
        }

        if ( this._currentPageNum === this._numPages && page < this._numPages ) {
            nav.next.removeClass("jp-disabled");
            nav.last.removeClass("jp-disabled");
        }
        
    };

    Plugin.prototype.updateCurrentPage = function ( nav, page ) {

        nav.currentPage.removeClass("jp-current");
        nav.currentPage = nav.pages.eq( page - 1 ).addClass("jp-current");
    
    };

    Plugin.prototype.updatePagesShowing = function ( nav, interval ) {
        var newRange = nav.pages.slice( interval.start, interval.end ).not( nav.permPages );

        nav.pagesShowing.not( newRange ).addClass("jp-hidden");
        newRange.not( nav.pagesShowing ).removeClass("jp-hidden");
        
        nav.pagesShowing = newRange;

    };

    Plugin.prototype.updateBreaks = function ( nav, interval ) {

        if ( interval.start > this.options.startRange || ( this.options.startRange === 0 && interval.start > 0 ) ) { 
            nav.fstBreak.removeClass("jp-hidden");
        } else { 
            nav.fstBreak.addClass("jp-hidden");
        }
        
        if ( interval.end < this._numPages - this.options.endRange ) {
            nav.lstBreak.removeClass("jp-hidden");
        } else { 
            nav.lstBreak.addClass("jp-hidden");
        }
        
    };

    Plugin.prototype.callback = function ( page, itemRange, pageInterval ) {
        var pages = {
            current  : page,
            interval : pageInterval,
            count    : this._numPages
        },
        items = {
            showing  : this._itemsShowing,
            oncoming : this._items.slice( itemRange.start + this.options.perPage, itemRange.end + this.options.perPage ),
            range    : itemRange,
            count    : this._items.length
        };

        pages.interval.start = pages.interval.start + 1;
        items.range.start = items.range.start + 1;

        this.options.callback( pages, items );
    };

    Plugin.prototype.updatePause = function () {
        if ( this.options.pause && this._numPages > 1) { 
            clearTimeout( this._pause );
            if ( this.options.clickStop && this._clicked ) {
                return;
            } else {
                this._pause = setTimeout( this.bind( function() {
                    this.paginate( this._currentPageNum !== this._numPages ? this._currentPageNum + 1 : 1 );
                }, this ), this.options.pause );
            }
        }
    };

    Plugin.prototype.setMinHeight = function () {
        if ( this.options.minHeight && !this._container.is("table, tbody") ) { 
            setTimeout( this.bind( function() {
                this._container.css({
                    "min-height" : this._container.css("height")
                });
            }, this ), 1000 );
        }
    };

    Plugin.prototype.bind = function ( fn, me ) {
        return function () { 
            return fn.apply(me, arguments);
        }; 
    };

    Plugin.prototype.destroy = function () {
        this.jQdocument.unbind("keydown.jPages");
        this._container.unbind( "mousewheel.jPages DOMMouseScroll.jPages");

        if ( this.options.minHeight ) {
            this._container.css("min-height", "");
        }

        if ( this._cssAnimSupport && this.options.animation.length ) { 
            this._items.removeClass("animated jp-hidden jp-invisible " + this.options.animation);
        } else {    
            this._items.removeClass("jp-hidden").fadeTo(0, 1);
        }

        this._holder.unbind("click.jPages").empty();
    };



    $.fn[name] = function ( arg ) {
        var type = $.type( arg );

        if ( type === "object" ) {
            if ( this.length && !$.data( this, name ) ) {
                instance = new Plugin( this, arg );
                this.each( function() {
                    $.data( this, name, instance );
                } );
            }
            return this;
        }

        if ( type === "string" && arg === "destroy" ) {
            instance.destroy();
            this.each( function() {
                $.removeData( this, name );
            } );
            return this;
        }

        if ( type === 'number' && arg % 1 === 0 ) {
            if ( instance.validNewPage( arg ) ) {
                instance.paginate( arg );
            }
            return this;
        }

        return this;
    };

})( jQuery, window, document );



/*!
 * SuperSlide v2.1.1 
 * v2.1.1：修复当调用多个SuperSlide，并设置returnDefault:true 时返回defaultIndex索引错误
 */

(function($){
	$.fn.slide=function(options){
		$.fn.slide.defaults={
		type:"slide", 
		effect:"fade", 
		autoPlay:false, 
		delayTime:500, 
		interTime:2500,
		triggerTime:150,
		defaultIndex:0,
		titCell:".hd li",
		mainCell:".bd",
		targetCell:null,
		trigger:"mouseover",
		scroll:1,
		vis:1,
		titOnClassName:"on",
		autoPage:false, 
		prevCell:".prev",
		nextCell:".next",
		pageStateCell:".pageState",
		opp: false, 
		pnLoop:true, 
		easing:"swing", 
		startFun:null,
		endFun:null,
		switchLoad:null,

		playStateCell:".playState",
		mouseOverStop:true,
		defaultPlay:true,
		returnDefault:false 
		};

		return this.each(function() {

			var opts = $.extend({},$.fn.slide.defaults,options);
			var slider = $(this);
			var effect = opts.effect;
			var prevBtn = $(opts.prevCell, slider);
			var nextBtn = $(opts.nextCell, slider);
			var pageState = $(opts.pageStateCell, slider);
			var playState = $(opts.playStateCell, slider);

			var navObj = $(opts.titCell, slider);//导航子元素结合
			var navObjSize = navObj.size();
			var conBox = $(opts.mainCell , slider);//内容元素父层对象.bd  
			var conBoxSize=conBox.children().size();
			var sLoad=opts.switchLoad;
			var tarObj = $(opts.targetCell, slider);

			/*字符串转换*/
			var index=parseInt(opts.defaultIndex);
			var delayTime=parseInt(opts.delayTime);
			var interTime=parseInt(opts.interTime);
			var triggerTime=parseInt(opts.triggerTime);
			var scroll=parseInt(opts.scroll);
			var vis=parseInt(opts.vis);
			var autoPlay = (opts.autoPlay=="false"||opts.autoPlay==false)?false:true;
			var opp = (opts.opp=="false"||opts.opp==false)?false:true;
			var autoPage = (opts.autoPage=="false"||opts.autoPage==false)?false:true;
			var pnLoop = (opts.pnLoop=="false"||opts.pnLoop==false)?false:true;
			var mouseOverStop = (opts.mouseOverStop=="false"||opts.mouseOverStop==false)?false:true;
			var defaultPlay = (opts.defaultPlay=="false"||opts.defaultPlay==false)?false:true;
			var returnDefault = (opts.returnDefault=="false"||opts.returnDefault==false)?false:true;

			var slideH=0;
			var slideW=0;
			var selfW=0;
			var selfH=0;
			var easing=opts.easing;
			var inter=null;//autoPlay-setInterval 
			var mst =null;//trigger-setTimeout
			var rtnST=null;//returnDefault-setTimeout
			var titOn = opts.titOnClassName;

			var onIndex = navObj.index( slider.find( "."+titOn) );
			var oldIndex = index = onIndex==-1?index:onIndex;
			var defaultIndex = index;


			var _ind = index;
			var cloneNum = conBoxSize>=vis?( conBoxSize%scroll!=0?conBoxSize%scroll:scroll):0; 
			var _tar;
			var isMarq = effect=="leftMarquee" || effect=="topMarquee"?true:false;

			var doStartFun=function(){ if ( $.isFunction( opts.startFun) ){ opts.startFun( index,navObjSize,slider,$(opts.titCell, slider),conBox,tarObj,prevBtn,nextBtn ) } }
			var doEndFun=function(){ if ( $.isFunction( opts.endFun ) ){ opts.endFun( index,navObjSize,slider,$(opts.titCell, slider),conBox,tarObj,prevBtn,nextBtn ) } }
			var resetOn=function(){ navObj.removeClass(titOn); if( defaultPlay ) navObj.eq(defaultIndex).addClass(titOn)  }



			//单独处理菜单效果
			if( opts.type=="menu" ){

				if( defaultPlay ){ navObj.removeClass(titOn).eq(index).addClass(titOn); }
				navObj.hover(
						function(){
							_tar=$(this).find( opts.targetCell );
							var hoverInd =navObj.index($(this));
						
							mst = setTimeout(function(){  
								index=hoverInd;
								navObj.removeClass(titOn).eq	(index).addClass(titOn);
								doStartFun();
								switch (effect)
								{
									case "fade":_tar.stop(true,true).animate({opacity:"show"}, delayTime,easing,doEndFun ); break;
									case "slideDown":_tar.stop(true,true).animate({height:"show"}, delayTime,easing,doEndFun ); break;
								}
							} ,opts.triggerTime);

						},function(){
							clearTimeout(mst);
							switch (effect){ case "fade":_tar.animate( {opacity:"hide"},delayTime,easing ); break; case "slideDown":_tar.animate( {height:"hide"},delayTime,easing ); break; }
						}
				);

				if (returnDefault){ 
					slider.hover(function(){clearTimeout(rtnST);},function(){ rtnST = setTimeout( resetOn,delayTime ); });
				}
				return;
			}

			
			//处理分页
			if( navObjSize==0 )navObjSize=conBoxSize;//只有左右按钮
			if( isMarq ) navObjSize=2;
			if( autoPage ){
				if(conBoxSize>=vis){
					if( effect=="leftLoop" || effect=="topLoop" ){ navObjSize=conBoxSize%scroll!=0?(conBoxSize/scroll^0)+1:conBoxSize/scroll; }
					else{ 
							var tempS = conBoxSize-vis;
							navObjSize=1+parseInt(tempS%scroll!=0?(tempS/scroll+1):(tempS/scroll)); 
							if(navObjSize<=0)navObjSize=1; 
					}
				}
				else{ navObjSize=1 }
				navObj.html(""); 
				var str="";

				if( opts.autoPage==true || opts.autoPage=="true" ){ for( var i=0; i<navObjSize; i++ ){ str+="<li>"+(i+1)+"</li>" } }
				else{ for( var i=0; i<navObjSize; i++ ){ str+=opts.autoPage.replace("$",(i+1))  } }
				navObj.html(str); 				
				var navObj = navObj.children();//重置导航子元素对象
			}


			if(conBoxSize>=vis){ //当内容个数少于可视个数，不执行效果。
				conBox.children().each(function(){ //取最大值
					if( $(this).width()>selfW ){ selfW=$(this).width(); slideW=$(this).outerWidth(true);  }
					if( $(this).height()>selfH ){ selfH=$(this).height(); slideH=$(this).outerHeight(true);  }
				});

				var _chr = conBox.children();
				var cloneEle = function(){ 
					for( var i=0; i<vis ; i++ ){ _chr.eq(i).clone().addClass("clone").appendTo(conBox); } 
					for( var i=0; i<cloneNum ; i++ ){ _chr.eq(conBoxSize-i-1).clone().addClass("clone").prependTo(conBox); }
				}
				
				switch(effect)
				{
					case "fold": conBox.css({"position":"relative","width":slideW,"height":slideH}).children().css( {"position":"absolute","width":selfW,"left":0,"top":0,"display":"none"} ); break;
					case "top": conBox.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:'+vis*slideH+'px"></div>').css( { "top":-(index*scroll)*slideH, "position":"relative","padding":"0","margin":"0"}).children().css( {"height":selfH} ); break;
					case "left": conBox.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:'+vis*slideW+'px"></div>').css( { "width":conBoxSize*slideW,"left":-(index*scroll)*slideW,"position":"relative","overflow":"hidden","padding":"0","margin":"0"}).children().css( {"float":"left","width":selfW} ); break;
					case "leftLoop":
					case "leftMarquee":
						cloneEle();
						conBox.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:'+vis*slideW+'px"></div>').css( { "width":(conBoxSize+vis+cloneNum)*slideW,"position":"relative","overflow":"hidden","padding":"0","margin":"0","left":-(cloneNum+index*scroll)*slideW}).children().css( {"float":"left","width":selfW}  ); break;
					case "topLoop":
					case "topMarquee":
						cloneEle();
						conBox.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:'+vis*slideH+'px"></div>').css( { "height":(conBoxSize+vis+cloneNum)*slideH,"position":"relative","padding":"0","margin":"0","top":-(cloneNum+index*scroll)*slideH}).children().css( {"height":selfH} ); break;
				}
			}



			//针对leftLoop、topLoop的滚动个数
			var scrollNum=function(ind){ 
				var _tempCs= ind*scroll; 
				if( ind==navObjSize ){ _tempCs=conBoxSize; }else if( ind==-1 && conBoxSize%scroll!=0){ _tempCs=-conBoxSize%scroll; }
				return _tempCs;
			}

			//切换加载
			var doSwitchLoad=function(objs){ 

					var changeImg=function(t){
						for ( var i= t; i<( vis+ t); i++ ){
								objs.eq(i).find("img["+sLoad+"]").each(function(){ 
									var _this =  $(this);
									_this.attr("src",_this.attr(sLoad)).removeAttr(sLoad);
									if( conBox.find(".clone")[0] ){ //如果存在.clone
										var chir = conBox.children();
										for ( var j=0 ; j< chir.size() ; j++ )
										{
											chir.eq(j).find("img["+sLoad+"]").each(function(){
												if( $(this).attr(sLoad)==_this.attr("src") ) $(this).attr("src",$(this).attr(sLoad)).removeAttr(sLoad) 
											})
										}
									}
								})
							}
					}

					switch(effect)
					{
						case "fade": case "fold": case "top": case "left": case "slideDown":
							changeImg( index*scroll );
							break;
						case "leftLoop": case "topLoop":
							changeImg( cloneNum+scrollNum(_ind) );
							break;
						case "leftMarquee":case "topMarquee": 
							var curS = effect=="leftMarquee"? conBox.css("left").replace("px",""):conBox.css("top").replace("px",""); 
							var slideT = effect=="leftMarquee"? slideW:slideH; 
							var mNum=cloneNum;
							if( curS%slideT!=0 ){
								var curP = Math.abs(curS/slideT^0);
								if( index==1 ){ mNum=cloneNum+curP }else{  mNum=cloneNum+curP-1  }
							}
							changeImg( mNum );
							break;
					}
			}//doSwitchLoad end


			//效果函数
			var doPlay=function(init){
				 // 当前页状态不触发效果
				if( defaultPlay && oldIndex==index && !init && !isMarq ) return;
				
				//处理页码
				if( isMarq ){ if ( index>= 1) { index=1; } else if( index<=0) { index = 0; } }
				else{ 
					_ind=index; if ( index >= navObjSize) { index = 0; } else if( index < 0) { index = navObjSize-1; }
				}

				doStartFun();

				//处理切换加载
				if( sLoad!=null ){ doSwitchLoad( conBox.children() ) }

				//处理targetCell
				if(tarObj[0]){ 
					_tar = tarObj.eq(index);
					if( sLoad!=null ){ doSwitchLoad( tarObj ) }
					if( effect=="slideDown" ){
							tarObj.not(_tar).stop(true,true).slideUp(delayTime); 
							_tar.slideDown( delayTime,easing,function(){ if(!conBox[0]) doEndFun() }); 
					}
					else{
							tarObj.not(_tar).stop(true,true).hide();
							_tar.animate({opacity:"show"},delayTime,function(){ if(!conBox[0]) doEndFun() }); 
					}
				}
				
				if(conBoxSize>=vis){ //当内容个数少于可视个数，不执行效果。
					switch (effect)
					{
						case "fade":conBox.children().stop(true,true).eq(index).animate({opacity:"show"},delayTime,easing,function(){doEndFun()}).siblings().hide(); break;
						case "fold":conBox.children().stop(true,true).eq(index).animate({opacity:"show"},delayTime,easing,function(){doEndFun()}).siblings().animate({opacity:"hide"},delayTime,easing);break;
						case "top":conBox.stop(true,false).animate({"top":-index*scroll*slideH},delayTime,easing,function(){doEndFun()});break;
						case "left":conBox.stop(true,false).animate({"left":-index*scroll*slideW},delayTime,easing,function(){doEndFun()});break;
						case "leftLoop":
							var __ind = _ind;
							conBox.stop(true,true).animate({"left":-(scrollNum(_ind)+cloneNum)*slideW},delayTime,easing,function(){
								if( __ind<=-1 ){ conBox.css("left",-(cloneNum+(navObjSize-1)*scroll)*slideW);  }else if( __ind>=navObjSize ){ conBox.css("left",-cloneNum*slideW); }
								doEndFun();
							});
							break;//leftLoop end

						case "topLoop":
							var __ind = _ind;
							conBox.stop(true,true).animate({"top":-(scrollNum(_ind)+cloneNum)*slideH},delayTime,easing,function(){
								if( __ind<=-1 ){ conBox.css("top",-(cloneNum+(navObjSize-1)*scroll)*slideH);  }else if( __ind>=navObjSize ){ conBox.css("top",-cloneNum*slideH); }
								doEndFun();
							});
							break;//topLoop end

						case "leftMarquee":
							try{
							var tempLeft = conBox.css("left").replace("px",""); }
							catch(e){return;}
							if(index==0 ){
									conBox.animate({"left":++tempLeft},0,function(){
										if( conBox.css("left").replace("px","")>= 0){ conBox.css("left",-conBoxSize*slideW) }
									});
							}
							else{
									conBox.animate({"left":--tempLeft},0,function(){
										if(  conBox.css("left").replace("px","")<= -(conBoxSize+cloneNum)*slideW){ conBox.css("left",-cloneNum*slideW) }
									});
							}break;// leftMarquee end

							case "topMarquee":
							 try{
								 var tempTop = conBox.css("top").replace("px","");								
								}
							catch(err){													
								break;
								}	 						
							
							if(index==0 ){
									conBox.animate({"top":++tempTop},0,function(){
										if( conBox.css("top").replace("px","")>= 0){ conBox.css("top",-conBoxSize*slideH) }
									});
							}
							else{
									conBox.animate({"top":--tempTop},0,function(){
										if(  conBox.css("top").replace("px","")<= -(conBoxSize+cloneNum)*slideH){ conBox.css("top",-cloneNum*slideH) }
									});
							}break;// topMarquee end

					}//switch end
				}

					navObj.removeClass(titOn).eq(index).addClass(titOn);
					oldIndex=index;
					if( !pnLoop ){ //pnLoop控制前后按钮是否继续循环
						nextBtn.removeClass("nextStop"); prevBtn.removeClass("prevStop");
						if (index==0 ){ prevBtn.addClass("prevStop"); }
						if (index==navObjSize-1 ){ nextBtn.addClass("nextStop"); }
					}

					pageState.html( "<span>"+(index+1)+"</span>/"+navObjSize);

			};// doPlay end

			//初始化执行
			if( defaultPlay ){ doPlay(true); }

			if (returnDefault)//返回默认状态
			{
				slider.hover(function(){ clearTimeout(rtnST) },function(){
						rtnST = setTimeout( function(){
							index=defaultIndex;
							if(defaultPlay){ doPlay(); }
							else{
								if( effect=="slideDown" ){ _tar.slideUp( delayTime, resetOn ); }
								else{ _tar.animate({opacity:"hide"},delayTime,resetOn ); }
							}
							oldIndex=index;
						},300 );
				});
			}
			

			///自动播放函数
			var setInter = function(time){ inter=setInterval(function(){  opp?index--:index++; doPlay() }, !!time?time:interTime);  }
			var setMarInter = function(time){ inter = setInterval(doPlay, !!time?time:interTime);  }
			// 处理mouseOverStop
			var resetInter = function(){ if( !mouseOverStop ){clearInterval(inter); setInter() } }
			// 前后按钮触发
			var nextTrigger = function(){ if ( pnLoop || index!=navObjSize-1 ){ index++; doPlay(); if(!isMarq)resetInter(); } }
			var prevTrigger = function(){ if ( pnLoop || index!=0 ){ index--; doPlay(); if(!isMarq)resetInter(); } }
			//处理playState
			var playStateFun = function(){ clearInterval(inter); isMarq?setMarInter():setInter(); playState.removeClass("pauseState") }
			var pauseStateFun = function(){ clearInterval(inter);playState.addClass("pauseState"); }

			//自动播放
			if (autoPlay) {
					if( isMarq ){ 
						opp?index--:index++; setMarInter();
						if(mouseOverStop) conBox.hover(pauseStateFun,playStateFun);
					}else{
						setInter();
						if(mouseOverStop) slider.hover( pauseStateFun,playStateFun );
					}
			}
			else{ if( isMarq ){ opp?index--:index++; } playState.addClass("pauseState"); }

			playState.click(function(){  playState.hasClass("pauseState")?playStateFun():pauseStateFun()  });

			//titCell事件
			if(opts.trigger=="mouseover"){
				navObj.hover(function(){ var hoverInd = navObj.index(this);  mst = setTimeout(function(){  index=hoverInd; doPlay(); resetInter();  },opts.triggerTime); }, function(){ clearTimeout(mst) });
			}else{ navObj.click(function(){ index=navObj.index(this); doPlay(); resetInter(); })  }

			//前后按钮事件
			if (isMarq){
				
				nextBtn.mousedown(nextTrigger);
				prevBtn.mousedown(prevTrigger);
				//前后按钮长按10倍加速
				if (pnLoop)
				{	
					var st;
					var marDown = function(){ st=setTimeout(function(){ clearInterval(inter); setMarInter( interTime/10^0 ) },150) }
					var marUp = function(){ clearTimeout(st); clearInterval(inter); setMarInter() }
					nextBtn.mousedown(marDown); nextBtn.mouseup(marUp);
					prevBtn.mousedown(marDown); prevBtn.mouseup(marUp);
				}
				//前后按钮mouseover事件
				if( opts.trigger=="mouseover"  ){ nextBtn.hover(nextTrigger,function(){}); prevBtn.hover(prevTrigger,function(){}); }
			}else{
				nextBtn.click(nextTrigger);
				prevBtn.click(prevTrigger);
			}

    	});//each End

	};//slide End

})(jQuery);

jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) { return jQuery.easing[jQuery.easing.def](x, t, b, c, d); },
	easeInQuad: function (x, t, b, c, d) {return c*(t/=d)*t + b;},
	easeOutQuad: function (x, t, b, c, d) {return -c *(t/=d)*(t-2) + b},
	easeInOutQuad: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t + b;return -c/2 * ((--t)*(t-2) - 1) + b},
	easeInCubic: function (x, t, b, c, d) {return c*(t/=d)*t*t + b},
	easeOutCubic: function (x, t, b, c, d) {return c*((t=t/d-1)*t*t + 1) + b},
	easeInOutCubic: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t*t + b;return c/2*((t-=2)*t*t + 2) + b},
	easeInQuart: function (x, t, b, c, d) {return c*(t/=d)*t*t*t + b},
	easeOutQuart: function (x, t, b, c, d) {return -c * ((t=t/d-1)*t*t*t - 1) + b},
	easeInOutQuart: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t*t*t + b;return -c/2 * ((t-=2)*t*t*t - 2) + b},
	easeInQuint: function (x, t, b, c, d) {return c*(t/=d)*t*t*t*t + b},
	easeOutQuint: function (x, t, b, c, d) {return c*((t=t/d-1)*t*t*t*t + 1) + b},
	easeInOutQuint: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;return c/2*((t-=2)*t*t*t*t + 2) + b},
	easeInSine: function (x, t, b, c, d) {return -c * Math.cos(t/d * (Math.PI/2)) + c + b},
	easeOutSine: function (x, t, b, c, d) {return c * Math.sin(t/d * (Math.PI/2)) + b},
	easeInOutSine: function (x, t, b, c, d) {return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b},
	easeInExpo: function (x, t, b, c, d) {return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b},
	easeOutExpo: function (x, t, b, c, d) {return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b},
	easeInOutExpo: function (x, t, b, c, d) {if (t==0) return b;if (t==d) return b+c;if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;return c/2 * (-Math.pow(2, -10 * --t) + 2) + b},
	easeInCirc: function (x, t, b, c, d) {return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b},
	easeOutCirc: function (x, t, b, c, d) {return c * Math.sqrt(1 - (t=t/d-1)*t) + b},
	easeInOutCirc: function (x, t, b, c, d) {if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b},
	easeInElastic: function (x, t, b, c, d) {var s=1.70158;var p=0;var a=c;if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b},
	easeOutElastic: function (x, t, b, c, d) {var s=1.70158;var p=0;var a=c;if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b},
	easeInOutElastic: function (x, t, b, c, d) {var s=1.70158;var p=0;var a=c;if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b},
	easeInBack: function (x, t, b, c, d, s) {if (s == undefined) s = 1.70158;return c*(t/=d)*t*((s+1)*t - s) + b},
	easeOutBack: function (x, t, b, c, d, s) {if (s == undefined) s = 1.70158;return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b},
	easeInOutBack: function (x, t, b, c, d, s) {if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b},
	easeInBounce: function (x, t, b, c, d) {return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b},
	easeOutBounce: function (x, t, b, c, d) {if ((t/=d) < (1/2.75)) {	return c*(7.5625*t*t) + b;} else if (t < (2/2.75)) {	return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;} else if (t < (2.5/2.75)) {	return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;} else {	return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;}},
	easeInOutBounce: function (x, t, b, c, d) {if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;}
});

// QQ表情插件
(function($){  
	$.fn.qqFace = function(options){
		var defaults = {
			id : 'facebox',
			path : '/manager/images/qqface/',
			assign : 'content',
			tip : 'em_'
		};
		var option = $.extend(defaults, options);
		var assign = $('#'+option.assign);
		var id = option.id;
		var path = option.path;
		var tip = option.tip;
		
		if(assign.length<=0){
			alert(transKeyWords(globelVary.languageId,4));
			return false;
		}
		
		$(this).click(function(e){
			var strFace, labFace;
			if($('#'+id).length<=0){
				strFace = '<div id="'+id+'" class="qqFace">' +
							  '<table border="0" cellspacing="0" cellpadding="0"><tr>';
				for(var i=1; i<=75; i++){
					labFace = '['+tip+i+']';
					//strFace += '<td><img src="'+path+i+'.gif" onclick="$(\'#'+option.assign+'\').setCaret();$(\'#'+option.assign+'\').insertAtCaret(\'' + labFace + '\');" /></td>';
					strFace += '<td><img src="'+path+i+'.gif" onclick="$(\'#'+option.assign+'\').setCaret();$(\'#'+option.assign+'\').insertAtCaret(\'<img src='+path+i+'.gif />\');" /></td>';
					if( i % 15 == 0 ) strFace += '</tr><tr>';
				}
				strFace += '</tr></table></div>';
			}
			$(".discuss_report").parent().append(strFace);
			var offset = $(this).position();
			var top = offset.top + $(this).outerHeight();
			$('#'+id).css('top',top);
			$('#'+id).css('left',offset.left);
			$('#'+id).show();
			e.stopPropagation();
		});

		$(document).click(function(){
			$('#'+id).hide();
			$('#'+id).remove();
		});
	};

})(jQuery);
/*************************获取控件的值******************************************/

; (function ($) {
            $.Control = function (json) {
                var defaults = {
                    checked: 1,      //0表示全部获取,1表示只获取选中的
                    radio: 1,          //0表示全部获取,1表示只获取选中的
                    type:"get",      //get表示获取值,reset表示重置
                    myVar:"myVar",//控件的属性,用来保存变量名的
                    split:","	  //多个值在变量中的分隔符
                }
                json = $.extend(defaults, json);
                var result = {};
                var radio = {};
                var con={
                    text: "text",
                    password:"password",
                    hidden:"hidden",
                    checkbox:"checkbox",
                    textarea: "textarea",
                    radio:"radio",
                    select: "select"
                }               
                function getVar(obj) {
                    return obj.attr(json.myVar);
                }
                if (json.type == "reset") {//重置
                    json.objs.each(function () {                        
                    //暂时不写
                    });
                }
                else if (json.type == "get") {//获取
                    json.objs.each(function () {
                    var attrVar= getVar($(this));
                    if(!attrVar){
                    return true;
                    }

                        if ($(this).is(":"+con.text)) { //文本框
                            result[attrVar] = $(this).val();
                        }
                        else if ($(this).is(":" + con.password)) {//密码框
                           result[attrVar] = $(this).val();
                        }
                        else if ($(this).is(":"+con.hidden)) { //隐藏框
                            result[attrVar] = $(this).val();
                        }
                        else if ($(this).is(":"+con.checkbox)) {//复选框.如果指定了value的属性,返回value属性值,否则返回值on;返回的值以","分割的字符串
                            if (json.checked == 1) {//只获取选中的复选框
                                if ($(this).is(":checked")) {                                  
                                   if(result[attrVar]){
                                        result[attrVar]+= json.split+ $(this).val();
                                    }
                                    else {//不存在
                                       result[attrVar] = $(this).val();
                                    }
                                }
                            }
                            else if (json.checked == 0) {//不管有没有选中都获取
                                if (result[attrVar]) {//如果存在
                                  result[attrVar] +=json.split + $(this).val();
                                }
                                else {//不存在
                                    result[attrVar] = $(this).val();
                                }
                            }
                            else {
                                alert("json.checked参数有误");
                            }
                        }
                        else if ($(this).is(con.textarea)) {//多行文本框
                            result[attrVar]= $(this).val();
                        }
                        else if ($(this).is(":"+con.radio) && $(this).is(":checked")) {//单选按钮并且被选中  
                            result[attrVar] = $(this).val();
                        }
                        else if ($(this).is(con.select)) {//下拉框
                           result[attrVar]= $("option:selected", $(this)).val(); //如果指定了value属性,获取指定的value值,否则获取option中的文本内容
                        }
                    });
                }               
                return result;
            }
        })(jQuery);
/*************************获取控件的值*end*****************************************/
jQuery.extend({ 
unselectContents: function(){ 
	if(window.getSelection) 
		window.getSelection().removeAllRanges(); 
	else if(document.selection) 
		document.selection.empty(); 
	} 
}); 
jQuery.fn.extend({ 
	selectContents: function(){ 
		$(this).each(function(i){ 
			var node = this; 
			var selection, range, doc, win; 
			if ((doc = node.ownerDocument) && (win = doc.defaultView) && typeof win.getSelection != 'undefined' && typeof doc.createRange != 'undefined' && (selection = window.getSelection()) && typeof selection.removeAllRanges != 'undefined'){ 
				range = doc.createRange(); 
				range.selectNode(node); 
				if(i == 0){ 
					selection.removeAllRanges(); 
				} 
				selection.addRange(range); 
			} else if (document.body && typeof document.body.createTextRange != 'undefined' && (range = document.body.createTextRange())){ 
				range.moveToElementText(node); 
				range.select(); 
			} 
		}); 
	}, 

	setCaret: function(){ 
		if(!$.browser.msie) return; 
		var initSetCaret = function(){ 
			var textObj = $(this).get(0); 
			textObj.caretPos = document.selection.createRange().duplicate(); 
		}; 
		$(this).click(initSetCaret).select(initSetCaret).keyup(initSetCaret); 
	}, 

	insertAtCaret: function(textFeildValue){ 
		var textObj = $(this).get(0); 
		if(document.all && textObj.createTextRange && textObj.caretPos){ 
			var caretPos=textObj.caretPos; 
			caretPos.text = caretPos.text.charAt(caretPos.text.length-1) == '' ? 
			textFeildValue+'' : textFeildValue; 
		} else if(textObj.setSelectionRange){ 
			var rangeStart=textObj.selectionStart; 
			var rangeEnd=textObj.selectionEnd; 
			var tempStr1=textObj.value.substring(0,rangeStart); 
			var tempStr2=textObj.value.substring(rangeEnd); 
			textObj.value=tempStr1+textFeildValue+tempStr2; 
			textObj.focus(); 
			var len=textFeildValue.length; 
			textObj.setSelectionRange(rangeStart+len,rangeStart+len); 
			textObj.blur(); 
		}else{ 
			//textObj.value+=textFeildValue; 
			$(textObj).append(textFeildValue);
		} 
	} 
});



/**div加载ajax效果***/
function fwajaxStar(str){//str提示信息
	var html="";
	 html+="<div id='fwajaxLoadDiv'></div>";
	 html+="<div class='fwajaxLoadIcon'>";
	html+= "<span class='fwajaxIcon'></span>";
	 if(str)
	 	html+="<span class='fwajaxInfo'>"+str+"</span>";
	 html+="</div>";
	$("body").append(html);	
	var divH=$(document).height();//-$("#admin_topbj").height();
	$("#fwajaxLoadDiv").height(divH).css({"top":0,"opacity":0.5,"left":0});
	var iconTop=$(window).height()/2;
	iconTop=iconTop+$(document).scrollTop();
	$(".fwajaxLoadIcon").css({"top":iconTop+"px"});		
	getSessionTimeBool();
	}
/****关闭ajax遮罩*****/
function fwajaxClose(){	
	$("#fwajaxLoadDiv").remove();
	$(".fwajaxLoadIcon").remove();
	}

/********文本框的验证的封装************/
$.fn.extend({
	fwValidateText:function(json){
		var pdMeth=function(obj,rightOrErr){
			//rightOrErr=rightOrErr;
			var con=$.trim(obj.val());
			if(json.min){
			if(con.length>=json.min) rightOrErr=true;
			else rightOrErr=false;
		 }
		 	else rightOrErr=true
		 if(rightOrErr){
				if(json.max){
				if(con.length<=json.max) rightOrErr=true;
				else rightOrErr=false;
				}
				else rightOrErr=true;
			}
		
		if(rightOrErr){
			insertStr(obj,json.right,"right");
			if(!json.type) return;
			}
			
		else {		
			insertStr(obj,json.error,"error");
			return;
		}		
		if(json.reg){
			rightOrErr=json.reg.test(con);
			if(rightOrErr)
			insertStr(obj,json.right,"right");
			else
			insertStr(obj,json.error,"error");
			return;
		}
		
		var tel=/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
			phone=/^(13|15|18)[0-9]{9}$/,
			url=new RegExp("^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=:]*)?$"),   
			english=/^[A-Za-z]+$/,
			dEngiish=/^[A-Z]+$/,
			xEngiish=/^[a-z]+$/,
			chinese=/^[\u4E00-\u9FA5\uF900-\uFA2D]+$/,//汉字
			number=/^([+-]?)\d*\.?\d+$/,//数字判断
			ChEnNum=/^[\u4e00-\u9fa5 a-z A-Z 0-9 \'\_\.\(\)\-]+$/,//中文+英文+数字+_+'+(+)判断
			EnNum=/^[a-z A-Z 0-9 \'\_\.\(\)\-]+$/,//英文+数字+_+'+(+)判断
			EnNumNoU=/^[a-z A-Z 0-9]+$/,//英文+数字
			pic=/(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/,//图片格式判断
			music=/(.*)\.(mp3|wma)$/,//音乐判断
			QQ=/^[1-9]*[1-9][0-9]*$/,//扣扣号判断
			email=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,//邮箱格式
			int=/^-?[1-9]\d*$/,//整数
			fint=/^-[1-9]\d*$/,//负整数,不包括0
			zint=/^[1-9]\d*$/,//正整数,不包括0
			fint0=/^((-\d+)|(0+))$/,//负整数+0
			zint0=/^\d*$/,
			idCard=/^[1-9]([0-9]{14}|[0-9]{17})$/,//身份证
			color=/^#[a-fA-F0-9]{6}$/;
			
			if(typeof eval(json.type)=="underfined")
				alert(transKeyWords(globelVary.languageId,6));			
			rightOrErr=eval(json.type).test(con);
			if(rightOrErr)
			insertStr(obj,json.right,"right");
			else
			insertStr(obj,json.error,"error");	
			};
		var getPdTSPosition=function(obj){
		var position=obj.position();
		var top=position.top;
		 var left=position.left;
		 var inputH=obj.outerHeight();
		 var inputW=obj.outerWidth()*2/3;
		 top=top+inputH;
		 left=left+inputW;	
		 return {"top":top,"left":left};
		};
		var insertStr=function (obj,Con,type){
		if(obj.next().is(".fwPdBox"))
			obj.next().remove();
		var html="";
		html+="<div class='fwPdBox'>";
        html+="<div class='pdTop'>";
        html+="<div class='pdLeftTopJiao'></div>";
        html+="<div class='pdDingJiao'></div>";
        html+="<div class='pdRightTopJiao'></div>";
        html+="</div>";
        html+="<div class='pdRighrBoder'>";
        html+="<div class='pdbottomBorder'>";
        html+="<div class='pdLeftBorder'>";
        html+="<div class='pdContent'>";
		if(type=="right"){
			obj.attr("submit","yes").removeClass("fwpdTextErrColor");
			html+="<div class='PdRightCon'>"+Con+"</div>";
			}
		else if(type=="error"){
			obj.attr("submit","no").addClass("fwpdTextErrColor");
			html+="<div class='PdErrorCon'>"+Con+"</div>";
			}
		else if(type=="empty"){
			html+="<div class='pdEmptyCon'>"+Con+"</div>";
			}		
		html+="</div>";
        html+="</div>";
        html+="<div class='pdbottomJiao'>";
        html+="<div class='pdLeftBottomJiao'></div><div class='pdRightBottomJiao'></div>";
        html+="</div>";
        html+="</div>";
        html+="</div>";
		html+="</div>";	
		obj.after(html);
		var pdLeftToDingWidth=$(".pdDingJiao").outerWidth();		
		var pos=getPdTSPosition(obj);
		pos.left=pos.left-pdLeftToDingWidth+10;
		$(".fwPdBox").css({"top":pos.top,"left":pos.left});
		if(json.width)
		$(".fwPdBox").width(json.width);
		if(json.height)
		$(".fwPdBox").height(json.height);
		}
		var rightOrErr=false;
		var obj=$(this);
		 $(this).live("focus",function(){		 		 
			 if(json.empty&&$(this).val()==""){				 
				insertStr($(this),json.empty,"empty"); 
				 }
			else if(!json.error&&!json.right&&json.empty)
				insertStr($(this),json.empty,"empty");		 
			else 
				pdMeth($(this),rightOrErr);	
			 });
		  $(this).live('blur',function(){
			  if(json.empty&&$(this).val()==""){				 
				 $(this).removeAttr("submit").removeClass("fwpdTextErrColor");
				 }
			  
			 
			if($(this).next().is(".fwPdBox"))
				$(this).next().remove();			
			 });  
		$(this).live("keyup",function(){
			if(json.empty&&$(this).val()=="") insertStr($(this),json.empty,"empty");
			else if(!json.error&&!json.right) return;
			else pdMeth($(this),rightOrErr)});
	
		}	
	});

/********文本框的验证的封装*end***********/

//添加收藏
function AddFavorite(sURL, sTitle)
{
    try
    {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e)
    {
        try
        {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e)
        {
            alert(transKeyWords(globelVary.languageId,39));
        }
    }
}
//设为首页
function SetHome(obj,vrl){
        try{
                obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
        }
        catch(e){
                if(window.netscape) {
                        try {
                                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
                        } 
                        catch (e)  {
                                alert(transKeyWords(globelVary.languageId,40)); 
                        }
                        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                        prefs.setCharPref('browser.startup.homepage',vrl);
                 }
        }
}

/**************QQ功能************************/
/*
此插件基于Jquery
插件名：jquery.Sonline(在线客服插件)
作者 似懂非懂
版本 2.0
Blog：www.haw86.com
*/
(function($){
	$.fn.Sonline = function(options){
        var opts = $.extend({}, $.fn.Sonline.defualts, options); 
		$.fn.setList(opts); //调用列表设置
		$.fn.Sonline.styleType(opts);
		if(opts.DefaultsOpen == false){
			$.fn.Sonline.closes(opts.Position,0);
		}
		//展开
		$("#SonlineBox > .openTrigger").live("click",function(){$.fn.Sonline.opens(opts);});
		//关闭
		$("#SonlineBox > .contentBox > .closeTrigger").live("click",function(){$.fn.Sonline.closes(opts.Position,"fast");});
		
		//Ie6兼容或滚动方式显示
		if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style||opts.Effect==1) {$.fn.Sonline.scrollType();}
		else if(opts.Effect==0){$("#SonlineBox").css({position:"fixed"});}
	}
	//plugin defaults
	$.fn.Sonline.defualts ={
		Position:"left",//left或right
		Top:200,//顶部距离，默认200px
		Effect:0, //滚动或者固定两种方式，1.滚动,0表示固定
		Width:170,//顶部距离，默认200px
		DefaultsOpen:false, //默认展开：true,默认收缩：false
		Style:1,//图标的显示风格，默认显示:1
		Tel:"",//服务热线
		Qqlist:"" //多个QQ用','隔开，QQ和客服名用'|'隔开
	}
	
	//展开
	$.fn.Sonline.opens = function(opts){
		var positionType = opts.Position;
		$("#SonlineBox").css({width:opts.Width+4});
		if(positionType=="left"){$("#SonlineBox > .contentBox").animate({left: 0},"fast");}
		else if(positionType=="right"){$("#SonlineBox > .contentBox").animate({right: 0},"fast");}
		$("#SonlineBox > .openTrigger").hide();
	}

	//关闭
	$.fn.Sonline.closes = function(positionType,speed){
		$("#SonlineBox > .openTrigger").show();
		var widthValue =$("#SonlineBox > .openTrigger").width();
		var allWidth =(-($("#SonlineBox > .contentBox").width())-6);
		if(positionType=="left"){$("#SonlineBox > .contentBox").animate({left: allWidth},speed);}
		else if(positionType=="right"){$("#SonlineBox > .contentBox").animate({right: allWidth},speed);}
		$("#SonlineBox").animate({width:widthValue},speed);
		
	}
	
	//风格选择
	$.fn.Sonline.styleType = function(opts){
		var typeNum = 1;
		switch(opts.Style)
	   　　{ case 1:
				typeNum = 41;
	 　　    break
	 		 case 2:
				typeNum = 42;
	　　     break
	 		 case 3:
				typeNum = 44;
	　　     break
	 		 case 4:
				typeNum = 45;
	　　     break
	 		 case 5:
				typeNum = 46;
	　　     break
	 		 case 6:
				typeNum = 47;
	　　     break
	　　     default:
				typeNum = 41;
	　　   }
		return typeNum;
	}

	//子插件：设置列表参数
	$.fn.setList = function(opts){
		if(opts.Qqlist=="") return;
		$("body").append("<div class='SonlineBox' id='SonlineBox' style='top:-600px; position:absolute;'><div class='openTrigger' style='display:none' title='"+transKeyWords(globelVary.languageId,41)+"'></div><div class='contentBox'><div class='closeTrigger' title='"+transKeyWords(globelVary.languageId,5)+"'></div><div class='titleBox'><span>"+transKeyWords(globelVary.languageId,42)+"</span></div><div class='listBox'></div><div class='tels'><font style='height:10px;'></font><span>"+opts.Tel+"</span></div></div></div>");
		$("#SonlineBox > .contentBox").width(opts.Width)
		if(opts.Qqlist==""){
			$("#SonlineBox > .contentBox > .listBox").append("<p style='padding:15px'>"+transKeyWords(globelVary.languageId,43)+"。</p>")
			}
		else{var qqListHtml = $.fn.Sonline.splitStr(opts);$("#SonlineBox > .contentBox > .listBox").append(qqListHtml);	}
		if(opts.Position=="left"){$("#SonlineBox").css({left:0});}
		else if(opts.Position=="right"){$("#SonlineBox").css({right:0})}
		$("#SonlineBox").css({top:opts.Top,width:opts.Width+4});
		var allHeights=0;
		if($("#SonlineBox > .contentBox").height() < $("#SonlineBox > .openTrigger").height()){
			allHeights = $("#SonlineBox > .openTrigger").height()+4;
		} else{allHeights = $("#SonlineBox > .contentBox").height()+40;}
		$("#SonlineBox").height(allHeights);
		if(opts.Position=="left"){$("#SonlineBox > .openTrigger").css({left:0});}
		else if(opts.Position=="right"){$("#SonlineBox > .openTrigger").css({right:0});}
	}
	
	//滑动式效果
	$.fn.Sonline.scrollType = function(){
		$("#SonlineBox").css({position:"absolute"});
		var topNum = parseInt($("#SonlineBox").css("top")+"");
		$(window).scroll(function(){
			var scrollTopNum = $(window).scrollTop();//获取网页被卷去的高
			$("#SonlineBox").stop(true,false).delay(200).animate({top:scrollTopNum+topNum},"slow");
		});
	}
	
	//分割QQ
	$.fn.Sonline.splitStr = function(opts){
		
		var strs= new Array(); //定义一数组
		var QqlistText = opts.Qqlist;
		strs=QqlistText.split(","); //字符分割
		var QqHtml=""
		for (var i=0;i<strs.length;i++){	
			var subStrs= new Array(); //定义一数组
			var subQqlist = strs[i];
			subStrs = subQqlist.split("|"); //字符分割
			QqHtml = QqHtml+"<div class='QQList'><span>"+subStrs[1]+"：</span><div class='ico'><a target='_blank' href='http://wpa.qq.com/msgrd?v=3&uin=%22+subStrs[0]+%22&site=qq&menu=yes'><img border='0' src='http://wpa.qq.com/pa?p=2:"+subStrs[0]+":"+$.fn.Sonline.styleType(opts)+" &amp;r=0.22914223582483828' alt='"+transKeyWords(globelVary.languageId,44)+"'></a></div><div style='clear:both;'></div></div>"
		}
		return QqHtml;
	}
})(jQuery);    


$(function(){
	var obj=$("#QQInfo"),
		position=obj.attr("position"), 
		qqTop=parseFloat(obj.attr("qqTop")), 
		effect=parseInt(obj.attr("effect")), 
		defaultsOpen=parseInt(obj.attr("defaultsOpen")), 
		qqList=obj.attr("qqList"); 	
		$().Sonline({ 
			Position:position,//left或right 
			Top:qqTop,//顶部距离，默认200px 
			Width:165,//顶部距离，默认200px 
			Style:6,//图标的显示风格共6种风格，默认显示第一种：1 
			Effect:effect,//effect==1?true:false, //滚动或者固定两种方式，0固定1滚动
			DefaultsOpen:defaultsOpen==1?true:false, //默认展开：true,默认收缩：false 
			// Tel:"400-555-6565",//其它信息图片等 
			Qqlist:qqList //多个QQ用','隔开，QQ和客服名用'|'隔开 */ 
		
		}); 
	})
	$(function(){
	$(".nav > ul > li").hover(function(){
			$(this).addClass("current");
			var subHeight = ($(this).find(".subNav").find("a").length)*42;
			$(this).find(".subNav").stop(true,true).animate({height:subHeight},"fast");
			},function(){
				$(this).removeClass("current");
				$(this).find(".subNav").animate({height:0},"fast");
		});
	})
/*****************对联广告**********************************/
 $.extend({
        dLAdv:function(options){
            var defaults={
                leftType:0,//左边广告图片效果0稳固不动,1缓慢复位
                rightType:0,//右边广告图片的效果0稳固不动,1缓慢复位
                leftTime:300,//左边复位时间
                rightTime:300,//右边复位时间
                leftCloseTime:1000,//左边关闭时间
                rightCloseTime:1000,//右边关闭时间
                leftToTop:200,//左边广告top
                leftToLeft:0,//左边广告离浏览器左边距离
                rightToTop:200,//右边广告top
                rightToRight:0,//右边广告离浏览器有变距离
                leftAdvStr:0,//左边的广告,1有,0无
                rightAdvStr:0,//右边的广告,1有,0无
                leftWidth:140,//左边广告宽度
                leftHeight:200,//左边广告高度
                rightWidth:140,//右边广告宽度
                rightHeight:200,//右边广告高度
                leftSrc:"dlAdvPic.jpg"/*tpa=http://www.yatouhome.com/manager/images/dlAdvPic.jpg*/,//左边图片路径
                leftAlt:"advertising",//左边广告图片的alt值
                rightSrc:"dlAdvPic.jpg"/*tpa=http://www.yatouhome.com/manager/images/dlAdvPic.jpg*/,//右边图片路径
                rightAlt:"advertising",//右边广告图片的alt值
				leftZindex:800,//左边层级
                rightZindex:800,//右边层级
				leftHref:"javascript:void(0)",//左边单击链接
				rightHref:"javascript:void(0)",//右边单击链接
                //下面项不做参数给出	
                leftClass:"dlBoxLeft",//左边class
                rightClass:"dlBoxRight"//右边class
            }
            options= $.extend(defaults,options);
            var html="";
            if(options.leftAdvStr===1){
            html+="<div class="+options.leftClass+">";
            html+="<div class='dlAdvLeftImgBox'><a href="+options.leftHref+" target='_blank'> <img class='dlAdvleftImg' src="+options.leftSrc+" alt="+options.leftAlt+"></a></div>";
            html+="<div class='dlAdvCloseDiv'><a class='dlAdvClose dlAdvLeftClose'>"+transKeyWords(globelVary.languageId,5)+"</a></div>";
            html+="</div>";
            }
            if(options.rightAdvStr===1){
            html+="<div class="+options.rightClass+">";
            html+="<div class='dlAdvRightImgBox'><a href="+options.rightHref+" target='_blank'><img class='dlAdvRightImg' src="+options.rightSrc+" alt="+options.rightAlt+"></a></div>";
            html+="<div class='dlAdvCloseDiv'><a class='dlAdvClose dlAdvRightClose'>"+transKeyWords(globelVary.languageId,5)+"</a></div>";
            html+="</div>";
            }
            $("body").append(html);
            $(".dlAdvLeftClose,.dlAdvRightClose").on("click",function(){
                if($(this).is(".dlAdvLeftClose"))
                $("."+options.leftClass).fadeOut(options.leftCloseTime,function(){
                    $(this).remove();
                });
                else if($(this).is(".dlAdvRightClose"))
                $("."+options.rightClass).fadeOut(options.rightCloseTime,function(){
                    $(this).remove();
                });
            })


            var leftAdv=$("."+options.leftClass),
            rightAdv=$("."+options.rightClass),
            dlAdvCloseHeight=$(".dlAdvCloseDiv").eq(0).outerHeight();
			leftAdv.css({"z-index":options.leftZindex});
			rightAdv.css({"z-index":options.rightZindex});	
            function changeImgSize(imgObj,width,height){
                height-=dlAdvCloseHeight;
                imgObj.parent().width(width).height(height);
                imgObj.css({height:"100%",width:"100%"});
            }
           function getAdvTop(pos,type){//pos,左,右,type,效果
                if(type===0){
                    if(pos==="left"){
                       return {top:options.leftToTop+"px"};
                    }
                    else if(pos==="right"){
                        return {top:options.rightToTop+"px"};
                    }
                }
               else if(type===1){
                    var scrollTop=$(window).scrollTop();
                    var top=0;
                    if(pos==="left"){
                         top=options.leftToTop+scrollTop;
                        return {top:top+"px"};
                    }
                    else if(pos==="right"){
                         top=options.rightToTop+scrollTop;
                        return {top:top+"px"};
                    }

                }
               else{alert("方法getAdvTop的type有误")}
           }
            var leftAdvSize={width:options.leftWidth+"px",height:options.leftHeight+"px"};
            var rightAdvSize={width:options.rightWidth+"px",height:options.rightHeight+"px"};
            var leftAdvPos={left:options.leftToLeft+"px"};
            var rightAdvPos={right:options.rightToRight+"px"};			
            changeImgSize($(".dlAdvleftImg"),options.leftWidth,options.leftHeight);
            changeImgSize($(".dlAdvRightImg"),options.rightWidth,options.rightHeight);
            function scrollMove(num){//num是数值,不同的数值表示的不同的缓慢恢复的对象
                $(window).scroll(function(){
                    var scrollTop=$(window).scrollTop(),top=0;
                    if(num===-1){//左边
                         top=scrollTop+options.leftToTop;
                        setTimeout(function(){
                            leftAdv.css({top:top+"px"});
                        },options.leftTime);
                    }
                    else if(num===1){//右边
                          top=options.rightToTop+scrollTop;
                       // rightAdv.animate({top:top+"px"},1000)
                        setTimeout(function(){
                            //rightAdv.animate({top:top+"px"},1000)
                            rightAdv.css({top:top+"px"});
                        },options.rightTime)

                    }
                    else if(num===2){//两边
                        var leftTop=scrollTop+options.leftToTop;
                        var rightTop=scrollTop+options.rightToTop;
                        setTimeout(function(){
                            leftAdv.css({top:leftTop+"px"});
                        },options.leftTime)
                        setTimeout(function(){
                            rightAdv.css({top:rightTop+"px"});
                        },options.rightTime);
                    }
                });
            }
         var whoMove=0;//0,都不缓慢移动,-1,左边缓慢移动,1表示右边缓慢移动,2表示都移动
        if(options.leftType===0){//稳固不动
            leftAdv.css({"position":"fixed"}).css(getAdvTop("left",options.leftType)).css(leftAdvSize).css(leftAdvPos);
        }
            else if(options.leftType===1){//缓慢恢复
            leftAdv.css({"position":"absolute"}).css(getAdvTop("left",options.leftType)).css(leftAdvSize).css(leftAdvPos);
            whoMove=-1;
        }
            else {
            alert("左对联广告的效果参数传递有误");
        }
            if(options.rightType===0){
                rightAdv.css({"position":"fixed"}).css(getAdvTop("right",options.rightType)).css(rightAdvSize).css(rightAdvPos);
            }
            else if(options.rightType===1){
                rightAdv.css({"position":"absolute"}).css(getAdvTop("right",options.rightType)).css(rightAdvSize).css(rightAdvPos);
                whoMove=(whoMove===0?1:2);
            }
            else {
                alert("右对联广告的效果参数传递有误");
            }
            if(whoMove===0){}//都不缓慢恢复
            else if(whoMove===-1){//左边缓慢移动
scrollMove(whoMove);
            }
            else if(whoMove===1){//右边缓慢移动
                scrollMove(whoMove)
             }
            else if(whoMove===2){//左右都缓慢移动
                scrollMove(whoMove)
            }
        }
        });

/*****************对联广告**end********************************/
/*******************漂浮广告***************************************/
$.extend({
            pfAdv:function(options){
                var defaults={
                    count:1,
                    startTop:200,
                    startLeft:200,
                    width:140,//图片大小
                    height:180,
                    imageSrc:"pfAdvPic.jpg"/*tpa=http://www.yatouhome.com/templates/sm_box/images/js/pfAdvPic.jpg*/,
                    step:1,
                    delay:30,
					href:"javascript:void(0)",//单击的链接
                    idStr:"pfAdv"
                }
                options= $.extend(defaults,options);
                var html="";
                html+="<div id="+options.idStr+" class='pfAdv'>";
                html+="<div class='plCloseDiv'></div>";
                html+="<div><a href="+options.href+" target='_blank'><img src="+options.imageSrc+"></a></div>";
                html+="</div>";
                $("body").append(html);//加入广告html
                var advBoxObj=$("#"+options.idStr);//广告对象
                advBoxObj.css({"position":"absolute","z-index":998}).width(options.width).height(options.height);//给广告定位
                $("img",advBoxObj).width(options.width).height(options.height);
                var advH=advBoxObj.outerHeight();//广告的高度
                var advW=advBoxObj.outerWidth();//广告的宽度
                var advMaxTop=0;//广告的最大top
                var advMaxLeft=0;//广告的最大left
                var stepMashionX=1;//1,表示水平方向加step,-1表示水平方向减step
                var stepMashionY=1;//1,表示垂直方向加step,-1表示垂直方向减step
                var currentX=0;//当前位置
                var currentY=0;
                var divToBrowTop=options.startTop;
                var divToBrowLeft=options.startLeft;
                function getScroll(){
                    var scrollTop=$(window).scrollTop();//滚动条离开高度
                    var scrollLeft=$(window).scrollLeft();//滚动条左距离
                    return {x:scrollLeft,y:scrollTop};
                }
                function move(){
                    var browW=$(window).width();//浏览器宽度
                    var browH=$(window).height();//浏览器高度
                    var scroll=getScroll();
                    currentX=divToBrowLeft+scroll.x;//计算广告的top
                    currentY=divToBrowTop+scroll.y;//计算出广告的left
                    advMaxTop=browH-advH+scroll.y;//广告的最大top,不包括滚动条
                    advMaxLeft=browW-advW+scroll.x;//广告的最大left,不包括滚动条


                    if(currentY>=advMaxTop){
                        stepMashionY=-1;
                        currentY=divToBrowTop-options.step;
                    }
                    else if(currentY>scroll.y&&currentY<advMaxTop){
                        if(stepMashionY==-1)
                            currentY=divToBrowTop-options.step;

                        else if(stepMashionY==1)
                            currentY=divToBrowTop+options.step;
                        else alert("垂直方向上的stepMashionY有误");
                    }
                    else if(currentY<=scroll.y){
                        stepMashionY=1;
                        currentY=divToBrowTop+options.step;
                    }
                    else {
                        alert("垂直方向上比较有误");
                    }
                    if(currentX>=advMaxLeft){
                        stepMashionX=-1;
                        currentX=divToBrowLeft-options.step;
                    }
                    else if(currentX>scroll.x&&currentX<advMaxLeft){
                        if(stepMashionX==-1){
                            currentX=divToBrowLeft-options.step;
                        }
                        else if(stepMashionX==1){
                            currentX=divToBrowLeft+options.step;
                        }
                        else alert("水平方向上的stepMashionX有误")
                    }
                    else if(currentX<=scroll.x){
                        stepMashionX=1;
                        currentX=divToBrowLeft+options.step;
                    }
                    else {
                        alert("水平方向上比较有误");
                    }
                    divToBrowLeft=currentX;
                    divToBrowTop=currentY;
                    //var scroll=getScroll();
                    currentX+=scroll.x;
                    currentY+=scroll.y;
                    advBoxObj.css({top:currentY+"px",left:currentX+"px"});
                }
                $(".plCloseDiv",advBoxObj).on("click",function(){advBoxObj.remove()})
                //$(window).resize(function(){initNum();});
                var moveMashion=null;
                advBoxObj.bind("mouseover",function(){clearTimeout(moveMashion);}).bind("mouseleave",function(){moveMashion=setInterval(move,options.delay);})
                moveMashion=setInterval(move,options.delay);
                move();
            }
        });
/************漂浮广告*end*****************/

/************放大镜插件(一):使用单张图片的思路*****************/
/*
<div class="test"><img src="../img/x.jpg"  alt="小图"/></div>
$(".test").bnFdjOne({ zoom: 2 });
*/
 ; (function ($) {
            $.fn.bnFdjOne = function (options) {
                var defaluts = { 
                    cameraW: 100, //镜头宽度
                    cameraH: 100, //镜头高度
                    pointBjColor: "#000", //镜头的背景颜色
                    pointOpacity: 0.6, //镜头的透明度
                    zoomPos: 10, //放大框距离源框的位置                
                    zoom: 2//放大倍数
                };
                options = $.extend(defaluts, options);
                var obj = $(this);               
                obj.addClass("gysFdjOrigin");
                var objOriImg=$("img",obj);
                var objOriImgW=objOriImg.width();
                var objOriImgH=objOriImg.height();                
                var fdCount = $(".gysFdjOrigin").length;
                var fdAttr = "fd"; //属性变量
                obj.attr(fdAttr, fdCount); //添加属性
                var offset = obj.offset();
                var objLeft = offset.left; //对象left                
                var objTop = offset.top; //对象top
                var objWidth = obj.width(); //对象宽度
                var objHeight = obj.height(); //对象高度              
                //镜头相对box的活动范围

                var cameraMaxLeft = objWidth + objLeft - options.cameraW; //最大左范围
                var cameraMaxTop = objHeight + objTop - options.cameraH; //最大下范围

                var imgStr = obj.html();
                var html = "";
                html += "<div style='left:" + (objLeft + objWidth + options.zoomPos) + "px; top:" + objTop + "px;display:none; position:absolute;width:" + (options.cameraW * options.zoom) + "px;height:" + (options.cameraH* options.zoom) + "px;overflow:hidden;' class='gysFdjBox' " + fdAttr + "=" + fdCount + ">" + imgStr + "</div>";
                $("body").append(html);
                $("img", $(".gysFdjBox[" + fdAttr + "=" + fdCount + "]")).width(objWidth*options.zoom).height(objHeight*options.zoom);
                var objFdjcamera = null;
                if ($("#gysFdjcamera").length == 0) {
                    var pointBlock = "<div id='gysFdjcamera' style='width:" + options.cameraW + "px; height:" + options.cameraH + "px; background-color:" + options.pointBjColor + ";opacity:" + options.pointOpacity + ";filter:alpha(opacity="+options.pointOpacity*100+");cursor:crosshair;position:absolute;display:none;'></div>";
                $("body").append(pointBlock);                
                }
                objFdjcamera = $("#gysFdjcamera");
                var nowLeft = 0, nowTop = 0;
                obj.on("mouseover", function (event) {                   
                    objFdjcamera.show().attr(fdAttr, fdCount);                                                            
                    $(".gysFdjBox["+fdAttr+"="+fdCount+"]").show();
                    $(document).on("mousemove", function (event) {
                        var pointX = event.clientX+$(document).scrollLeft();
                        var pointY = event.clientY+$(document).scrollTop();
                        nowLeft = pointX - options.cameraW / 2;
                        nowTop = pointY - options.cameraH / 2;
                        if (nowLeft <= objLeft) { nowLeft = objLeft; }
                        else if (nowLeft >= cameraMaxLeft) { nowLeft = cameraMaxLeft; }
                        if (nowTop <= objTop) { nowTop = objTop; }
                        else if (nowTop >= cameraMaxTop) { nowTop=cameraMaxTop;}                        
                        objFdjcamera.css({ left: nowLeft + "px", top: nowTop + "px" });
                        nowLeft=(nowLeft-objLeft)*options.zoom;
                        nowTop=(nowTop-objTop)*options.zoom;                                   
                        $("img",$(".gysFdjBox[" + fdAttr + "=" + fdCount + "]")).css({ "margin-top": -nowTop + "px", "margin-left": -nowLeft + "px" });
                    });
                });
                objFdjcamera.on("mouseleave", function () {
                    $(document).off("mousemove");
                    objFdjcamera.hide();
                    $(".gysFdjBox["+fdAttr+"="+fdCount+"]").hide();
                });
            }
        })(jQuery);

/***********放大镜插件(一):使用单张图片的思路***end***************/

/************放大镜插件(二):使用二张图片的思路*****************/
/*
<div class="test"><!--整个放大效果的最外区域.-->
    <div class="testOri"><img  width="400px" height="250px" src="../img/small.jpg"  alt="原图"/></div><!--原始区域,为了更好地兼容各种浏览器,请将图片的宽和高注明-->
    <div class="testZoom"><img width="1440px" height="900px" src="../img/big.jpg"  alt="放大图"/></div><!--放大区域,为了更好地兼容各种浏览器,请将图片的宽和高注明-->
</div>
$(".test").bnFdjTwo({ ori: ".testOri", zoom: ".testZoom" });
*/

; (function ($) {
            $.fn.bnFdjTwo = function (options) {
                var defaults = {
                    cameraW: 100, //镜头宽度
                    cameraH: 100, //镜头高度
                    cameraBjColor: "#000", //镜头背景色
                    zoomIndex: 10, //放大框div的层级
                    cameraOpacity: 0.6, //镜头透明度
                    zoomPos: 10, //放大框距离源框的位置
                    cameraIndex: 10//镜头的层级
                }
                var opt = $.extend({}, defaults, options); //合并参数          

                if (!opt.ori) { alert("你没有指定源图框"); return; }
                if (!opt.zoom) { alert("你没有指定放大框"); return; }
                var obj = $(this); //当前最大框对象
                if(obj.css("position")=="static"){obj.css("position","relative");}
                var objOriDiv = $(opt.ori, obj); //源div 
                var objOriDivOffset = objOriDiv.offset();
                var objOriDivLeft = objOriDivOffset.left; //源框的left
                var objOriDivTop = objOriDivOffset.top; //源框的top
                var objZoomDiv = $(opt.zoom, obj); //放大的div框
                var objOriImg = $("img", objOriDiv); //源图框               
                var objZoomImg = $("img", objZoomDiv); //放大框
                var objOriImgW = objOriImg.width();
                var objOriImgH = objOriImg.height();
                objOriDiv.width(objOriImgW).height(objOriImgH);
                obj.width(objOriImgW).height(objOriImgH);

                var objOriDivW = objOriDiv.width();
                var objOriDivH = objOriDiv.height();
                var cameraMaxLeft = objOriDivW - opt.cameraW; //镜头的最大left
                var cameraMaxTop = objOriDivH - opt.cameraH; //镜头的做大top

                var cameraCSs = { width: opt.cameraW, height: opt.cameraH, "background-color": opt.cameraBjColor, opacity: opt.cameraOpacity, filter: "alpha(opacity=" + opt.cameraOpacity * 100 + ")", "position": "absolute", display: "none",cursor: "crosshair", "z-index": opt.cameraIndex }; //镜头css               
                obj.append("<div class='camera'></div>"); //填充镜头
                var objCamera = $(".camera", obj);
                objCamera.css(cameraCSs); //添加样式                
                
                var zoom = objZoomImg.width() / objOriImgW; //放大倍数
                objZoomDiv.width(opt.cameraW * zoom).height(opt.cameraH * zoom).css({ position: "absolute", left: (objOriDivW + opt.zoomPos) + "px", top: "0px", overflow: "hidden", "z-index": opt.zoomIndex, display: "none" }); //设置放大的div框

                var nowLeft = 0, nowTop = 0;
                objOriDiv.on("mouseover", function () {
                    objCamera.show(); //显示镜头,
                    objZoomDiv.show(); //显示放大框 
                    $(document).on("mousemove", function (e) {
                        nowLeft = e.clientX - objOriDivLeft - opt.cameraW / 2+ $(document).scrollLeft();
                        nowTop = e.clientY-objOriDivTop - opt.cameraH / 2 + $(document).scrollTop();
                        if (nowLeft <= 0)   nowLeft = 0;                       
                        else if (nowLeft >= cameraMaxLeft)   nowLeft = cameraMaxLeft;
                        
                        if (nowTop <= 0) nowTop = 0;
                        else if (nowTop >= cameraMaxTop)  nowTop = cameraMaxTop;

                        objCamera.css({ left: nowLeft + "px", top: nowTop + "px" }); //镜头的移动

                        nowLeft = nowLeft * zoom;
                        nowTop = nowTop * zoom;

                        objZoomImg.css({ "margin-left": -nowLeft + "px", "margin-top": -nowTop + "px" });
                    });
                });

                objCamera.on("mouseout", function (e) {
                    $(this).hide();
                    $(document).off("mousemove");
                    $(opt.zoom, obj).hide();
                });
            }
        })(jQuery);

/************放大镜插件(二):使用二张图片的思路*end****************/

$(function(){
	$(".liShare").hover(function(){			
		 $(".shareShow").show();
		var shareTop=$(".share").offset().top,
		shareLeft=$(".share").offset().left,
		bsPanelW=$("#bsPanel").outerWidth(),				
		bsPanelTop=shareTop,
		bsPanelLeft=shareLeft-bsPanelW;
		$("#bsPanel").css({"top":bsPanelTop+"px","left":bsPanelLeft+"px"}).show(); 
		//$(".bdshare_popup_bg,.bdshare_popup_box").show();
		},
	function(){
			$('.shareShow').hide();
			//$(".bdshare_popup_bg,.bdshare_popup_box").hide();
		});
	});
	
function erweimaOver(obj){
	var offset=obj.offset();
	var top=offset.top;
	var left=offset.left;
var divW=$(".erweimaImg").outerWidth();
var addLeft=left-divW;
var addTop=top-$(document).scrollTop();
$(".erweimaImg").css({"left":addLeft+"px","top":addTop+"px"}).show();
	}
function erweimaOut(){
	$(".erweimaImg").hide();
	}

/***************************前台的会员,购物*********************************/
/**********会员****************/
function loadContentAjax(obj){
	var html="<div>"+transKeyWords(globelVary.languageId,7)+"......</div>";
	obj.html(html);
	}
function closeContentAjax(obj){
	obj.html("");
	}
//会员登录界面
$("#passWord,#msgCheckcode").live("keyup",function(e){
		var code=e.which;
		if(code==13){
			if($(".systemDialog ").length>=2)
				return;
			else 
				memLog();			
			}			
		});	

function openMen(){
	fwajaxStar();
	$.ajax({
		url:"http://www.yatouhome.com/apply/member/login.asp",
		data:{sType:""},
		type:"POST",
		dataType:"html",
		cache:"false",
		error: function(){
			fwajaxClose()
			createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,1),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}])
			},
		success:function(data){				
			fwajaxClose();
			createDialog({title:transKeyWords(globelVary.languageId,8),con:data,type:"edit",head:"no"},[])
			}
		});
	}		
//会员的验证码	
function msgCheckcodeFocus(){
	var src='/inc/checkcode.asp?t='+(new Date().getTime());
	$("#imgcheckcode").attr("src",src).show();;
	}
	
//会员登录方法
function memLog(){
	var memberName = $.trim($("#memberName").val());
	var passWord = $.trim($("#passWord").val());
	var RadCode = $.trim($(".RadCode").val());	
	if(memberName==""){
		createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,9),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);return;
		}
	if(passWord==""){
		createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,10),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);return;
		}
	if(RadCode==""){
		createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,11),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);return;
		}	
	$.ajax({
		url:"http://www.yatouhome.com/apply/member/login.asp",
		data:{sType:"memLog",memberName:memberName,passWord:passWord,RadCode:RadCode},
		type:"POST",
		dataType:"json",
		error:function(){
			createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,1),type:"error"},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);
			},
		success:function(data){
			if(data.status=="failed")
			createDialog({title:transKeyWords(globelVary.languageId,8),con:data.msg,type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}])
			else if(data.status=="success")	{
				createDialog({title:transKeyWords(globelVary.languageId,12),con:data.msg,type:"success",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}]);
				$("#timeSessionMashine").val("guoyansi");
				controlTimeMashine();
				//closeDialog($(".user_login"))
				//createDialog({title:"系统提示",con:data.msg,type:"edit",head:"no"},[])
				//memberCenterShow('http://www.yatouhome.com/apply/member/memberInfo.asp');
				}					
			else 
			createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,13),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}])
			}
		})
	}
	
//会员注册,会员信息提交
function memberInfo_submit(className,type){	
			var data=getRegData(className);			
			if(data==0)
			return;
			var url;	
			if(type=="add"){
				url="http://www.yatouhome.com/apply/member/memberReg.asp";
				data.sType="add";
				}
			else if(type=="save"){
				url="http://www.yatouhome.com/apply/member/memberInfo.asp";
				data.sType="save";
				}
				fwajaxStar();
				$.ajax({
					url:url,
					data:data,
					dataType:"json",
					type:"POST",
				    cache:false,
					error: function(){
						fwajaxClose();
						createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,1),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);
						},
					success: function(data){
						fwajaxClose();
						if(data.status=="success")
							createDialog({title:transKeyWords(globelVary.languageId,12),con:data.msg,type:"success",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}]);
						else if(data.status=="failed")
							createDialog({title:transKeyWords(globelVary.languageId,12),con:data.msg,type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);
						else 
							createDialog({title:transKeyWords(globelVary.languageId,12),con:transKeyWords(globelVary.languageId,14),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);
						}
					});		
			}	
	
	
function getRegData(className){
			var data={};//={sType:"add"};
			var getStr=function(name,con){
				con=$.trim(con);
				if(!data[name])
					data[name]=con;
				else{
					data[name]+=","+con;	
					}
				}
			var n=0;var titles="";
			$("."+className,$(".user_login_form")).each(function() {
                var name=$(this).attr("name");
				var type=$(this).attr("type");
				titles=$(this).attr("titles");		
				
				
				if(type=="text"||type=="textarea"||type=="password"){
					var con=$.trim($(this).val());					
					if(con=="system_null"){n=1;return false;}//关键字
					if($(this).attr("submit")=="no"){n=3;return false;}//验证错误
					if($(this).attr("regischeck")==1&&con==""){n=4;return false;}//必填项
					getStr(name,con);
					}
				else if(type=="radio"||type=="checkbox"){
					if($(this).attr("checked")=="checked")
						getStr(name,$(this).val());
					}
				else if(type=="select"){
					getStr(name,$("option:selected", $(this)).val());
					}
				/* else if(type=="password"){
					getStr(name,$(this).val());
					} */				
				else{
					n=2;
					return false;
					}							
            	});					
				if(!memberNotice(n,titles))
				return 0;
				for(var i=1;i<=10;i++){
					if(!data["regMem"+i])
					data["regMem"+i]="system_null";
					}
				return data;
				}
function memberNotice(n,titles){
			var con="";var bool=true;
			if(n==1) {con="system_null"+transKeyWords(globelVary.languageId,15);bool=false;}					
			else if(n==2){con=transKeyWords(globelVary.languageId,16);bool=false;}					
			else if(n==3) {con=titles+transKeyWords(globelVary.languageId,17);bool=false;}
			else if(n==4){con=titles+transKeyWords(globelVary.languageId,18);bool=false;}
			if(!bool){createDialog({title:transKeyWords(globelVary.languageId,12),con:con,type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);return false;}
			return true;			
			}			
	
//会员资料验证
function memberRegValidata(className){			
			$("."+className,$(".user_login_form")).each(function() {
				var type=$(this).attr("type");
				if(typeof type=="undefined")
					type=$(this).get(0).tagName;			
                if(type=="text"||type=="TEXTAREA"){
					var regtype=$(this).attr("regtype");
					var data={};
					var regischeck=$(this).attr("regischeck");
					if(regischeck==0)//飞必填
						data.empty=transKeyWords(globelVary.languageId,19);
					else if(regischeck==1)//必填						
						{
							//data.empty=transKeyWords(globelVary.languageId,18);									
							}
					//纯数字格式
					if(regtype==5){data.type="number";data.error=transKeyWords(globelVary.languageId,20);data.right=transKeyWords(globelVary.languageId,21);data.width=200;$(this).fwValidateText(data);}
					//纯字母格式
					else if(regtype==6){data.type="english";data.error=transKeyWords(globelVary.languageId,22);data.right=transKeyWords(globelVary.languageId,21);data.width=200;$(this).fwValidateText(data);}
					//电话格式
					else if(regtype==7){data.type="tel";data.error=transKeyWords(globelVary.languageId,23);data.right=transKeyWords(globelVary.languageId,21);data.width=200;$(this).fwValidateText(data);}
					//手机格式
					else if(regtype==8){data.type="phone";data.error=transKeyWords(globelVary.languageId,24);data.right=transKeyWords(globelVary.languageId,21);data.width=200;$(this).fwValidateText(data);}
					//邮箱格式
					else if(regtype==9){data.type="email";data.error=transKeyWords(globelVary.languageId,25);data.right=transKeyWords(globelVary.languageId,21);data.width=200;$(this).fwValidateText(data);}									
					}
            	});
			}			
	
//免费注册
function freeReg(){
	fwajaxStar();
	$.ajax({
		url:"http://www.yatouhome.com/apply/member/memberReg.asp",
		data:{sType:""},
		type:"POST",
		dataType:"html",
		cache:"false",
		error: function(){
			fwajaxClose();
			createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,1),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}])
			},
		success:function(data){	
			fwajaxClose();		
			createDialog({title:transKeyWords(globelVary.languageId,8),con:data,type:"edit",head:"no"},[])
			}
		});
	}	
function freeReg1(){
	createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,45),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}])
}
//会员密码找回
function forget_pw(){
	fwajaxStar();
	$.ajax({
		url:"http://www.yatouhome.com/apply/member/forgetPW.asp",
		data:{sType:""},
		type:"POST",
		dataType:"html",
		cache:"false",
		error: function(){
			fwajaxClose();
			createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,1),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}])
			},
		success:function(data){	
			fwajaxClose();		
			createDialog({title:transKeyWords(globelVary.languageId,8),con:data,type:"edit",head:"no"},[])
			}
		});
	}	
	
/**********会员**end**************/
/**********购物车****************/
//选择配送方式
function changeSendPrice(obj){	
	if(obj.attr("checked")=="checked"){
		var price=obj.attr("price");
		if(isNaN(price)){
			createDialog({title:transKeyWords(globelVary.languageId,12),con:price+transKeyWords(globelVary.languageId,33),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);return;
			}		
		$(".sendPriceTotal").html(price);		
		//$(".ft_c01").html(parseFloat($(".totalPrice").html())+parseFloat(price));
		var totalPrice = $(".totalPrice").html();
		totalPrice=totalPrice.replace(",","")
		var total=parseFloat(totalPrice)+parseFloat(price);
		$(".ft_c01").html(total.toFixed(2));
		}
	}
//选择付款方式	
function changePayType(obj){
	var currency=obj.attr("currency");
	$(".moneyCoin").html(currency);
	}	
//返回购物车页面
function returnCart(){
	fwajaxStar();
	$.ajax({
		url:"http://www.yatouhome.com/apply/shopping/shoppingCar.asp",
		data:{sType:""},
		type:"POST",
		dataType:"html",
		cache:"false",
		error:function(){
			fwajaxClose();
			createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,1),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);
			},
		success:function(data){			
			fwajaxClose();	
			$(".systemDialog ").remove();			
			createDialog({title:transKeyWords(globelVary.languageId,8),con:data,type:"edit",head:"no"},[]);
			}
		})
	}
//获取购物的数量或添加到购物车的数量
function getShoppingCount(){
	var proNum=$(".text_shoping",$(".product_summary")).val();
	if(isNaN(proNum)){createDialog({title:transKeyWords(globelVary.languageId,12),con:transKeyWords(globelVary.languageId,26),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}]);return "stop";}
	proNum=parseInt(proNum);
	if(proNum==0) return "stop";	
	return proNum;
	}
//购物车购买	
function payCart(){
	var name=$(".deliveryAddr_name").val();
	var address=$(".deliveryAddr_addr").val();
	var post=$(".deliveryAddr_post").val();
	var phone=$(".deliveryAddr_phone").val();
	var userinfo=$(".userinfo").val();
	var data={sType:"pay",name:name,address:address,post:post,phone:phone,userinfo:userinfo,shoppingStr:window["shoppingCountAndIdStr"]};
	$("input[name=sendSelect]").each(function() {
        if($(this).attr("checked")=="checked"){
			data.sendType=$(this).val();
			return false;
			}
    	});
		
	if($(".deliveryAddr_name").val()==""){
		createDialog({title:transKeyWords(globelVary.languageId,12),con:transKeyWords(globelVary.languageId,34),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);return;
		return;
		}
	if($(".deliveryAddr_addr").val()==""){
		createDialog({title:transKeyWords(globelVary.languageId,12),con:transKeyWords(globelVary.languageId,35),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);return;
		return;
		}
	if($(".deliveryAddr_phone").val()==""){
		createDialog({title:transKeyWords(globelVary.languageId,12),con:transKeyWords(globelVary.languageId,36),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);return;
		return;
		}

	if(!data.sendType){
		createDialog({title:transKeyWords(globelVary.languageId,12),con:transKeyWords(globelVary.languageId,37),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);return;
		}
	
	$("input[name=payType]").each(function() {
        if($(this).attr("checked")=="checked"){
			data.payType=$(this).val();
			return false;
			}
    	});
	if(!data.payType){
		createDialog({title:transKeyWords(globelVary.languageId,12),con:transKeyWords(globelVary.languageId,38),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);return;
		}	
	fwajaxStar();
	$.ajax({
		url:"http://www.yatouhome.com/apply/shopping/shopFinish.asp",
		data:data,
		cache:false,
		type:"POST",
		error: function(){
			fwajaxClose();	
			createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,1),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);
			},
		success:function(data){
			fwajaxClose();
			try{
				 data=eval("("+data+")");
				 if (data.status=="error"){
				createDialog({title:transKeyWords(globelVary.languageId,8),con:data.msg,type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);
			}
				}
			catch(e){
				$(".systemDialog").remove();
				createDialog({title:transKeyWords(globelVary.languageId,8),con:data,type:"edit",head:"no"},[]);
				window["shoppingCountAndIdStr"]=null;
				}
			}
		});
	}

	
//产品展示的立即购买
function nowShopping(proId){
	var buyObj=$(".buy",$(".admin_tool"));
	var pro_S_Value = $("#pro_S_Value").text().replace($("#pro_S_Value").children().text(),'');
	if(buyObj.length==0){
		createDialog({title:transKeyWords(globelVary.languageId,8),con:"开启右侧工具栏才能购物",type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}]);
		return;
		}

	var proNum=getShoppingCount();
	if(proNum=="stop")
		return;
	var data={sType:"buyNow",proNum:proNum,proId:proId,pro_S_Value:pro_S_Value};
	fwajaxStar();
	$.ajax({
		url:"http://www.yatouhome.com/apply/shopping/buyNow.asp",
		//dataType:"html",
		cache:false,
		type:"POST",
		data:data,
		error: function(){
			fwajaxClose();
			createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,1),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}]);
			},
		success:function(data){
			fwajaxClose();
			if(data=="login"){openMen();}
			else createDialog({title:transKeyWords(globelVary.languageId,27),con:data,type:"edit",head:"no"},[]);
			}
		});
	}
//购物出之后的立即购买确认	
function payNow(){
	var name=$(".deliveryAddr_name").val();
	var address=$(".deliveryAddr_addr").val();
	var post=$(".deliveryAddr_post").val();
	var phone=$(".deliveryAddr_phone").val();
	var userinfo=$(".userinfo").val();
	var proNum=$(".buyNowshoppingTr").attr("proNum");
	var proId=$(".buyNowshoppingTr").attr("proId");
	var pro_S_Value=$(".buyNowshoppingTr").attr("pro_S_Value");
	alert(pro_S_Value);
	var data={sType:"payNow",name:name,address:address,post:post,phone:phone,userinfo:userinfo,proId:proId,proNum:proNum,pro_S_Value:pro_S_Value};
	if($(".deliveryAddr_name").val()==""){
		createDialog({title:transKeyWords(globelVary.languageId,12),con:transKeyWords(globelVary.languageId,34),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);return;
		return;
		}
	if($(".deliveryAddr_addr").val()==""){
		createDialog({title:transKeyWords(globelVary.languageId,12),con:transKeyWords(globelVary.languageId,35),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);return;
		return;
		}
	if($(".deliveryAddr_phone").val()==""){
		createDialog({title:transKeyWords(globelVary.languageId,12),con:transKeyWords(globelVary.languageId,36),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);return;
		return;
		}
	$("input[name=sendSelect]").each(function() {
        if($(this).attr("checked")=="checked"){
			data.sendType=$(this).val();
			return false;
			}
    	});
	if(!data.sendType){
		createDialog({title:transKeyWords(globelVary.languageId,12),con:transKeyWords(globelVary.languageId,28),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);return;
		}
	$("input[name=payType]").each(function() {
        if($(this).attr("checked")=="checked"){
			data.payType=$(this).val();
			return false;
			}
    	});
	if(!data.payType){
		createDialog({title:transKeyWords(globelVary.languageId,12),con:transKeyWords(globelVary.languageId,29),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);return;
		}	
	fwajaxStar();
	$.ajax({
		url:"http://www.yatouhome.com/apply/shopping/shopFinish.asp",
		data:data,
		cache:false,
		dataType:"html",
		type:"POST",
		error: function(){
			fwajaxClose();	
			createDialog({title:transKeyWords(globelVary.languageId,12),con:transKeyWords(globelVary.languageId,1),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);
			},
		success:function(data){
			fwajaxClose();
			 try{
				 data=eval("("+data+")");
				 if (data.status=="error"){
				createDialog({title:transKeyWords(globelVary.languageId,8),con:data.msg,type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);
			}
				}
			catch(e){ 
				$(".systemDialog").remove();
				createDialog({title:transKeyWords(globelVary.languageId,8),con:data,type:"edit",head:"no"},[]);				
				}
			}
		});
	}
	
	
//产品展示的购物车
function addShoppingToCart(obj,proId){
	var buyObj=$(".buy",$(".admin_tool"));
	var pro_S_Value = $("#pro_S_Value").text().replace($("#pro_S_Value").children().text(),'');
	if(buyObj.length==0){
		createDialog({title:transKeyWords(globelVary.languageId,8),con:"开启右侧工具栏才能购物",type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}]);
		return;
		}
	
	var proNum=getShoppingCount();
	if(proNum=="stop")
		return;
	var data={proNum:proNum,proId:proId,pro_S_Value:pro_S_Value};
	//fwajaxStar();
	$.ajax({
		url:"http://www.yatouhome.com/apply/shopping/addCart.asp",
		dataType:"json",
		cache:false,
		type:"POST",
		data:data,
		error: function(){
			fwajaxClose();
			createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,1),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}]);
			},
		success:function(data){
			//fwajaxClose();			
			 if(data.status=="success"){				
				$("body").append("<div class='addShoppingToCartCount'><div class='addShoppingCount'>+"+proNum+"</div></div>");
				var originOffset=obj.offset();				
				$(".addShoppingToCartCount").css({"top":originOffset.top+"px",left:originOffset.left+"px"});
				var offset=buyObj.offset();				
				var targetTop=offset.top;
				var targetLeft=offset.left;
				var time=1000;
				$(".addShoppingToCartCount").animate({left:targetLeft,top:targetTop},time);
				setTimeout(function(){$(".addShoppingToCartCount").remove();},time);
				}
			else if(data.status=="failed")
				createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,30),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}]);				
			else createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,13),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}]); 
			}
		});
	}
/**********购物车**end**************/
function memberCenterShow(url) {
			loadContentAjax($(".user_center_sub2"));
            $.ajax({
				url:url,
				dataType:"html",
				cache:false,
				error: function(){
					closeContentAjax($(".user_center_sub2"));
					createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,1),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);},
				success:function(data){
					closeContentAjax($(".user_center_sub2"));
					$(".user_center_sub2").html(data);
					
					}
				});
        }	
function memberLogout(){	
	$.ajax({
		url:"http://www.yatouhome.com/apply/member/login.asp",
		data:{sType:"loginOut"},
		type:"POST",
		dataType:"json",
		cache:"false",
		error: function(){},
		success:function(data){
			if(data.status=="success"){
				closeDialog("all");
				window.location.reload();
				}
			else if(data.status=="falied"){
				createDialog({title:transKeyWords(globelVary.languageId,8),con:data.msg,type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}])
				}
			else {
				createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,13),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}])
				}
			}
		});
	}	
//购物车
function openShoppingCar(){
	fwajaxStar()
	$.ajax({
		url:"http://www.yatouhome.com/apply/shopping/shoppingCar.asp",
		data:{sType:""},
		type:"POST",
		dataType:"html",
		cache:"false",
		error: function(){
			fwajaxClose()
			createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,1),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("all");}}])
			},
		success:function(data){				
			fwajaxClose();
			createDialog({title:transKeyWords(globelVary.languageId,8),con:data,type:"edit",head:"no"},[])
			}
		});
	}

//超时处理
function controlTimeMashine(){//登录后调用,开始计时
	/* var value=$("#timeSessionMashine").val(),
	destroy=$("#timeSessionMashine").attr("destroy");//no表示未曾销毁过,yes表示销毁过
	if(value==""){//session无值,无需做超时处理
		return true;
		}
	else{//已登录	 */
		clearTimeout(globelVary.timeMashine); 	
		globelVary.timeMashine=setTimeout(function(){globelVary.sessionTimeBool=1;$("#timeSessionMashine").val("");},1000*60*20-20);//超时
		//}
	}

function getSessionTimeBool(){//每次ajax请求时调用,返回false后面的ajax不在调用,返回true表示未超时,可以继续执行后面的代码
	//controlTimeMashine();
	//var bool=true;
	 if(globelVary.sessionTimeBool==1){
		 //bool=false;
		 window["destroySessionAjax"]=1;
		$.ajax({			
			url:"http://www.yatouhome.com/apply/member/logout.asp",
			type:"GET",
			cache:false,
			error: function(){
				createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,1),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}]);				
				},
			success:function(){				
				if(confirm("登录超时,请重新登陆?"))
					window.top.location.reload();
				else 
					window.top.location.reload();
					
				}
			});
		} 
		//return bool;
	}
/**
放大镜
**/
(function($){
	$.fn.imagezoom=function(options){
		var settings={xzoom:310,yzoom:310,offset:10,position:"BTR",preload:1};
		if(options){$.extend(settings,options);}
		/*var noalt='';*/
		var self=this;
		$(this).bind("mouseenter",function(ev){
			var imageLeft=$(this).offset().left;
			var imageTop=$(this).offset().top;
			var imageWidth=$(this).get(0).offsetWidth;
			var imageHeight=$(this).get(0).offsetHeight;
			var boxLeft=$(this).parent().offset().left;
			var boxTop=$(this).parent().offset().top;
			var boxWidth=$(this).parent().width();
			var boxHeight=$(this).parent().height();
			/*noalt=$(this).attr("alt");*/
			var bigimage=$(this).attr("rel");
			$(this).attr("alt",'');
			if($("div.zoomDiv").get().length==0){
				$(document.body).append("<div class='zoomDiv'><img class='bigimg' src='"+bigimage+"'/></div><div class='zoomMask'>&nbsp;</div>");
			}
			if(settings.position=="BTR"){
				if(boxLeft+boxWidth+settings.offset+settings.xzoom>screen.width){
					leftpos=boxLeft-settings.offset-settings.xzoom;
				}else{
					leftpos=boxLeft+boxWidth+settings.offset;
				}
			}else{
				leftpos=imageLeft-settings.xzoom-settings.offset;
				if(leftpos<0){leftpos=imageLeft+imageWidth+settings.offset;}
			}
			$("div.zoomDiv").css({top:boxTop,left:leftpos});
			$("div.zoomDiv").width(settings.xzoom);
			$("div.zoomDiv").height(settings.yzoom);
			$("div.zoomDiv").show();
			$(this).css('cursor','crosshair');
			$(document.body).mousemove(function(e){
				mouse=new MouseEvent(e);
				if(mouse.x<imageLeft||mouse.x>imageLeft+imageWidth||mouse.y<imageTop||mouse.y>imageTop+imageHeight){
					mouseOutImage();
					return;
				}
				var bigwidth=$(".bigimg").get(0).offsetWidth;
				var bigheight=$(".bigimg").get(0).offsetHeight;
				var scaley='x';
				var scalex='y';
				if(isNaN(scalex)|isNaN(scaley)){
					var scalex=(bigwidth/imageWidth);
					var scaley=(bigheight/imageHeight);
					var zoomMaskWidth=((settings.xzoom)/scalex>$(".jqzoom").width())?$(".jqzoom").width():(settings.xzoom)/scalex
					var zoomMaskHeight=((settings.yzoom)/scaley>$(".jqzoom").height())?$(".jqzoom").height():(settings.yzoom)/scaley;
					$("div.zoomMask").width(zoomMaskWidth);
					$("div.zoomMask").height(zoomMaskHeight);
					$("div.zoomMask").css('visibility','visible');
				}
				xpos=mouse.x-$("div.zoomMask").width()/2;
				ypos=mouse.y-$("div.zoomMask").height()/2;
				xposs=mouse.x-$("div.zoomMask").width()/2-imageLeft;
				yposs=mouse.y-$("div.zoomMask").height()/2-imageTop;
				xpos=(mouse.x-$("div.zoomMask").width()/2<imageLeft)?imageLeft:(mouse.x+$("div.zoomMask").width()/2>imageWidth+imageLeft)?(imageWidth+imageLeft-$("div.zoomMask").width()):xpos;
				ypos=(mouse.y-$("div.zoomMask").height()/2<imageTop)?imageTop:(mouse.y+$("div.zoomMask").height()/2>imageHeight+imageTop)?(imageHeight+imageTop-$("div.zoomMask").height()):ypos;
				$("div.zoomMask").css({top:ypos,left:xpos});
				$("div.zoomDiv").get(0).scrollLeft=xposs*scalex;
				$("div.zoomDiv").get(0).scrollTop=yposs*scaley;
			});
		});
		function mouseOutImage(){
			$(document.body).unbind("mousemove");
			$("div.zoomMask").remove();
			$("div.zoomDiv").remove();
		}
		count=0;
		if(settings.preload){
			$('body').append("<div style='display:none;' class='jqPreload"+count+"'></div>");
			$(this).each(function(){
				var imagetopreload=$(this).attr("rel");
				var content=jQuery('div.jqPreload'+count+'').html();
				jQuery('div.jqPreload'+count+'').html(content+'<img src=\"'+imagetopreload+'\">');
			});
		}
	}
})(jQuery);
function MouseEvent(e){this.x=e.pageX;this.y=e.pageY;}

/**
发送邮箱验证码
**/
function getCode(){
	var memberMail = $("input[name='regMem5']").val();
	if(memberMail=="" ||!(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(memberMail)){
		createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,25),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}])
	return;
	}
	fwajaxStar();
	$.ajax({
		url:"http://www.yatouhome.com/apply/member/mailVerification.asp",
		data:{"memberMail":memberMail},
		type:"POST",
		dataType:"html",
		cache:"false",
		error: function(){
			fwajaxClose();
			createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,1),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}])
			},
		success:function(data){	
			fwajaxClose();		
			createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,47),type:"success",width:300},[{name:transKeyWords(globelVary.languageId,48),action:function(){closeDialog("self");}}]);
			}
		});
	}
/**
验证邮箱
**/
function checkCode(){
	var mailCode = $("#mailCode").val();
	$.ajax({
	type:"post",
	url:"http://www.yatouhome.com/apply/member/memberReg.asp",
	data:{"sType":"maicheck","mailCode":mailCode},
	dataType:"json",
	cache:"false",
	error:function(){
		createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,1),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,5),action:function(){closeDialog("self");}}])
		},	
	})
}	
/**
投票
**/
function vote(userLabelId){
	var voteNameChecked="";
	$('input[name=""voteName'+userLabelId+'""][checked]').each(function(){  
		voteNameChecked+=$(this).val()+",";     
	})
	if (voteNameChecked === "")
	{
		createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,17),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,48),action:function(){closeDialog("self");}}]); 
		return false; 
	}else{
		$.ajax({ 
			type: "POST", 
			url: "http://www.yatouhome.com/apply/vote/vote_add.asp", 
			data:{"userLabelId":userLabelId,"voteNameChecked":voteNameChecked},
			cache:false, 
			error:function(){ 
			createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,1),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,48),action:function(){closeDialog("all");}}]); 
				return false; 
			}, 
			success: function(data){ 
				var dataMsg=eval("("+data+")"); 							
				if(dataMsg.status=="failed"){ 
					createDialog({title:transKeyWords(globelVary.languageId,8),con:dataMsg.msg,type:"error",width:300},[{name:transKeyWords(globelVary.languageId,48),action:function(){closeDialog("all");}}]);
					return false; 
				}else if(dataMsg.status=="success"){
					createDialog({title:transKeyWords(globelVary.languageId,8),con:dataMsg.msg,type:"success",width:300},[{name:transKeyWords(globelVary.languageId,48),action:function(){closeDialog("all");}}]);
				}
			} 
		});
	}
}

/**
查看投票结果
**/
function voteResult(userLabelId){
	$.ajax({ 
		type: "POST", 
		url: "http://www.yatouhome.com/apply/vote/vote_result.asp", 
		data:{"userLabelId":userLabelId},
		cache:false, 
		error:function(){ 
		createDialog({title:transKeyWords(globelVary.languageId,8),con:transKeyWords(globelVary.languageId,1),type:"error",width:300},[{name:transKeyWords(globelVary.languageId,48),action:function(){closeDialog("all");}}]); 
			return false; 
		}, 
		success: function(data){ 
			createDialog({title:transKeyWords(globelVary.languageId,12),con:data,type:"show",width:400},[{name:transKeyWords(globelVary.languageId,48),action:function(){closeDialog("all");}}]);
		} 
	});
}

/**********多语翻译****************/
function transKeyWords(n, order){
	var content={};
	for(var i=1;i<=9;i++){content[i]={};}
	//中文	
	content[1][1] = "服务器连接错误";
    content[1][2] = "设置成功";
    content[1][3] = "登陆成功";
    content[1][4] = "缺少表情赋值对象";
    content[1][5] = "关闭";
    content[1][6] = "类型不存在";
    content[1][7] = "数据正在获取中";
    content[1][8] = "系统提示";
    content[1][9] = "请正确填写登录账号";
    content[1][10] = "密码为空无法登录";
    content[1][11] = "验证码为空了";
    content[1][12] = "提示";
    content[1][13] = "返回参数异常";
    content[1][14] = "参数异常,保存失败";
    content[1][15] = "是关键字,无法提交";
    content[1][16] = "有未知类型控件";
    content[1][17] = "填写错误";
    content[1][18] = "为必填项";
    content[1][19] = "不是必填项";
    content[1][20] = "不是数字";
    content[1][21] = "填写正确";
    content[1][22] = "不是字母";
    content[1][23] = "电话格式有误";
    content[1][24] = "手机格式有误";
    content[1][25] = "请正确填写邮箱格式";
    content[1][26] = "请正确填写购物数量";
    content[1][27] = "标题";
    content[1][28] = "请选择邮递方式";
    content[1][29] = "请选择付款方式";
    content[1][30] = "添加商品到购物车失败";
	content[1][31] = "评论成功，等待审核";
	content[1][32] = "留言成功";
	content[1][33] = "无法完成计算";
	content[1][34] = "收货人不能为空";
	content[1][35] = "收货地址不能为空";
	content[1][36] = "联系方式不能为空";
	content[1][37] = "请选择配送方式";
	content[1][38] = "请选择付款方式";
	content[1][39] = "加入收藏失败，请使用Ctrl+D进行添加";
	content[1][40] = "此操作被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将[signed.applets.codebase_principal_support]设置为'true'";
   	content[1][41] = "展开";
	content[1][42] = "客服中心";
	content[1][43] = "暂无在线客服";
	content[1][44] = "点击这里";
	content[1][45] = "请先开通企业型或通用型再进行操作";
	content[1][46] = "发表成功"
	content[1][47] = "验证码已发送到邮箱"
	content[1][48] = "确定"
    //英语翻译
   	content[2][1]="Server connection error";
	content[2][2] = "Successfully set";
	content[2][3] = "Successful landing";
	content[2][4] = "Lack of facial expression assignment object";
    content[2][5] = "Close";
    content[2][6] = "Type does not exist";
    content[2][7] = "Data is being obtained in";
    content[2][8] = "System prompts";
    content[2][9] = "Please fill in the correct login account";
    content[2][10] = "Blank password can not log in";
    content[2][11] = "The verification code is empty";
    content[2][12] = "Prompt";
    content[2][13] = "Abnormal return parameter";
    content[2][14] = "Abnormal parameters, save failed";
    content[2][15] = "Is a keyword, you can not submit";
    content[2][16] = "There are an unknown type controls";
    content[2][17] = "Fill in error";
    content[2][18] = "Is required";
    content[2][19] = "Not required";
    content[2][20] = "Not a number";
    content[2][21] = "Fill in the correct";
    content[2][22] = "Not the letter";
    content[2][23] = "Phone format error";
    content[2][24] = "Phone format error";
    content[2][25] = "Please fill in the correct mailbox format";
    content[2][26] = "Please fill in the correct number of shopping";
    content[2][27] = "Title";
    content[2][28] = "Please select post";
    content[2][29] = "Please select a payment method";
    content[2][30] = "Failed to add product to cart";
	content[2][31] = "Comments succeed, awaiting approval";
	content[2][32] = "Message Success";
	content[2][33] = "Unable to complete the calculation";
	content[2][34] = "Consignee can not be empty";
	content[2][35] = "Shipping address can not be empty";
	content[2][36] = "Contact can not be empty";
	content[2][37] = "Please select the shipping method";
	content[2][38] = "Please select a payment method";
	content[2][39] = "Favorite fails, use Ctrl + D to add";
	content[2][40] = "This operation is browser to refuse! \ n in the browser address bar enter 'about: config' and press Enter \ n then [signed.applets.codebase_principal_support] is set to 'true'";
	content[2][41] = "open";
	content[2][42] = "Customer Service Center";
	content[2][43] = "No online customer service";
	content[2][44] = "Click here";
   	content[2][45] = "Please open enterprise-type or universal before proceeding";
	content[2][46] = "Post success"
	content[2][47] = "Verification code has been sent to the email"
	content[2][48] = "OK"
    //中文（繁体）
	content[3][1] = "服務器連接錯誤";
	content[3][2] = "設置成功";
	content[3][3] = "登陸成功";
	content[3][4] = "缺少表情賦值對象";
	content[3][5] = "關閉";
	content[3][6] = "類型不存在";
	content[3][7] = "數據正在獲取中";
	content[3][8] = "系統提示";
	content[3][9] = "請正確填寫登錄賬號";
	content[3][10] = "密碼為空無法登錄";
	content[3][11] = "驗證碼為空了";
	content[3][12] = "提示";
	content[3][13] = "返回參數異常";
	content[3][14] = "參數異常,保存失敗";
	content[3][15] = "是關鍵字,無法提交";
	content[3][16] = "有未知類型控件";
	content[3][17] = "填寫錯誤";
	content[3][18] = "為必填項";
	content[3][19] = "不是必填項";
	content[3][20] = "不是數字";
	content[3][21] = "填寫正確";
	content[3][22] = "不是字母";
	content[3][23] = "電話格式有誤";
	content[3][24] = "手機格式有誤";
	content[3][25] = "請正確填寫郵箱格式";
	content[3][26] = "請正確填寫購物數量";
	content[3][27] = "標題";
	content[3][28] = "請選擇郵遞方式";
	content[3][29] = "請選擇付款方式";
	content[3][30] = "添加商品到購物車失敗";
	content[3][31] = "評論成功，等待審核";
	content[3][32] = "留言成功";
	content[3][33] = "無法完成計算";
	content[3][34] = "收貨人不能為空";
	content[3][35] = "收貨地址不能為空";
	content[3][36] = "聯繫方式不能為空";
	content[3][37] = "請選擇配送方式";
	content[3][38] = "請選擇付款方式";
	content[3][39] = "加入收藏失敗，請使用Ctrl+D進行添加";
	content[3][40] = "此操作被瀏覽器拒絕！ \n請在瀏覽器地址欄輸入'about:config'並回車\n然後將[signed.applets.codebase_principal_support]設置為'true'";
	content[3][41] = "展開";
	content[3][42] = "客服中心";
	content[3][43] = "暫無在線客服";
	content[3][44] = "點擊這裡";
	content[3][45] = "請先開通企業型或通用型再進行操作";
	content[3][46] = "發表成功"
	content[3][47] = "驗證碼已發送到郵箱"
	content[3][48] = "確定"
    //西班牙语
    content[4][1] = "Error de conexión con el servidor";
    content[4][2] = "establecer con éxito";
    content[4][3] = "aterrizaje exitoso";
    content[4][4] = "La falta de expresión facial objeto de imputación";
    content[4][5] = "cerrar";
    content[4][6] = "Tipo no existe";
    content[4][7] = "Se obtuvieron datos en";
    content[4][8] = "Mensajes del sistema";
    content[4][9] = "Por favor, complete la cuenta de usuario correcta";
    content[4][10] = "Contraseña en blanco no puede iniciar sesión";
    content[4][11] = "El código de verificación está vacía";
    content[4][12] = "pronto";
    content[4][13] = "Parámetro de retorno anormal";
    content[4][14] = "Parámetros anormales, no pudieron salvar";
    content[4][15] = "Es una palabra clave, no se puede presentar";
    content[4][16] = "Hay un desconocido controles de tipo";
    content[4][17] = "Rellene error";
    content[4][18] = "Se requiere";
    content[4][19] = "No se requiere";
    content[4][20] = "No es un número";
    content[4][21] = "Rellene el correcto";
    content[4][22] = "¿No es la carta";
    content[4][23] = "Error de formato del teléfono";
    content[4][24] = "Error de formato del teléfono";
    content[4][25] = "Por favor rellene el formato buzón correcto";
    content[4][26] = "Por favor, introduzca el número correcto de compras";
    content[4][27] = "título";
    content[4][28] = "Selecciona mensaje";
    content[4][29] = "Por favor seleccione una forma de pago";
    content[4][30] = "No se ha podido añadir productos a la cesta";
	content[4][31] = "Comentarios a tener éxito, a la espera de aprobación";
	content[4][32] = "Mensaje de éxito";
	content[4][33] = "No se puede completar el cálculo";
	content[4][34] = "Destinatario no puede estar vacío";
	content[4][35] = "La dirección de envío no puede estar vacío";
	content[4][36] = "El contacto no puede estar vacío";
	content[4][37] = "Por favor, seleccione el método de envío";
	content[4][38] = "Por favor seleccione una forma de pago";
	content[4][39] = "Favorite falla, use Ctrl + D para agregar";
	content[4][40] = "Esta operación es el navegador para rechazar! \ N en la barra de direcciones del navegador escriba 'about: config' y pulse Enter \ n luego [signed.applets.codebase_principal_support] está ajustado a 'true'";
	content[4][41] = "desplegar";
	content[4][42] = "Centro de Atención al Cliente";
	content[4][43] = "No hay servicio al cliente en línea";
	content[4][44] = "Haga clic aquí";
    content[4][45] = "Por favor, abra de tipo empresarial o universal antes de proceder";
	content[4][46] = "Publique éxito"
	content[4][47] = "Código de verificación ha sido enviado al buzón"
	content[4][48] = "Okay"	
    //法语
    content[5][1] = "Erreur de connexion au serveur";
    content[5][2] = "réussi à mettre en";
    content[5][3] = "atterrissage réussi";
    content[5][4] = "Manque de visage objet d'affectation d'expression";
    content[5][5] = "proche";
    content[5][6] = "Type n'existe pas";
    content[5][7] = "Les données sont obtenues en";
    content[5][8] = "Le système demande";
    content[5][9] = "S'il vous plaît remplir le compte de connexion correcte";
    content[5][10] = "Mot de passe vierge ne ​​peut pas identifier";
    content[5][11] = "Le code de vérification est vide";
    content[5][12] = "Prompt";
    content[5][13] = "Paramètre de retour anormal";
    content[5][14] = "Paramètres anormaux, enregistrement a échoué";
    content[5][15] = "Est un mot-clé, vous ne pouvez pas soumettre";
    content[5][16] = "Il ya un contrôle de type inconnu";
    content[5][17] = "remplissez erreur";
    content[5][18] = "Est nécessaire.";
    content[5][19] = "Pas nécessaire";
    content[5][20] = "pas un nombre";
    content[5][21] = "remplissez le bon";
    content[5][22] = "pas la lettre";
    content[5][23] = "Erreur de format de téléphone";
    content[5][24] = "Erreur de format de téléphone";
    content[5][25] = "S'il vous plaît remplir le format de boîte aux lettres correcte";
    content[5][26] = "S'il vous plaît remplir le bon nombre de courses";
    content[5][27] = "Titre";
    content[5][28] = "S'il vous plaît choisir le poteau";
    content[5][29] = "S'il vous plaît sélectionner un mode de paiement";
    content[5][30] = "Impossible d'ajouter ce produit au panier";
	content[5][31] = "Commentaires à réussir, en attente d'approbation";
	content[5][32] = "succès message";
	content[5][33] = "Impossible de terminer le calcul";
	content[5][34] = "Destinataire ne peut pas être vide";
	content[5][35] = "L'adresse de livraison peut pas être vide";
	content[5][36] = "Contact ne peut pas être vide";
	content[5][37] = "S'il vous plaît choisir la méthode d'expédition";
	content[5][38] = "S'il vous plaît sélectionner un mode de paiement";
	content[5][39] = "Favorite échoue, utilisez Ctrl + D pour ajouter";
	content[5][40] = "Cette opération est navigateur pour refuser! \ N dans la barre d'adresse du navigateur saisir 'about: config' et appuyez sur Entrée \ n puis [signed.applets.codebase_principal_support] est réglé à 'true'";
	content[5][41] = "Déplier";
	content[5][42] = "Centre de service à la clientèle";
	content[5][43] = "Pas de service client en ligne";
	content[5][44] = "Cliquez ici";
   	content[5][45] = "S'il vous plaît ouvrez entreprise ou de type universel avant de procéder";
	content[5][46] = "poster succès"
	content[5][47] = "Code de vérification a été envoyé à la boîte aux lettres"
	content[5][48] = "Dáccord"
    //德语
    content[6][1] = "Server Verbindungsfehler";
    content[6][2] = "Erfolgreich setzen";
    content[6][3] = "Erfolgreiche Landung";
    content[6][4] = "Fehlende Mimik Zuordnung Objekt";
    content[6][5] = "schließen";
    content[6][6] = "Typ existiert nicht";
    content[6][7] = "Daten werden in erhalten";
    content[6][8] = "Systemansagen";
    content[6][9] = "Bitte füllen Sie das korrekte Login-Account";
    content[6][10] = "Blank Passwort kann nicht einloggen";
    content[6][11] = "Der Bestätigungscode ist leer";
    content[6][12] = "prompt";
    content[6][13] = "Abnormal Return-Parameter";
    content[6][14] = "Abnormal Parameter nicht speichern";
    content[6][15] = "Ist ein Schlüsselwort, können Sie nicht einreichen";
    content[6][16] = "Es gibt einen unbekannten Typ Kontrollen";
    content[6][17] = "Füllen Sie Fehler";
    content[6][18] = "Erforderlich ist.";
    content[6][19] = "Nicht erforderlich";
    content[6][20] = "Nicht eine Zahl";
    content[6][21] = "Füllen Sie das richtige";
    content[6][22] = "Nicht der Buchstabe";
    content[6][23] = "Telefon format error";
    content[6][24] = "Telefon format error";
    content[6][25] = "Bitte füllen Sie das richtige Mailbox-Format";
    content[6][26] = "Bitte füllen Sie die richtige Anzahl von Einkaufszentren";
    content[6][27] = "Titel";
    content[6][28] = "Bitte wählen Beitrag";
    content[6][29] = "Bitte wählen Sie eine Zahlungsmethode";
    content[6][30] = "Fehler beim Produkt in den Warenkorb";
	content[6][31] = "Kommentare gelingen, wartet auf die Genehmigung";
	content[6][32] = "Nachricht Success";
	content[6][33] = "Unfähig, die Berechnung abzuschließen";
	content[6][34] = "Empfänger darf nicht leer sein";
	content[6][35] = "Liefer-Adresse darf nicht leer sein";
	content[6][36] = "Kontakt darf nicht leer sein";
	content[6][37] = "Bitte wählen Sie die Versandart";
	content[6][38] = "Bitte wählen Sie eine Zahlungsmethode";
	content[6][39] = "Bevorzugte fehlschlägt, verwenden Sie Ctrl + D zu addieren";
	content[6][40] = "Dieser Vorgang ist Browser zu verweigern! \ N in die Adresszeile des Browsers eingeben 'about: config' ein und drücken Sie \ n dann [signed.applets.codebase_principal_support] auf 'true' gesetzt";
	content[6][41] = "Klappen";
	content[6][42] = "Customer Service Center";
	content[6][43] = "Kein Online-Kundenservice";
	content[6][44] = "Klicken Sie hier";
    content[6][45] = "Bitte öffnen Unternehmens-Typ oder universal bevor";
	content[6][46] = "Sende Erfolg"
	content[6][47] = "Bestätigungs-Code wurde an die Mailbox geschickt worden"
	content[6][48] = "OK"
    //日语
    content[7][1] = "サーバー接続エラー";
    content[7][2] = "正常に設定され";
    content[7][3] = "成功した着陸";
    content[7][4] = "表情割り当てオブジェクトの欠如";
    content[7][5] = "クローズ";
    content[7][6] = "型は存在しません";
    content[7][7] = "データは、取得されている";
    content[7][8] = "システムプロンプト";
    content[7][9] = "正しいログインアカウントをご記入ください";
    content[7][10] = "空白のパスワードはログインできません";
    content[7][11] = "確認コードは空です";
    content[7][12] = "プロンプト";
    content[7][13] = "異常リターンパラメータ";
    content[7][14] = "異常なパラメータは、保存に失敗しました";
    content[7][15] = "キーワードは、あなたが提出することはできません";
    content[7][16] = "未知のタイプのコントロールがあります";
    content[7][17] = "エラーに記入";
    content[7][18] = "必要とされる";
    content[7][19] = "必須ではありません";
    content[7][20] = "数ではなく";
    content[7][21] = "正しいに記入";
    content[7][22] = "ではない手紙";
    content[7][23] = "電話フォーマットエラー";
    content[7][24] = "電話フォーマットエラー";
    content[7][25] = "正しいメールボックス形式で記入してください";
    content[7][26] = "ショッピングの正しい数をご記入ください";
    content[7][27] = "タイトル";
    content[7][28] = "ポストを選択してください";
    content[7][29] = "お支払い方法を選択してください";
    content[7][30] = "カートに商品を追加できませんでした";
	content[7][31] = "コメントは、承認を待って、成功する";
	content[7][32] = "メッセージ成功";
	content[7][33] = "計算を完了できません";
	content[7][34] = "荷受人は、空にすることはできません";
	content[7][35] = "配送先住所は、空にすることはできません";
	content[7][36] = "お問い合わせは、空にすることはできません";
	content[7][37] = "配送方法を選択してください";
	content[7][38] = "お支払い方法を選択してください";
	content[7][39] = "お気に入りが失敗し、追加するには、Ctrl+ Dを使用";
	content[7][40] = "この操作は拒否するブラウザです！\nブラウザのアドレスバーに入力してください'about:config'と入力し、Enterキーを押します\n次に[signed.applets.codebase_principal_support]が'true'に設定されている";
	content[7][41] = "展開する";
	content[7][42] = "カスタマーサービスセンター";
	content[7][43] = "いいえオンライン顧客サービスない";
	content[7][44] = "ここをクリック";
   	content[7][45] = "続行する前に、企業型またはユニバーサルを開いてください";
	content[7][46] = "成功を投稿";
	content[7][47] = "確認コードは、メールボックスに送信されました"
	content[7][48] = "OK"	
    //俄语
    content[8][1] = "Ошибка соединения с сервером";
    content[8][2] = "Успешно настроенные";
    content[8][3] = "Успешная посадка";
    content[8][4] = "Отсутствие лица объекта выражения присваивания";
    content[8][5] = "близко";
    content[8][6] = "Тип не существует";
    content[8][7] = "Данные были получены в";
    content[8][8] = "система запросит";
    content[8][9] = "Пожалуйста, заполните правильные Вход с паролем";
    content[8][10] = "Пустой пароль не могу войти";
    content[8][11] = "Код пусто";
    content[8][12] = "побуждать";
    content[8][13] = "Аномальные параметр возвращение";
    content[8][14] = "Аномальные параметры, сохранить не удалось";
    content[8][15] = "Это ключевое слово, вы не можете представить";
    content[8][16] = "Есть неизвестных элементов управления типа";
    content[8][17] = "Заполните ошибке";
    content[8][18] = "Не требуется";
    content[8][19] = "Не требуется";
    content[8][20] = "не число";
    content[8][21] = "Заполните корректно";
    content[8][22] = "Не письмо";
    content[8][23] = "Телефон ошибки формата";
    content[8][24] = "Телефон ошибки формата";
    content[8][25] = "Пожалуйста, заполните в правильном формате сообщения";
    content[8][26] = "Пожалуйста, заполните правильное количество торговых";
    content[8][27] = "название";
    content[8][28] = "Пожалуйста, выберите сообщение";
    content[8][29] = "Пожалуйста, выберите способ оплаты";
    content[8][30] = "Не удалось добавить товар в корзину";
	content[8][31] = "Комментарии успеха, ожидает одобрения";
	content[8][32] = "сообщения об успешном";
	content[8][33] = "Не удается завершить расчеты";
	content[8][34] = "Грузополучатель не может быть пустым";
	content[8][35] = "Адрес доставки не может быть пустым";
	content[8][36] = "Контактная не может быть пустым";
	content[8][37] = "Пожалуйста, выберите способ доставки";
	content[8][38] = "Пожалуйста, выберите способ оплаты";
	content[8][39] = "Любимый не помогает, используйте Ctrl + D, чтобы добавить";
	content[8][40] = "Эта операция браузер на отказ! \ N в адресной строке браузера введите 'about:config' и нажмите Enter \ п, то [signed.applets.codebase_principal_support] установлен на 'true'";
	content[8][41] = "раскрываться";
	content[8][42] = "центр обслуживания клиентов";
	content[8][43] = "Здесь никакая онлайн-обслуживания клиентов";
	content[8][44] = "Нажмите здесь";
   	content[8][45] = "Пожалуйста, Open Enterprise-типа или универсальный, прежде чем приступить";
	content[8][46] = "Начать успех";
	content[8][47] = "Верификация отправлен в почтовый ящик"
	content[8][48] = "ОК"	
    //韩语
   	content[9][1] = "서버 연결 오류";
    content[9][2] = "성공적으로 설정";
    content[9][3] = "성공적으로 착륙";
    content[9][4] = "얼굴 표정 지정 개체의 부족";
    content[9][5] = "가까운";
    content[9][6] = "형식이 존재하지 않습니다";
    content[9][7] = "데이터에서 얻어진되고";
    content[9][8] = "시스템 메시지";
    content[9][9] = "올바른 로그인 계정에 기입 해주십시오";
    content[9][10] = "빈 암호는 로그인 할 수 없습니다";
    content[9][11] = "확인 코드가 비어 있습니다";
    content[9][12] = "프롬프트";
    content[9][13] = "이상 반환 매개 변수";
    content[9][14] = "비정상적인 매개 변수, 저장 실패";
    content[9][15] = "키워드, 당신은 제출할 수 없습니다";
    content[9][16] = "알 수없는 형식의 컨트롤이 있습니다";
    content[9][17] = "오류 기입";
    content[9][18] = "가 필요합니다";
    content[9][19] = "필요하지 않음";
    content[9][20] = "숫자가 아님";
    content[9][21] = "정확한 ​​기입";
    content[9][22] = "아니 편지";
    content[9][23] = "전화 형식 오류";
    content[9][24] = "전화 형식 오류";
    content[9][25] = "올바른 메일 형식으로 기입 해주십시오";
    content[9][26] = "쇼핑의 정확한 번호를 기입 해주십시오";
    content[9][27] = "이름";
    content[9][28] = "게시물을 선택하세요";
    content[9][29] = "결제 방법을 선택하세요";
    content[9][30] = "카트에 제품을 추가하는 데 실패";
   	content[9][31] = "댓글 승인을 기다리고 성공";
	content[9][32] = "메시지 성공";
	content[9][33] = "계산을 완료 할 수 없습니다";
	content[9][34] = "수취인은 비워 둘 수 없습니다";
	content[9][35] = "발송 주소는 비워 둘 수 없습니다";
	content[9][36] = "연락처은 비워 둘 수 없습니다";
	content[9][37] = "배송 방법을 선택하세요";
	content[9][38] = "결제 방법을 선택하세요";
	content[9][39] = "즐겨 찾기에 실패, 추가 Ctrl+D을 사용";
	content[9][40] = "이 작업을 거부 할 수있는 브라우저입니다!\n브라우저의 주소 표시 줄에 입력하십시오'about:config'를 입력하고 Enter 키를 누릅니다\n그때[signed.applets.codebase_principal_support]세트'true'";
	content[9][41] = "펴다";
	content[9][42] = "고객 서비스 센터";
	content[9][43] = "아니 온라인 고객 서비스 없음";
	content[9][44] = "여기를 클릭하십시오";
	content[9][45] = "진행하기 전에 기업 유형 또는 보편적를여십시오";
	content[9][46] = "성공을 게시";
	content[9][47] = "인증 코드는 메일을 보냈습니다"
	content[9][48] = "OK"
	return content[n][order];
}	