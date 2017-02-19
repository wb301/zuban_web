import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import HttpReqDefine from './global-define/HttpReqDefine'

import VueLazyLoad from 'vue-lazyload'
import EmptyYouFan from './assets/logo.png'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)
Vue.use(VueLazyLoad, {
    error: EmptyYouFan,
    loading: EmptyYouFan
});
Vue.use(VueResource);
Vue.http.interceptors.push(HttpReqDefine)

new Vue({
    router,
    ...App
}).$mount('#app')
