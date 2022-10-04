import request from '@/utils/request'
import { stringify } from 'qs'
export function login(email, password) {
    return request({
        url: `/auth/login`,
        method: 'post',
        data: stringify({
            email,
            password
        })
    })
}

export function logout() {
    return request({
        url: `/auth/register`,
        method: 'post'
    })
}

export function register(params) {
    return request({
        url: `/auth/register`,
        method: 'post',
        params,
    })
}
export function resetPwd(params) {
    return request({
        url: `/auth/resetPwd`,
        method: 'post',
        params,
    })
}