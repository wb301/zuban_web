var SaveDataHelper = {};
/**
 * 保存用户信息
 * @param p_userInfo
 * {
 * token:
 * userid:
 * lastDate: 最后一次登录的时间
 * }
 */
SaveDataHelper.saveUserInfoLocal = function(p_userInfo) {
    if (typeof p_userInfo != 'object') {
        p_userInfo = '';
    }
    SaveDataHelper.setLocalStorage(GlobalModel.COOKIE_USER_INFO, JSON.stringify(p_userInfo));
};

/**
 * 获取用户信息
 * return
 * null 则没有用户
 * 或者
 * p_userInfo
 * {
 * token:
 * userid:
 * }
 */
SaveDataHelper.getUserInfoLocal = function() {
    var userInfo = SaveDataHelper.getLocalStorage(GlobalModel.COOKIE_USER_INFO);
    //判断用户是否已经30天没有登录过,如果是则重新登录
    if (userInfo != '') {
        return JSON.parse(userInfo)
    }
    return null;

};

/**
 * 保存app信息
 * @param p_AppInfo
 */
SaveDataHelper.saveAppInfoLocal = function(p_AppInfo) {
    if (typeof p_AppInfo === 'object') {
        p_AppInfo = JSON.stringify(p_AppInfo);
    } else if (!p_AppInfo) {
        p_AppInfo = '';
    }
    SaveDataHelper.setLocalStorage(GlobalModel.COOKIE_APP_INFO, p_AppInfo);
};
/**
 * 获取app信息
 * @returns
 * null 不在app内
 * 或者
 * {
 *  app_name
 *  app_version
 *  device_id
 *  os_code 'ios','android'
 *  os_model
 *  os_version
 * }
 */
SaveDataHelper.getAppInfoLocal = function() {
    var appInfo = SaveDataHelper.getLocalStorage(GlobalModel.COOKIE_APP_INFO);
    if (appInfo === '') {
        return null;
    } else {
        return JSON.parse(appInfo);
    }

};
/**
 * 获得app的设备号
 * @returns
 * null 不在app内
 * 或者
 * 'ios','android'
 */
SaveDataHelper.getAppModelLocal = function() {
    var appInfo = SaveDataHelper.getAppInfoLocal();
    if (!appInfo) {
        return null
    } else {
        return appInfo.os_code;
    }

}



/**
 * 删除数据从LocalStorage
 * @param p_key
 */
SaveDataHelper.removeLocalStorage = function(p_key) {
    if (localStorage)
        localStorage.removeItem(p_key);
};
/**
 * 获得数据从LocalStorage
 * @param p_key
 * @returns {*}
 */
SaveDataHelper.getLocalStorage = function(p_key) {
    var str = null;
    if (localStorage) {
        str = localStorage.getItem(p_key);
        if (str) {
            return JSON.parse(str);
        }
    }
    return null;
};
/**
 * 保存数据从LocalStorage
 * @param p_key
 * @param p_value
 */
SaveDataHelper.setLocalStorage = function(p_key, p_value) {
    var str = null;
    if (localStorage) {
        if (p_value) {
            str = JSON.stringify(p_value);
            localStorage.setItem(p_key, str);
        }
    }
};
/*
 * sessionStorage 浏览器本地存储 会话关闭时，自动删除数据
 * */
/**
 * @param p_key
 * @param p_value
 */
SaveDataHelper.setSessionStorage = function(p_key, p_value) {
    if (sessionStorage)
        sessionStorage.setItem(p_key, p_value);
};
/**
 *
 * @param p_key
 */
SaveDataHelper.getSessionStorage = function(p_key) {
    if (sessionStorage)
        return sessionStorage.getItem(p_key);
};
/**
 *
 * @param p_key
 */
SaveDataHelper.removeSessionStorage = function(p_key) {
    if (sessionStorage)
        sessionStorage.removeItem(p_key);
};
/*
 * cookie 浏览器本地存储 获取及删除数据
 * */
/**
 *
 * @param p_key
 * @returns {null}
 */
SaveDataHelper.getCookie = function(p_key) {
    var arr, reg = new RegExp("(^| )" + p_key + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
};
/**
 *
 * @param p_key
 * @param p_value
 * @param p_expiresTime
 */
SaveDataHelper.setCookie = function(p_key, p_value, p_expiresTime) {
    var exp = new Date();
    exp.setTime(exp.getTime() + p_expiresTime * 24 * 60 * 60 * 1000);
    document.cookie = p_key + "=" + escape(p_value) + ";expires=" + exp.toGMTString() + ";path=/";
};
/**
 *
 * @param p_key
 */
SaveDataHelper.delCookie = function(p_key) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cVal = SaveDataHelper.getCookie(p_key);
    if (cVal != null)
        document.cookie = p_key + "=" + cVal + ";expires=" + exp.toGMTString();
};

module.exports = SaveDataHelper;
