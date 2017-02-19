var WebAppSdkHelper = {};
//原生接口方法名称
WebAppSdkHelper.GetCacheSize = "0001"; // 获取缓存大小
WebAppSdkHelper.ClearAllCache = "0002"; // 清除缓存
WebAppSdkHelper.OpenNewWeb = "0003"; //重新打开一个web页面
WebAppSdkHelper.GetAppInfo = "0004"; // 获取app info
WebAppSdkHelper.GetStoreInfo = "0005"; //获取店铺信息
WebAppSdkHelper.GetUserInfo = "0006"; //获取用户信息
WebAppSdkHelper.SetTitle = "0007"; //设置title
WebAppSdkHelper.RemoveRefresh = "0008"; //web view 移除下拉刷新
WebAppSdkHelper.AddRefresh = "0009"; //web view 添加下拉刷新
WebAppSdkHelper.SetRightBtn = "0010"; //web view 设置导航栏右边的按钮
WebAppSdkHelper.IntoEdit = "0018"; //转入编辑界面
WebAppSdkHelper.ChangeMode = "0019"; //转入编辑界面

/**
 * 以下是原生的新接口,适用于除有范app之外的应用
 */
/*原生接口调用
 * p_methodId: 接口模块ID
 * p_param: 参数*/
WebAppSdkHelper.callNativeProxy = function(p_methodId, p_param) {
    var param_object = {
        methodId: p_methodId,
        params: p_param
    };
    try {
        return NativeProxy.invokeHandlerWithInfo(JSON.stringify(param_object));
    } catch (e) {
        console.log('NativeProxy not defined');
        return null;
    }

};
//页面跳转
WebAppSdkHelper.jumpToPage = function(p_url) {
    if (this.checkInApp()) {
        WebAppSdkHelper.callNativeProxy(WebAppSdkHelper.OpenNewWeb, { 'url': p_url });
    } else {
        window.location.href = p_url;
    }
};
//设置标题
WebAppSdkHelper.setTitle = function(p_title) {
    if (WebAppSdkHelper.checkInApp()) {
        WebAppSdkHelper.callNativeProxy(WebAppSdkHelper.SetTitle, { 'title': p_title });
    } else {
        window.document.title = p_title;
    }
};
//设置右上角标题
WebAppSdkHelper.setRightBtn = function(p_navParam, ) {
    if (WebAppSdkHelper.checkInApp()) {
        WebAppSdkHelper.callNativeProxy(WebAppSdkHelper.SetRightBtn, p_navParam);
    }
};
//判断是否在APP中
WebAppSdkHelper.checkInApp = function() {
    //只在app内使用,直接返回true
    // return NormalHelper.getAppInfo()?true:false;
    return true;
};

//转入编辑界面
WebAppSdkHelper.intoEditingInterface = function() {
    if (WebAppSdkHelper.checkInApp()) {
        WebAppSdkHelper.callNativeProxy(WebAppSdkHelper.IntoEdit);
    }
};

/**
 * 获得用户信息
 * return{
    email;
    userid;
    create_time;
    token;
    user_name;
 * }
 */
WebAppSdkHelper.getUserInfo = function() {
    if (WebAppSdkHelper.checkInApp()) {
        return WebAppSdkHelper.callNativeProxy(WebAppSdkHelper.GetUserInfo);
    } else {
        return null;
    }
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
WebAppSdkHelper.getAppInfo = function() {
    if (WebAppSdkHelper.checkInApp()) {
        return WebAppSdkHelper.callNativeProxy(WebAppSdkHelper.GetAppInfo);
    } else {
        return null;
    }
};
/**
 * 获得缓存
 */
WebAppSdkHelper.getCacheSize = function() {
    if (WebAppSdkHelper.checkInApp()) {
        return WebAppSdkHelper.callNativeProxy(WebAppSdkHelper.GetCacheSize);
    } else {
        return null;
    }
};

/**
 * 清缓存
 * return 0.3G 、120M、30K、50dB
 */
WebAppSdkHelper.clearAllCache = function() {
    if (WebAppSdkHelper.checkInApp()) {
        WebAppSdkHelper.callNativeProxy(WebAppSdkHelper.ClearAllCache);
    }
};
/**
 * 设置屏幕模式
 * @param p_mode string
 *  '0'为白天模式  '1'为夜间模式
 */
WebAppSdkHelper.changeMode = function(p_mode) {
    if (WebAppSdkHelper.checkInApp()) {
        WebAppSdkHelper.callNativeProxy(WebAppSdkHelper.ChangeMode, {
            key: 'mode',
            value: p_mode
        });
    }
};

module.exports = WebAppSdkHelper;
