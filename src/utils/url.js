import { Message, MessageBox } from 'element-ui'
import axios from 'axios'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})
service.interceptors.response.use(function (response) {
  // Do something with response data
  if(response.data.code == 200){
    // Message({
    //   message: '请求成功',
    //   type:'success'
    // });
  } else if (response.data.code == 300){
    Message({
      message: '请求失败',
      type: 'warning'
    });
  }else if(response.data.status == 200){
    Message({
      message: '上传成功',
      type:'success'
    });
  }else if(response.data.status == 201){
    Message({
      message: '更新成功',
      type:'success'
    });
  }
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default service
