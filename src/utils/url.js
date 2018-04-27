import { Message, MessageBox } from 'element-ui'
import axios from 'axios'
// 创建axios实例
const service = axios.create({
  baseURL:'http://127.0.0.1:7001',
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})
service.interceptors.response.use(function (response) {
  // Do something with response data
  if(response.data.code == 200){
    Message({
      message: '请求成功',
      type:'success'
    });
  }
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default service
