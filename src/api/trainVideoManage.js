import request from '@/utils/request'


// 获取视频列表
export function getVideoList(params) {
    return request({
        url: '/sports/sports_video/list',
        method: 'get',
        params
    })
}

// 创建更新视频
export function saveVideo(data) {
    return request({
        url: '/sports/sports_video/save',
        method: 'post',
        data
    })
}

// 获取视频详情
export function getVideoDetail(params) {
    return request({
        url: '/sports/sports_video/detail',
        method: 'get',
        params
    })
}

// 下拉搜索运动员或冠军
export function selectEnum(params) {
    return request({
        url: '/sports/sports_video/selectEnum',
        method: 'get',
        params
    })
}

// 查询项目列表（冠军/运动员的）
export function getProjectByPerson(params) {
    return request({
        url: '/sports/sports_video/projects',
        method: 'get',
        params
    })
}

// 查询运动员列表（通过：项目，视频类型，运动员/冠军）
export function getAthleteBySome(params) {
    return request({
        url: '/sports/sports_video/getAthlete',
        method: 'get',
        params
    })
}
