/**
 *  报告导出接口
 */

import request from '@/utils/request'

// 是否能导出
export function canExport (params) {
    return request({
        url: '/sports/sys/canExport',
        method: 'get',
        params
    })
}

// 导出pdf
export function dowloadPdf (params) {
    return request({
        url: '/sports/sys/downloadPdf',
        method: 'get',
        params
    })
}