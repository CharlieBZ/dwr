/*添加拖动效果*/
//鼠标的按下时
var Dragging=function(validateHandler){ //参数为验证点击区域是否为可移动区域，如果是返回欲移动元素，负责返回null
    var draggingObj=null; //dragging Dialog
    var diffX=0;
    var diffY=0;
    
    function mouseHandler(e){
        switch(e.type){
            case 'mousedown':
                draggingObj=validateHandler(e);//验证是否为可点击移动区域
                if(draggingObj!=null){
                    diffX=e.clientX-draggingObj.offsetLeft;
                    diffY=e.clientY-draggingObj.offsetTop;
                }
                break;
            case 'mousemove':
                if(draggingObj){
                    draggingObj.style.left=(e.clientX-diffX)+'px';
                    draggingObj.style.top=(e.clientY-diffY)+'px';
                }
                break;
            case 'mouseup':
                draggingObj =null;
                diffX=0;
                diffY=0;
                break;
        }
    };
    return {
        enable:function(){
        	var brow=$.browser;
			if(brow.msie){
				document.attachEvent('mousedown',mouseHandler);
				document.attachEvent('mousemove',mouseHandler);
				document.attachEvent('mouseup',mouseHandler);
			}else{
				document.addEventListener('mousedown',mouseHandler);
	            document.addEventListener('mousemove',mouseHandler);
	            document.addEventListener('mouseup',mouseHandler);
			}
        },
        disable:function(){
        	var brow=$.browser;
			if(brow.msie){
				document.detachEvent('mousedown',mouseHandler);
				document.detachEvent('mousemove',mouseHandler);
				document.detachEvent('mouseup',mouseHandler);
			}else{
				document.removeEventListener('mousedown',mouseHandler);
	            document.removeEventListener('mousemove',mouseHandler);
	            document.removeEventListener('mouseup',mouseHandler);
			}
        }
    }
}

function getDraggingDialog(e){
    var target=e.target;
    while(target && target.className.indexOf('dialog-title')==-1){
        target=target.offsetParent;
    }
    if(target!=null){
        return target.offsetParent;
    }else{
        return null;
    }
}
/*遍历iframe*/
function forIframe(data_id){
	var iframes = $(".LM-right-body iframe");
	for(var i=0;i<iframes.length;i++){
		if($(iframes[i]).attr("data-id")==data_id){
			return $(iframes[i]);
		}
	}
	return false;
}
/*右键菜单*/
function contextmenu(e){
	$(".LM-contextMenu").remove();
	var contextmenuHtml='<ul class="LM-contextMenu"><li class="LM-refresh">刷新</li><li class="LM-closethis">关闭当前</li><li class="LM-closeother">关闭其它</li></ul>';
	var x=e.clientX+1;
	var y=e.clientY+1;
	var data_id=$(e.target).attr('data-id');
	$("body").append(contextmenuHtml);
	$(".LM-contextMenu").css({"top":y+"px","left":x+"px"});
	/*刷新*/
	$(".LM-contextMenu").on("click",function(){
		if($.type(forIframe(data_id))){
			forIframe(data_id).attr('src',data_id)
		}
	});
	/*关闭当前*/
	$(".LM-closethis").on("click",function(){
		$.dialog.msgWarn("暂未实现");
	});
	/*关闭其它*/
	$(".LM-closeother").on("click",function(){
		var titles=$(e.target).siblings(".LM-frame-title");
		var iframes=$(".LM-right-body iframe");
		$(e.target).siblings(".LM-frame-title").remove();
		for(var i=0;i<titles.length;i++){
			for(var j=0;j<iframes.length;j++){
				if($(titles[i]).attr("data-id")==$(iframes[j]).attr("data-id")){
					$(iframes[j]).remove();
				}
			}
		}
	});
}

/*子页面绑定页签的右键菜单*/
function parentcontextmenu(e){
	$(".LM-contextMenu").remove();
	var contextmenuHtml='<ul class="LM-contextMenu"><li class="LM-refresh">刷新</li><li class="LM-closethis">关闭当前</li><li class="LM-closeother">关闭其它</li></ul>';
	var x=e.clientX+1;
	var y=e.clientY+1;
	var data_id=$(e.target).attr('data-id');
	parent.$("body").append(contextmenuHtml);
	parent.$(".LM-contextMenu").css({"top":y+"px","left":x+"px"});
	/*刷新*/
	parent.$(".LM-contextMenu").on("click",function(){
		if($.type(forIframe(data_id))){
			parent.forIframe(data_id).attr('src',data_id)
		}
	});
	/*关闭当前*/
	parent.$(".LM-closethis").on("click",function(){
		parent.$.dialog.msgWarn("暂未实现");
	});
	/*关闭其它*/
	parent.$(".LM-closeother").on("click",function(){
		var titles=$(e.target).siblings(".LM-frame-title");
		var iframes=$(".LM-right-body iframe");
		$(e.target).siblings(".LM-frame-title").remove();
		for(var i=0;i<titles.length;i++){
			for(var j=0;j<iframes.length;j++){
				if($(titles[i]).attr("data-id")==$(iframes[j]).attr("data-id")){
					$(iframes[j]).remove();
				}
			}
		}
	});
}

