import request from '@/utils/request'


// 获取视频列表
export function getVideoList(params) {
    return request({
        url: '/sports/sports_video/list',
        method: 'get',
        params
    })
}



