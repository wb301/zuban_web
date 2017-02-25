import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
    mode: 'hash',
    routes: [{
        path: '/index',
        component: function(resolve) {
            require(['./components/Hello.vue'], resolve)
        }
    }, {
        path: '/login',
        component: function(resolve) {
            require(['./page/account/login/Index.vue'], resolve)
        }
    }, {
        path: '/registered',
        component: function(resolve) {
            require(['./page/account/registered/Index.vue'], resolve)
        }
    }, {
        path: '/password/:next',
        component: function(resolve) {
            require(['./page/account/password/Index.vue'], resolve)
        }
    }, {
        path: '/my-service-list',
        component: function(resolve) {
            require(['./page/my-service-list/list/Index.vue'], resolve)
        }
    }, {
        path: '/product',
        component: function(reslove){
            require(['./page/product/Index.vue'],reslove)
        }
    },{
        path: '/orderlist/:type',
        component: function(resolve) {
            require(['./page/order/Index.vue'], resolve)
        }
    }, {
        path: '/my-info',
        component: function(resolve) {
            require(['./page/my-info/Index.vue'], resolve)
        }
    }, {
        path: '/service-list/',
        component: function(resolve) {
            require(['./page/service-list/Index.vue'], resolve)
        },
        children: [{
            path: '/list',
            component: function(resolve) {
                require(['./page/service-list/list/Index.vue'], resolve)
            }
        }, {
            path: '/release',
            component: function(resolve) {
                require(['./page/service-list/release/Index.vue'], resolve)
            }
        }, {
            path: '/my',
            component: function(resolve) {
                require(['./page/service-list/my/Index.vue'], resolve)
            }
        }]
    }, {
        path: '/',
        redirect: {
            path: '/login'
        }
    }, {
        path: '*',
        redirect: {
            path: '/login'
        }
    }]
})

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0) // scroll to top
    next()
})
export default router
