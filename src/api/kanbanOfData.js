import request from '@/utils/request'


// 获取运动员看板数据
export function getAthleteData(params) {
    return request({
        url: '/sports/sports_show/athleteData',
        method: 'get',
        params
    })
}

// 获取运动队看板数据
export function getTeamData(params) {
    return request({
        url: '/sports/sports_show/teamData',
        method: 'get',
        params
    })
}