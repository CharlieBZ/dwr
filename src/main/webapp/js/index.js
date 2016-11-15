/*接受消息*/
function accept(msg) {
	if(msg.fromUserId!=currentUserId){
		$("#sessionList").append('<div class="left"><span>' + msg.fromUserName + '</span><span>'
				+ msg.mesText + '</span></div>');
		$("#sessionListTitle").html(
				'<input type="hidden" id="sendUserId" value="' + msg.fromUserId
				+ '" />' + msg.fromUserName);
	}
}

/* 选择消息接受用户 */
function selectUser(obj) {
	// 接受方的用户id
	var userId = $(obj).attr("data-id");
	$("#sessionListTitle").html(
			'<input type="hidden" id="sendUserId" value="' + userId + '" />'
					+ $(obj).html());
}

/* 刷新用户 */
function reloadUser(userList) {
	$("#friendList li:eq(0)").nextAll().remove();
	var html = "<li><h2>在线列表</h2></li>";
	for ( var userId in userList) {
		if (userId == "exit" || userId == "add") {
			$("#sessionList").append(
					'<center style="color:#ccc;font-size:12px;">'
							+ userList[userId] + '</center>');
		} else {
			if (userId != currentUserId) {
				html += '<li data-id="' + userId
						+ '" ondblclick="selectUser(this)" class="friend"> '
						+ userList[userId] + '</li>';
			}
		}
	}
	$("#friendList").html(html);
}
$(function() {
	$("#msgText")[0].focus();
	/* 发送消息 */
	$("#sendBtn").click(function() {
		// 接受方的用户id
		var userId = $("#sendUserId").val();
		var text = $("#msgText").val();
		if (text == '') {
			$("#msgText").attr("placeholder", "消息不能为空");
		} else {
			messagePush.sendMessageAuto(userId, text);
			$("#sessionList").append(
					'<div class="right"><span>' + text
							+ '</span><span>'+currentUserName+'</span></div>');
			$("#msgText").val("");
		}
	});
	
	/* 群发消息 */
	$("#sendAll").click(function() {
		var text = $("#msgText").val();
		if (text == '') {
			$("#msgText").attr("placeholder", "消息不能为空");
		} else {
			messagePush.sendAllMessage(text);
			$("#sessionList").append('<div class="right"><span>' + text + '</span><span>'+currentUserName+'</span></div>');
			$("#msgText").val("");
		}
	});

	/* 退出聊天 */
	$("#exitBtn").click(function() {
		location.href = "exit";
	});
});