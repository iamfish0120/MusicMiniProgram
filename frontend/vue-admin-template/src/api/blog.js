import request from '@/utils/request'
const baseURL = 'http://localhost:8000'

export function fetchList(params) {
    return request({
        url: `${baseURL}/blog/list`,
        method: 'get',
        params: {
            ...params
        }
    })
}

export function del(params) {
    return request({
        url: `${baseURL}/blog/del`,
        data: {
            ...params
        },
        method: 'post'
    })
}