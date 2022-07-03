import request from '@/utils/request'
// import { stringify } from 'qs'
import {
  version
} from '@/config'
export function getInfo() {
  return request({
    url: `/user/${version}/user/info`,
    method: 'get',
  })
}
export function getSearchHistory(params) {
  return request({
    url: `/user/${version}/manage/SearchHistory`,
    method: 'get',
    params,
  })
}
export function getJavFavorites(params) {
  return request({
    url: `/user/${version}/manage/JavFavorites`,
    method: 'get',
    params,
  })
}
export function deleteFavorites(params) {
  return request({
    url: `/user/${version}/manage/deleteFavorites`,
    method: 'get',
    params,
  })
}
export function getProxyInfo() {
  return request({
    url: `/user/${version}/user/proxyinfo`,
    method: 'get',
  })
}
// export function uploadAvatar(params) {
//   return request({
//     url: `/user/${version}/user/uploadavatar`,
//     method: 'post',
//     params: { params }
//   })
// }

export function saveUser(params) {
  return request({
    url: `/user/${version}/user/save`,
    method: 'post',
    data: params
  })
}

export function setPassword(params) {
  return request({
    url: `/user/${version}/user/setpassword`,
    method: 'post',
    data: params
  })
}


// export function getUserList(params) {
//   return request({
//     url: '/user/list',
//     method: 'get',
//     params
//   })
// }
// export function getUserGroupList(params) {
//   return request({
//     url: '/userGroup/list',
//     method: 'get',
//     params
//   })
// }

// export function getSetList() {
//   return request({
//     url: '/user/getSetList',
//     method: 'get'
//   })
// }

// export function getUserExpList(params) {
//   return request({
//     url: '/user/expList',
//     method: 'get',
//     params
//   })
// }

// export function getUserPointList(params) {
//   return request({
//     url: '/user/pointList',
//     method: 'get',
//     params
//   })
// }