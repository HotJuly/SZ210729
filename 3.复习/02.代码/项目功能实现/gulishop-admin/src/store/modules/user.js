import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter,asyncRoutes, anyRoutes, constantRoutes } from '@/router'
import router from '@/router'

import filterAsyncRoutes from '@/utils/filterAsyncRoutes';

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',

    // 专门用于存储当前用户的角色信息
    roles: [],

    // 专门用于存储当前账号的按钮权限信息
    buttons: [],

    // 专门用于存储当前账号能够访问的路由名称信息
    routeNames: [],

    // 用于存储当前账号能够访问的路由对象
    routes: []

  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },

  // 专门用于设置用户帐号信息
  SET_PERMISSION(state,{roles,buttons,routes}){
    state.roles = roles;
    state.buttons = buttons;
    state.routeNames = routes;

    let newAsyncRoutes = filterAsyncRoutes(state.routeNames,asyncRoutes);

    // console.log('routes',routes1);

    router.addRoutes([...newAsyncRoutes, ...anyRoutes]);

    state.routes = [...constantRoutes, ...newAsyncRoutes, ...anyRoutes]

    // 根据routeNames中出现的路由名称来过滤asyncRoutes中的路由对象
    // 只有routeNames中出现的路由才能被留下来

  }
}

const actions = {
  // user login
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password })
  //     .then(response => {
  //       const { data } = response
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    try {
      const response = await login({ username: username.trim(), password: password });
      const { data } = response
      // 将请求回来的token存入Vuex的state中(相当于存储于内存中)
      commit('SET_TOKEN', data.token)
      // 将请求回来的token存入cookie中(相当于存储于硬盘中)
      // cookie相对localStorage的好处:每次发送请求会自动携带该token
      setToken(data.token)
    } catch (error) {
      console.log('error')
    }

  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        // 根据帐号信息data中的routes来实现对异步路由的注册
        // console.log(data)
        commit('SET_PERMISSION', data);

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  // 开启命名空间,相当于是对所有的state,action,mutation进行模块化管理(类似作用域)
  //  dispatch('user/login')
  namespaced: true,
  state,
  mutations,
  actions
}

