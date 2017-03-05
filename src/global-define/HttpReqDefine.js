/**
 * @content: 全局的基于Vue-Resource的ajax预处理
 * @export
 * @param {any} request
 * @param {any} next
 * @returns
 */
// import store from './vuex/store'
// 全局错误处理，全局loading
// import { setLoading, setTip } from './vuex/actions/doc_actions'
export default function(request, next) {
    var userToken =  NormalHelper.userInfo().token;
    if (userToken) {
        if (request.method == 'GET' && !request.params.token) {
            request.params.token = userToken;
        } else if (request.method == 'POST' && !request.body.token) {
            request.body.token = userToken;
        }
    }
    //当用到当前组件对象时, 使用 GlobalModel.RootVue
    next((res) => {
        var body = res.body;
        if (body.status && body.status != 1) {
            if(body.msg.length > 0){
                weui.alert(body.msg);
            }
            if(body.code == -999){
                NormalHelper.setCookie(GlobalModel.COOKIE_USER_INFO, '');
                GlobalModel.RootVue.$router.push({
                        path: '/login'
                    });
            }
        }

        return res;
    })
}
