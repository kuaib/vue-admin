/**
 *  报告导出接口
 */

import request from '@/utils/request'

//
export function dowloadPdf (data) {
    return request({
        url: '/sports/sys/download2',
        method: 'get',
        data
    })
}