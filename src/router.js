import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Report from './views/Report.vue'
import store from './store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        //console.log(store.state.isAuth)
        if (store.getters.getAuth) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/report',
      name: 'report',
      component: Report,
      beforeEnter: (to, from, next) => {
        //console.log(store.state.isAuth)
        if (store.getters.getAuth) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: (to, from, next) => {
        store.commit('setAuth')
        next('/login')
      }
    }
  ]
})