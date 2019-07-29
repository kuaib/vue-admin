import request from '@/utils/request'


// 创建/编辑 大项
export function saveProject(data) {
    return request({
        url: '/sports/sports_project/save',
        method: 'post',
        data
    })
}

// 获取大项详情
export function getProjectDetail(params) {
    return request({
        url: '/sports/sports_project/detail',
        method: 'get',
        params
    })
}

// 获取职位列表
export function getJobList(params) {
    return request({
        url: '/sports/sports_job/list',
        method: 'get',
        params
    })
}

// 获取职位详情
export function getJobDetail(params) {
    return request({
        url: '/sports/sports_job/detail',
        method: 'get',
        params
    })
}

// 创建/编辑 职位
export function saveJob(data) {
    return request({
        url: '/sports/sports_job/save',
        method: 'post',
        data
    })
}
