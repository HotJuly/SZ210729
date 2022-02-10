import { createStore } from 'vuex'

// export default new Vuex.Store()
export default createStore({
  state: {
    msg:"我是store的初始化数据"
  },
  mutations: {
    CHANGEMSG(state,data){
      state.msg = data;
    }
  },
  actions: {
  },
  modules: {
  }
})
