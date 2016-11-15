package com.formwork.servlet;

import java.io.File;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.jacob.activeX.ActiveXComponent;
import com.jacob.com.Dispatch;
import com.jacob.com.Variant;

/**
 * Servlet implementation class OfficeToHtml
 */
@WebServlet("/OfficeToHtml")
public class OfficeToHtmlServlet extends HttpServlet {
	int WORD_HTML = 8;
	int WORD_TXT = 7;
	int EXCEL_HTML = 44;
	private static final long serialVersionUID = 1L;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String docfile = request.getParameter("fileUrl");
		response.setContentType("application/json; charset=UTF-8");
		//html存储路径
		String htmlSavePath=this.getServletConfig().getServletContext().getRealPath("/");
		String contextPath = request.getContextPath();
		String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+contextPath+"/";
		response.getWriter().print(excute(docfile,htmlSavePath,basePath));
	}
	/**
	 * 
	 * @param docfile
	 * @param htmlSavePath	
	 * @param serverPath
	 * @return
	 */
	public Object excute(String docfile,String htmlSavePath,String serverPath){
		// 判断目录是否存在，否则创建
		File file = new File(htmlSavePath);
		if (!file.exists()) {
			file.mkdirs();
		}
		htmlSavePath+="LM/jsp/html/index.html";
		serverPath+="LM/jsp/html/index.html";
		file = new File(htmlSavePath);
		//删除原来的文件
		if (file.exists()) {
			file.delete();
		}
		String suffix = docfile.substring(docfile.lastIndexOf("."));
		JSONObject result = new JSONObject();
		result.put("htmlUrl", "");
		//判断文件的类型
		if(suffix.equalsIgnoreCase(".doc")||suffix.equalsIgnoreCase(".docx")){
			if(wordToHtml(docfile,htmlSavePath)){
				result.put("htmlUrl", serverPath);
			}
		}else if(suffix.equalsIgnoreCase(".xlsx")||suffix.equalsIgnoreCase(".xls")){
			if(excelToHtml(docfile,htmlSavePath)){
				result.put("htmlUrl", serverPath);
			}
		}
		return result;
	}
	
	/**
	 * WORD转HTML
	 * 
	 * @param docfile	WORD文件全路径
	 * @param htmlfile	转换后HTML存放路径
	 */
	public boolean wordToHtml(String docfile, String htmlfile) {
		try{
			ActiveXComponent app = new ActiveXComponent("Word.Application");
			app.setProperty("Visible", new Variant(false));
			Dispatch docs = app.getProperty("Documents").toDispatch();
			Dispatch doc = Dispatch.invoke(docs, "Open", Dispatch.Method,new Object[] { docfile, new Variant(false), new Variant(true) }, new int[1]).toDispatch();
			Dispatch.invoke(doc, "SaveAs", Dispatch.Method, new Object[] { htmlfile, new Variant(WORD_HTML) }, new int[1]);
			Variant f = new Variant(false);
			Dispatch.call(doc, "Close", f);
			app.invoke("Quit", new Variant[] {});
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * EXCEL转HTML
	 * 
	 * @param xlsfile	EXCEL文件全路径
	 * @param htmlfile	 转换后HTML存放路径
	 */
	public boolean excelToHtml(String xlsfile, String htmlfile) {
		ActiveXComponent app = new ActiveXComponent("Excel.Application"); // 启动excel
		try {
			app.setProperty("Visible", new Variant(false));
			Dispatch excels = app.getProperty("Workbooks").toDispatch();
			Dispatch excel = Dispatch.invoke(excels, "Open", Dispatch.Method,new Object[] { xlsfile, new Variant(false), new Variant(true) }, new int[1]).toDispatch();
			Dispatch.invoke(excel, "SaveAs", Dispatch.Method, new Object[] { htmlfile, new Variant(EXCEL_HTML) },new int[1]);
			Variant f = new Variant(false);
			Dispatch.call(excel, "Close", f);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
}
