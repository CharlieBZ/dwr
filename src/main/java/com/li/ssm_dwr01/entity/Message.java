package com.li.ssm_dwr01.entity;
/**
 * ��Ϣ��
 * @author ����
 *
 */
public class Message {
	//��Ϣ����
	private String msgText;
	//������
	private String toUserId;
	//������id
	private String fromUserId;
	//����������
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
