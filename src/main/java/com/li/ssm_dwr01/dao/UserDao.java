package com.li.ssm_dwr01.dao;

import com.li.ssm_dwr01.entity.User;

public interface UserDao {
	/*ÓÃ»§µÇÂ½*/
	public User selectUserLogin(String userNo,String userPwd); 
}
