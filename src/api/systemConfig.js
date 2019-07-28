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
