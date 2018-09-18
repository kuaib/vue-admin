import {loginByUsername, logout, getUserInfo, getUserMenue} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'
import Layout from '@/views/layout/Layout'
import {constantRouterMap} from '@/router'
import Cookies from 'js-cookie'

// 将数组中的对象的某个属性提取为一个数组
function filterPro(arr, proName) {
    let result = [];
    arr.forEach((item, idx) => {
        result.push(item[proName])
    })
    return result;
}

let aa = [
    {
        "id": 1,
        "path": "/teamManage",  // 第一级菜单前面有斜杠： /
        "component": "Layout",
        "name": "TeamSys",  // 可有可无，我用不到*****
        "title": "队伍管理",  // 可有可无，我用不到*****
        "icon": "ios-color-wand",
        "parentId": 0,
        "enabled": 1,
        "roles": null,
        "meta": {
            "access": null,
            "title": "队伍管理",        //  title取我定义的
            "icon": "ios-color-wand",
            "hideInMenu": false
        },
        "url": "",
        "hideInMenu": false,
        "children": [
            {
                "id": 3,
                "path": "list", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                "component": "views/teamManage/list", // children中的component：取我定义的，最前面不加斜杠： /
                "name": "teamList",     // children中的name：取我定义的
                "title": "队伍列表",      // 可有可无*****
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": null,
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "队伍列表",    // children中的title：取我定义的
                    "icon": "ios-basket-outline",
                    "hideInMenu": false
                },
                "url": "",
                "hideInMenu": false
            }, {
                "id": 5,
                "path": "manage",
                "component": "views/teamManage/manage",
                "name": "teamManage",
                "title": "队伍新增/维护",
                "icon": null,
                "parentId": 1,
                "enabled": 1,
                "children": null,
                "roles": null,
                "meta": {"access": null, "title": "队伍新增/维护", "icon": "ios-basket-outline", "hideInMenu": true},
                "url": "",
                "hideInMenu": true
            }]
    },
    {
        "id": 2,
        "path": "/athleteManage",
        "component": "Layout",
        "name": "MemberSys",
        "title": "运动员管理",
        "icon": "ios-create-outline",
        "parentId": 0,
        "enabled": 1,
        "roles": null,
        "meta": {"access": null, "title": "运动员管理", "icon": "ios-create-outline", "hideInMenu": false},
        "url": "",
        "hideInMenu": false,
        "children": [{
            "id": 4,
            "path": "list",
            "component": "views/athleteManage/list",
            "name": "athleteList",
            "title": "运动员列表",
            "icon": "ios-people-outline",
            "parentId": 2,
            "enabled": 1,
            "children": null,
            "roles": null,
            "meta": {"access": null, "title": "运动员列表", "icon": "ios-people-outline", "hideInMenu": false},
            "url": "",
            "hideInMenu": false
        },{
            path: 'manage',
            component: 'views/athleteManage/manage',
            name: 'athleteManage',
            meta: {title: '运动员新增/维护'}
        }]
    }]


// 遍历路由，重组字段(接口可以调通的时候启用)
function reformRouters(routersList) {
    let arr = [];
    routersList.forEach((item, idx) => {
        arr.push(eachRouter(item))
    })
    return arr;
}

// 递归每一项路由
function eachRouter(route) {
    let obj = {};
    if (route.children && route.children.length > 0) {
        obj.path = route.path;
        obj.alwaysShow = true;  // 始终显示根目录
        obj.component = () => import('@/views/layout/Layout');
        obj.meta = {
            title: route.meta.title,
            icon: route.meta.icon,
        };
        let arr = [];
        route.children.forEach((item, idx) => {
            arr.push(eachRouter(item))
        })
        obj.children = arr;
    } else {
        obj.path = route.path;
        obj.name = route.name;
        obj.component = () => import(`@/${route.component}`);
        obj.meta = {
            title: route.meta.title,
            icon: route.meta.icon,
            hidden: route.meta.hideInMenu
        }
    }
    return obj;
}


