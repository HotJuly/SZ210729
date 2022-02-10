import jquery from 'jquery';
// import {jia} from './lodash.js';
console.log('main',jquery)

document.querySelector('#btn').onclick=function(){
    // 在webpack中使用import函数引入的文件,都会被单独切割成一个js文件,只有当用户使用到该代码的时候,才会发送网络请求进行加载
    import(/* webpackChunkName: "lodash" */ './lodash.js')
    // console.log()
}