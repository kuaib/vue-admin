import request from '@/utils/request'

// 接口可以调通的时候打开
// 登陆
export function loginByUsername(userInfo) {
    return request({
        url: '/sports/login',
        method: 'post',
        transformRequest: [function (data) {
            let ret = '';
            for (let key in userInfo) {
                ret += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
            }
            return ret.substr(0, ret.length - 1)
        }],
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: {
            username: userInfo.username,
            password: userInfo.password
        }
    })
}

// 获取左侧菜单（即：路由信息，路由全部需要动态返回）
export function getUserMenue(roleCode, sysId) {
    return request({
        url: '/sports/menu/list',
        method: 'get',
        params: {roleCode, sysId}
    })
}



