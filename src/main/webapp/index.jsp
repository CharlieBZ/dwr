<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" import="com.li.ssm_dwr01.entity.User"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	User user = (User)session.getAttribute("uid");
	String currentUserId = user.getUserId();
	String currentUserName = user.getUserName();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<title>XXX聊天室</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>LM/css/index.css" />
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/index.css"/>
		<script type="text/javascript" src="<%=basePath%>LM/js/jquery-1.8.3.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>LM/js/index.js"></script>
		<script type='text/javascript' src='<%=basePath%>dwr/engine.js'></script>
		<script type='text/javascript' src='<%=basePath%>dwr/interface/messagePush.js'></script>
	</head>
	
	<body>
		<div id="box">
			<ul id="friendList">
				<li><h2>在线列表</h2></li>
				<c:forEach items="${list }" var="map">
				<c:if test="${uid.userId!=map.key }">
					<li data-id="${map.key}" ondblclick="selectUser(this)" class="friend"> ${map.value}</li>
				</c:if>
				</c:forEach>
			</ul>
			<div id="sessionList">
				<div id="sessionListTitle">
					
				</div>
				
			</div>
			<textarea id="msgText"></textarea>
			<input id="exitBtn" type="button" class="btn  btn-default btn-x" value="退出聊天室" />
			<input id="sendAll" type="button" class="btn  btn-default btn-x" value="群发" />
			<input id="sendBtn" type="button" class="btn  btn-default btn-x" value="发送" />
		</div>
	</body>
	<script>
		var currentUserId = '<%=currentUserId%>';
		var currentUserName = '<%=currentUserName%>';
		$(function(){
			dwr.engine.setActiveReverseAjax(true);
		    dwr.engine.setNotifyServerOnPageUnload(true);
		    messagePush.onPageLoad(currentUserId);
		    
		})
	</script>
	
	<script type="text/javascript" src="<%=basePath%>js/index.js"></script>
</html>