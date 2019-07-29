/**
 *  公用接口
 */

import request from '@/utils/request'


// select下拉集合（一期）
export function getAllDic() {
    return request({
        url: '/sports/dict/getAllDic',
        method: 'get'
    })
}

// 获取大项列表
export function getSportsList(params) {
    return request({
        url: '/sports/sports_project/list',
        method: 'get',
        params
    })
}

// 基础下拉
export function getBaseInfo() {
    return request({
        url: '/sports/sports_base/info',
        method: 'post'
    })
}

