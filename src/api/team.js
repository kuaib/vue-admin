/**
 *  队伍的所有接口
 */

import request from '@/utils/request'


// 获取队伍列表信息(分页)
export function getTeamList(currentPage, pageSize, keyWord) {
    return request({
        url: '/sports/team/list',
        method: 'get',
        params: {
            currentPage: currentPage,
            pageSize: pageSize,
            keyWord: keyWord
        }
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

