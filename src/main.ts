import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

export * from './lib/page-reconstruction'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')