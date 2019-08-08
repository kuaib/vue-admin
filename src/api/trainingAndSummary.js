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
