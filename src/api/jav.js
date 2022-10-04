import request from '@/utils/request'
// import { stringify } from 'qs'
import {
    version
} from '@/config'


export function search(params) {
    return request({
        url: `/jav/movie/search`,
        method: 'get',
        params
    })
}
export function getList(params) {
    return request({
        url: `/jav/movie/list`,
        method: 'get',
        params
        // data: stringify(parameter)
    })
}
export function getSubject(params) {
    return request({
        url: `/jav/movie/details`,
        method: 'get',
        params
    })
}
export function getFavorites(params) {
    return request({
        url: `/user/favorites/list`,
        method: 'get',
        params
    })
}
export function getComment(params) {
    return request({
        url: `/jav/movie/commentList`,
        method: 'get',
        params
    })
}
export function createFavorites(params) {
    return request({
        url: `/user/favorites/create`,
        method: 'post',
        params
    })
}
export function addJavToFavorites(params) {
    return request({
        url: `/user/favorites/add`,
        method: 'post',
        params
        // data: stringify(parameter)
    })
} 

export function getActressInfo(params) {
    return request({
        url: `/jav/actress/details`,
        method: 'get',
        params
        // data: stringify(parameter)
    })
}







export function deleteJavFromFavorites(params) {
    return request({
        url: `/search/${version}/jav/deleteJavFromFavorites`,
        method: 'get',
        params
    })
}
// export function getActressJavList(params) {
//     return request({
//         url: `/search/${version}/jav/ActressJavList`,
//         method: 'get',
//         params
//         // data: stringify(parameter)
//     })
// }
export function getAvData(params) {
    return request({
        url: `/video/${version}/index/Getvideo`,
        method: 'get',
        params
        // data: stringify(parameter)
    })
} 



