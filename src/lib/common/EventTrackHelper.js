var BaiDuSdk = {};
//注：百度统计初始化,需要在html文件中head田间如下代码
/*
var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?246fb2dae97a961668c2cdea9c490b08";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
*/

//统计pv(百度统计)
//用于发送某个指定URL的PV统计请求，通常用于AJAX页面的PV统计。
BaiDuSdk.trackPageview = function(p_pageURL) {
    if (typeof(_hmt) === 'undefined' || !_hmt) {
        return;
    }
    _hmt.push(['_trackPageview', p_pageURL]);
};
//统计点击事件
//用于触发某个事件
/*
 category   必选  String  要监控的目标的类型名称
 action     必选  String  用户跟网页进行交互的动作名称
 opt_label  可选  String  事件的一些额外信息
 opt_value  可选  Number  跟事件相关的数值
 */
BaiDuSdk.trackEvent = function(p_category, p_action, p_opt_label, p_opt_value) {
    if (typeof(_hmt) === 'undefined' || !_hmt) {
        return;
    }
    var condition = ['_trackEvent', p_category, p_action];
    if (p_opt_label) {
        condition.push(p_opt_label);
    }
    if (p_opt_value) {
        condition.push(p_opt_value);
    }
    _hmt.push(condition);
};


var TalkingData = {};
//使用talkingData,需要在html文件的head添加如下代码：
//<script src="https://jic.talkingdata.com/app/h5/v1?appid=57ACC73DD380D01B489EC428768DB40F&vn=v1.0&vc=1.0"></script>

TalkingData.trackByEvent = function(p_eventId, p_labelId, p_mapKv) {
    if (TDAPP.onEvent) {
        if (!p_eventId) {
            TalkingData._errorLog('参数为空')
        }
        if (!p_labelId && !p_mapKv) {
            TDAPP.onEvent(p_eventId);
        } else if (!p_mapKv) {
            TDAPP.onEvent(p_eventId, p_labelId);
        } else {
            TDAPP.onEvent(p_eventId, p_labelId, p_mapKv);
        }
    } else {
        var param = {
            _event_id: p_eventId,
            _label_id: p_labelId,
            _map_kv: p_mapKv
        };
        TalkingData._errorLog("talkingdata统计代码加载出错;事件:_trackByEventDesc,参数:param=" + JSON.stringify(param));
    }
};
//错误记载
TalkingData._errorLog = function(log) {
    console.log(log);
};

module.exports = {
    TalkingData: TalkingData,
    BaiDuSdk: BaiDuSdk
};
