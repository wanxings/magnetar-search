import request from '@/utils/request'
export function search(params) {
    return request({
        url: `/netDisc/search`,
        method: 'get',
        params
    })
}