import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import * as API from '@/api';
import CategorySelector from '@/components/CategorySelector';
import HintButton from '@/components/HintButton';
import '@/plugins/vcharts';

Vue.component('CategorySelector',CategorySelector);
Vue.component('HintButton',HintButton);

Vue.prototype.$API = API;
// vm.$API.trademark.getTradeMarkList();
// vm.$API.user.login();

// var obj = {
//   A(){

//   }
// }

import '@/icons' // icon
import '@/permission' // permission control

// 该代码仅为了测试es6语法使用
// import {default as a} from '@/api/product/trademark';
// import * as obj from '@/api/product/trademark';
// import { default as c , a ,b} from '@/api/product/trademark';
// console.log('a',c , a ,b)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false


Vue.directive('has-permission',{
  inserted(el,{value}){
    // 如果绑定了该指令的元素,已经插入到父节点中时,会触发当前回调函数

    // value代表开发者传递给当前指令的数值,内部存放的是当前按钮想要展示所需要的权限
    // 1.用户登录时,可以得到buttons数组,内部存有当前账号所有的按钮级权限信息
    // 2.自定义指令解析时,可以知道当前按钮所需权限
    // 3.在buttons数组中查找是否具有当前按钮权限,就可以得知该按钮是否需要显示
    // console.log('has-permission inserted',el,value)
    // el.parentNode.removeChild(el);

    let buttons = store.state.user.buttons;

    // let permission = buttons.includes(value);
    
    let permission = buttons[value];

    if(!permission){
      el.parentNode.removeChild(el);
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
