
/********弹出框************/
/* var btn = [{ name: "确定", action: function () { createDialog({ type: "success", title: "成功", con: "我成功了", width: 500 }, [{ name: "成功", action: function () { createDialog({ type: "warn", title: "警告", con: "我警告你了" }, [{ name: "关闭所有", action: function () { closeDialog("all") } }, { name: "关闭自己", action: function () {closeDialog("self") } }]) } }, { name: "取消", action: function () { closeDialog("self") } }]) } }, { name: "取消", action: function () { closeDialog("all"); } }]
 createDialog({ type: "warn", title: "标题", con: "这是弹出框的类容" ,height:500}, btn); */
 function createDialog(wz,Btn) {	 
            //var dialogCount = $(".systemDialog").length;		
			var dialogCount=BNdialog.searchDialog();			
            var id = "systemDialog" + dialogCount;
			var shadeId="systemDialogShade"+dialogCount;
			var style = "";
            var html = ""; 
			var str="onmousedown=dragDialog($(this),event) onmouseleave=dragDialogStop()";
			if(wz.sign)  //用于删除指定弹出框是用                       
            	html += "<div idNum="+dialogCount+" class='systemDialog dialogDraggleMe "+wz.sign+"'   id="+id+">";
			else
				html += "<div idNum="+dialogCount+" class='systemDialog dialogDraggleMe' id="+id+">";
			if(wz.head&&wz.head=="no")//是否需要头部,默认是有头部的,no 无头部
				html+="";
			else 
            	html += " <div class='systemDialogHead' "+str+"><span class='systemDialogTitle'>" + wz.title + "</span><span class='systemDialogClose'><a class='systemDialoghead_close systemDialoghead_inco' href='javascript:void(0)' onclick=\"closeDialog('self')\">"+transKeyWords(globelVary.languageId,5)+"</a></span></div>";
            //html += "<div class='systemDialogContentBox'>";            
            if (wz.type == "success")
                html += "<div class='systemDialogContent systemDialogContentSuccess'>" + wz.con + "</div>";
            else if (wz.type == "error")
                html += "<div class='systemDialogContent systemDialogContentError'>" + wz.con + "</div>";
            else if (wz.type == "warn")
                html += "<div class='systemDialogContent systemDialogContentWarn'>" + wz.con + "</div>";           
            else if(wz.type=="edit")
				html+=wz.con
			else if (wz.type=="show")
				html += "<div class='systemDialogContent'>" + wz.con + "</div>";
           if(!Btn||Btn.length==0)
		   html+="";
		   else{
            html += "<div class='systemDialogFoot'>";
            for (var i in Btn) {
                html += "<input type='button' value=" + Btn[i].name + "   onclick='systemDialogBtn(" + Btn[i].action + ")'/>";
            }
		  
        // html += "</div>";
		 html += "</div>";
		 }
         html += "</div>";
         if($(".systemDialogShade").length>0)
            $(".systemDialogShade").remove();
		//html += "<div class='systemDialogShade' id="+shadeId+"></div>";
         var browW = $(window).width();
         var browH = $(window).height();
         $("body").append(html);
		 if(wz.type!="edit"){
			 if (wz.width)
					$("#" + id).width(wz.width);
			  if (wz.height)
					$("#" + id).height(wz.height);
		 	}
		else if(wz.type=="edit"){
			var conW=$("#"+id+" .systemDialogContent").outerWidth()+20;
			var conH=$("#"+id+" .systemDialogContent").outerHeight();
			$("#"+id).outerWidth(conW);
			$("#"+id).outerHeight(conH);			
			}
         var dialogW = $("#" + id).outerWidth();
         var dialogH = $("#" + id).outerHeight();
         var left= (browW - dialogW) / 2+$(document).scrollLeft();
         var top = (browH - dialogH) / 2+$(document).scrollTop();
         var zindex = 1000 + dialogCount+2;
         var documentH = $(document).height();		
         //$("#"+shadeId).css({ "opacity": 0.5, "z-index": zindex-1,"height":documentH}).fadeIn(BNdialog.showTime);		
         $("#" + id).css({ "left": left + "px", "top": top + "px", "z-index": zindex }).fadeIn(BNdialog.showTime);
		  BNdialog.createShade($("#" + id)).fadeIn(BNdialog.showTime);
     }
