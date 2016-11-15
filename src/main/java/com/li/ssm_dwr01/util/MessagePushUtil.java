package com.li.ssm_dwr01.util;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.directwebremoting.Browser;
import org.directwebremoting.ScriptBuffer;
import org.directwebremoting.ScriptSession;
import org.directwebremoting.ScriptSessionFilter;
import org.directwebremoting.WebContextFactory;

import com.li.ssm_dwr01.entity.User;
/**
 * 
 * 创  建  人： 中粒-研发-李明
 * 创建时间： 2016年10月26日 下午12:53:55 
 * 功        能：消息发送处理，在线人数的刷新
 */
public class MessagePushUtil {
	private static final Logger LOGGER = Logger.getLogger(MessagePushUtil.class);
	
	public void onPageLoad(String currentUserId) {
		ScriptSession scriptSession = WebContextFactory.get().getScriptSession();
        // 工厂方法get()返回WebContext实例，通过WebContext获取servlet参数
        scriptSession.setAttribute("uid", currentUserId);
        
        MessagePushServlet mpServlet = new MessagePushServlet();
        try {
            mpServlet.init();
            LOGGER.info(String.format("消息推送初始化成功，uid：%s", scriptSession.getAttribute("uid")));
        } catch (ServletException e) {
            LOGGER.error(String.format("消息推送初始化错误，uid：%s",scriptSession.getAttribute("uid")));
        }
    }
	
	/**
	 * 根据userID向指定用户推送消息
	 * @param userID 收信人id
	 * @param autoMessage 消息
	 */
    public void sendMessageAuto(final String userID,String autoMessage) {
    	HttpSession session = WebContextFactory.get().getSession();
    	Map<String,String> userList = OnlineUserList.getUsers();
        Object obj = session.getAttribute("uid");
        //当前用户的id,即发信人的id
        String currentUserId = ((User)obj).getUserId();
        final Map<String,String> map = new HashMap<String,String>();
    	map.put("fromUserId",currentUserId );
    	map.put("fromUserName",userList.get(currentUserId));
        map.put("mesText", autoMessage);
        
        Browser.withAllSessionsFiltered(new ScriptSessionFilter() {
            // 实现过滤器中的match()方法
            public boolean match(ScriptSession session) {
            	if (session.getAttribute("uid") == null){
                    return false;
            	}else{
                    return (session.getAttribute("uid").equals(userID));
            	}
            }
        }, new Runnable() {
            private ScriptBuffer script = new ScriptBuffer();
            public void run() {
                // 调用JS中定义的showMessage()方法，实现消息的前端显示
                script.appendCall("accept", map);
                Collection<ScriptSession> sessions = Browser.getTargetSessions();
                for (ScriptSession scriptSession : sessions) {
                    scriptSession.addScript(script);
                }
            }
        });
    }
    /**
     * 消息群发
     * @param message
     */
    public void sendAllMessage(String message){
    	HttpSession session = WebContextFactory.get().getSession();
    	Map<String,String> userList = OnlineUserList.getUsers();
        Object obj = session.getAttribute("uid");
        //当前用户的id,即发信人的id
        String currentUserId = ((User)obj).getUserId();
        final Map<String,String> map = new HashMap<String,String>();
    	map.put("fromUserId",currentUserId );
    	map.put("fromUserName",userList.get(currentUserId));
        map.put("mesText", message);
        
        Browser.withAllSessionsFiltered(new ScriptSessionFilter() {
            // 实现过滤器中的match()方法
            public boolean match(ScriptSession session) {
            	return true;
            }
        }, new Runnable() {
            private ScriptBuffer script = new ScriptBuffer();
            public void run() {
                // 调用JS中定义的showMessage()方法，实现消息的前端显示
                script.appendCall("accept", map);
                Collection<ScriptSession> sessions = Browser.getTargetSessions();
                for (ScriptSession scriptSession : sessions) {
                    scriptSession.addScript(script);
                }
            }
        });
    }
    /**
     * 有人登陆/退出时，刷新在线人数
     * @param users
     */
    public static void reloadUser(final Map<String,String> users){
    	Browser.withAllSessionsFiltered(new ScriptSessionFilter() {
            // 实现过滤器中的match()方法
            public boolean match(ScriptSession session) {
            	return true;
            }
        }, new Runnable() {
            private ScriptBuffer script = new ScriptBuffer();
            public void run() {
                // 调用JS中定义的showMessage()方法，实现消息的前端显示
                script.appendCall("reloadUser",users);
                Collection<ScriptSession> sessions = Browser.getTargetSessions();
                for (ScriptSession scriptSession : sessions) {
                    scriptSession.addScript(script);
                }
            }
        });
    }
    
}
