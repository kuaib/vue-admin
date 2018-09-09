/**
 *  队伍的所有接口
 */

import request from '@/utils/request'


// 获取队伍列表信息
export function getTeamList (currentPage, pageSize, keyWord) {
  return request({
    url: '/team/list',
    method: 'get',
    params: {
      currentPage: currentPage,
      pageSize: pageSize,
      keyWord: keyWord
    }
  })
}

// 删除队伍
export function deleteTeam (id) {
  return request({
    url: '/team/delete' + id,
    method: 'post'
  })
}

// 保存队伍(包括新建和更更新)
export function saveTeam (data) {
  return request({
    url: '/team/delete',
    method: 'post',
    data
  })
}
