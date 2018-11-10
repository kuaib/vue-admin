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

// 单个队伍元完成全部测试（判断，未完成会有提示）
export function testDone (data) {
    return request({
        url: '/sports/test/done',
        method: 'post',
        data
    })
}


// 当前队伍下所有队员全部完成测试（判断，未完成会有提示）
export function allAthleteDone(teamId) {
    return request({
        url: '/sports/test/allAthleteDone',
        method: 'post',
        data: {
            teamId: teamId
        }
    })
}

// 获取运动员看板信息
export function getAthletePanel(params) {
    return request({
        url: '/sports/athlete/panel',
        method: 'get',
        params
    })
}

// 获取测试运动员信息
export function getTestAthleteList(params) {
    return request({
        url: '/sports/video/getTestAthlete',
        method: 'get',
        params
    })
}

// 运动员视频上传
export function uploadTestVideo(data) {
    return request({
        url: '/sports/video/uploadTestVideo',
        method: 'post',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data
    })
}

// 提交本次运动员视频上传
export function submitOfCount(data) {
    return request({
        url: '/sports/video/submit',
        method: 'post',
        data
    })
}


// 完成本队运动员上传
export function finishTeamVideo(params) {
    return request({
        url: '/sports/video/teamDone',
        method: 'get',
        params
    })
}

