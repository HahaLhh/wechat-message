import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './http'
import store from './store'
Vue.config.productionTip = false

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Vue.use(axios, axios_instance);
Vue.prototype.$axios = axios

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')