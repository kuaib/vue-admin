import request from '@/utils/request'


// 获取批次列表
export function getBatchList(params) {
    return request({
        url: '/sports/sports_test/getBatchList',
        method: 'get',
        params
    })
}

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

// 获取指标列表
export function getTargetList(params) {
    return request({
        url: '/sports/sports_test/getTestAttribute',
        method: 'get',
        params
    })
}

// 获取三个echarts图表数据
export function getAthleteCharts(params) {
    return request({
        url: '/sports/sports_test/analyze',
        method: 'get',
        params
    })
}
//-----------------------------------//
// 获取队伍分析报告列表
export function getSportsDocList(params) {
    return request({
        url: '/sports/sports_doc/list',
        method: 'get',
        params
    })
}

// 删除文档
export function deleteSportsDoc(data) {
    return request({
        url: '/sports/sports_doc/delete',
        method: 'post',
        data
    })
}

// 保存文档信息
export function saveSportsDoc(data) {
    return request({
        url: '/sports/sports_doc/save',
        method: 'post',
        data
    })
}




