var AjaxHelper = {};
/**
 * get请求
 * @param p_obj
 * {
    action:'',        路径,不传默认为空字符串
    param:{},         参数
    success:function () {},成功函数
    fail:function(){},     失败函数
    }
 * @constructor
 */
AjaxHelper.GetRequest = function(p_obj) {
    if (!p_obj.param) {
        p_obj.param = {};
    }
    if (!p_obj.action) {
        p_obj.action = '';
    }
    var serverUrl = p_obj.serverUrl || GlobalModel.SERVER_URL;
    Vue.http.get(serverUrl, {
        params: p_obj.param
    }).then((response) => {
        if (response.data.status == GlobalModel.AJAX_STATUS_SUCCESS) {
            p_obj.success.apply(null, [response.data.data]);
        } else {
            if (p_obj.fail) {
                p_obj.fail.apply(null, [response.data]);
            } else {
                NormalHelper.alert(response.data.msg);
            }
        }
    }, (response) => {
        // alert("请求异常");
        //请求异常
    })
};
/**
 * post请求
 * @param p_obj
 * {
    action:'',             路径,不传默认为空字符串
    param:{},              参数
    success:function () {}, 成功函数
    fail:function(){},     失败函数
    }
 * @constructor
 */
AjaxHelper.PostRequest = function(p_obj) {
    if (!p_obj.param) {
        p_obj.param = {};
    }
    if (!p_obj.action) {
        p_obj.action = '';
    }
    var serverUrl = p_obj.serverUrl || GlobalModel.SERVER_URL;
    Vue.http.post(serverUrl + p_obj.action, p_obj.param, {
        emulateJSON: true
    }).then((response) => {
        if (response.data.status == GlobalModel.AJAX_STATUS_SUCCESS) {
            p_obj.success.apply(null, [response.data.data]);
        } else {
            if (p_obj.fail) {
                p_obj.fail.apply(null, [response.data]);
            } else {
                NormalHelper.alert(response.data.msg);
            }
        }
    }, (response) => {
        //请求异常
    })
};

module.exports = AjaxHelper;
