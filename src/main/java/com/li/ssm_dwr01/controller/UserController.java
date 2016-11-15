package com.li.ssm_dwr01.controller;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.li.ssm_dwr01.entity.User;
import com.li.ssm_dwr01.service.UserService;
import com.li.ssm_dwr01.util.Bool;
import com.li.ssm_dwr01.util.MessagePushUtil;
import com.li.ssm_dwr01.util.OnlineUserList;

/**
 * 
 * 创  建  人： 中粒-研发-李明
 * 创建时间： 2016年10月26日 下午3:04:34 
 * 功        能：
 */
@Controller
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService userService;
	/**
	 * 用户登录
	 * @param session
	 * @param userNo
	 * @param userPwd
	 * @return
	 */
	@RequestMapping(value="/userlogin")
	@ResponseBody
	public Object login(HttpSession session,String userNo,String userPwd){
		Bool bool = new Bool();
		User user = userService.selectUserLogin(userNo, userPwd);
		if(user != null){
			bool.isSuccess = true;
			session.setAttribute("uid", user);
			OnlineUserList.setUsers(user.getUserId(), user.getUserName());
			//刷新聊天室
			OnlineUserList.setUsers("add", user.getUserName()+"加入聊天室");
			Map<String,String> users = OnlineUserList.getUsers();
			MessagePushUtil.reloadUser(users);
			OnlineUserList.removeUsers("add");
		}
		return bool;
	}
	
	/**
	 * 退出聊天室
	 * @param session
	 * @throws IOException 
	 */
	@RequestMapping(value="/exit")
	public void exit(HttpSession session,HttpServletResponse response) throws IOException{
		Object obj = session.getAttribute("uid");
		if(obj!=null){
			//当前用户的id
			String currentUserId = ((User)obj).getUserId();
			//当前用户的名字
			String userName = ((User)obj).getUserName();
			//销毁session
			session.invalidate();
			//从在线人数中移除当前用户
			OnlineUserList.removeUsers(currentUserId);
			//设置当前用户为离开推送消息给所有的在线用户
			OnlineUserList.setUsers("exit", userName+"退出聊天室");
			Map<String,String> users = OnlineUserList.getUsers();
			MessagePushUtil.reloadUser(users);
			OnlineUserList.removeUsers("exit");
		}
		response.sendRedirect("login");
	}
	/**
	 * 登陆页面
	 * @return
	 */
	@RequestMapping(value="login")
	public String loginPage(){
		return "login";
	}
	/**
	 * 定向到首页聊天室
	 * @param session
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/index")
	public ModelAndView index(HttpSession session,HttpServletResponse response) throws IOException{
		ModelAndView mav = new ModelAndView();
		if(session.getAttribute("uid")!=null){
			mav.setViewName("index");
			Map<String,String> userList = OnlineUserList.getUsers();
			mav.addObject("list", userList);
			return mav;
		}
		response.sendRedirect("login");
		return null;
	}
}
