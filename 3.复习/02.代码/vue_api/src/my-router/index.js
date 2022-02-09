import Vue from 'vue';

import install from './install';

function deepMapRroutes(routes){
    // 由于该函数被call调用,所以this被指定为了mapRoutes对象
    routes.forEach((routeObj)=>{
        let key = routeObj.path;
        let value = routeObj.component;
        this[key] = value

        // if(routeObj.children&&routeObj.children.length){
        if(routeObj.children?.length){
            deepMapRroutes.call(this,routeObj.children)
        }
    })
}

class MyRouter{
    constructor(options){
        this.options = options;

        //通过路由路径字符串可以遍历routes数组来找到需要显示的路由组件
        // 但是数组的性能相对较低,此处需要转换数据结构
        /*
            原先的数据结构:
            [
                {
                    path:"/home",
                    component:Home
                },
                {
                    path:"/about",
                    component:About,
                    children:[
                        {
                            path:"/about/haha",
                            component:"HaHa"
                        }
                    ]
                }
            ]   

            转换之后的结构:
            {
                "/about":About,
                "/about/haha":HaHa,
                "/home":Home,
            }
        
        */

        this.mapRoutes = {};

        deepMapRroutes.call(this.mapRoutes,this.options.routes)

        // console.log(this.mapRoutes)

        Vue.prototype.$router = this;

        Vue.prototype.$route = Vue.observable({
            path:window.location.pathname
        })

        // 通过监视popstate事件,可以知道用户是否点击了回退按钮,从而显示出对应的路由组件
        window.addEventListener('popstate',()=>{
            // console.log(event);
            let path = window.location.pathname;
            
            Vue.prototype.$route.path = path;
        })
    }

    push(path){
        // 控制路由跳转

        //1.控制浏览器历史记录栈变化
        window.history.pushState({},"",path);

        //2.修改响应式属性path,从而通知view组件展示对应的路由组件
        Vue.prototype.$route.path = path;
    }
}

// new MyRouter({
//     routes:[
//         {
//             path:"/home",
//             component:"Home"
//         },
//         {
//             path:"/about",
//             component:"About",
//             children:[
//                 {
//                     path:"/about/haha",
//                     component:"HaHa"
//                 }
//             ]
//         }
//     ]
// })

MyRouter.install = install;

export default MyRouter