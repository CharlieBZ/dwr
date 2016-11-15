package com.li.ssm_dwr01.entity;
/**
 * 消息类
 * @author 李明
 *
 */
public class Message {
	//消息内容
	private String msgText;
	//收信人
	private String toUserId;
	//发信人id
	private String fromUserId;
	//发信人名称
	private String fromUserName;

	public String getMsgText() {
		return msgText;
	}

	public void setMsgText(String msgText) {
		this.msgText = msgText;
	}

	public String getToUserId() {
		return toUserId;
	}

	public void setToUserId(String toUserId) {
		this.toUserId = toUserId;
	}

	public String getFromUserId() {
		return fromUserId;
	}

	public void setFromUserId(String fromUserId) {
		this.fromUserId = fromUserId;
	}

	public String getFromUserName() {
		return fromUserName;
	}

	public void setFromUserName(String fromUserName) {
		this.fromUserName = fromUserName;
	}
}
