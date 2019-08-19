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
//==================================== 周计划 =====================//

// 获取周计划列表
export function getWeekTrainPlanList(params) {
  return request({
    url: '/sports/sports_train_week/list',
    method: 'get',
    params
  })
}

// 创建周计划
export function saveWeekTrainPlan(data) {
  return request({
    url: '/sports/sports_train_week/save',
    method: 'post',
    data
  })
}

// 获取周计划详情
export function getWeekTrainDetail(params) {
    return request({
        url: '/sports/sports_train_week/detail',
        method: 'get',
        params
    })
}

//==================================== 日总结 =====================//

// 获取日总结列表
export function getDayTrainList(params) {
    return request({
        url: '/sports/sports_train_day/list',
        method: 'get',
        params
    })
}

// 保存日总结信息
export function saveDaySummary(data) {
    return request({
        url: '/sports/sports_train_day/summary',
        method: 'post',
        data
    })
}

// 获取日总结详情
export function getDayTrainDetail(params) {
    return request({
        url: '/sports/sports_train_day/detail',
        method: 'get',
        params
    })
}

// 上传视频
export function dayUploadVideo(data) {
    return request({
        url: '/sports/sports_train_day/uploadVideo',
        method: 'post',
        data
    })
}