import request from '@/utils/request'


// 获取大项列表
export function getSportsList(params) {
    return request({
        url: '/sports/sports_project/list',
        method: 'get',
        params
    })
}

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

// 获取队伍列表
export function getTeamList(params) {
    return request({
        url: '/sports/sports_team/list',
        method: 'get',
        params
    })
}

// 获取队伍详情
export function getTeamDetail(params) {
    return request({
        url: '/sports/sports_team/detail',
        method: 'get',
        params
    })
}

// 创建/编辑 队伍
export function saveTeam(data) {
    return request({
        url: '/sports/sports_team/save',
        method: 'post',
        data
    })
}

// 新建队伍的时候关联人员的时候通过人员的姓名职位和职级查询这个人是否存在
export function findStaff(params) {
    return request({
        url: '/sports/sports_staff/findStaff',
        method: 'get',
        params
    })
}

// 取消队伍和人员之间的关联
export function cancelPerson(data) {
    return request({
        url: '/sports/sports_team/cancel',
        method: 'post',
        data
    })
}
