import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(Vant);

// mock数据
require('./mock.js')

// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5fa0beae0bf9ee0300941036/double-eleven';
Vue.prototype._axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