// 将后台返回的路由数据的集合进行组装(成为路由的格式)
function reformRouters1(routersList) {
    let list = [
        {
            path: '/salesManage',
            component: Layout,
            meta: {
                title: '销售管理',
                icon: 'lock'
            },
            children: [
                {
                    path: 'baseData',
                    component: () => import('@/views/salesManage/baseData/index'),
                    meta: {title: '基础数据'},
                    children: [{
                        path: 'clientFiles/list',
                        component: () => import('@/views/salesManage/baseData/clientFiles/list'),
                        name: 'clientFilesList',
                        meta: {
                            title: '客户档案列表',
                            // roles: ['admin'] // or you can only set roles in sub nav
                        }
                    }, {
                        path: 'clientFiles/add',
                        component: () => import('@/views/salesManage/baseData/clientFiles/add'),
                        name: 'clientFilesAdd',
                        hidden: true,
                        meta: {
                            title: '新增客户档案',
                            // roles: ['admin'] // or you can only set roles in sub nav
                        }
                    }, {
                        path: 'directive',
                        component: () => import('@/views/salesManage/baseData/clientFiles/add'),
                        name: 'directivePermission',
                        meta: {
                            title: '合同管理'
                            // if do not set roles, means: this page does not require permission
                        }
                    }]
                },
                {
                    path: 'documents',
                    component: () => import('@/views/salesManage/documents/index'), // Parent router-view
                    name: 'documents',
                    meta: {title: '单据'},
                    // redirect: '/salesManage/documents/salesOrder/list',
                    children: [
                        {
                            path: 'salesOrder/list',
                            component: () => import('@/views/salesManage/documents/salesOrder/list'),
                            name: 'salesOrderList',
                            meta: {title: '销售订单列表'}
                        },
                        {
                            path: 'salesOrder/add',
                            component: () => import('@/views/salesManage/documents/salesOrder/add'),
                            name: 'salesOrderAdd',
                            hidden: true,
                            meta: {title: '新增销售订单'}
                        },
                        {
                            path: 'salesSendOrder/list',
                            component: () => import('@/views/salesManage/documents/salesSendOrder/list'),
                            name: 'salesSendOrderList',
                            meta: {title: '销售发货单列表'}
                        },
                        {
                            path: 'salesSendOrder/add',
                            component: () => import('@/views/salesManage/documents/salesSendOrder/add'),
                            name: 'salesSendOrderAdd',
                            hidden: true,
                            meta: {title: '新增销售订单'}
                        },
                    ]
                },
            ]
        },

        {
            path: '/home',
            component: Layout,
            // redirect: '/home/index',
            children: [
                {path: 'index', component: () => import('@/views/home/index'), name: 'home', meta: {title: '面板'}}
            ]
        },
        {
            path: '/athleteManage',
            component: Layout,
            meta: {title: '运动员管理'},
            children: [
                {
                    path: 'list',
                    component: () => import('@/views/athleteManage/list'),
                    name: 'athleteList',
                    meta: {title: '运动员列表'}
                },
                {
                    path: 'manage',
                    component: () => import('@/views/athleteManage/manage'),
                    name: 'athleteManage',
                    meta: {title: '运动员新增/维护'}
                }

            ]
        },
        {
            path: '/teamManage',
            component: Layout,
            meta: {title: '队伍管理'},
            children: [
                {
                    path: 'list',
                    component: () => import('@/views/teamManage/list'),
                    name: 'teamList',
                    meta: {title: '队伍列表'}
                },
                {
                    path: 'manage',
                    component: () => import('@/views/teamManage/manage'),
                    name: 'teamManage',
                    meta: {title: '队伍新增/维护'}
                }
            ]
        },
    ]
    // 后续会将接口中的数据转化为以下的数组形式
    return list
}

