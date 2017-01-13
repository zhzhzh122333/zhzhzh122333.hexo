/** 流量大小格式处理 **/
var renderSize = function (value, roundDigit) {
	if (null == value || value == '') {
		return "0 Bytes";
	}
	var unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");

	var srcsize = parseFloat(value);
	var index = Math.floor(Math.log(srcsize) / Math.log(1024));
	var size = 0;
	
	var nRound = srcsize / Math.pow(1024, index);
	if (nRound >= 0) {
		size = parseInt((nRound * Math.pow(10, roundDigit) + 0.5)) / Math.pow(10, roundDigit);
	} else {
		size = - parseInt((-nRound * Math.pow(10, roundDigit) + 0.5)) / Math.pow(10, roundDigit);
	}
	
	return size + " " + unitArr[index];
}

/** 流量大小格式处理 **/
var renderNumber = function (value, roundDigit) {
	if (null == value || value == '') {
		return "0";
	}
	var unitArr = new Array("", " 万", " 亿", " 万亿", " 亿亿");

	var srcsize = parseFloat(value);
	var index = Math.floor(Math.log(srcsize) / Math.log(10000));
	var size = 0;
	
	var nRound = srcsize / Math.pow(10000, index);
	if (nRound >= 0) {
		size = parseInt((nRound * Math.pow(10, roundDigit) + 0.5)) / Math.pow(10, roundDigit);
	} else {
		size = - parseInt((-nRound * Math.pow(10, roundDigit) + 0.5)) / Math.pow(10, roundDigit);
	}
	
	return size + unitArr[index];
}

/** 大数字加分隔符 **/
var formatNumber = function(iIn, splitChar){
	if (iIn < 1000) {
		// A small optimisation for what is likely to be the majority of use cases
		return iIn;
	}
	
	var s = (iIn + ""),
	a = s.split(""),
	out = "",
	iLen = s.length;
	
	for (var i = 0; i < iLen; i++) {
		if (i % 3 === 0 && i !== 0) {
			out = splitChar + out;
		}
		out = a[iLen - i - 1] + out;
	}
	return out;
}

/** 截取字符串 **/
var cutString = function(str, len){
	if(str == undefined) return "";
	
	return str.length > len ? str.substring(0, len) + "…" : str;
}

/** 获取地址栏参数 **/
var getUrlString = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURI(r[2]);
	return null;
}
