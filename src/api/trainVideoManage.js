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


