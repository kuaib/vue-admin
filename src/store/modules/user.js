import {loginByUsername, logout, getUserInfo, getUserMenue} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'
import Layout from '@/views/layout/Layout'
import { constantRouterMap } from '@/router'

// 将后台返回的路由数据的集合进行组装(成为路由的格式)
function reformRouters(routersList) {
    // 后续会将接口中的数据转化为以下的数组形式
    return [
        {
            path: '/salesManage',
            component: Layout,
            meta: {
                title: '销售管理',
                icon: 'lock',
                roles: ['admin', 'editor'] // you can set roles in root nav
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
                    },{
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
                    meta: { title: '单据' },
                    redirect: '/salesManage/documents/salesOrder/list',
                    children: [
                        {
                            path: 'salesOrder/list',
                            component: () => import('@/views/salesManage/documents/salesOrder/list'),
                            name: 'salesOrderList',
                            meta: { title: '销售订单列表' }
                        },
                        {
                            path: 'salesOrder/add',
                            component: () => import('@/views/salesManage/documents/salesOrder/add'),
                            name: 'salesOrderAdd',
                            hidden: true,
                            meta: { title: '新增销售订单' }
                        },
                        {
                            path: 'salesSendOrder/list',
                            component: () => import('@/views/salesManage/documents/salesSendOrder/list'),
                            name: 'salesSendOrderList',
                            meta: { title: '销售发货单列表' }
                        },
                        {
                            path: 'salesSendOrder/add',
                            component: () => import('@/views/salesManage/documents/salesSendOrder/add'),
                            name: 'salesSendOrderAdd',
                            hidden: true,
                            meta: { title: '新增销售订单' }
                        },
                    ]
                },
            ]
        },

        {
          path: '/components',
          component: Layout,
          redirect: 'noredirect',
          name: 'component-demo',
          meta: {
            title: '组件',
            icon: 'component'
          },
          children: [
            { path: 'tinymce', component: () => import('@/views/components-demo/tinymce'), name: 'tinymce-demo', meta: { title: '富文本编辑器' }},
            { path: 'markdown', component: () => import('@/views/components-demo/markdown'), name: 'markdown-demo', meta: { title: 'markdown' }},
            { path: 'json-editor', component: () => import('@/views/components-demo/jsonEditor'), name: 'jsonEditor-demo', meta: { title: 'JSON编辑器' }},
            { path: 'splitpane', component: () => import('@/views/components-demo/splitpane'), name: 'splitpane-demo', meta: { title: 'splitPane' }},
            { path: 'avatar-upload', component: () => import('@/views/components-demo/avatarUpload'), name: 'avatarUpload-demo', meta: { title: '头像上传' }},
            { path: 'dropzone', component: () => import('@/views/components-demo/dropzone'), name: 'dropzone-demo', meta: { title: 'dropzone' }},
            { path: 'sticky', component: () => import('@/views/components-demo/sticky'), name: 'sticky-demo', meta: { title: 'sticky' }},
            { path: 'count-to', component: () => import('@/views/components-demo/countTo'), name: 'countTo-demo', meta: { title: 'countTo' }},
            { path: 'mixin', component: () => import('@/views/components-demo/mixin'), name: 'componentMixin-demo', meta: { title: '小组件' }},
            { path: 'back-to-top', component: () => import('@/views/components-demo/backToTop'), name: 'backToTop-demo', meta: { title: '返回顶部' }},
            { path: 'drag-dialog', component: () => import('@/views/components-demo/dragDialog'), name: 'dragDialog-demo', meta: { title: '拖拽Dialog' }},
            { path: 'dnd-list', component: () => import('@/views/components-demo/dndList'), name: 'dndList-demo', meta: { title: '列表拖拽' }},
            { path: 'drag-kanban', component: () => import('@/views/components-demo/dragKanban'), name: 'dragKanban-demo', meta: { title: '可拖拽看板' }}
          ]
        }


    ]
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
        roles: ['admin'],
        setting: {
            articlePlatform: []
        },

        routers: constantRouterMap,
        addRouters: []
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
        SET_ROLES: (state, roles) => {
            state.roles = roles
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
        LoginByUsername({commit}, userInfo) {
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                loginByUsername(username, userInfo.password).then(response => {
                    const data = response.data
                    commit('SET_TOKEN', data.token)
                    setToken(response.data.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户菜单-路由(业务需求，菜单和路由需要在后端返回)
        GetUserMenue({commit, state}) {
            return new Promise((resolve, reject) => {
                getUserMenue(state.token).then(response => {
                    // if (!response.data) {
                    //     reject('error')
                    // }
                    // const data = response.data
                    //
                    // if (data.routers && data.routers.length > 0) { // 验证返回的roles是否是一个非空数组
                    //     let newRouters = reformRouters(data.routers);
                    //
                    //     commit('SET_ROUTERS', newRouters)
                    // } else {
                    //     reject('getInfo: routers must be a non-null array !')
                    // }
                    //
                    // commit('SET_NAME', data.name)
                    // commit('SET_AVATAR', data.avatar)
                    // commit('SET_INTRODUCTION', data.introduction)
                    let newRouters = reformRouters();

                    commit('SET_ROUTERS', newRouters)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

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
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    removeToken()
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
                commit('SET_TOKEN', '')
                removeToken()
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
