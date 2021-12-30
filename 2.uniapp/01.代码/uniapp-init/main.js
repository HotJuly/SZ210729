import App from './App'

// 如果当前运行环境不是Vue3,就执行以下代码
// #ifndef VUE3
// #endif


import Vue from 'vue'

Vue.config.productionTip = false

// mp->mini program type->类型
// 由于小程序中精准区分APP,PAGE,COMPONENT三者,
// 但是Vue中只有Vue构造函数,所以在此处声明当前App组件代表整个小程序
App.mpType = 'app'

const app = new Vue({
    ...App
		// onLaunch: function() {
		// 	console.log('App Launch')
		// },
		// onShow: function() {
		// 	console.log('App Show')
		// },
		// onHide: function() {
		// 	console.log('App Hide')
		// }
})
app.$mount()

