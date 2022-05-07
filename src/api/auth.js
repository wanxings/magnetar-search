import request from '@/utils/request'
import { stringify } from 'qs'
import {
    version
} from '@/config'
export function login(email, password) {
    return request({
        url: `/user/${version}/auth/login`,
        method: 'post',
        data: stringify({
            email,
            password
        })
    })
}

export function logout() {
    return request({
        url: `/user/${version}/auth/logout`,
        method: 'post'
    })
}

export function register(email, username,password) {
    return request({
        url: `/user/${version}/auth/register`,
        method: 'post',
        data: stringify({
            email,
            username,
            password
        })
    })
}