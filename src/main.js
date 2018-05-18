import Vue from 'vue'
// import BaiduMap from 'vue-baidu-map'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import { timetrans,beforeUpload} from '@/utils/index'
import '@/icons' // icon
import '@/permission' // permission control
import {isBroker,getBroker} from '@/utils/auth'; //判断是否为经纪人
Vue.prototype.timetrans = timetrans
Vue.prototype.beforeUpload = beforeUpload
Vue.prototype.isBroker = isBroker
Vue.prototype.getBroker = getBroker
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
