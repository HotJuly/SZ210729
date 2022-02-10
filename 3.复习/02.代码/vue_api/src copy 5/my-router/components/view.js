import Vue from "vue"

export default {
    name:"RouterView",
    functional: true,
    render: function (createElement, context) {
        // 此处的createElement是用来创建虚拟DOM的,不是原生DOM的那一个
        // context是上下文对象,里面存储这与当前组件相关的信息

        /*
            需求:根据当前的路由路径,显示对应的路由组件
            拆解:
                1.如何获取到当前的路由路径
                    通过Vue.prototype.$route身上的path属性可以知道当前路由路径

                2.如何找到对应的路由组件
                    根据步骤1中得到的路由路径字符串,以及提前处理好的mapRoutes对象,可以找到需要显示的组件

                3.如何显示某个组件
        */

        // 1.如何获取到当前的路由路径
        let path = Vue.prototype.$route.path;

        // 2.如何找到对应的路由组件
        let mapRoutes = Vue.prototype.$router.mapRoutes;
        let component = mapRoutes[path];

        return createElement(component);
    }
}