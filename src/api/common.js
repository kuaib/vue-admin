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

