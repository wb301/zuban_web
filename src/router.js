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
        path: '*',
        redirect: {
            path: '/index'
        }
    }]
})

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0) // scroll to top
    next()
})
export default router