$(function(){
	/*非空提示*/
//	$("[required]").blur(function(){
//		var left = $(this).offset().left;
//		var top = ($(this).offset().top+3)+"px";
//		var width = $(this).width();
//		var tipesWidth = (left+width+15)+"px";
//		if($(this).next("div[class=send]").length>0){
//			$(this).next("div[class=send]:eq(0)").remove();
//		}
//		if($(this).val()==""){
//			$(this).after('<div class="send" style="left:'+tipesWidth+';top:'+top+';">'+$(this).attr("alt")+'<div class="arrow"></div></div>');
//			return false;
//		}
//	});

	/*form表单校验*/
	$.fn.formCheck=function(options){
		var isResult = true;
		for(var key1 in options){
			var isEmpty = options[key1].isempty;
			var reg = new RegExp(options[key1].code);
			var text = options[key1].text;
			
			var left = this.find("input[name="+key1+"]").offset().left;
			var top = (this.find("input[name="+key1+"]").offset().top+3)+"px";
			var width = this.find("input[name="+key1+"]").width();
			var tipesWidth = (left+width+15)+"px";
			if(this.find("input[name="+key1+"]").next("div[class=send]").length>0){
				this.find("input[name="+key1+"]").next("div[class=send]:eq(0)").remove();
			}
			var tips = '<div class="send" style="left:'+tipesWidth+';top:'+top+';">'+text+'<div class="arrow"></div></div>';
			if(!isEmpty){
				if(options[key1].code==undefined){
					if(this.find("input[name="+key1+"]").val()==""){
						this.find("input[name="+key1+"]").after(tips);
						isResult = false;
					}
				}else{
					if(this.find("input[name="+key1+"]").val()==""){
						this.find("input[name="+key1+"]").after('<div class="send" style="left:'+tipesWidth+';top:'+top+';">不能为空<div class="arrow"></div></div>');
						isResult = false;
					}else if(!reg.test(this.find("input[name="+key1+"]").val())){
						this.find("input[name="+key1+"]").after(tips);
						isResult = false;
					}
				}
			}else{
				if(this.find("input[name="+key1+"]").val()==""){
				}else if(!reg.test(this.find("input[name="+key1+"]").val())){
					this.find("input[name="+key1+"]").after(tips);
					isResult = false;
				}
			}
		}
		return isResult;
	}
	
	/*清空*/
	$(".clear").click(function(){
		$(this).prev().val("");
	});
	
	/*左侧菜单*/
		/*初始化*/
	$(".LM-left-menutitle").prepend('<span></span>');
	$(".LM-left-menuList ul .LM-folder-ico").prepend('<span class="LM-menu-viewIco"></span>');
	$(".LM-menu-header").prepend('<span class="LM-menu-headerIco"></span>');
	$(".LM-menu-header").click(function(){
		$(this).siblings("ul").toggle("slow");
	});
	
	//左侧菜单单击事件
	$(".LM-left-menuList ul li").click(function(){
		var text=$(this).text();
		data_id=$(this).attr("data-id");
		if(data_id!=undefined){
			var array=$(".LM-right-menu a");
			var isExis=false;
			//循环判断页面是否已经打开
			for(var i=0;i<array.length;i++){
				if($(array[i]).attr("data-id")==data_id){
					isExis=true;
				}
			}
			if(!isExis){
				$(".LM-right-menu a").css({"background":"transparent"});
				$(".LM-right-menu").append('<a class="LM-frame-title" style="background:#fff;border-color:'+bordercolor+';" href="javascript:void(0)" data-id="'+data_id+'">'+text+'<span class="LM-close-iframe"></span></a>');
				$(".LM-right-body iframe").hide();
				$(".LM-right-body").append('<iframe data-id="'+data_id+'" src="'+data_id+'" width="100%" height="100%" scrolling="auto" style="display:block;"></iframe>');
				//绑定页签的点击事件
				$(".LM-frame-title").on("click",function(){
					$(this).css({"background":"#fff"});
					$(this).siblings().css({"background":"transparent"});
					data_id=$(this).attr("data-id");
					if($.type(forIframe(data_id))){
						forIframe(data_id).show();
						forIframe(data_id).siblings().hide();
					}
				})
				/*绑定页签右键事件*/
				$(".LM-frame-title").on('contextmenu',function(e){
					contextmenu(e);
					return false;
				})
				//绑定关闭事件
				$(".LM-close-iframe").on("click",function(){
					data_id=$(this).parent().attr("data-id");
					var id="";
					if($.type(forIframe(data_id))){
						if($(this).parent().next().length!=0){
							$(this).parent().next().css({"background":"#fff"});
							$(forIframe(data_id)).next().show();
							id=$(this).parent().next().attr("data-id");
							$(this).parent().remove();
							$(forIframe(data_id)).remove();
						}else{
							$(this).parent().prev().css({"background":"#fff"});
							$(forIframe(data_id)).prev().show();
							id=$(this).parent().prev().attr("data-id");
							$(this).parent().remove();
							$(forIframe(data_id)).remove();
						}
					}
					data_id=id;
				})
			}else{
				$.dialog.msgWarn("该页面已经打开!");
			}
			$(".LM-left-menu .LM-left-menuHide").click();
		}
	});
	
	/*下转打开*/
	$.fn.openTab=function(data_id,tabName){
		var array=parent.$(".LM-right-menu a");
		var array=parent.$(".LM-right-menu a");
		var isExis=false;
		//循环判断页面是否已经打开
		for(var i=0;i<array.length;i++){
			if(parent.$(array[i]).attr("data-id")==data_id){
				isExis=true;
			}
		}
		if(!isExis){
			parent.$(".LM-right-menu a").css({"background":"transparent"});//设置其他页签的背景色
			parent.$(".LM-right-menu").append('<a class="LM-frame-title" style="background:#fff;border-color:'+bordercolor+';" href="javascript:void(0)" data-id="'+data_id+'">'+tabName+'<span class="LM-close-iframe"></span></a>');
			parent.$(".LM-right-body iframe").hide();//隐藏所有的iframe
			parent.$(".LM-right-body").append('<iframe data-id="'+data_id+'" src="'+data_id+'" width="100%" height="100%" scrolling="auto" style="display:block;"></iframe>');
			/*绑定页签右键事件*/
			parent.$(".LM-frame-title").on('contextmenu',function(e){
				parentcontextmenu(e);
				return false;
			})
			//绑定页签的点击事件
			parent.$(".LM-frame-title").on("click",function(){
				$(this).css({"background":"#fff"});
				$(this).siblings().css({"background":"transparent"});
				data_id=$(this).attr("data-id");
				if($.type(parent.forIframe(data_id))){
					parent.forIframe(data_id).show();
					parent.forIframe(data_id).siblings().hide();
				}
			})
			//绑定关闭事件
			parent.$(".LM-close-iframe").on("click",function(){
				data_id=$(this).parent().attr("data-id");
				var id="";
				if($.type(parent.forIframe(data_id))){
					if($(this).parent().next().length!=0){
						$(this).parent().next().css({"background":"#fff"});
						$(parent.forIframe(data_id)).next().show();
						id=$(this).parent().next().attr("data-id");
						$(this).parent().remove();
						$(parent.forIframe(data_id)).remove();
					}else{
						$(this).parent().prev().css({"background":"#fff"});
						$(parent.forIframe(data_id)).prev().show();
						id=$(this).parent().prev().attr("data-id");
						$(this).parent().remove();
						$(parent.forIframe(data_id)).remove();
					}
				}
				data_id=id;
			})
		}else{
			parent.$.dialog.msgWarn("该页面已经打开!");
		}
	}
	
	/*隐藏左侧菜单*/
	$(".LM-left-menu .LM-left-menuHide").click(function(){
		var width = -$(".LM-left-menu").width()-2+"px";
		$(".LM-left-menu").css({"margin-left":width});
		$(this).toggle();$(".LM-left-menu .LM-left-menuShow").toggle();
	});
	/*显示左侧菜单*/
	$(".LM-left-menu .LM-left-menuShow").click(function(){
		$(".LM-left-menu").css({"margin-left":"0"});
		$(this).toggle();$(".LM-left-menu .LM-left-menuHide").toggle();
	});
	
	/*右侧*/
		//切换主题颜色
	$(".LM-navbar-bd li").click(function(){
		bgcolor = $(this).css("background-color");
		bordercolor = $(this).attr("data-color");
		$(".LM-left-menutitle,.LM-right-top,.LM-right-foot,.LM-left-menuList,.LM-right-menu a,.LM").css({"background":bgcolor});
		var array=$(".LM-right-menu a");
		for(var i=0;i<array.length;i++){
			if($(array[i]).attr("data-id")==data_id){
				$(array[i]).css({"background":"#fff"});
			}
		}
		if(array.length==1){
			$(array[0]).css({"background":"#fff"});
		}
		$("*").css({"border-color":bordercolor});
	});
	/*右侧菜单*/
		/*主页*/
	$(".LM-frame-home").click(function(){
		$(this).css({"background":"#fff"});
		$(this).siblings().css({"background":bgcolor});
		data_id=$(this).attr("data-id");
		var iframes = $(".LM-right-body iframe");
		for(var i=0;i<iframes.length;i++){
			if($(iframes[i]).attr("data-id")==data_id){
				$(iframes[i]).show();
				$(iframes[i]).siblings().hide();
			}
		}
	});
	$(".LM-frame-home").contextmenu(function(e){
		contextmenu(e);
		return false;
	})
	/*取消右键菜单*/
	$("*").click(function(){
		$(".LM-contextMenu").remove();
	});
});

