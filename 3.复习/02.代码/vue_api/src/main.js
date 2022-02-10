import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'

Vue.config.productionTip = false

import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


new Vue({
  // el:"#app",
  render: h => h(App),
  data: {
    msg: 'hello',
    msg1:"world"
  },
  template:"<h1>{{msg}}</h1>",
}).$mount("#app")
