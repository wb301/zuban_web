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
        path: '/wx-login/:next',
        component: function(resolve) {
            require(['./page/wx/login/Index.vue'], resolve)
        }
    }, {
        path: '/wx-middle/:next/:user',
        component: function(resolve) {
            require(['./page/wx/login/WxMiddle.vue'], resolve)
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
        path: '/agree/:next',
        component: function(resolve) {
            require(['./page/account/agree/Index.vue'], resolve)
        }
    }, {
        path: '/my-service-list',
        component: function(resolve) {
            require(['./page/my-service-list/list/Index.vue'], resolve)
        }
    }, {
        path: '/product/:productCode',
        component: function(resolve) {
            require(['./page/product/Index.vue'], resolve)
        }
    }, {
        path: '/orderlist/:type',
        component: function(resolve) {
            require(['./page/order/Index.vue'], resolve)
        }
    }, {
        path: '/order-details/:orderNo/:type',
        component: function(resolve) {
            require(['./page/order-details/Index.vue'], resolve)
        }
    }, {
        path: '/my-info',
        component: function(resolve) {
            require(['./page/my-info/Index.vue'], resolve)
        }
    }, {
        path: '/vip',
        component: function(resolve) {
            require(['./page/vip/Index.vue'], resolve)
        }
    }, {
        path: '/confirm/:type/:productCode',
        component: function(resolve) {
            require(['./page/confirm/Index.vue'], resolve)
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
        path: '/my-wallet',
        component: function(resolve) {
            require(['./page/my-wallet/Index.vue'], resolve)
        },
    }, {
        path: '/money',
        component: function(resolve) {
            require(['./page/my-wallet/Money.vue'], resolve)
        }
    }, {
        path: '/detail',
        componment: function(resolve) {
            require(['./page/my-wallet/Detail.vue'], resolve)
        }
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
});
export default router
