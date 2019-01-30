import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toasted from 'vue-toasted';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from 'vuelidate'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import momnt from 'moment'
import HighchartsVue from 'highcharts-vue'
import JsonExcel from 'vue-json-excel'

Vue.component('downloadExcel', JsonExcel)
Vue.use(HighchartsVue)
Vue.use(VueMoment, {
  moment,
})
Vue.use(Vuelidate)
Vue.use(Toasted, {
  iconPack: 'fontawesome'
})
Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.mixin({
  methods: {
    toast(msg, icon, type) {
      this.$toasted.show(msg, {
        icon: {
          name: icon
        },
        theme: "outline",
        position: "top-right",
        duration: 3000,
        type: type
      })
    },
    mockData(date) {
      let past = momnt(date + "T00:00:00+05:30").subtract(1, 'M').format(),
        one = {
          title: momnt(date).format("YYYY-MM-DD"),
          one: [],
          two: [],
          three: [],
          label: []
        },
        two = {
          title: momnt(past).format("YYYY-MM-DD"),
          one: [],
          two: [],
          three: [],
          label: []
        }

      for (let i = 0; i < 1440; i++) {
        one.one.push(Math.floor(Math.random() * 10 + 1))
        one.two.push(Math.floor(Math.random() * 20 + 1))
        one.three.push(Math.floor(Math.random() * 30 + 1))
        one.label.push(momnt(date + "T00:00:00+05:30").add(i, 'm').format("HH:mm:ss"))
        two.one.push(Math.floor(Math.random() * 10 + 1))
        two.two.push(Math.floor(Math.random() * 20 + 1))
        two.three.push(Math.floor(Math.random() * 30 + 1))
        two.label.push(momnt(past).add(i, 'm').format("HH:mm:ss"))
      }
      return ({
        one,
        two
      })
    },
    tableData(date) {
      let d = [],
        temp
      for (let i = 0; i < 1440; i++) {
        temp = {
          Time: momnt(date + "T00:00:00+05:30").add(i, 'm').format("HH:mm:ss"),
          Speed: Math.floor(Math.random() * 10 + 1),
          FlowRate: Math.floor(Math.random() * 20 + 1),
          TotalizedWeight: Math.floor(Math.random() * 40 + 1)
        }
        d.push(temp)
      }
      return d
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')