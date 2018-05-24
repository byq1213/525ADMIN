import {
  Message,
  MessageBox
} from 'element-ui'
import axios from 'axios'
import Cookies from 'js-cookie'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})
// Add a request interceptor
// request拦截器
service.interceptors.request.use(config => {
  config.headers['x-csrf-token'] = Cookies.get('csrfToken') // 让每个请求携带自定义token 请根据实际情况自行修改
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
service.interceptors.response.use(function (response) {
  // Do something with response data
  if (response.data.code == 200) {
    // Message({
    //   message: '请求成功',
    //   type:'success'
    // });
  } else if (response.data.code == 300) {
    Message({
      message: '请求失败',
      type: 'warning'
    });
  } else if (response.data.status == 200) {
    Message({
      message: '上传成功',
      type: 'success'
    });
  } else if (response.data.status == 201) {
    Message({
      message: '更新成功',
      type: 'success'
    });
  }
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default service
