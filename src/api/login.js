import request from '@/utils/request'

// 接口可以调通的时候打开
// 登陆
// export function loginByUsername(username, password) {
//   return request({
//     url: '/sports/login',
//     method: 'post',
//     data: {
//       username,
//       password
//     }
//   })
// }

// 获取左侧菜单（即：路由信息，路由全部需要动态返回）
// export function getUserMenue(roleCode) {
//   return request({
//     url: '/sports/menu/list',
//     method: 'get',
//     params: {roleCode}
//   })
// }

export function loginByUsername(username, password) {
    const data = {
        username,
        password
    }
    return request({
        url: '/login/login',
        method: 'post',
        data
    })
}


export function logout() {
    return request({
        url: '/login/logout',
        method: 'post'
    })
}

// 获取用户信息(包括用户的权限)
export function getUserInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: {token}
    })
}

// 获取左侧菜单（即：路由信息，路由全部需要动态返回）
export function getUserMenue(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: {token}
    })
}

