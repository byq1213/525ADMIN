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

import '@/icons' // icon
import '@/permission' // permission control
// import ECharts from 'vue-echarts'  //Baidu Echarts
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/component/tooltip'
// Vue.component('chart', ECharts)

Vue.use(ElementUI, { locale })
// Vue.use(BaiduMap, {
//   // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
//   ak: '93xi2EVIQxNlCz8z4v7WpGqGuusDWApE'
// })
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
