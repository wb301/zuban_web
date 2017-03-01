var WxHelper = {};
//读取微信配置信息
WxHelper.loadWeChatConfig = function() {
    if (!NormalHelper.isWeixin()) {
        return;
    }

    WeiXin.error(function(res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        document.title = "租伴网";
        // 用来暗示错误
    });

    $.getJSON(GlobalModel.WX_JS_SDK_CONFIG, { url: location.href.split('#')[0] }, function(json, status, xhr) {
        //json.debug = true;
        WeiXin.config(json);
    });
};
//新版微信分享
WxHelper.setWeChatAPI = function(info, p_title) {
    if (p_title) {
        document.title = p_title;
    } else {
        document.title = info.title;
    }
    if (!NormalHelper.isWeixin()) {
        return;
    }
    WeiXin.ready(function() {

        // 获取“分享到QQ”按钮点击状态及自定义分享内容接口
        WeiXin.onMenuShareQQ(info);
        // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
        WeiXin.onMenuShareWeibo(info);

        // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
        WeiXin.onMenuShareAppMessage(info);

        // 分享到微信朋友圈
        // 这里是异步操作，不要直接修改info对象，重新复制一个
        var infoTimeline = {
            "imgUrl": info.imgUrl,
            "link": info.link,
            "desc": info.desc,
            "title": info.title
        };
        if (infoTimeline.desc && infoTimeline.desc != '') {
            infoTimeline.title = infoTimeline.desc;
        }
        WeiXin.onMenuShareTimeline(infoTimeline);
    });
};


/**
 * 微信中选图
 * @param config
 * {
       count: 1, // 默认9
       sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
       sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
       success: function (res) {
             var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
       }
     }
 */
WxHelper.setWechatchooseImage = function(config) {
    if (!NormalHelper.isWeixin()) {
        return;
    }
    WeiXin.ready(function() {
        WeiXin.chooseImage(config);
    });
};

/**
 * 微信中上传图片
 * @param config
 * {
     localId:需要上传的图片的本地ID，由chooseImage接口获得
     isShowProgressTips:默认为1，显示进度提示
     success: function (res) {
         var serverId = res.serverId; // 返回图片的服务器端ID
        }
    }
 */
WxHelper.setWechatUploadImage = function(config) {
    if (!NormalHelper.isWeixin()) {
        return;
    }
    WeiXin.ready(function() {
        WeiXin.uploadImage(config);
    });
};

/**
 * 微信中下载图片
 * @param config
 * {
     serverId: '', // 需要下载的图片的服务器端ID，由uploadImage接口获得
     isShowProgressTips: 1, // 默认为1，显示进度提示
     success: function (res) {
         var localId = res.localId; // 返回图片下载后的本地ID
       }
    }
 */
WxHelper.setWechatDownloadImage = function(config) {
    if (!NormalHelper.isWeixin()) {
        return;
    }
    WeiXin.ready(function() {
        WeiXin.downloadImage(config);
    });
};

module.exports = WxHelper;
