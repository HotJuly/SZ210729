import Vue from "vue"

export default {
    name:"RouterLink",
    functional: true,
    props:{
        to:{
            require:true,
            type:String
        },
        tag:{
            default:"a"
        }
    },
    render: function (createElement, {data,props,children}) {
        
        // 此处是在给a标签绑定点击事件
        data.on={
            click:function(event){
                //禁用a标签的默认行为,防止真正跳转页面
                event.preventDefault();

                // 使用编程式导航控制路由进行切换
                Vue.prototype.$router.push(props.to);
            }
        }

        data.attrs.href = props.to;


        return createElement(props.tag,data,children);
    }
}