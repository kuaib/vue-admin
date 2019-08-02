import request from '@/utils/request'

// 保存人员列表
export function getStaffList(params) {
    return request({
        url: '/sports/sports_staff/list',
        method: 'get',
        params
    })
}

// 保存人员信息
export function saveStaff(data) {
    return request({
        url: '/sports/sports_staff/save',
        method: 'post',
        data
    })
}

// 获取人员详情
export function getStaffDetail(params) {
    return request({
        url: '/sports/sports_staff/detail',
        method: 'get',
        params
    })
}

// 通过职位名称查找职级
export function getLevelByName(params) {
    return request({
        url: '/sports/sports_base/getLevelByName',
        method: 'get',
        params
    })
}

// 队伍管理搜索中名字模糊查找
export function findStaffName(params) {
    return request({
        url: '/sports/sports_staff/findStaffName',
        method: 'get',
        params
    })
}