(function($){
	var window_H=$(window).height(),window_W=$(window).width();
	$.dialog = {
		_op:{url:"",title:"窗口",height:300,width:580,buttons:null,max:true},
		open:function(options){
			var op = $.extend({},$.dialog._op, options);
			var top = ($(window).height()-op.height)/2-50;
			var left = ($(window).width()-op.width)/2;
			$("body").css({"overflow":"hidden"}).append('<div class="modal-bg"></div>');
			$("body").append("<div class='dialog-frame'><div class='dialog-tools'></div><h3 class='dialog-title'><span class='dialog-ico'></span>"+op.title+"</h3></div>");
			if(op.max){
				$(".dialog-frame .dialog-tools").append("<button class='dialog-max'></button><button class='dialog-min'></button>");
			}
			$(".dialog-frame .dialog-tools").append("<button class='dialog-close'></button>");
			$(".dialog-frame").css({"width":op.width+"px","background":"white","top":top+"px","left":left+"px"});
			$('.dialog-frame').append('<div class="dialog-contentBox"><iframe id="dialogName" src="'+op.url+'" class="dialog-content"></iframe></div>');
			$(".dialog-content").css({"height":op.height+"px","width":"100%"});
			if(op.buttons){
				$('.dialog-frame').append('<div class="dialog-btn"></div>');
				$(op.buttons).each(function(i,item){
					var btn = '<button class="btn btn-default btn-inner">'+item.text+'</button>';
					$('.dialog-btn').append(btn);
					$(".dialog-btn button:eq("+i+")").on("click",function(){
						item.onclick($.dialog);
					})
				})
			}
			$(".dialog-frame .dialog-tools .dialog-close").click(function(){
				$.dialog.close();
			});
			$(".dialog-frame .dialog-tools .dialog-max").click(function(){
				$.dialog.max();
			});
			$(".dialog-frame .dialog-tools .dialog-min").click(function(){
				$.dialog.min(options);
			});
            Dragging(getDraggingDialog).enable();
		},
		close:function(){
			$(".modal-bg:eq(0)").remove();
			$(".dialog-frame").remove();
			$("body").css({"overflow":"auto"});
		},
		callprame:function(){
			//返回iframe中页面的文档对象
			return document.getElementById('dialogName').contentWindow;
		},
		max:function(){
			$(".dialog-frame").css({"width":"100%","top":0,"left":0});
			$(".dialog-frame .dialog-tools .dialog-max").hide();
			$(".dialog-frame .dialog-tools .dialog-min").show();
			$(".dialog-content").css({"height":($(window).height()-100)+"px","width":"100%"});
		},
		min:function(options){
			var op = $.extend({},$.dialog._op, options);
			var top = ($(window).height()-op.height)/2-50;
			var left = ($(window).width()-op.width)/2;
			$(".dialog-frame").css({"width":op.width+"px","background":"white","top":top+"px","left":left+"px"});
			$(".dialog-content").css({"height":op.height+"px","width":"100%"});
			$(".dialog-frame .dialog-tools .dialog-max").show();
			$(".dialog-frame .dialog-tools .dialog-min").hide();
		},
		msgSuccess:function(msg){
			parent.$(".modal-frame").remove();
			parent.$(".modal-bg").remove();
			if(!msg){
				msg="";
			}
			parent.$("body").css("overflow","hidden").append('<div class="modal-bg" id="msgSuccess"></div><div class="modal-frame"><div><div class="modal-success"><span class="LM-modal-successIco"></span>成功</div><div class="modal-msg">'+msg+'</div></div><div class="modal-btn"><button class="close-frame btn btn-default">确定</button></div></div>');
			var windowW = $(window).width();
			var modalW = $(".modal-frame").width();
			parent.$(".modal-frame").css({"left":((windowW-modalW)/2/windowW*100)+"%"}).addClass("animated slideInDown");
			parent.$(".close-frame").click(function(){
				parent.$(".modal-bg").remove();
				if(navigator.appName=="Microsoft Internet Explorer"){
					parent.$(".modal-frame").remove();
				}else{
					parent.$(".modal-frame").addClass("animated slideOutUp");
				}
				parent.$("#msgSuccess").remove();
				parent.$("body").css("overflow","auto");
			});
		},
		msgWarn:function(msg){
			parent.$(".modal-frame").remove();
			parent.$(".modal-bg").remove();
			if(!msg){
				msg="";
			}
			parent.$("body").css("overflow","hidden").append('<div class="modal-bg" id="msgWarn"></div><div class="modal-frame"><div><div class="modal-warn"><span class="LM-modal-warnIco"></span>警告</div><div class="modal-msg">'+msg+'</div></div><div class="modal-btn"><button class="close-frame btn btn-default">确定</button></div></div>');
			var windowW = $(window).width();
			var modalW = $(".modal-frame").width();
			parent.$(".modal-frame").css({"left":((windowW-modalW)/2/windowW*100)+"%"}).addClass("animated slideInDown");
			parent.$(".close-frame").click(function(){
				parent.$(".modal-bg").remove();
				if(navigator.appName=="Microsoft Internet Explorer"){
					parent.$(".modal-frame").remove();
				}else{
					parent.$(".modal-frame").addClass("animated slideOutUp");
				}
				parent.$("#msgWarn").remove();
				parent.$("body").css("overflow","auto");
				
			});
		},
		msgError:function(msg){
			parent.$(".modal-frame").remove();
			parent.$(".modal-bg").remove();
			if(!msg){
				msg="";
			}
			parent.$("body").css("overflow","hidden").append('<div class="modal-bg" id="msgError"></div><div class="modal-frame"><div><div class="modal-error"><span class="LM-modal-errorIco"></span>错误</div><div class="modal-msg">'+msg+'</div></div><div class="modal-btn"><button class="close-frame btn btn-default">确定</button></div></div>');
			var windowW = $(window).width();
			var modalW = $(".modal-frame").width();
			parent.$(".modal-frame").css({"left":((windowW-modalW)/2/windowW*100)+"%"}).addClass("animated slideInDown");
			parent.$(".close-frame").click(function(){
				parent.$(".modal-bg").remove();
				if(navigator.appName=="Microsoft Internet Explorer"){
					parent.$(".modal-frame").remove();
				}else{
					parent.$(".modal-frame").addClass("animated slideOutUp");
				}
				parent.$("#msgError").remove();
				parent.$("body").css("overflow","auto");
			});
		},
		msgConfirm:function(options){
			/**
			 * options={content:"确定输出？",callback:function(e){}；
			 * e:true || false
			 */
			parent.$(".modal-frame").remove();
			parent.$("#msgConfirm").remove();
			if(!options){
				options="";
			}
			parent.$("body").css("overflow","hidden").append('<div class="modal-bg" id="msgConfirm"></div><div class="modal-frame"><div><div class="modal-confirm"><span class="LM-modal-confirm"></span>提示</div><div class="modal-msg">'+options.content+'</div></div><div class="modal-btn"><button class="ok-frame btn btn-default">确定</button>  <button class="close-frame btn btn-default">取消</button></div></div>');
			var windowW = $(window).width();
			var modalW = $(".modal-frame").width();
			parent.$(".modal-frame").css({"left":((windowW-modalW)/2/windowW*100)+"%"}).addClass("animated slideInDown");
			
			if($.type(options.callback) == "function"){
				/*确定*/
				parent.$(".ok-frame").click(function(){
					parent.$(".modal-frame").remove();
					parent.$("#msgConfirm").remove();
					options.callback(true);
				});
				/*取消*/
				parent.$(".close-frame").click(function(){
					if(navigator.appName=="Microsoft Internet Explorer"){
						parent.$(".modal-frame").remove();
					}else{
						parent.$(".modal-frame").addClass("animated slideOutUp");
					}
					parent.$("#msgConfirm").remove();
					parent.$("body").css("overflow","auto");
					options.callback(false);
				});
			}
		},
		imgPreview:function(url,servletUrl){
			parent.$(".LM-imgDiv").remove();
			parent.$("#LM-imgPreview").remove();
			parent.$("LM-imgClose").remove();
			var index = url.lastIndexOf(".");
			var suffix = url.substring(index);
			
			if(suffix==".bmp"||suffix==".png"||suffix==".gif"||suffix==".jpg"||suffix==".jpeg"){
				parent.$("body").css("overflow","hidden").append('<div class="modal-bg" id="LM-imgPreview"></div><div class="LM-imgDiv"></div><span class="LM-imgClose"></span>');
				parent.$(".LM-imgDiv").append('<img src="'+url+'" />');
//				var imgDiv_H=parent.$(".LM-imgDiv").height();
//				var imgDiv_W=parent.$(".LM-imgDiv").width();
//				parent.$(".LM-imgDiv").css({"position":"fixed","top":(window_H-imgDiv_H)/2+"px","left":(window_W-imgDiv_W)/2+"px"});
			}else if(suffix==".asp"||suffix==".css"||suffix==".js"||suffix==".json"||suffix==".txt"||suffix==".xml"){
				parent.$("body").css("overflow","hidden").append('<div class="modal-bg" id="LM-imgPreview"></div><div class="LM-imgDiv"></div><span class="LM-imgClose"></span>');
				parent.$(".LM-imgDiv").load(url);
			}else if(suffix==".doc"||suffix==".docx"||suffix==".xlsx"||suffix==".xls"){
				parent.$("body").css("overflow","hidden").append('<div class="modal-bg" id="LM-imgPreview"></div><img class="wait" src="LM/img_gif/wait.gif" />');
				$.ajax({
					url:servletUrl,
					type:"post",
					dataType:"json",
					data:{fileUrl:url},
					success:function(response){
						parent.$("#LM-imgPreview").remove();
						parent.$(".wait").remove();
						window.open(response.htmlUrl);
					}
				});
			}
			$(".LM-imgClose").click(function(){
				parent.$("body").css("overflow","auto")
				parent.$(".LM-imgClose").remove();
				parent.$(".LM-imgDiv").remove();
				parent.$("#LM-imgPreview").remove();
			});
		}
	}
})(jQuery);
/**
 @Name : jeDate v2.0 日期控件
 @Author: chne guojun
 @Date: 2015-12-28
 @QQ群：516754269
 @Site：https://github.com/singod/jeDate
 */
