import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuth : false
  },
  getters:{
    getAuth(state){
      return state.isAuth
    }
  },
  mutations: {
    setAuth(state){
      state.isAuth = !state.isAuth
    }
  },
  actions: {
    setAuth({commit}){
      commit('setAuth')
    }
  },
  plugins: [createPersistedState()]
})
