import request from '@/utils/request'


// 获取简报列表
export function getBriefList(params) {
  return request({
    url: '/sports/sports_train_report/list',
    method: 'get',
    params
  })
}

// 创建/编辑 大项
export function saveProject(data) {
  return request({
    url: '/sports/sports_project/save',
    method: 'post',
    data
  })
}
