import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'assets/图片错误.png',
  loading: 'assets/图片懒加载.png',
  attempt: 1
})

// 引入插件
import VueResource from "vue-resource";
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// Vant
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';

import api from './axios/index.js';
Vue.use(api);

// 引入自定义处理cookie的方法
import {
  getCookie,
  setCookie,
  delCookie,
} from "./util/util.js";

import global from './global.js'
Vue.prototype.global = global


Vue.use(VueResource);
Vue.use(Vuetify);
Vue.use(Vant);
Vue.prototype.$cookieStore = {
  getCookie,
  setCookie,
  delCookie
};

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
