import Vue from 'vue'
// import BaiduMap from 'vue-baidu-map'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import '@/styles/index.scss' // global css
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';
import App from './App'
import router from './router'
import store from './store'
import { timetrans,beforeUpload} from '@/utils/index'
import '@/icons' // icon
import '@/permission' // permission control
import {isBroker,getBroker,getcsrf,format} from '@/utils/auth'; //判断是否为经纪人
Vue.use(ElementUI, { locale })
// Vue.use(VueSocketio,  'http://127.0.0.1/');

Vue.use(VueSocketio,  socketio(process.env.BASE_API));
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

Vue.prototype.timetrans = timetrans
Vue.prototype.beforeUpload = beforeUpload
Vue.prototype.isBroker = isBroker
Vue.prototype.getBroker = getBroker
Vue.prototype.getcsrf = getcsrf
Date.prototype.format = format