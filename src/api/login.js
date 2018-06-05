import request from '@/utils/request'
import url from '@/utils/url'

export function login(username, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/login/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}
export function getStoreInfo() {
  return url({
    url: '/mini/storeInfo',
    method: 'get'
  })
}