const user = {
    state: {
        user: '',
        status: '',
        code: '',
        token: getToken(),
        name: '',
        avatar: '',
        introduction: '',
        setting: {
            articlePlatform: []
        },

        roles: ['ROLE_admin'], // 用户所具有的角色
        userName: '',          // 用户名
        realName: '',          // 真实姓名
        routers: constantRouterMap, // 白名单路由
        addRouters: [], // 动态回去的路由

    },

    mutations: {
        SET_CODE: (state, code) => {
            state.code = code
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting
        },
        SET_STATUS: (state, status) => {
            state.status = status
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        // 设置角色
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        // 设置用户名
        SET_USERNAME: (state, userName) => {
            state.userName = userName
        },
        // 设置真实姓名
        SET_REALNAME: (state, realName) => {
            state.realName = realName
        },

        SET_ROLECODE: (state, roleCode) => {
            state.roleCode = roleCode
        },
        // 设置路由
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers
            state.routers = constantRouterMap.concat(routers)
        },
    },

    // 请求方法都在api/login.js中
    actions: {
        // 用户名登录
        LoginByUsername({commit, state}, userInfo) {
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                loginByUsername(userInfo).then(response => {
                    if (response.data.code === 200) {
                        const data = response.data.data;
                        commit('SET_ROLES', filterPro(data.roles, 'roleCode'));    // 角色名称
                        commit('SET_REALNAME', data.realName);          // 真实姓名
                        commit('SET_USERNAME', data.username);          // 用户名
                        Cookies.set('roles', state.roles);
                        Cookies.set('realName', state.realName);
                        Cookies.set('userName', state.userName);
                        resolve();
                    } else {
                        this.$message(response.data.msg);
                    }
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户菜单-路由(业务需求，菜单和路由需要在后端返回)
        GetUserMenue({commit, state}) {
            return new Promise((resolve, reject) => {
                getUserMenue(state.roles[0]).then(response => {
                    if (response.data.code === 200) {
                        const res = response.data.data;
                        if (res && res.length > 0) { // 验证返回的菜单是否是一个非空数组
                            let newRouters = reformRouters(res);
                            commit('SET_ROUTERS', newRouters);
                            resolve()
                        } else {
                            reject('getInfo: routers must be a non-null array !')
                        }
                    } else {
                        // this.$message(response.msg);
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 用户名登录
        // LoginByUsername({commit}, userInfo) {
        //     const username = userInfo.username.trim()
        //     return new Promise((resolve, reject) => {
        //         loginByUsername(username, userInfo.password).then(response => {
        //             const data = response.data
        //             // commit('SET_TOKEN', data.token)
        //             // setToken(response.data.token)
        //             commit('SET_ROLES', data.token);    // 系统已经被我改成判断roles了，而非token
        //             Cookies.set('roles',['aaa']);
        //             resolve()
        //         }).catch(error => {
        //             reject(error)
        //         })
        //     })
        // },
        //
        // // 获取用户菜单-路由(业务需求，菜单和路由需要在后端返回)
        // GetUserMenue({commit, state}) {
        //     return new Promise((resolve, reject) => {
        //         getUserMenue(state.token).then(response => {
        //             let newRouters = reformRouters1();
        //             commit('SET_ROUTERS', newRouters)
        //             resolve()
        //         }).catch(error => {
        //             reject(error)
        //         })
        //     })
        // },

        // 获取用户信息
        // GetUserInfo({ commit, state }) {
        //   return new Promise((resolve, reject) => {
        //     getUserInfo(state.token).then(response => {
        //       if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
        //         reject('error')
        //       }
        //       const data = response.data
        //
        //       if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        //         commit('SET_ROLES', data.roles)
        //       } else {
        //         reject('getInfo: roles must be a non-null array !')
        //       }
        //
        //       commit('SET_NAME', data.name)
        //       commit('SET_AVATAR', data.avatar)
        //       commit('SET_INTRODUCTION', data.introduction)
        //       resolve(response)
        //     }).catch(error => {
        //       reject(error)
        //     })
        //   })
        // },

        // 第三方验证登录
        // LoginByThirdparty({ commit, state }, code) {
        //   return new Promise((resolve, reject) => {
        //     commit('SET_CODE', code)
        //     loginByThirdparty(state.status, state.email, state.code).then(response => {
        //       commit('SET_TOKEN', response.data.token)
        //       setToken(response.data.token)
        //       resolve()
        //     }).catch(error => {
        //       reject(error)
        //     })
        //   })
        // },

        // 登出
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    // commit('SET_TOKEN', '')
                    // removeToken()
                    commit('SET_ROLES', '');
                    Cookies.remove('realName');
                    Cookies.remove('userName');
                    Cookies.remove('roles');
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            }).catch(error => {
                reject(error)
            })
        },

        // 前端 登出
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_ROLES', '');
                Cookies.remove('realName');
                Cookies.remove('userName');
                Cookies.remove('roles');
                resolve()
            })
        },

        // 动态修改权限
        ChangeRoles({commit}, role) {
            return new Promise(resolve => {
                commit('SET_TOKEN', role)
                setToken(role)
                getUserInfo(role).then(response => {
                    const data = response.data
                    commit('SET_ROLES', data.roles)
                    commit('SET_NAME', data.name)
                    commit('SET_AVATAR', data.avatar)
                    commit('SET_INTRODUCTION', data.introduction)
                    resolve()
                })
            })
        }
    }
}

export default user
