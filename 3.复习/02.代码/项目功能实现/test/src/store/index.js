import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
    state:{
        cancelFns:{}
    },
    mutations:{
        ADDCANCELFN(state,{url,cb}){
            // 用于收集发送出去的请求的url和对应的取消回调函数
            state.cancelFns[url] = cb;
        },
        DELETECANCELFN(state,url){
            // 用于删除已经响应的请求的url和取消回调函数
            delete state.cancelFns[url]
        },
        CLEARCANCELFNS(state){
            Object.values(state.cancelFns).forEach((cb)=>{
                cb();
            })
            
            state.cancelFns = {};
        }
    }
})