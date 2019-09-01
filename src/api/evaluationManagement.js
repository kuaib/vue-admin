import request from '@/utils/request'


// 获取测评记录列表
export function getSportsList(params) {
    return request({
        url: '/sports/sports_test/list',
        method: 'get',
        params
    })
}

// 查询训练类型和训练项目
export function getTestTypeOrTestProjectList(params) {
  return request({
    url: '/sports/sports_test/getTestType',
    method: 'get',
    params
  })
}


// 上传excel
export function importTestFile(params) {
  return request({
    url: '/sports/sports_test/importFile',
    method: 'post',
    data
  })
}

// 获取详细信息
export function getTestDetail(params) {
  return request({
    url: '/sports/sports_test/detail',
    method: 'get',
    params
  })
}







