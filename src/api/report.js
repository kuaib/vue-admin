/**
 *  报告导出接口
 */

import request from '@/utils/request'

// 导出pdf
export function dowloadPdf (params) {
    return request({
        url: '/sports/sys/downloadPdf',
        method: 'get',
        params
    })
}