//发送异步请求
jQuery.send = function(url,json,func){
	jQuery.ajax({
        type: "post",
        async: true,
        url: url,
        data: {"params" : JSON.stringify(json)}, 
        contentType: "application/x-www-form-urlencoded",
        dataType: "text",
        cache: false,
        success: function (data) {
            //返回的数据用data.d获取内容
            if(func != null){
            	func(parseJSON(data));
            }
        },
        error: function (err) {
            return err;
        }
    });
}
jQuery.sendSyn = function(action,method,json,func){
	jQuery.ajax({
        type: "post",
        async: true,
        url: jQuery.GetUrl(window) + action + "/" + method + ".do",
        data: {"params" : JSON.stringify(json)}, 
        contentType: "application/x-www-form-urlencoded",
        dataType: "text",
        cache: false,
        success: function (data) {
            //返回的数据用data.d获取内容
            if(func != null){
            	func(parseJSON(data));
            }
        },
        error: function (err) {
            return err;
        }
    });
}
//发送文件
jQuery.sendFile = function(action,method,formData,func){
	jQuery.ajax({
        type: "post",
        async: true,
        url: jQuery.GetUrl(window) + action + "/" + method + ".do",
        data: formData,
        contentType: false,
        processData: false, 
        dataType: "text",
        cache: false,
        success: function (data) {
            //返回的数据用data.d获取内容
            if(func != null){
            	func(parseJSON(data));
            }
        },
        error: function (err) {
            return err;
        }
    });
}
//jQuery.sendSyn= function(action,method,json,win){
//		data : null,
//		jQuery.ajax({
//            type: "post",
//            async:false,
//            url: jQuery.GetUrl(win == null?window:win)+ action + "/" + method + ".do",
//            data: {"params" : JSON.stringify(json)}, 
//            contentType: "application/x-www-form-urlencoded",
//            dataType: "text",
//            cache: false,
//            success: function (data) {
//                //返回的数据用data.d获取内容
//                jQuery.sendSyn.data = parseJSON(data);
//            },
//            error: function (err) {
//                alert("您发送的请求没有相应，请与系统管理员联系");
//                return err;
//            }
//        });
//		return jQuery.sendSyn.data;
//}
jQuery.GetUrl = function(win, layer) {
	var target = "";
	try {
		if(win) {
			target = win.top.Agency.Target.value;
		} else {
			target = top.Agency.Target.value;
		}
	} catch (e) {
		target = "web";
	}
	if(target && target == "local") {
		if(layer) {
			var strPath = "";
			for(var i=0; i<layer; i++) {
				strPath += "../";
			}
			return strPath;
		} else {
			return "../../";
		}
	} else {
		var hrefStr= top.location.href;
		var index = hrefStr.indexOf("\/", 8);
		index = hrefStr.indexOf("\/", index+1);
		return hrefStr.substring(0, index+1);//return "http://localhost:8080/spring/";
	}
}
function parseJSON(string) {
	try {
		return eval('(' + string + ')');
	} catch (e) {
		throw new SyntaxError("解析JSON字符串出错");
	}
}