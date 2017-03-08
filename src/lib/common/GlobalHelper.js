//内容类型
var GlobalModel = {};
GlobalModel.SERVER_DOMAIN = '';
GlobalModel.SERVER_PATH = '/zuban';
if (process.env.NODE_ENV === 'production') {
    GlobalModel.SERVER_DOMAIN = '';
    GlobalModel.SERVER_PATH = '/youfan/api/index.php?';
} else {
    GlobalModel.SERVER_DOMAIN = '';
    GlobalModel.WAP_URL = 'http://test.guleshop.com/youfan/web/';
}
GlobalModel.LOCAL_URL = 'https://test.guleshop.com/youfan/web';
GlobalModel.SERVER_URL = GlobalModel.SERVER_DOMAIN + GlobalModel.SERVER_PATH;
GlobalModel.WX_JS_SDK_CONFIG = GlobalModel.SERVER_DOMAIN + '/appsdk_wx_js/wx_config.php?callback=?';


GlobalModel.AJAX_STATUS_SUCCESS = 1; //AJAX返回数据正确


//存储本地cookie
GlobalModel.COOKIE_PREFIX = 'ZU_BAN'; //cookie的工程前缀，避免不同项目的cookie重复
//用户信息
GlobalModel.COOKIE_USER_INFO = GlobalModel.COOKIE_PREFIX + 'COOKIE_USER_INFO';

GlobalModel.RootVue = null;
GlobalModel.CDN_BASE_URL = "https://ome5w9045.qnssl.com/";
module.exports = GlobalModel;