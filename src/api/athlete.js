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
