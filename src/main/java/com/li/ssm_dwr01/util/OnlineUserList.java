package com.li.ssm_dwr01.util;

import java.util.HashMap;
import java.util.Map;

import com.li.ssm_dwr01.entity.User;

public class OnlineUserList {
	
	private static Map<String,String> users = new HashMap<String,String>();

	public static Map<String, String> getUsers() {
		return OnlineUserList.users;
	}

	public static void setUsers(String userId,String userName) {
		OnlineUserList.users.put(userId, userName);
	}
	
	public static void removeUsers(String userId) {
		OnlineUserList.users.remove(userId);
	}
}
