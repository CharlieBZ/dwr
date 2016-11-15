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
 * ��  ��  �ˣ� ����-�з�-����
 * ����ʱ�䣺 2016��10��26�� ����12:53:55 
 * ��        �ܣ���Ϣ���ʹ�������������ˢ��
 */
public class MessagePushUtil {
	private static final Logger LOGGER = Logger.getLogger(MessagePushUtil.class);
	
	public void onPageLoad(String currentUserId) {
		ScriptSession scriptSession = WebContextFactory.get().getScriptSession();
        // ��������get()����WebContextʵ����ͨ��WebContext��ȡservlet����
        scriptSession.setAttribute("uid", currentUserId);
        
        MessagePushServlet mpServlet = new MessagePushServlet();
        try {
            mpServlet.init();
            LOGGER.info(String.format("��Ϣ���ͳ�ʼ���ɹ���uid��%s", scriptSession.getAttribute("uid")));
        } catch (ServletException e) {
            LOGGER.error(String.format("��Ϣ���ͳ�ʼ������uid��%s",scriptSession.getAttribute("uid")));
        }
    }
	
	/**
	 * ����userID��ָ���û�������Ϣ
	 * @param userID ������id
	 * @param autoMessage ��Ϣ
	 */
    public void sendMessageAuto(final String userID,String autoMessage) {
    	HttpSession session = WebContextFactory.get().getSession();
    	Map<String,String> userList = OnlineUserList.getUsers();
        Object obj = session.getAttribute("uid");
        //��ǰ�û���id,�������˵�id
        String currentUserId = ((User)obj).getUserId();
        final Map<String,String> map = new HashMap<String,String>();
    	map.put("fromUserId",currentUserId );
    	map.put("fromUserName",userList.get(currentUserId));
        map.put("mesText", autoMessage);
        
        Browser.withAllSessionsFiltered(new ScriptSessionFilter() {
            // ʵ�ֹ������е�match()����
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
                // ����JS�ж����showMessage()������ʵ����Ϣ��ǰ����ʾ
                script.appendCall("accept", map);
                Collection<ScriptSession> sessions = Browser.getTargetSessions();
                for (ScriptSession scriptSession : sessions) {
                    scriptSession.addScript(script);
                }
            }
        });
    }
    /**
     * ��ϢȺ��
     * @param message
     */
    public void sendAllMessage(String message){
    	HttpSession session = WebContextFactory.get().getSession();
    	Map<String,String> userList = OnlineUserList.getUsers();
        Object obj = session.getAttribute("uid");
        //��ǰ�û���id,�������˵�id
        String currentUserId = ((User)obj).getUserId();
        final Map<String,String> map = new HashMap<String,String>();
    	map.put("fromUserId",currentUserId );
    	map.put("fromUserName",userList.get(currentUserId));
        map.put("mesText", message);
        
        Browser.withAllSessionsFiltered(new ScriptSessionFilter() {
            // ʵ�ֹ������е�match()����
            public boolean match(ScriptSession session) {
            	return true;
            }
        }, new Runnable() {
            private ScriptBuffer script = new ScriptBuffer();
            public void run() {
                // ����JS�ж����showMessage()������ʵ����Ϣ��ǰ����ʾ
                script.appendCall("accept", map);
                Collection<ScriptSession> sessions = Browser.getTargetSessions();
                for (ScriptSession scriptSession : sessions) {
                    scriptSession.addScript(script);
                }
            }
        });
    }
    /**
     * ���˵�½/�˳�ʱ��ˢ����������
     * @param users
     */
    public static void reloadUser(final Map<String,String> users){
    	Browser.withAllSessionsFiltered(new ScriptSessionFilter() {
            // ʵ�ֹ������е�match()����
            public boolean match(ScriptSession session) {
            	return true;
            }
        }, new Runnable() {
            private ScriptBuffer script = new ScriptBuffer();
            public void run() {
                // ����JS�ж����showMessage()������ʵ����Ϣ��ǰ����ʾ
                script.appendCall("reloadUser",users);
                Collection<ScriptSession> sessions = Browser.getTargetSessions();
                for (ScriptSession scriptSession : sessions) {
                    scriptSession.addScript(script);
                }
            }
        });
    }
    
}
