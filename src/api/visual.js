import request from '@/utils/request'
export function search(params) {
    return request({
        url: `/visual/search`,
        method: 'get',
        params
    })
}