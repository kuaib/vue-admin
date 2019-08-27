import request from '@/utils/request'


// 获取测评记录列表
export function getYearTrainList(params) {
    return request({
        url: '/sports/sports_train_year/list',
        method: 'get',
        params
    })
}
