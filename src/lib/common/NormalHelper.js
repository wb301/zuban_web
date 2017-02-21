var NormalHelper = {};
//解析url参数
NormalHelper.parseUrlQuery = function(p_url) {
    var query = {},
        i, params, param;
    if (p_url.indexOf('?') >= 0) p_url = p_url.split('?')[1];
    else return query;
    params = p_url.split('&');
    for (i = 0; i < params.length; i++) {
        param = params[i].split('=');
        query[param[0]] = param[1];
    }
    return query;
};
//验证手机号码格式
NormalHelper.checkMobile = function(str) {
    var re = /^1\d{10}$/;
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
};
//是否为数组
NormalHelper.isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

NormalHelper.alert = function(p_msg){
  alert(p_msg);
};

//获取cookie
NormalHelper.getCookie = function(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
};
NormalHelper.setCookie = function(name, value, expiresTime) {
    var cdata = name + "=" + escape(value);
    if (expiresTime > 0) {
        var Days = expiresTime;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        cdata += "; expires=" + exp.toGMTString();
    }
    cdata += "; path=/";
    document.cookie = cdata;
};
NormalHelper.delCookie = function(name) {
    this.setCookie(name, null, -1);
};

module.exports = NormalHelper;
