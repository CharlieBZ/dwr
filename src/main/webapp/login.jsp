<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>XXX聊天系统-登陆</title>
		<link rel="stylesheet" type="text/css" href="<%=basePath %>css/qq_login.css" />
		<link rel="stylesheet" type="text/css" href="<%=basePath%>LM/css/index.css" />
		<script type="text/javascript" src="<%=basePath%>LM/js/jquery-1.8.3.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/vector.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/qq_login.js"></script>
		<script type="text/javascript" src="<%=basePath%>LM/js/index.js"></script>
	</head>
	
	<body>
		<div id="container"><div id="output"></div></div>
		<div id="qq_login_box">
			<h1 id="title">XXX聊天系统</h1>
			<form>
				<input name="userNo" type="text" placeholder="登陆帐号" class="input input-xl input-row" /><br><br>
				<input name="userPwd" type="password" placeholder="登陆密码" class="input input-xl input-row" /><br><br>
				<input type="button" id="loginBtn" value="登    陆" class="btn btn-skyblue btn-xl btn-row" />
			</form>
		</div>
	</body>
</html>