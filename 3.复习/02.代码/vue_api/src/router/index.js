import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../components/Home.vue';
import About from '../components/About.vue';

Vue.use(VueRouter);

/*
    面试题:什么是路由?
    回答:
        路由分为前端路由和后端路由
        前端路由就是路由路径与路由组件之间的映射关系
        后端路由就是路由路径+请求方式与路由回调函数之间的映射关系
        router.get('/test',()=>{})
*/
export default new VueRouter({
    mode:"history",
    routes:[
        {
            path:"/home",
            component:Home
        },
        {
            path:"/about",
            component:About
        }
    ]
})