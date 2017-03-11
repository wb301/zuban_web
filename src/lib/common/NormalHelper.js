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
NormalHelper.userInfo = function() {
    return NormalHelper.getCookie(GlobalModel.COOKIE_USER_INFO) ? JSON.parse(NormalHelper.getCookie(GlobalModel.COOKIE_USER_INFO)) : { nick_name: '未登录', account: '', token: null, server_phone: "4008817673" }
}
NormalHelper.setUserInfo = function(response) {
    NormalHelper.setCookie(GlobalModel.COOKIE_USER_INFO, JSON.stringify(response));
}

NormalHelper.Set = function(key, value) {
    var userInfo = NormalHelper.userInfo();
    if (!userInfo.common) {
        userInfo.common = {};
    }
    userInfo.common[key] = value;
    NormalHelper.setUserInfo(userInfo);
}

NormalHelper.Get = function(key) {
    var userInfo = NormalHelper.userInfo();
    if (userInfo && userInfo.common && userInfo.common[key]) {
        return userInfo.common[key]
    } else {
        return '';
    }
}

//微信转存专用
NormalHelper.getOpenId = function() {
    return NormalHelper.Get("wx_middle_open_id");
}

//获取浏览器信息
NormalHelper.getPhoneInfo = function() {
    return JSON.stringify(navigator.userAgent);
}

//微信登录
NormalHelper.wxLogin = function(redirect_url) {
    redirect_url = JSON.stringify({ "url": encodeURIComponent(redirect_url) });
    window.location.href = GlobalModel.SERVER_URL + "c=Wechat&m=ThirdLogin&a=wxLogin&redirect_url=" + redirect_url;;
};

//获取经纬度  默认 上海周边经纬度
NormalHelper.cur_postion = { latitude: 31, logitude: 121 };
NormalHelper.getPostion = function(callback) {
    if (SaveDataHelper.getLocalStorage('pos')) {
        NormalHelper.cur_postion = SaveDataHelper.getLocalStorage('pos');
    }
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
        geol.getCurrentPosition(function(postion) {
                NormalHelper.cur_postion.latitude = postion.coords.latitude;
                NormalHelper.cur_postion.logitude = postion.coords.longitude;
                SaveDataHelper.setLocalStorage('pos', NormalHelper.cur_postion);
                if (typeof callback == 'function') { callback(NormalHelper.cur_postion); }
            },
            function(error) {
                // switch (error.code) {
                //     case error.TIMEOUT :
                //         alert("连接超时，请重试");
                //         break;
                //     case error.PERMISSION_DENIED :
                //         alert("您拒绝了使用位置共享服务，查询已取消");
                //         break;
                //     case error.POSITION_UNAVAILABLE :
                //         alert("非常抱歉，我们暂时无法通过浏览器获取您的位置信息");
                //         break;
                //     default:
                //         alert("无法获取定位信息");
                // }
                if (typeof callback == 'function') { callback(NormalHelper.cur_postion); }
            }, {
                enableHighAccuracy: true,
                timeout: 10000, //设置十秒超时
                maximumAge: 0
            }
        );
    } else {
        if (typeof callback == 'function') { callback(NormalHelper.cur_postion); }
    }
    return NormalHelper.cur_postion;
};

NormalHelper.isWeixin = function() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
};

NormalHelper.uploadBase64 = function(p_sel, callback) {
    p_sel.on('change', function() {
        var file = this.files[0];
        if (window.FileReader && file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function() {
                var ary = quality(this.result, callback);
            }
        }
    })
}

NormalHelper.imageRotate = function(url){
    var urlList = url.split("/");
    var rotate = urlList[urlList.length-1];
    var newRotate = parseInt(rotate)+90;
    if(newRotate >= 360){
        newRotate = 0;
    }
    return url.replace("/imageMogr2/rotate/"+rotate,"/imageMogr2/rotate/"+newRotate);
}

function quality(src, callback) {
    var img = new Image,
        canvas = document.createElement("canvas"),
        drawer = canvas.getContext("2d");
    img.src = src;

    img.onload = function() {
        img.onload = null;
        var width = this.width;
        var height = this.height;

        var size = 300;
        if (width > height) {
            canvas.height = size;
            canvas.width = canvas.height / height * width;
        } else {
            canvas.width = size;
            canvas.height = canvas.width / width * height;
        }
        drawer.drawImage(this, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
        var format = "image/jpeg";
        var base64 = canvas.toDataURL(format).split("base64,")[1];

        var wh = canvas.width;
        if (canvas.width > canvas.height) {
            wh = canvas.height;
        }

        initBase64QiniuToken(base64, function() {
            if (this.readyState == 4) {
                // console.log(this.response);
                var picName = JSON.parse(this.response)["hash"];
                var url = GlobalModel.CDN_BASE_URL + picName + "?imageView2/1/w/" + wh + "/h/" + wh+"/imageMogr2/rotate/0";
                // console.log(url);
                if (typeof callback == 'function') {
                    callback(url);
                }
            }
        });
    }
}

function initBase64QiniuToken(upImage, func) {
    var param = {
        c: 'Zb',
        m: 'Qiniu',
        a: 'getQiniuToken'
    };
    var p_obj = {
        action: '',
        param: param,
        success: (response) => {
            // console.log("response"+response);
            // console.log("upImage"+upImage);
            putb64(response, upImage, func);
        },
        fail: (response) => {
            weui.alert(response.msg)
        }
    };
    AjaxHelper.GetRequest(p_obj);
}

/*
 七牛base64图片上传
 */
function putb64(p_qiniuToken, upImage, func) {
    var url = "http://up.qiniu.com/putb64/" + "-1";
    if (window.location.protocol === 'https:') {
        url = "https://up.qbox.me/putb64/" + "-1";
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = func;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.setRequestHeader("Authorization", "UpToken " + p_qiniuToken);
    xhr.send(upImage);
}
module.exports = NormalHelper;
