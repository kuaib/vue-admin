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


// 基础下拉
export function getBaseInfo() {
    return request({
        url: '/sports/sports_base/info',
        method: 'get'
    })
}

// 通过大项查找小项
export function childProject(params) {
    return request({
        url: '/sports/sports_staff/childProject',
        method: 'get',
        params
    })
}

// 通过职位名称查找职级
export function getLevelByName(params) {
    return request({
        url: '/sports/sports_base/getLevelByName',
        method: 'get',
        params
    })
}

// 获取运动员列表
export function getAthlete(params) {
    return request({
        url: '/sports/sports_base/getAthlete',
        method: 'get',
        params
    })
}
