import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const brokerKey = 'brokerId'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// set broker
export function setBroker(brokerId){
  return Cookies.set(brokerKey,brokerId)
} 

// get brokerid
export function getBroker(){
  return Cookies.get(brokerKey)
}
// 判断是否是经纪人
export function isBroker(){
  let brokerId = getBroker()

  if(brokerId){
    return 1
  }else{
    return 0
  }
}
export function removeBroker(){
  return Cookies.remove(brokerKey)

}
export function getcsrf(index =0) {
  
  return { 'x-csrf-token':Cookies.get('csrfToken'),index,}
}