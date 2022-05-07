import request from '@/utils/request'
// import { stringify } from 'qs'
import {
    version
} from '@/config'
export function btSearch(params) {
    return request({
        url: `/search/${version}/bt/btsearch`,
        method: 'get',
        params
        // data: stringify(parameter)
    })
}
export function javSearch(params) {
    return request({
        url: `/search/${version}/jav/javsearch`,
        method: 'get',
        params
        // data: stringify(parameter)
    })
}
export function getJav(params) {
    return request({
        url: `/search/${version}/jav/getJav`,
        method: 'get',
        params
        // data: stringify(parameter)
    })
}
export function getJavSubject(params) {
    return request({
        url: `/search/${version}/jav/getJavSubject`,
        method: 'get',
        params
        // data: stringify(parameter)
    })
}
export function actressSearch(params) {
    return request({
        url: `/search/${version}/jav/actressSearch`,
        method: 'get',
        params
        // data: stringify(parameter)
    })
}
export function submitComments(params) {
    return request({
        url: `/search/${version}/jav/submitComments`,
        method: 'post',
        data: params
    })
}
export function reportComment(params) {
    return request({
        url: `/search/${version}/jav/reportComment`,
        method: 'get',
        params
        // data: stringify(parameter)
    })
}
export function likesComment(params) {
    return request({
        url: `/search/${version}/jav/likesComment`,
        method: 'get',
        params
        // data: stringify(parameter)
    })
}
export function imageSearch(params) {
    return request({
        url: `/search/${version}/image/imagesearch`,
        method: 'get',
        params
        // data: stringify(parameter)
    })
}
export function sugrec(params) {
    return request({
        url: `/search/${version}/bt/sugrec`,
        method: 'get',
        params
    })
}
export function searchHistory(params) {
    return request({
        url: `/search/${version}/bt/sugrec`,
        method: 'get',
        params
    })
}
export function getBtFileList(params) {
    return request({
        url: `/search/${version}/bt/getFileList`,
        method: 'get',
        params
    })
}
export function getScrapelink(params) {
    return request({
        url: `/search/${version}/bt/getScrapelink`,
        method: 'get',
        params
    })
}
export function submitPolyTask(params) {
    return request({
        url: `/search/${version}/bt/submitPolyTask`,
        method: 'get',
        params
    })
}

export function getPolySearchData(params) {
    return request({
        url: `/search/${version}/bt/polySearch`,
        method: 'get',
        params
    })
}
// export function getPolySearchData(params) {
//     return request({
//         url: `/search/${version}/bt/getPolySearchData`,
//         method: 'get',
//         params
//     })
// }
export function hashToSeed(params) {
    return request({
        url: `/tool/${version}/conversionbt/hashToSeed`,
        method: 'get',
        params
    })
}


