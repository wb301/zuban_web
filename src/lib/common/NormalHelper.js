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

NormalHelper.alert = function(p_msg) {
    weui.alert(p_msg);
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

//用户数据
NormalHelper.userInfo = function(){
    return NormalHelper.getCookie(GlobalModel.COOKIE_USER_INFO) ? JSON.parse(NormalHelper.getCookie(GlobalModel.COOKIE_USER_INFO)) : {nick_name:'测试',account:'12345678909'}
}
NormalHelper.setUserInfo = function(response){
    NormalHelper.setCookie(GlobalModel.COOKIE_USER_INFO, JSON.stringify(response));
}

//获取经纬度  默认 上海周边经纬度
NormalHelper.userPos = {
    latitude: 121,
    logitude: 31
};
NormalHelper.getPostion = function() {
    var geol;
    try {
        if (typeof(navigator.geolocation) == 'undefined') {
            geol = google.gears.factory.create('beta.geolocation');
        } else {
            geol = navigator.geolocation;
        }
    } catch (error) {
        alert(error.message);
    }
    if (geol) {
        geol.getCurrentPosition(function(postion){
            NormalHelper.userPos.latitude = postion.coords.latitude;
            NormalHelper.userPos.logitude = postion.coords.longitude;
        },
        function(error) {
            switch(error.code){
                // case error.TIMEOUT :
                //     alert("连接超时，请重试");
                //     break;
                // case error.PERMISSION_DENIED :
                //     alert("您拒绝了使用位置共享服务，查询已取消");
                //     break;
                // case error.POSITION_UNAVAILABLE :
                //     alert("非常抱歉，我们暂时无法通过浏览器获取您的位置信息");
                //     break;
                // default:
                //     alert("无法获取定位信息");
            }
        }, {
            enableHighAccuracy:true,
            timeout:10000,//设置十秒超时
            maximumAge:0
            }
        );
    }
    return NormalHelper.userPos;
};


module.exports = NormalHelper;
