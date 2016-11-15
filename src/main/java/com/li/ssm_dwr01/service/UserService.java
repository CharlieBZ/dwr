package com.li.ssm_dwr01.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.li.ssm_dwr01.dao.UserDao;
import com.li.ssm_dwr01.entity.User;


/**
 * 
 * 创  建  人： 中粒-研发-李明
 * 创建时间： 2016年10月26日 下午3:02:29 
 * 功        能：
 */
@Service
public class UserService {
	@Autowired
	private UserDao userDao;
	
	public User selectUserLogin(String userNo,String userPwd){
		return userDao.selectUserLogin(userNo, userPwd);
	}
}
