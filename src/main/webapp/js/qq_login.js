$(function(){
	// 初始化 传入dom id
	var victor = new Victor("container", "output");
	var win_width = $(window).width();
	$("#qq_login_box").css({"left":(win_width-350)/2+"px"});
	$("#loginBtn").click(function(){
		$.ajax({
			url:"userlogin",
			type:"post",
			dataType:"json",
			data:$("form").serialize(),
			success:function(result){
				if(result.isSuccess){
					location.href = "index";
				}
			},
			error:function(){
				alert("系统错误");
			}
		});
	});
});