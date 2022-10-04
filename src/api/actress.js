import request from '@/utils/request'


export function search(params) {
    return request({
        url: `/jav/actress/search`,
        method: 'get',
        params
    })
}