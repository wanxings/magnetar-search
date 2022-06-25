import request from '@/utils/request'
// import { stringify } from 'qs'
import {
    version
} from '@/config'
export function addJavToFavorites(params) {
    return request({
        url: `/search/${version}/jav/javToFavorites`,
        method: 'get',
        params
        // data: stringify(parameter)
    })
}
export function createFavorites(params) {
    return request({
        url: `/search/${version}/jav/createFavorites`,
        method: 'get',
        params
        // data: stringify(parameter)
    })
}
export function getFavoritesJavList(params) {
    return request({
        url: `/search/${version}/jav/FavoritesJavList`,
        method: 'get',
        params
        // data: stringify(parameter)
    })
}
export function getActressJavList(params) {
    return request({
        url: `/search/${version}/jav/ActressJavList`,
        method: 'get',
        params
        // data: stringify(parameter)
    })
}
export function getAvData(params) {
    return request({
        url: `/video/${version}/index/Getvideo`,
        method: 'get',
        params
        // data: stringify(parameter)
    })
} 
export function getAvSubject(params) {
    return request({
        url: `/video/${version}/index/Getdetail`,
        method: 'get',
        params
    })
}


