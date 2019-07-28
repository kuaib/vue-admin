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

// 获取小项列表
export function getSmallItem() {
    return request({
        url: '/sports/dict/getAllDic',
        method: 'get'
    })
}

// 获取队伍列表
export function getTeamItem() {
    return request({
        url: '/sports/dict/getAllDic',
        method: 'get'
    })
}

// 获取组列表
export function getGroupItem() {
    return request({
        url: '/sports/dict/getAllDic',
        method: 'get'
    })
}

