---
title: Java发送http请求
date: 2016-06-24 09:23:21
categories: [Java]
tags: [Java,http,htmlunit]
---

## URLConnection方式

> 参考：<http://www.cnblogs.com/zhuawang/archive/2012/12/08/2809380.html>

``` java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;

public class ByURLConnection {
    /**
     * 向指定URL发送GET方法的请求
     *
     * @param url 发送请求的URL
     * @return URL 所代表远程资源的响应结果
     */
    public static String get(String url) {
        StringBuilder result = new StringBuilder();
        BufferedReader in = null;
        try {
            URL realUrl = new URL(url);
            // 打开和URL之间的连接
            URLConnection connection = realUrl.openConnection();
            // 建立实际的连接
            connection.connect();
            // 定义BufferedReader输入流来读取URL的响应
            in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line;
            while ((line = in.readLine()) != null) {
                result.append(line).append("\r\n");
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return result.toString();
    }

    /**
     * 向指定 URL 发送POST方法的请求
     *
     * @param url   发送请求的 URL
     * @param param 请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
     * @return 所代表远程资源的响应结果
     */
    public static String post(String url, String param) {
        PrintWriter out = null;
        BufferedReader in = null;
        StringBuilder result = new StringBuilder();
        try {
            URL realUrl = new URL(url);
            // 打开和URL之间的连接
            URLConnection conn = realUrl.openConnection();
            // 发送POST请求必须设置如下两行
            conn.setDoOutput(true);
            conn.setDoInput(true);
            // 获取URLConnection对象对应的输出流
            out = new PrintWriter(conn.getOutputStream());
            // 发送请求参数
            out.print(param);
            // flush输出流的缓冲
            out.flush();
            // 定义BufferedReader输入流来读取URL的响应
            in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line;
            while ((line = in.readLine()) != null) {
                result.append(line).append("\r\n");
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
                if (in != null) {
                    in.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return result.toString();
    }
}
```
<!-- more -->

## HttpClient
需要导入[HttpClient](http://www.mvnrepository.com/artifact/org.apache.httpcomponents/httpclient)相关的包

``` java
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ByHttpClient {
    public static String CHARSET = "UTF-8";

    /**
     * 发送Get请求
     *
     * @param url 发送请求的URL
     * @return
     */
    public static String get(String url) {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        CloseableHttpResponse response = null;

        try {
            // 创建HttpGet
            HttpGet httpGet = new HttpGet(url);
            // 执行get请求
            response = httpClient.execute(httpGet);
            // 获取响应实体
            HttpEntity responseEntity = response.getEntity();
            return EntityUtils.toString(responseEntity, CHARSET);
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        } finally {
            try {
                // 关闭连接,释放资源
                if (response != null) {
                    response.close();
                }
                if (httpClient != null) {
                    httpClient.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 发送Post请求
     *
     * @param url 发送请求的URL
     * @param map 请求的参数map
     * @return
     */
    public static String post(String url, Map<String, String> map) {
        // 创建默认的httpClient实例
        CloseableHttpClient httpClient = HttpClients.createDefault();
        CloseableHttpResponse response = null;

        try {
            // 设置参数
            List<NameValuePair> formParams = new ArrayList<NameValuePair>();
            if (map != null) {
                for (Map.Entry<String, String> entry : map.entrySet()) {
                    formParams.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
                }
            }
            UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formParams, CHARSET);

            //创建HttpPost
            HttpPost httpPost = new HttpPost(url);
            httpPost.setEntity(entity);
            // 执行
            response = httpClient.execute(httpPost);
            HttpEntity responseEntity = response.getEntity();
            return EntityUtils.toString(responseEntity, CHARSET);
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        } finally {
            try {
                // 关闭连接,释放资源
                if (response != null) {
                    response.close();
                }
                if (httpClient != null) {
                    httpClient.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```

## HtmlUnit

需要导入[HtmlUnit](http://www.mvnrepository.com/artifact/net.sourceforge.htmlunit/htmlunit)及其依赖包
功能最强大，可以模拟浏览器的请求，发送表单和执行js事件，当然性能是不如上面的

``` java
import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.WebRequest;
import com.gargoylesoftware.htmlunit.html.HtmlPage;

import java.net.URL;

public class ByHtmlUnit {
    public static String request(String url) {
        WebClient webClient = null;
        try {
            // 模拟客户端
            BrowserVersion browser = BrowserVersion.CHROME;
            //browser.setPlatform("iPhone");
            //browser.setBrowserLanguage("zh-CN,zh;q=0.8");
            //browser.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25");

            // 浏览器设置
            webClient = new WebClient(browser);
            webClient.getOptions().setCssEnabled(false);
            webClient.getOptions().setJavaScriptEnabled(false);
            //webClient.getOptions().setThrowExceptionOnScriptError(false);
            //webClient.getOptions().setAppletEnabled(true);
            //webClient.getCookieManager().setCookiesEnabled(true);
            //webClient.setJavaScriptTimeout(100);

            // 代理
            //Proxy proxy = new Proxy("120.203.158.148", 8118);
            //((DefaultCredentialsProvider) webClient.getCredentialsProvider()).addCredentials(proxy, 123);

            // 发送请求
            WebRequest request = new WebRequest(new URL(url));
            //request.setCharset("UTF-8");
            //request.setAdditionalHeader("Referer", "http://www.baidu.com");
            //request.setAdditionalHeader("Accept-Language", "zh-CN,zh;q=0.8");
            //request.setAdditionalHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
            HtmlPage page = webClient.getPage(request);

            return page.asXml();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        } finally {
            try {
                if (webClient != null) {
                    webClient.close();
                }
            } catch(Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```