function closeDialog (who) {
             var obj = "";var n=0;
             if (who == "self") {//删除自己
                 obj = $(".systemDialog:last");
             }
             else if (who == "all"||!who)//删除所有
			 {
				 obj = $(".systemDialog");
				 }
                 
			else{//删除指定弹出框,但是此时的遮罩不会消失
				obj=who;n++;
				}
			if(n==0){//正常删除弹出款
				BNdialog.removeDialog(obj,who);
				//BNdialog.closeShade(who);			
				}
			else//删除指定弹出款后
				obj.remove();
                         
         };
		 
         var BNdialog = {
             hideTime: 1000,
             showTime: 1000,			 
			 createShade:function(obj){	//obj是弹出款
			  var idNum=obj.attr("idNum");
			 if(typeof idNum=="undefined"){
				 BNdialog.removeBj();return "stop";
				 } 
			var id="systemDialogShade"+idNum;			 		
			 if($(".systemDialogShade").length==0);
			 	$("body").append("<div class='systemDialogShade' id="+id+"></div>");			
			var zindex=parseInt(obj.css("z-index")-1);	
			 var documentH = $(document).height();		 	
			$(".systemDialogShade").css({"opacity": 0.5,"z-index":zindex,"height":documentH}).attr("id",id);;				
				return $("#"+id);				
				 },
             closeShade: function (who) {
				 var obj=$(".systemDialog:last");
				 BNdialog.createShade(obj);				
             },
             removeBj: function () { $(".systemDialogShade").fadeOut(BNdialog.hideTime, function () { $(this).remove() }) },
             removeDialog: function (obj,who) {
				 if($(".systemDialog").length>1){
					 if(who=="self"){
					 	obj.remove();
						var obj=BNdialog.createShade($(".systemDialog:last"));
					 	if(obj=="stop")return;
					 	else obj.show();
					 }
					 else if(who=="all"){
					 	obj.fadeOut(BNdialog.hideTime, function () { $(this).remove() });
						BNdialog.removeBj();
						}
					 }
				 else if($(".systemDialog").length==1){
                 	obj.fadeOut(BNdialog.hideTime, function () { $(this).remove() });
					BNdialog.removeBj();
					}
             },
		searchDialog:function(){
			var n=0;
				$(".systemDialog").each(function(index) {					
					var zindex=1000+index;
                    $(this).attr({"id":"systemDialog"+index,"idNum":index}).css("z-index",zindex);
					n=index;
                });
			return n+1;
			}  
         };
        function systemDialogBtn(m) {
             m();
         }


function dragDialog(obj,e,dt){	
	var box=obj.closest(".systemDialog");	
	var divLeft=parseFloat(box.offset().left);//div的left
	var divTop=parseFloat(box.offset().top);//div的top	
	var pX=parseFloat(e.clientX);//鼠标坐标x
	var pY=parseFloat(e.clientY);//鼠标坐标y	
	var mDx=pX-divLeft;//鼠标到div做边框的距离
	var mDy=pY-divTop;//鼠标到div顶部的距离
	var divW=box.width();//div的宽度
	var divH=box.height();//div的高度	
	var scrollTop=$(document).scrollTop();
	var scrollLeft=$(document).scrollLeft();
	var documentH=$(document).height();
	var documentW=$(document).width();
	var winW=$(window).width();
	var winH=$(window).height();	
	$(document).bind("mousemove",function(e){
	var x=parseFloat(e.clientX);//鼠标x
	var y=parseFloat(e.clientY);//鼠标y
	var bjH=$("#dialogBodyBj").height();
	var bjW=$("#dialogBodyBj").width();
	var divR=divW-mDx+x;//div右边的x坐标
	var divB=divH-mDy+y;//div底部的y坐标	 
	var scrollTopM=$(document).scrollTop();
	var scrollLeftM=$(document).scrollLeft();
	var newX=x-mDx-(scrollLeft-scrollLeftM);
	var newY=y-mDy-(scrollTop-scrollTopM);
	box.css({"top":newY,"left":newX});
	});	
}

function dragDialogStop()
{$(document).unbind("mousemove");}
$(document).mouseup(function(){$(this).unbind("mousemove");});