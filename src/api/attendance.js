/**
 *  考勤所有接口
 */

import request from '@/utils/request'

// 获取日考勤列表
export function getDayAttendanceList(params) {
    return request({
        url: '/sports/sports_attendance/list',
        method: 'get',
        params
    })
}

// 创建日考勤列表
export function saveDayAttendance(data) {
    return request({
        url: '/sports/sports_attendance/save',
        method: 'post',
        data
    })
}

// 获取日考勤详情
export function getDayAttendanceDetail(params) {
    return request({
        url: '/sports/sports_attendance/detail',
        method: 'get',
        params
    })
}

// 获取月考勤列表
export function getMonthAttendanceList(params) {
    return request({
        url: '/sports/sports_attendance/record',
        method: 'get',
        params
    })
}

// 预览
export function monthFilePreview(params) {
    return request({
        url: '/sports/sports_attendance/preview',
        method: 'get',
        params
    })
}


// 下载
export function monthFileDownload(params) {
    return request({
        url: '/sports/sports_attendance/downloadExcel',
        method: 'get',
        responseType: 'arraybuffer',
        params
    })
}
