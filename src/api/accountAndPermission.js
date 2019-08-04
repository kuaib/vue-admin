import request from '@/utils/request'


// 获取账号列表
export function getUserList(params) {
    return request({
        url: '/sports/sports_user/list',
        method: 'get',
        params
    })
}

// 获取账号详情
export function getUserDetail(params) {
    return request({
        url: '/sports/sports_user/detail',
        method: 'get',
        params
    })
}

// 保存账号
export function saveUser(data) {
    return request({
        url: '/sports/sports_user/save',
        method: 'post',
        data
    })
}

// 创建账号关联人员时候的模糊搜索(姓名是不去重的)
export function getFullInfo(params) {
    return request({
        url: '/sports/sports_base/getFullInfo',
        method: 'get',
        params
    })
}


// 获取人员列表
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

// 队伍管理搜索中名字模糊查找(姓名去重)
export function findStaffName(params) {
    return request({
        url: '/sports/sports_staff/findStaffName',
        method: 'get',
        params
    })
}
