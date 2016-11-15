package com.li.ssm_dwr01.util;

import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.directwebremoting.Container;
import org.directwebremoting.ServerContextFactory;
import org.directwebremoting.WebContextFactory;
import org.directwebremoting.event.ScriptSessionEvent;
import org.directwebremoting.event.ScriptSessionListener;
import org.directwebremoting.extend.ScriptSessionManager;
import org.directwebremoting.servlet.DwrServlet;

import com.li.ssm_dwr01.entity.User;

/**
 * 
 * 创  建  人： 中粒-研发-李明
 * 创建时间： 2016年10月26日 下午1:02:29 
 * 功        能：
 */
public class MessagePushServlet extends DwrServlet {
	private static final long serialVersionUID = 4298890285665323894L;
    private static final Logger LOGGER = Logger.getLogger(MessagePushServlet.class);

	
	@Override
    public void init() throws ServletException {
        Container container = ServerContextFactory.get().getContainer();
        // 工厂方法get()返回ServerContext实例
        ScriptSessionManager manager = container.getBean(ScriptSessionManager.class);
        ScriptSessionListener listener = new ScriptSessionListener() {
            public void sessionCreated(ScriptSessionEvent ev) {
                HttpSession session = WebContextFactory.get().getSession();
                if(session.getAttribute("uid")!=null){
                	User user = ((User)session.getAttribute("uid"));
                	String userID = user.getUserId();
                	LOGGER.info("a ScriptSession is created");
                	ev.getSession().setAttribute("uid", userID);
                }
            }

            public void sessionDestroyed(ScriptSessionEvent ev) {
            	ev.getSession().removeAttribute("uid");
                LOGGER.info("a ScriptSession is distroyed");
            }
        };
        manager.addScriptSessionListener(listener);
    }
}
