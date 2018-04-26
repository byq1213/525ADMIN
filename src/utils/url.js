import axios from 'axios'
// 创建axios实例
const service = axios.create({
  baseURL:'http://127.0.0.1:7001',
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})
export default service
