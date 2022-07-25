import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => import("../views/Main.vue"),
        // redirect: '/home',
        children: [
            // {
            //     path: '/home',
            //     name: 'home',
            //     component: () => import("../views/home")
            // },
            // {
            //     path: '/mall',
            //     name: 'mall',
            //     component: () => import("../views/mall")
            // },
            // {
            //     path: '/user',
            //     name: 'user',
            //     component: () => import("../views/user")
            // },
            // {
            //     path: '/page1',
            //     name: 'page1',
            //     component: () => import("../views/other/pageOne.vue")
            // },
            // {
            //     path: '/page2',
            //     name: 'page2',
            //     component: () => import("../views/other/pageTwo.vue")
            // },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("../views/login/login.vue")
    }
]


const router = new VueRouter({
    mode: 'history',
    routes
})
// 前置守卫
router.beforeEach((to, from, next) => {
    store.commit('getToken')
    const token = store.state.user.token
    if (!token && to.name !== 'login') {
        next({ name: 'login' })
    } else if (token && to.name === 'login') {
        next({ name: 'home' })
    } else {
        next()
    }
})

export default router;