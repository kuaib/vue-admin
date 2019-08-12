import request from '@/utils/request'


// 获取年计划列表
export function getYearTrainList(params) {
    return request({
        url: '/sports/sports_train_year/list',
        method: 'get',
        params
    })
}

// 创建年计划
export function saveYearTrain(data) {
    return request({
        url: '/sports/sports_train_year/save',
        method: 'post',
        data
    })
}

// 获取年计划详情
export function getYearDetail(params) {
    return request({
        url: '/sports/sports_train_year/detail',
        method: 'get',
        params
    })
}

//==================================== 月=====================//

// 获取月计划列表
export function getMonthTrainPlanList(params) {
    return request({
        url: '/sports/sports_train_month/list',
        method: 'get',
        params
    })
}

// 创建月计划
export function saveMonthTrainPlan(data) {
    return request({
        url: '/sports/sports_train_month/save',
        method: 'post',
        data
    })
}

// 获取月计划详情
export function getMonthTrainDetail(params) {
    return request({
        url: '/sports/sports_train_month/detail',
        method: 'get',
        params
    })
}

// 总结计划
export function saveMonthSummary(data) {
    return request({
        url: '/sports/sports_train_month/summary',
        method: 'post',
        data
    })
}