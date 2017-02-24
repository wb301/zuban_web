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
    var userToken = NormalHelper.getCookie(GlobalModel.COOKIE_USER_INFO) ? NormalHelper.getCookie(GlobalModel.COOKIE_USER_INFO) : '';
    var userToken = '1';
    if (userToken) {
        if (request.method == 'GET') {
            request.params.token = userToken;
        } else if (request.method == 'POST') {
            request.body.token = userToken;
        }
    }
    //当用到当前组件对象时, 使用 GlobalModel.RootVue
    next((res) => {
        // setLoading(store, false)
        //if(res.data){
        //  let data = JSON.parse(res.data);
        //
        //}
        if (res.status == 200) {
            var codes = ['-999'];
            // if (codes.indexOf(res.data.code + '') > -1) {
            //     sweetAlert(res.data.msg);
            //     NormalHelper.setCookie(GlobalModel.COOKIE_USER_INFO, '');
            //     var goRouterName = GlobalModel.RootVue.$route.path;
            //     var id = GlobalModel.RootVue.$route.params.id ? GlobalModel.RootVue.$route.params.id : 0;
            //     if (goRouterName.indexOf('login') < 0) {
            //         GlobalModel.RootVue.$router.push({
            //             path: 'Login',
            //             params: {
            //                 from: goRouterName,
            //                 id: id
            //             }
            //         })
            //         return;
            //     }
            // } else {
            //     sweetAlert(res.data.msg);
            // }
        }
        //  console.log('after ajax')
        if (res.status === 0) {
            console.log('网络不给力')
                // setTip(store, {
                //   text: '网络不给力，请稍后再试'
                // })
        }

        if (res.data.status == -1) {}
        // if (!data.success) {
        //   // setTip(store, {
        //   //   text: data.error_msg
        //   // })
        // }
        return res;
    })
}
