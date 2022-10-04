import request from '@/utils/request'
// import { stringify } from 'qs'
export function getConfig() {
  return request({
    url: `status/polySiteList`,
    method: 'get',
  })
}
export function getCaptcha() {
  return request({
    url: `auth/captcha`,
    method: 'get',
  })
}
export function sendEmailCaptcha(params) {
  return request({
    url: `auth/sendEmailCaptcha`,
    method: 'post',
    params,
  })
}
