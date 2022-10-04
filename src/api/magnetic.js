import request from '@/utils/request'
export function search(params) {
    return request({
        url: `/magnetic/search`,
        method: 'get',
        params
    })
}
export function polySearch(params) {
    return request({
        url: `/magnetic/polySearch`,
        method: 'get',
        params
    })
}
export function getList(params) {
    return request({
        url: `/magnetic/list`,
        method: 'get',
        params
    })
}
export function getFileList(params) {
    return request({
        url: `/magnetic/fileList`,
        method: 'get',
        params
    })
}
export function polySearchScrape(params) {
    return request({
        url: `/magnetic/polySearchScrape`,
        method: 'get',
        params
    })
}