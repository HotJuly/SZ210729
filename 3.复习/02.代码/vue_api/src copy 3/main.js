import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'

Vue.config.productionTip = false

import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/*
  需求:将所有组件配置对象上的a属性的数值都+1
  解决:可以通过自定义合并策略来对所有组件的配置对象进行统一修改
*/

// Vue.config.optionMergeStrategies.a = function (parent, child, vm) {
//   // 每有一个组件,该回调函数就会执行一次,child会存储当前组件的对应属性的值
//   // 该回调函数的返回值会作为当前组件的对应属性的值

//   // console.log(parent, child, vm)
//   return child + 100
// }

// Vue.config.devtools = true


/*
  面试题:请问你是如何捕获项目中出现的报错的?
    try...catch

  面试题:请问项目上线之后,你是如何捕获项目中出现的报错,并进行维护的?
  拆解:
    1.如何捕获项目中出现的报错
      try...catch(但是需要提前知道哪里可能会出现报错)
      Vue.config.errorHandler(该方法可以捕获整个Vue项目中出现的错误)

    2.项目上线之后,代码运行在用户电脑上,如何获取到用户的报错信息
      捕获到错误之后,通过ajax,将报错信息发送到公司对应服务器上,进行收集
*/

// Vue.config.errorHandler = function (err, vm, info) {
//   console.log('errorHandler',err, vm, info)
// }

// Vue.filter("myFilter",function(value){
//   console.log("myFilter",value)
//   return value+"1"
// })

/*
  需求:当组件挂载结束之后,打印所有组件的name属性
  解决:使用Vue.mixin实现对所有组件的生命周期进行加工
  如果有一些操作,需要对所有的组件都实现,那么可以使用全局混入

  注意:混合不会影响到原先的代码,如果组件同时存在全局混合的生命周期和自身的生命周期,会先执行全局混合的再执行自己的
*/

// Vue.mixin({
//   mounted(){
//     console.log(this.$options.name)
//   }
// })

/*
  在Vue中,可以影响到页面显示内容的地方:
    1.在根组件的配置对象中,添加template属性
    2.在index.html中,可以书写Vue的模版代码
    3.在根组件的配置对象中,添加render属性

  渲染优先级:render>template>index.html

  注意:如果想使用template属性,必须在完整版本的Vue解析器下才能使用
*/

// 创建一个Vue的实例对象放到Vue的原型对象上,使得所有的组件都能看到该实例对象
Vue.prototype.$bus = new Vue();

new Vue({
  // el:"#app",
  render: h => h(App),
  data: {
    msg: 'hello',
    msg1:"world"
  },
  template:"<h1>{{msg}}</h1>"
}).$mount("#app")


// var res = Vue.compile('<div><span>{{ msg }}</span></div>')

// new Vue({
//   data: {
//     msg: 'hello'
//   },
//   render: res.render
// }).$mount('#app')