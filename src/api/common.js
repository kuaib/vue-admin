/**
 *  公用接口
 */

import request from '@/utils/request'


// select下拉集合
export function getAllDic() {
    return request({
        url: '/sports/dict/getAllDic',
        method: 'get'
    })
}