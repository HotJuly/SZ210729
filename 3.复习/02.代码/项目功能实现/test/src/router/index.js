import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import Home from '../components/Home.vue';
import About from '../components/About.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "hash",
    routes: [
        {
            path: "/home",
            component: Home
        },
        {
            path: "/about",
            component: About
        },
        {
            path: "/",
            redirect:"/home"
        }
    ]
});

router.beforeEach((to,from,next)=>{
    // 将Vuex中所有登记在册的取消函数全部执行,就可以取消所有还未响应的请求
    store.commit('CLEARCANCELFNS');
    next();
})

export default router