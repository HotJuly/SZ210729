import axios from 'axios';
import store from '../store';

const request = axios.create({
    baseURL:"/api",
    timeout:20000
})

const CancelToken = axios.CancelToken;

request.interceptors.request.use((config)=>{
    let cb;

    // 通过CancelToken构造函数可以创建出实例对象,作为当前请求的唯一标识
    // CancelToken接收到的回调函数会被同步执行,回调函数会接受到一个用于取消当前请求的函数
    config.cancelToken = new CancelToken((callback)=>{
        cb = callback;
    });

    // 将取消的回调函数存入到Vuex中,供之后路由跳转时使用
    store.commit('ADDCANCELFN',{url:config.url,cb})

    return config
})

request.interceptors.response.use((response)=>{
    // 从response的config中读取出当前本次响应的url链接
    store.commit('DELETECANCELFN',response.config.url)
    return response.data;
})

export default request