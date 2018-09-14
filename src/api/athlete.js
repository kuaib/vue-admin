/**
 *  运动员的所有接口
 */

import request from '@/utils/request'


// 保存运动员信息
export function saveAthlete (data) {
  return request({
    url: '/sports/athlete/save',
    method: 'post',
    data
  })
}

// 通过队伍查询队员
export function getAthleteList (teamId) {
    return request({
        url: '/sports/athlete/getAthleteByTeam',
        method: 'get',
        data: {
            teamId: teamId
        }
    })
}
