/**
 *  运动员的所有接口
 */

import request from '@/utils/request'

// 获取运动员列表
export function getAthleteList (data) {
    return request({
        url: '/sports/athlete/list',
        method: 'post',
        data
    })
}

// 保存/更新运动员信息
export function saveAthlete (data) {
  return request({
    url: '/sports/athlete/save',
    method: 'post',
    data
  })
}

// 删除队员
export function deleteAthlete (id) {
    return request({
        url: '/sports/athlete/delete/' + id,
        method: 'get'
    })
}

// 队员详情信息(编辑)
export function athleteDetail(athleteId) {
    return request({
        url: '/sports/athlete/detail?athleteId=' + athleteId,
        method: 'get'
    })
}

// 通过队伍查询队员
export function getAthleteListByTeam (teamId) {
    return request({
        url: '/sports/athlete/getAthleteByTeam/' + teamId,
        method: 'get'
    })
}

// 获取当前运动员的测试项目和测试进度
export function getAthleteTestStep (athleteId) {
    return request({
        url: '/sports/test/step?athleteId=' + athleteId,
        method: 'get'
    })
}

// 保存运动员单项测试
export function saveAthleteTest (data) {
    return request({
        url: '/sports/test/save',
        method: 'post',
        data
    })
}

// 完成全部测试
export function testDone (data) {
    return request({
        url: '/sports/test/done',
        method: 'post',
        data
    })
}

