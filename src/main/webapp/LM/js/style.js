/**
 * 框架
 */
var bgcolor="#D0E4F6",bordercolor="#99BBE8",data_id;
$(".LM-left-menutitle,.LM-right-top,.LM-right-foot,.LM-left-menuList,.LM-right-menu a,.LM").css({"background":bgcolor});
$(".LM-right-menu .LM-frame-home").css({"background":"#fff"});
$("*").css({"border-color":bordercolor});
$.getJSON("LM/json/bg.json",function(data){
	for(var i=0;i<data.length;i++){
		if(data[i].user=="李四"){
			bgcolor=data[i].bgcolor;
			bordercolor=data[i].bordercolor
			$(".LM-left-menutitle,.LM-right-top,.LM-right-foot,.LM-left-menuList,.LM-right-menu a,.LM").css({"background":bgcolor});
			$(".LM-right-menu .LM-frame-home").css({"background":"#fff"});
			$("*").css({"border-color":bordercolor});
		}
	}
});