(function(win) {
    var jeDt = {}, doc = document, Cell = "#jedatebox";
    /* (tag), (#id), (.className) ,(tag > .className) ,(tag > tag) ,(#id > tag.className) ,
	   (.className tag) ,(tag, tag, #id) ,(tag#id.className) ,(span > * > b) ,(input[name=radio]) 
	*/
    var QD = jeDt.query =function(){function r(c,g){g=g||document;if(!/^[\w\-_#]+$/.test(c)&&g.querySelectorAll)return m(g.querySelectorAll(c));if(-1<c.indexOf(",")){for(var d=c.split(/,/g),a=[],b=0,e=d.length;b<e;++b)a=a.concat(r(d[b],g));return y(a)}var d=c.match(z),a=d.pop(),e=(a.match(t)||k)[1],f=!e&&(a.match(u)||k)[1],b=!e&&(a.match(v)||k)[1],a=c.match(/\[(?:[\w\-_][^=]+)=(?:[\'\[\]\w\-_]+)\]/g);if(f&&!a&&!b&&g.getElementsByClassName)b=m(g.getElementsByClassName(f));else{b=!e&&m(g.getElementsByTagName(b||"*"));f&&(b=w(b,"className",RegExp("(^|\\s)"+f+"(\\s|$)")));if(e)return(d=g.getElementById(e))?[d]:[];if(a)for(e=0;e<a.length;e++)var f=(a[e].match(x)||k)[1],h=(a[e].match(x)||k)[2],h=h.replace(/\'/g,"").replace(/\-/g,"\\-").replace(/\[/g,"\\[").replace(/\]/g,"\\]"),b=w(b,f,RegExp("(^"+h+"$)"))}return d[0]&&b[0]?p(d,b):b}function m(c){try{return Array.prototype.slice.call(c)}catch(g){for(var d=[],a=0,b=c.length;a<b;++a)d[a]=c[a];return d}}function p(c,g,d){var a=c.pop();if("\x3e"===a)return p(c,g,!0);for(var b=[],e=-1,f=(a.match(t)||k)[1],h=!f&&(a.match(u)||k)[1],a=!f&&(a.match(v)||k)[1],m=-1,q,l,n,a=a&&a.toLowerCase();q=g[++m];){l=q.parentNode;do if(n=(n=(n=!a||"*"===a||a===l.nodeName.toLowerCase())&&(!f||l.id===f))&&(!h||RegExp("(^|\\s)"+h+"(\\s|$)").test(l.className)),d||n)break;while(l=l.parentNode);n&&(b[++e]=q)}return c[0]&&b[0]?p(c,b):b}function w(c,g,d){for(var a=-1,b,e=-1,f=[];b=c[++a];)d.test(b.getAttribute(g))&&(f[++e]=b);return f}var z=/(?:[\*\w\-\\.#]+)+(?:\[(?:[\w\-_][^=]+)=(?:[\'\[\]\w\-_]+)\])*|\*|>/gi,u=/^(?:[\w\-_]+)?\.([\w\-_]+)/,t=/^(?:[\w\-_]+)?#([\w\-_]+)/,v=/^([\w\*\-_]+)/,k=[null,null,null],x=/\[([\w\-_][^=]+)=([\'\[\]\w\-_]+)\]/,y=function(){var c=+new Date,g=function(){var d=1;return function(a){var b=a[c],e=d++;return b?!1:(a[c]=e,!0)}}();return function(d){for(var a=d.length,b=[],e=-1,f=0,h;f<a;++f)h=d[f],g(h)&&(b[++e]=h);c+=1;return b}}();return r}();
	
    jeDt.each = function(arr, fn) {
        var i = 0, len = arr.length;
        for (;i < len; i++) {
            if (fn(i, arr[i]) === false) {
                break;
            }
        }
    };
    jeDt.extend = function() {
        var _extend = function me(dest, source) {
            for (var name in dest) {
                if (dest.hasOwnProperty(name)) {
                    //当前属性是否为对象,如果为对象，则进行递归
                    if (dest[name] instanceof Object && source[name] instanceof Object) {
                        me(dest[name], source[name]);
                    }
                    //检测该属性是否存在
                    if (source.hasOwnProperty(name)) {
                        continue;
                    } else {
                        source[name] = dest[name];
                    }
                }
            }
        };
        var _result = {}, arr = arguments;
        //遍历属性，至后向前
        if (!arr.length) return {};
        for (var i = arr.length - 1; i >= 0; i--) {
            _extend(arr[i], _result);
        }
        arr[0] = _result;
        return _result;
    };
    jeDt.trim = function(str) {
        str = str || "";
        return str.replace(/^\s|\s$/g, "").replace(/\s+/g, " ");
    };
    jeDt.attr = function(elem, key, val) {
        if (typeof key === "string" && typeof val === 'undefined') {
            return elem.getAttribute(key);
        } else {
            elem.setAttribute(key, val);
        }
        return this;
    };
    jeDt.stopmp = function(e) {
        e = e || win.event;
        e.stopPropagation ? e.stopPropagation() :e.cancelBubble = true;
        return this;
    };
    //查询样式是否存在
    jeDt.hasClass = function(elem, cls) {
        elem = elem || {};
        return new RegExp("\\b" + cls + "\\b").test(elem.className);
    };
    //添加样式
    jeDt.addClass = function(elem, cls) {
        elem = elem || {};
        jeDt.hasClass(elem, cls) || (elem.className += " " + cls);
        elem.className = jeDt.trim(elem.className);
        return this;
    };
    //删除样式
    jeDt.removeClass = function(elem, cls) {
        elem = elem || {};
        if (jeDt.hasClass(elem, cls)) {
            elem.className = elem.className.replace(new RegExp("(\\s|^)" + cls + "(\\s|$)"), "");
        }
        return this;
    };
    //事件监听器
    jeDt.on = function(obj, type, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(type, fn, false);
        } else if (obj.attachEvent) {
            obj.attachEvent("on" + type, fn);
        } else {
            obj["on" + type] = fn;
        }
    };
    //阻断mouseup
    jeDt.stopMosup = function(evt, elem) {
        if (evt !== "mouseup") {
            jeDt.on(elem, "mouseup", function(ev) {
                jeDt.stopmp(ev);
            });
        }
    };
    jeDt.html = function(elem, value) {
        if (typeof value != "undefined" || value !== undefined && elem.nodeType === 1) {
            elem.innerHTML = value;
        } else {
            return elem.innerHTML;
        }
        return this;
    };
    jeDt.text = function(elem, value) {
        if (value !== undefined && elem.nodeType === 1) {
            document.all ? elem.innerText = value :elem.textContent = value;
        } else {
            var emText = document.all ? elem.innerText :elem.textContent;
            return emText;
        }
        return this;
    };
    jeDt.val = function(elem, value) {
        if (value !== undefined && elem.nodeType === 1) {
            elem.value = value;
        } else {
            return elem.value;
        }
        return this;
    };
    jeDt.scroll = function(type) {
        type = type ? "scrollLeft" :"scrollTop";
        return doc.body[type] | doc.documentElement[type];
    };
    jeDt.winarea = function(type) {
        return doc.documentElement[type ? "clientWidth" :"clientHeight"];
    };
	jeDt.type = function (obj, type) {
		var types = type.replace(/\b(\w)|\s(\w)/g,function(m){return m.toUpperCase()});
        return Object.prototype.toString.call(obj) === '[object ' + types + ']';
	}
    //转换日期格式
    jeDt.parse = function(ymd, hms, format) {
        ymd = ymd.concat(hms);
        var format = format, _this = this;
        return format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(str, index) {
            ymd.index = ++ymd.index | 0;
            return jeDt.digit(ymd[ymd.index]);
        });
    };
    //初始化日期
    jeDt.nowDate = function(timestamp, format) {
        var De = new Date(timestamp | 0 ? function(tamp) {
            return tamp < 864e5 ? +new Date() + tamp * 864e5 :tamp;
        }(parseInt(timestamp)) :+new Date());
        return jeDt.parse([ De.getFullYear(), De.getMonth() + 1, De.getDate() ], [ De.getHours(), De.getMinutes(), De.getSeconds() ], format);
    };
    jeDt.montharr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
    //判断元素类型
    jeDt.isValHtml = function(that) {
        return /textarea|input/.test(that.tagName.toLocaleLowerCase());
    };
    jeDt.weeks = [ "日", "一", "二", "三", "四", "五", "六" ];
    //节日
    jeDt.festival = function(md, n) {
        var str = "";
        switch (md) {
          case "01.01": str = "元旦"; break;
          case "02.14": str = "情人"; break;
          case "03.08": str = "妇女"; break;
          case "04.05": str = "清明"; break;
          case "05.01": str = "劳动"; break;
          case "06.01": str = "儿童"; break;
          case "08.01": str = "建军"; break;
          case "09.10": str = "教师"; break;
          case "10.01": str = "国庆"; break;
          case "12.24": str = "平安"; break;
          case "12.25": str = "圣诞"; break;
          default: str = n; break;
        }
        return str;
    };
    //补齐数位
    jeDt.digit = function(num) {
        return num < 10 ? "0" + (num | 0) :num;
    };
    //显示隐藏层
    jeDt.shdeCell = function(type) {
        type ? QD(Cell)[0].style.display = "none" :QD(Cell)[0].style.display = "block";
    };

    var config = {
        dateCell:"#dateval",
        format:"YYYY-MM-DD hh:mm:ss", //日期格式
        minDate:"1900-01-01 00:00:00", //最小日期
        maxDate:"2099-12-31 23:59:59", //最大日期
        isinitVal:false, //是否初始化时间
        isTime:false, //是否开启时间选择
        isClear:true, //是否显示清空
        festival:false, //是否显示节日
        zIndex:999,  //弹出层的层级高度
		marks:null, //给日期做标注
        choosefun:function(val) {},  //选中日期后的回调
		clearfun:function(val) {},   //清除日期后的回调
		okfun:function(val) {}       //点击确定后的回调
    }, InitDate = function(options) {
        var that = this, newConf = JSON.parse(JSON.stringify(config));
        that.config = jeDt.extend(newConf, options);
        that.init();
    };
    var jeDate = function(options) {
        return new InitDate(options || {});
    };
    InitDate.prototype = {
        init:function() {
        	
            var that = this, opts = that.config;
            for(var i=0;i<QD(opts.dateCell).length;i++){
	            var self = QD(opts.dateCell)[i], elem, devt, even = window.event, target;
	            var dateDiv = doc.createElement("div");
	            if (!QD(Cell)[i]) {
	                dateDiv.className = dateDiv.id = Cell.replace("#", "");
	                dateDiv.style.zIndex = opts.zIndex;
	                doc.body.appendChild(dateDiv);
	            }
	            try {
	                target = even.target || even.srcElement || {};
	            } catch (e) {
	                target = {};
	            }
	            elem = opts.dateCell ? QD(opts.dateCell)[i] :target;
            
            
	            var nowDateVal = jeDt.nowDate(null, opts.format);
	            if (opts.isinitVal) {
	                (jeDt.val(self) || jeDt.text(self)) == "" ? jeDt.isValHtml(self) ? jeDt.val(self, nowDateVal) :jeDt.text(self, nowDateVal) :jeDt.isValHtml(self) ? jeDt.val(self) :jeDt.text(self);
	            }
	            if (even && target.tagName) {
	                if (!elem || elem === jeDt.elem) return;
	                jeDt.stopMosup(even.type, elem);
	                jeDt.stopmp(even);
	                that.setHtml(opts, self);
	            } else {
	                devt = opts.event || "click";
	                jeDt.each((elem.length | 0) > 0 ? elem :[ elem ], function(ii, cel) {
	                    jeDt.stopMosup(devt, that);
	                    jeDt.on(cel, devt, function(ev) {
	                        jeDt.stopmp(ev);
	                        if (cel !== jeDt.elem) that.setHtml(opts, self);
	                    });
	                });
	            }
            }
        },
        setHtml:function(opts, self) {
            var that = this, weekHtml = "", date = new Date(), nowDateVal = jeDt.nowDate(null, opts.format), isformat = opts.format.match(/\w+|d+/g).join("-") == "YYYY-MM" ? true :false;
            var initVal = opts.isinitVal ? jeDt.isValHtml(self) ? jeDt.val(self) :jeDt.text(self) :(jeDt.val(self) || jeDt.text(self)) == "" ? nowDateVal :jeDt.isValHtml(self) ? jeDt.val(self) :jeDt.text(self);
            if (jeDt.val(self) != "" || jeDt.text(self) != "") {
                var Tms = initVal.match(/\d+/g);
            } else {
                var Tms = [ date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds() ];
            }
            var topymSty = !isformat ? '<div class="jedateym" style="width:50%;"><i class="prev triangle yearprev"></i><span class="jedateyy" data-ym="24"><em class="jedateyear"></em><em class="pndrop"></em></span><i class="next triangle yearnext"></i></div>' + '<div class="jedateym" style="width:50%;"><i class="prev triangle monthprev"></i><span class="jedatemm" data-ym="12"><em class="jedatemonth"></em><em class="pndrop"></em></span><i class="next triangle monthnext"></i></div>' :'<div class="jedateym" style="width:100%;"><i class="prev triangle ymprev"></i><span class="jedateyy"><em class="jedateyearmonth"></em></span><i class="next triangle ymnext"></i></div>';
            var datetopStr = '<div class="jedatetop">' + topymSty + "</div>";
            var dateymList = !isformat ? '<div class="jedatetopym" style="display: none;">' + '<ul class="ymdropul"></ul><p><span class="jedateymchle">&#8592;</span><span class="jedateymchri">&#8594;</span><span class="jedateymchok">关闭</span></p>' + "</div>" :'<ul class="jedaym"></ul>';
            var dateriList = '<ol class="jedaol"></ol><ul class="jedaul"></ul>';
            var bothmsStr = !isformat ? '<ul class="botflex jedatehms"><li><em data-hms="24"></em><i>:</i></li><li><em data-hms="60"></em><i>:</i></li><li><em data-hms="60"></em></li></ul>' + '<div class="botflex jedatebtn"><span class="jedateclear" style="width:31%;">清空</span><span class="jedatetodaymonth" style="width:31%;">今天</span><span class="jedateok" style="width:31%;">确认</span></div>' :'<div class="botflex jedatebtn"><span class="jedateclear" style="width:31%;">清空</span><span class="jedatetodaymonth" style="width:31%;">本月</span><span class="jedateok" style="width:31%;">确认</span></div>';
            var datebotStr = '<div class="jedatebot">' + bothmsStr + "</div>";
            var dateHtmStr = isformat ? datetopStr + dateymList + datebotStr :datetopStr + dateymList + dateriList + datebotStr + '<div class="jedateprophms"></div>';
            jeDt.html(QD(Cell)[0], dateHtmStr);
            opts.isClear ? "" :QD(Cell + " .jedatebot .jedateclear")[0].style.display = "none";
            if (opts.isTime) {
                var dhmsArr = jeDt.val(self) != "" || jeDt.text(self) != "" ? [ Tms[3], Tms[4], Tms[5] ] :[ date.getHours(), date.getMinutes() + 1, date.getSeconds() ];
                jeDt.each(QD(Cell + " .jedatebot .jedatehms em"), function(i, cls) {
                    jeDt.html(cls, jeDt.digit(dhmsArr[i]));
                });
            } else {
                if (!isformat) QD(Cell + " .jedatebot .jedatehms")[0].style.display = "none";
                QD(Cell + " .jedatebot .jedatebtn")[0].style.width = "100%";
            }
            if (!isformat) {
                for (var i = 0; i < jeDt.weeks.length; i++) {
                    weekHtml += '<li class="weeks" data-week="' + jeDt.weeks[i] + '">' + jeDt.weeks[i] + "</li>";
                }
                jeDt.html(QD(Cell + " .jedaol")[0], weekHtml);
                that.getDateStr(Tms[0], Tms[1], Tms[2]);
                that.chooseYM(that, opts, self, Tms);
            } else {
                jeDt.html(QD(Cell + " .jedaym")[0], that.onlyYMStr(Tms[0], Tms[1]));
                jeDt.text(QD(Cell + " .jedateym .jedateyearmonth")[0], Tms[0] + "年" + jeDt.digit(Tms[1]) + "月");
                that.onlyYMevents(that, opts, self, Tms);
            }
            jeDt.shdeCell(false);
            that.orien(QD(Cell)[0], self);
            that.events(that, opts, self, Tms);
        },
        onlyYMStr:function(y, m) {
            var onlyYM = "";
            jeDt.each(jeDt.montharr, function(i, val) {
                onlyYM += "<li " + (m == val ? 'class="action"' :"") + ' data-onym="' + y + "-" + jeDt.digit(val) + '">' + y + "年" + jeDt.digit(val) + "月</li>";
            });
            return onlyYM;
        },
        onlyYMevents:function(that, opts, self, Tms) {
            var ymPre = QD(Cell + " .jedateym .ymprev")[0], ymNext = QD(Cell + " .jedateym .ymnext")[0], ony = parseInt(Tms[0]), onm = parseInt(Tms[1]);
            jeDt.each([ ymPre, ymNext ], function(i, cls) {
                jeDt.on(cls, "click", function(ev) {
                    jeDt.stopmp(ev);
                    var ym = cls == ymPre ? ony -= 1 :ony += 1;
                    jeDt.html(QD(Cell + " .jedaym")[0], that.onlyYMStr(ym, onm));
                    that.events(that, opts, self, Tms);
                });
            });
        },
        //方位辨别
        orien:function(obj, self, pos) {
            var tops, rect = self.getBoundingClientRect();
            obj.style.left = rect.left + (pos ? 0 :jeDt.scroll(1)) + "px";
            tops =  (rect.bottom + obj.offsetHeight / 1.5 <= jeDt.winarea()) ?
                rect.bottom - 1 : rect.top > obj.offsetHeight / 1.5 ? rect.top - obj.offsetHeight + 1 :jeDt.winarea() - obj.offsetHeight;
            obj.style.top = Math.max(tops + (pos ? 0 :jeDt.scroll()) + 1, 1) + "px";
        },
        getDateStr:function(y, m, d) {
            var that = this, opts = that.config, dayStr = "", m = jeDt.digit(m);
            jeDt.text(QD(Cell + " .jedateyear")[0], y + "年").attr(QD(Cell + " .jedateyear")[0], "data-year", y);
            jeDt.text(QD(Cell + " .jedatemonth")[0], m + "月").attr(QD(Cell + " .jedatemonth")[0], "data-month", m);
			//设置时间标注
			function mks(y,m,d){
				var contains = function(arr, obj) {  
					var len = arr.length;  
					while (len--) {  
						if (arr[len] === obj) return true;   
					}  
					return false;  
				}
				return jeDt.type(opts.marks,"array") && opts.marks.length > 0 && 
					contains(opts.marks, y+'-'+m+'-'+d) ? '<i class="marks"></i>' : '';
		    }
            //是否显示节日
            var isfestival = function(day, n) {
                return opts.festival ? jeDt.festival(day, n) :n;
            };
            var parseArr = function(str) {
                var timeArr = str.split(" ");
                return timeArr[0].split("-");
            };
            //先得到当前月第一天是星期几.
            var date = setMonthDays(y, m), weekday = new Date(y, parseInt(m) - 1, 1).getDay();
            //根据这个星期算前面几天的上个月最后几天.
            var pervLastDay = weekday != 0 ? weekday :weekday + 7;
            //得到上个月最后一天;
            var pervMonthlastDay = getPervMonthLastDay(y, m), currentMonthDays = getPervMonthLastDay(y, parseInt(m) + 1);
            //上月最后几天循环
            var lastdays = pervMonthlastDay - pervLastDay;
            //判断是否超出允许的日期范围	
            var startDay = 1, minArr = parseArr(opts.minDate), maxArr = parseArr(opts.maxDate), endDay = currentMonthDays, thisDate = new Date(y, m, d), firstDate = new Date(y, m, 1), lastDate = new Date(y, m, currentMonthDays), minTime = new Date(minArr[0], minArr[1], minArr[2]), maxTime = new Date(maxArr[0], maxArr[1], maxArr[2]), minDateDay = minTime.getDate();
            if (minTime > lastDate) {
                startDay = parseInt(currentMonthDays) + 1;
            } else if (minTime >= firstDate && minTime <= lastDate) {
                startDay = minDateDay;
            } else if (minTime >= firstDate) {}
            if (maxTime) {
                var maxDateDay = maxTime.getDate();
                if (maxTime < firstDate) {
                    endDay = startDay;
                } else if (maxTime >= firstDate && maxTime <= lastDate) {
                    endDay = maxDateDay;
                }
            }
            //循环上月剩余的天数
            for (var p = pervLastDay - 1; p >= 0; p--) {
                var py, pm, preCls, preDays = jeDt.digit(pervMonthlastDay - p);
                m == 1 ? (py = parseInt(y) - 1, pm = 13) :(py = y, pm = m);
                var thatpretm = parseInt(py.toString() + jeDt.digit(parseInt(pm) - 1).toString() + preDays.toString()), minpretm = parseInt(minArr[0].toString() + jeDt.digit(minArr[1]).toString() + jeDt.digit(minArr[2]).toString()), maxnexttm = parseInt(maxArr[0].toString() + jeDt.digit(maxArr[1]).toString() + jeDt.digit(maxArr[2]).toString());
                preCls = thatpretm >= minpretm && thatpretm <= maxnexttm ? "prevdate" : "disabled";
                dayStr += "<li class='" + preCls + "' data-y='" + py + "' data-m='" + (parseInt(pm) - 1) + "' data-d='" + preDays + "'>" + isfestival(parseInt(pm) - 1 + "." + preDays, preDays) + mks(py,(parseInt(pm) - 1),preDays) + "</li>";
            }
            //循环本月的天数,将日期按允许的范围分三段拼接
            for (var i = 1; i < startDay; i++) {
                i = jeDt.digit(i);
                dayStr += '<li class="disabled" data-y="' + y + '" data-m="' + m + '" data-d="' + i + '">' + isfestival(m + "." + i, i) + mks(y,m,i) + "</li>";
            }
            for (var j = startDay; j <= endDay; j++) {
                var current = "";
                j = jeDt.digit(j);
                if (/*y==value.year && m==value.month+1&& */ d == j) {
                    current = "action";
                }
                dayStr += '<li class="' + current + '" data-y="' + y + '" data-m="' + m + '" data-d="' + j + '">' + isfestival(m + "." + j, j) + mks(y,m,j) + "</li>";
            }
            for (var k = endDay + 1; k <= currentMonthDays; k++) {
                k = jeDt.digit(k);
                dayStr += '<li class="disabled" data-y="' + y + '" data-m="' + m + '" data-d="' + k + '">' + isfestival(m + "." + k, k) + mks(y,m,k) + "</li>";
            }
            //循环补上下个月的开始几天
            var nextDayArr = [], nextMonthStartDays = 42 - pervLastDay - setMonthDays(y, m);
            for (var n = 1; n <= nextMonthStartDays; n++) {
                var ny, nm, nextCls;
                n = jeDt.digit(n);
                m >= 12 ? (ny = parseInt(y) + 1, nm = 0) :(ny = y, nm = m);
                var thatnexttm = parseInt(ny.toString() + jeDt.digit(parseInt(nm) + 1).toString() + jeDt.digit(n).toString()), minnexttm = parseInt(minArr[0].toString() + jeDt.digit(minArr[1]).toString() + jeDt.digit(minArr[2]).toString()), maxnexttm = parseInt(maxArr[0].toString() + jeDt.digit(maxArr[1]).toString() + jeDt.digit(maxArr[2]).toString());
                nextCls = thatnexttm <= maxnexttm && thatnexttm >= minnexttm ? "nextdate" :nextCls = "disabled";
                dayStr += "<li class='" + nextCls + "' data-y='" + ny + "' data-m='" + (parseInt(nm) + 1) + "' data-d='" + n + "'>" + isfestival(parseInt(nm) + 1 + "." + n, n) + mks(ny,(parseInt(nm) + 1),n) + "</li>";
            }
            jeDt.html(QD(Cell + " .jedaul")[0], dayStr);
            jeDt.attr(QD(Cell + " .monthprev")[0], "data-y", jeDt.digit(parseInt(m) - 1));
            jeDt.attr(QD(Cell + " .monthnext")[0], "data-y", jeDt.digit(parseInt(m) + 1));
            //计算某年某月有多少天,如果是二月，闰年28天否则29天
            function setMonthDays(year, month) {
                var er = year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? 29 :28;
                return [ 31, er, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][month - 1];
            }
            //得到指定月的上个月最后一天传进来按 12月算
            function getPervMonthLastDay(year, month) {
                //当月就是  yue-1 也就是计算机里面的0-11月份,那么算上个月的最后一天就是当月的0天
                return parseInt(new Date(year, month - 1, 0).getDate());
            }
        },
        events:function(that, opts, self, Tms) {
            var yPre = QD(Cell + " .yearprev")[0], yNext = QD(Cell + " .yearnext")[0], mPre = QD(Cell + " .monthprev")[0], mNext = QD(Cell + " .monthnext")[0], newDate = new Date(), jedateyear = QD(Cell + " .jedateyear")[0], jedatemonth = QD(Cell + " .jedatemonth")[0], isformat = opts.format.match(/\w+|d+/g).join("-") == "YYYY-MM" ? true :false;
            if (!isformat) {
                //切换年
                jeDt.each([ yPre, yNext ], function(i, cls) {
                    jeDt.on(cls, "click", function(ev) {
                        jeDt.stopmp(ev);
                        var y = parseInt(jeDt.attr(jedateyear, "data-year")), m = parseInt(jeDt.attr(jedatemonth, "data-month"));
                        cls == yPre ? y -= 1 :y += 1;
                        var d = newDate.toLocaleDateString() == y + "/" + m + "/" + newDate.getDate() ? Tms[2] :1;
                        that.getDateStr(y, m, d);
                        that.chooseDays(that, opts, self);
                    });
                });
                //切换月
                jeDt.each([ mPre, mNext ], function(i, cls) {
                    jeDt.on(cls, "click", function(ev) {
                        jeDt.stopmp(ev);
                        var y = parseInt(jeDt.attr(jedateyear, "data-year")), m = parseInt(jeDt.attr(jedatemonth, "data-month"));
                        if (cls == mPre) {
                            m == 1 ? (y -= 1, m = 12) :m -= 1;
                        } else {
                            m == 12 ? (y += 1, m = 1) :m += 1;
                        }
                        var d = newDate.toLocaleDateString() == y + "/" + m + "/" + newDate.getDate() ? Tms[2] :1;
                        that.getDateStr(y, m, d);
                        that.chooseDays(that, opts, self);
                    });
                });
                //生成定位时分秒
                jeDt.each(QD(Cell + " .jedatebot .jedatehms em"), function(i, cls) {
                    jeDt.on(cls, "click", function() {
                        var hmsStr = "", acton, hmscell = QD(Cell + " .jedateprophms")[0], hmslen = jeDt.attr(cls, "data-hms"), hmsstxt = [ "小时", "分钟", "秒数" ], 
						removeEmpty = function() {
                            jeDt.removeClass(hmscell, hmslen == 24 ? "jedateh" :"jedatems");
                            jeDt.html(hmscell, "");
                        };
                        hmsStr += '<div class="jedatehmstitle">' + hmsstxt[i] + '<div class="jedatehmsclose">&times;</div></div>';
                        for (var h = 0; h < hmslen; h++) {
                            h = jeDt.digit(h);
                            acton = jeDt.text(cls) == h ? "action" :"";
                            hmsStr += '<p class="' + acton + '">' + h + "</p>";
                        }
                        jeDt.removeClass(hmscell, hmslen == 24 ? "jedatems" :"jedateh").addClass(hmscell, hmslen == 24 ? "jedateh" :"jedatems");
                        jeDt.html(hmscell, hmsStr);
                        jeDt.each(QD(Cell + " .jedateprophms p"), function(i, p) {
                            jeDt.on(p, "click", function() {
                                jeDt.html(cls, jeDt.digit(jeDt.text(p)));
                                removeEmpty();
                            });
                        });
                        jeDt.each(QD(Cell + " .jedateprophms .jedatehmstitle"), function(i, c) {
                            jeDt.on(c, "click", function() {
                                removeEmpty();
                            });
                        });
                    });
                });
                //今天
                jeDt.on(QD(Cell + " .jedatebot .jedatetodaymonth")[0], "click", function() {
                    var toTime = [ newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate(), newDate.getHours(), newDate.getMinutes(), newDate.getSeconds() ];
                    var gettoDate = jeDt.parse([ toTime[0], toTime[1], toTime[2] ], [ toTime[3], toTime[4], toTime[5] ], opts.format);
                    that.getDateStr(toTime[0], toTime[1], toTime[2]);
                    jeDt.isValHtml(self) ? jeDt.val(self, gettoDate) :jeDt.text(self, gettoDate);
                    jeDt.html(QD(Cell)[0], "");
                    jeDt.shdeCell(true);
                    if (jeDt.type(opts.choosefun,"function") || opts.choosefun != null) opts.choosefun(gettoDate);
                });
            } else {
                jeDt.each(QD(Cell + " .jedaym li"), function(i, cls) {
                    jeDt.on(cls, "click", function(ev) {
                        jeDt.stopmp(ev);
                        var atYM = jeDt.attr(cls, "data-onym").match(/\w+|d+/g);
                        var getYMDate = jeDt.parse([ atYM[0], atYM[1], 1 ], [ 0, 0, 0 ], opts.format);
                        jeDt.isValHtml(self) ? jeDt.val(self, getYMDate) :jeDt.text(self, getYMDate);
                        jeDt.html(QD(Cell)[0], "");
                        jeDt.shdeCell(true);
                    });
                });
                //本月
                jeDt.on(QD(Cell + " .jedatebot .jedatetodaymonth")[0], "click", function() {
                    var ymTime = [ newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()], 
					YMDate = jeDt.parse([ ymTime[0], ymTime[1], 0 ], [ 0, 0, 0 ], opts.format);
                    jeDt.isValHtml(self) ? jeDt.val(self, YMDate) :jeDt.text(self, YMDate);
                    jeDt.html(QD(Cell)[0], "");
                    jeDt.shdeCell(true);
                    if (jeDt.type(opts.choosefun,"function") || opts.choosefun != null) opts.choosefun(YMDate);
                });
            }
            //清空
            jeDt.on(QD(Cell + " .jedatebot .jedateclear")[0], "click", function() {
				var clearVal = jeDt.isValHtml(self) ? jeDt.val(self) :jeDt.text(self);
                jeDt.isValHtml(self) ? jeDt.val(self, "") :jeDt.text(self, "");
                jeDt.html(QD(Cell)[0], "");
                jeDt.shdeCell(true);
				if(clearVal != ""){
				    if (jeDt.type(opts.clearfun,"function") || opts.clearfun != null) opts.clearfun(clearVal);
				}
            });
            //确认
            jeDt.on(QD(Cell + " .jedatebot .jedateok")[0], "click", function(ev) {
                jeDt.stopmp(ev);
				var jedCell = isformat ? QD(Cell + " .jedaym li") :QD(Cell + " .jedaul li")
                if (!isformat) {
                    var okTimeArr = [], okTime = [ parseInt(jeDt.attr(jedateyear, "data-year")), parseInt(jeDt.attr(jedatemonth, "data-month")), Tms[2] ];
                    jeDt.each(QD(Cell + " .jedatehms em"), function(l, tval) {
                        okTimeArr.push(jeDt.text(tval));
                    });
                    var okVal = jeDt.val(self) != "" || jeDt.text(self) != "" ? jeDt.parse([ okTime[0], okTime[1], okTime[2] ], [ okTimeArr[0], okTimeArr[1], okTimeArr[2] ], opts.format) :"";
                    that.getDateStr(okTime[0], okTime[1], okTime[2]);
                }else{
				    var jedYM = jeDt.val(self) != "" || jeDt.text(self) != "" ? jeDt.attr(QD(Cell + " .jedaym .action")[0], "data-onym").match(/\w+|d+/g) :"", 
				    okVal = jeDt.val(self) != "" || jeDt.text(self) != "" ? jeDt.parse([ jedYM[0], jedYM[1], 1 ], [ 0, 0, 0 ], opts.format) :""
				}
                jeDt.each(jedCell, function(i, cls) {
                    if (jeDt.attr(cls, "class") == "action") {
                        jeDt.isValHtml(self) ? jeDt.val(self, okVal) :jeDt.text(self, okVal);
                    }
                });
                jeDt.html(QD(Cell)[0], "");
                jeDt.shdeCell(true);
				if(okVal != ""){
				    if (jeDt.type(opts.okfun,"function") || opts.okfun != null) opts.okfun(okVal);
				}
            });
            //点击空白处隐藏
            jeDt.on(document, "click", function() {
                jeDt.shdeCell(true);
                jeDt.html(QD(Cell)[0], "");
            });
            jeDt.on(QD(Cell)[0], "click", function(ev) {
                jeDt.stopmp(ev);
            });
            that.chooseDays(that, opts, self);
        },
        //下拉选择年和月
        chooseYM:function(that, opts, self, Tms) {
            var jetopym = QD(Cell + " .jedatetopym")[0], jedateyy = QD(Cell + " .jedateyy")[0], jedatemm = QD(Cell + " .jedatemm")[0], jedateyear = QD(Cell + " .jedateyy .jedateyear")[0], jedatemonth = QD(Cell + " .jedatemm .jedatemonth")[0], mchri = QD(Cell + " .jedateymchri")[0], mchle = QD(Cell + " .jedateymchle")[0];
            function eachYears(YY) {
                var eachStr = "";
                jeDt.each(new Array(15), function(i) {
                    if (i === 7) {
                        var getyear = jeDt.attr(jedateyear, "data-year");
                        eachStr += "<li " + (getyear == YY ? 'class="action"' :"") + ' data-y="' + YY + '">' + YY + "年</li>";
                    } else {
                        eachStr += '<li data-y="' + (YY - 7 + i) + '">' + (YY - 7 + i) + "年</li>";
                    }
                });
                return eachStr;
            }
            function setYearMonth(YY, ymlen) {
                var ymStr = "";
                if (ymlen == 12) {
                    jeDt.each(jeDt.montharr, function(i, val) {
                        var getmonth = jeDt.attr(jedatemonth, "data-month"), val = jeDt.digit(val);
                        ymStr += "<li " + (getmonth == val ? 'class="action"' :"") + ' data-m="' + val + '">' + val + "月</li>";
                    });
                    jeDt.each([ mchri, mchle ], function(c, cls) {
                        cls.style.display = "none";
                    });
                } else {
                    ymStr = eachYears(YY);
                    jeDt.each([ mchri, mchle ], function(c, cls) {
                        cls.style.display = "block";
                    });
                }
                jeDt.removeClass(jetopym, ymlen == 12 ? "jedatesety" :"jedatesetm").addClass(jetopym, ymlen == 12 ? "jedatesetm" :"jedatesety");
                jeDt.html(QD(Cell + " .jedatetopym .ymdropul")[0], ymStr);
                jetopym.style.display = "block";
            }
            function clickLiYears(year) {
                jeDt.each(QD(Cell + " .ymdropul li"), function(i, cls) {
                    jeDt.on(cls, "click", function(ev) {
                        var Years = jeDt.attr(this, "data-y"), Months = jeDt.attr(jedatemonth, "data-month");
                        jeDt.attr(year, "data-year", Years);
                        jeDt.html(year, Years);
                        jetopym.style.display = "none";
                        that.getDateStr(Years, Months, Tms[2]);
                        that.chooseDays(that, opts, self);
                    });
                });
            }
            //下拉选择年
            jeDt.on(jedateyy, "click", function() {
                var YMlen = parseInt(jeDt.attr(jedateyy, "data-ym")), yearAttr = parseInt(jeDt.attr(jedateyear, "data-year"));
                setYearMonth(yearAttr, YMlen);
                clickLiYears(jedateyear);
            });
            //下拉选择月
            jeDt.on(jedatemm, "click", function() {
                var YMlen = parseInt(jeDt.attr(jedatemm, "data-ym")), yearAttr = parseInt(jeDt.attr(jedateyear, "data-year"));
                setYearMonth(yearAttr, YMlen);
                jeDt.each(QD(Cell + " .ymdropul li"), function(i, cls) {
                    jeDt.on(cls, "click", function(ev) {
                        var Years = jeDt.attr(jedateyear, "data-year"), Months = jeDt.attr(this, "data-m");
                        jeDt.attr(jedatemonth, "data-month", Months);
                        jeDt.html(jedatemonth, Months);
                        jetopym.style.display = "none";
                        that.getDateStr(Years, Months, Tms[2]);
                        that.chooseDays(that, opts, self);
                    });
                });
            });
            //关闭下拉选择
            jeDt.on(QD(Cell + " .jedateymchok")[0], "click", function(ev) {
                jeDt.stopmp(ev);
                jetopym.style.display = "none";
            });
            var yearMch = parseInt(jeDt.attr(jedateyear, "data-year"));
            jeDt.each([ mchle, mchri ], function(d, cls) {
                jeDt.on(cls, "click", function(ev) {
                    jeDt.stopmp(ev);
                    d == 0 ? yearMch -= 15 :yearMch += 15;
                    var mchStr = eachYears(yearMch);
                    jeDt.html(QD(Cell + " .jedatetopym .ymdropul")[0], mchStr);
                    clickLiYears(jedateyear);
                });
            });
        },
        //选择日
        chooseDays:function(that, opts, self) {
            jeDt.each(QD(Cell + " .jedaul li"), function(i, cls) {
                jeDt.on(cls, "click", function(ev) {
                    if (jeDt.hasClass(cls, "disabled")) return;
                    jeDt.stopmp(ev);
                    var liTms = [];
                    jeDt.each(QD(Cell + " .jedatehms em"), function(l, tval) {
                        liTms.push(jeDt.text(tval));
                    });
                    var aty = parseInt(jeDt.attr(cls, "data-y")) | 0, atm = parseInt(jeDt.attr(cls, "data-m")) | 0, atd = parseInt(jeDt.attr(cls, "data-d")) | 0;
                    var getParDate = jeDt.parse([ aty, atm, atd ], [ liTms[0], liTms[1], liTms[2] ], opts.format);
                    that.getDateStr(aty, atm, atd);
                    jeDt.isValHtml(self) ? jeDt.val(self, getParDate) :jeDt.text(self, getParDate);
                    jeDt.html(QD(Cell)[0], "");
                    jeDt.shdeCell(true);
                    if (jeDt.type(opts.choosefun,"function") || opts.choosefun != null) {
                        opts.choosefun(getParDate);
                    }
                });
            });
        }
    };
	jeDt.getPath = (function(){
		var js = document.scripts, jsPath = js[js.length - 1].src;
		return jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
	}());
	jeDt.creatlink = function(lib){
		var link = document.createElement('link');
		link.type = 'text/css';
		link.rel = 'stylesheet';
		link.href = jeDt.getPath+'../' +'css/'+ lib + '.css';
		link.id = 'jeDateSkin';
		QD('head')[0].appendChild(link);
		link = null;
	};
	jeDt.creatlink('jedate');
	jeDate.skin = function(lib){
		QD('#jeDateSkin')[0].parentNode.removeChild(QD('#jeDateSkin')[0]);
		jeDt.creatlink(lib);
	};
    //返回指定日期
    jeDate.now = function(num) {
        var dd = new Date();
        dd.setDate(dd.getDate() + num);
        var y = dd.getFullYear(), m = dd.getMonth() + 1, d = dd.getDate();
        return y + "-" + m + "-" + d;
    };
    "function" === typeof define ? define(function() {
        return jeDate;
    }) :window.jeDate = jeDate;
})(window);
