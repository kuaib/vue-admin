/**
 *  队伍的所有接口
 */

import request from '@/utils/request'


// 获取队伍列表信息(分页)
// export function getTeamList(currentPage, pageSize, keyWord) {
//     return request({
//         url: '/sports/team/list',
//         method: 'get',
//         params: {
//             currentPage: currentPage,
//             pageSize: pageSize,
//             keyWord: keyWord
//         }
//     })
// }

// 获取队伍列表信息(分页)
export function getTeamList(params) {
    return request({
        url: '/sports/team/list',
        method: 'get',
        params
    })
}

// 获取队伍列表信息(不分页)
export function getTeamListAll() {
    return request({
        url: '/sports/team/all',
        method: 'get'
    })
}

// 删除队伍
export function deleteTeam(id) {
    return request({
        url: '/sports/team/delete/' + id,
        method: 'post'
    })
}

// 保存队伍(包括新建和更更新)
export function saveTeam(data) {
    return request({
        url: '/sports/team/save',
        method: 'post',
        data
    })
}

// 队伍详情信息
export function teamDetail(teamId) {
    return request({
        url: '/sports/team/detail',
        method: 'get',
        params: {
            teamId: teamId
        }
    })
}

// 队伍看板(队伍信息⼀一览)
export function getTeamAthlete(params) {
    return request({
        url: '/sports/team/allAthlete',
        method: 'get',
        params
    })
}

// 队伍伤病测试下的less分数列表
export function getLessScore(params) {
    return request({
        url: '/sports/test/lessScore',
        method: 'get',
        params
    })
}




