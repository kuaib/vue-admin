import request from '@/utils/request'


// 获取简报列表
export function getBriefList(params) {
    return request({
        url: '/sports/sports_train_report/list',
        method: 'get',
        params
    })
}

// 保存简报
export function saveReport(data) {
    return request({
        url: '/sports/sports_train_report/save',
        method: 'post',
        data
    })
}

// 保存总结
export function saveSummary(data) {
    return request({
        url: '/sports/sports_train_report/summary',
        method: 'post',
        data
    })
}

// 获取简报详情
export function getReportDetail(params) {
    return request({
        url: '/sports/sports_train_report/detail',
        method: 'get',
        params
    })
}

// 通过训练日期和队伍查询月计划
export function getTrainInfoByTeamIdAnTrainDate(params) {
    return request({
        url: '/sports/sports_train_report/getTrainInfoByTeamIdAnTrainDate',
        method: 'get',
        params
    })
}
