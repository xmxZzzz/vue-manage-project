import Vue from 'vue'
import App from './App.vue'
// 1、全部引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// 2、按需引入
// import { Button, Radio } from 'element-ui'
// Vue.use(Button)
// Vue.use(Radio)

// 引入样式文件assets/less/index.less
import './assets/less/index.less';

import router from './router'

import store from './store'

import http from 'axios'
Vue.prototype.$http = http

import './api/mock'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
