import {loginByUsername, logout, getUserInfo, getUserMenue} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'
import Layout from '@/views/layout/Layout'
import {constantRouterMap} from '@/router'
import Cookies from 'js-cookie'
import Vue from 'vue'

// 将数组中的对象的某个属性提取为一个数组
function filterPro(arr, proName) {
    let result = [];
    arr.forEach((item, idx) => {
        result.push(item[proName])
    })
    return result;
}

let aa = [
    // {
    //     "id": 1,
    //     "path": "/teamManage",  // 第一级菜单前面有斜杠： /
    //     "component": "Layout",
    //     "name": "",  // 可有可无，我用不到*****
    //     "title": "队伍管理",  // 可有可无，我用不到*****
    //     "icon": "ios-color-wand",
    //     "parentId": 0,
    //     "enabled": 1,
    //     "roles": null,
    //     "meta": {
    //         "access": null,
    //         "title": "队伍管理",        //  title取我定义的
    //         "icon": "ios-color-wand",
    //         "hideInMenu": false
    //     },
    //     "url": "",
    //     "hideInMenu": false,
    //     "children": [
    //         {
    //             "id": 3,
    //             "path": "list", // children中的path：取我定义的（子菜单path前不加斜杠： /）
    //             "component": "views/teamManage/list", // children中的component：取我定义的，最前面不加斜杠： /
    //             "name": "teamList",     // children中的name：取我定义的
    //             "title": "队伍管理",      // 可有可无*****
    //             "icon": "ios-basket-outline",
    //             "parentId": 1,
    //             "enabled": 1,
    //             "children": null,
    //             "roles": null,
    //             "meta": {
    //                 "access": null,
    //                 "title": "队伍管理",    // children中的title：取我定义的
    //                 "icon": "ios-basket-outline",
    //                 "hideInMenu": false,
    //                 "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
    //             },
    //             "url": "",
    //             "hideInMenu": false
    //         }, {
    //             "id": 5,
    //             "path": "manage",
    //             "component": "views/teamManage/manage",
    //             "name": "teamManage",
    //             "title": "队伍新增/维护",
    //             "icon": null,
    //             "parentId": 1,
    //             "enabled": 1,
    //             "children": null,
    //             "roles": null,
    //             "meta": {
    //                 "access": null,
    //                 "title": "队伍新增/维护",
    //                 "icon": "ios-basket-outline",
    //                 "hideInMenu": true
    //             },
    //             "url": "",
    //             "hideInMenu": true
    //         }]
    // },
    // {
    //     "id": 2,
    //     "path": "/athleteCentral",
    //     "component": "Layout",
    //     "name": "",
    //     "title": "运动员看板",
    //     "icon": "ios-create-outline",
    //     "parentId": 0,
    //     "enabled": 1,
    //     "roles": null,
    //     "meta": {"access": null, "title": "运动员看板", "icon": "ios-create-outline", "hideInMenu": false},
    //     "url": "",
    //     "hideInMenu": false,
    //     "children": [
    //         {
    //             "id": 4,
    //             "path": "list",
    //             "component": "views/athleteCentral/list",
    //             "name": "athleteCentral",
    //             "title": "运动员看板",
    //             "icon": "ios-people-outline",
    //             "parentId": 2,
    //             "enabled": 1,
    //             "children": null,
    //             "roles": null,
    //             "meta": {"access": null, "title": "运动员列表", "icon": "ios-people-outline", "hideInMenu": false},
    //             "url": "",
    //             "hideInMenu": false
    //         },
    //         {
    //             "id": 5,
    //             "path": "add",
    //             "component": "views/athleteCentral/add",
    //             "name": "athleteAdd",
    //             "title": "新建运动员",
    //             "icon": "ios-people-outline",
    //             "parentId": 2,
    //             "enabled": 1,
    //             "children": null,
    //             "roles": null,
    //             "meta": {
    //                 "access": null,
    //                 "title": "新建运动员",
    //                 "icon": "ios-people-outline",
    //                 "hideInMenu": true
    //             },
    //             "url": "",
    //             "hideInMenu": true
    //         }
    //     ]
    // },
    // {
    //     "id": 3,
    //     "path": "/teamOverview",  // 第一级菜单前面有斜杠： /
    //     "component": "Layout",
    //     "name": "",  // 可有可无，我用不到*****
    //     "title": "队伍看板",  // 可有可无，我用不到*****
    //     "icon": "ios-color-wand",
    //     "parentId": 0,
    //     "enabled": 1,
    //     "roles": null,
    //     "meta": {
    //         "access": null,
    //         "title": "队伍看板",        //  title取我定义的
    //         "icon": "ios-color-wand",
    //         "hideInMenu": false
    //     },
    //     "url": "",
    //     "hideInMenu": false,
    //     "children": [
    //         {
    //             "id": 3,
    //             "path": "teamOverview", // children中的path：取我定义的（子菜单path前不加斜杠： /）
    //             "component": "views/teamOverview/teamOverview", // children中的component：取我定义的，最前面不加斜杠： /
    //             "name": "teamOverview",     // children中的name：取我定义的
    //             "title": "队伍管理",      // 可有可无*****
    //             "icon": "ios-basket-outline",
    //             "parentId": 1,
    //             "enabled": 1,
    //             "children": null,
    //             "roles": null,
    //             "meta": {
    //                 "access": null,
    //                 "title": "队伍看板",    // children中的title：取我定义的
    //                 "icon": "ios-basket-outline",
    //                 "hideInMenu": false
    //             },
    //             "url": "",
    //             "hideInMenu": false
    //         }]
    // },
    // {
    //     "id": 4,
    //     "path": "/teamTest",  // 第一级菜单前面有斜杠： /
    //     "component": "Layout",
    //     "name": "",  // 可有可无，我用不到*****
    //     "title": "队伍测试(人工)",  // 可有可无，我用不到*****
    //     "icon": "ios-color-wand",
    //     "parentId": 0,
    //     "enabled": 1,
    //     "roles": null,
    //     "meta": {
    //         "access": null,
    //         "title": "队伍测试(人工)",        //  title取我定义的
    //         "icon": "ios-color-wand",
    //         "hideInMenu": false
    //     },
    //     "url": "",
    //     "hideInMenu": false,
    //     "children": [
    //         {
    //             "id": 3,
    //             "path": "teamTest", // children中的path：取我定义的（子菜单path前不加斜杠： /）
    //             "component": "views/teamTest/index", // children中的component：取我定义的，最前面不加斜杠： /
    //             "name": "teamTest",     // children中的name：取我定义的
    //             "title": "队伍测试(人工)",      // 可有可无*****
    //             "icon": "ios-basket-outline",
    //             "parentId": 1,
    //             "enabled": 1,
    //             "children": null,
    //             "roles": null,
    //             "meta": {
    //                 "access": null,
    //                 "title": "队伍测试(人工)",    // children中的title：取我定义的
    //                 "icon": "ios-basket-outline",
    //                 "hideInMenu": false
    //             },
    //             "url": "",
    //             "hideInMenu": false
    //         }]
    // },
    // {
    //     "id": 5,
    //     "path": "/videoUpload",  // 第一级菜单前面有斜杠： /
    //     "component": "Layout",
    //     "name": "",  // 可有可无，我用不到*****
    //     "title": "队伍测试(智能)",  // 可有可无，我用不到*****
    //     "icon": "ios-color-wand",
    //     "parentId": 0,
    //     "enabled": 1,
    //     "roles": null,
    //     "meta": {
    //         "access": null,
    //         "title": "队伍测试(智能)",        //  title取我定义的
    //         "icon": "ios-color-wand",
    //         "hideInMenu": false
    //     },
    //     "url": "",
    //     "hideInMenu": false,
    //     "children": [
    //         {
    //             "id": 3,
    //             "path": "videoUpload", // children中的path：取我定义的（子菜单path前不加斜杠： /）
    //             "component": "views/videoUpload/index", // children中的component：取我定义的，最前面不加斜杠： /
    //             "name": "videoUpload",     // children中的name：取我定义的
    //             "title": "队伍测试(人工)",      // 可有可无*****
    //             "icon": "ios-basket-outline",
    //             "parentId": 1,
    //             "enabled": 1,
    //             "children": null,
    //             "roles": null,
    //             "meta": {
    //                 "access": null,
    //                 "title": "队伍测试(人工)",    // children中的title：取我定义的
    //                 "icon": "ios-basket-outline",
    //                 "hideInMenu": false
    //             },
    //             "url": "",
    //             "hideInMenu": false
    //         }]
    // },
    // {
    //     "id": 6,
    //     "path": "/report",  // 第一级菜单前面有斜杠： /
    //     "component": "Layout",
    //     "name": "",  // 可有可无，我用不到*****
    //     "title": "生成报告",  // 可有可无，我用不到*****
    //     "icon": "ios-color-wand",
    //     "parentId": 0,
    //     "enabled": 1,
    //     "roles": null,
    //     "meta": {
    //         "access": null,
    //         "title": "生成报告",        //  title取我定义的
    //         "icon": "ios-color-wand",
    //         "hideInMenu": false
    //     },
    //     "url": "",
    //     "hideInMenu": false,
    //     "children": [
    //         {
    //             "id": 3,
    //             "path": "report", // children中的path：取我定义的（子菜单path前不加斜杠： /）
    //             "component": "views/report/report", // children中的component：取我定义的，最前面不加斜杠： /
    //             "name": "report",     // children中的name：取我定义的
    //             "title": "生成报告",      // 可有可无*****
    //             "icon": "ios-basket-outline",
    //             "parentId": 1,
    //             "enabled": 1,
    //             "children": null,
    //             "roles": null,
    //             "meta": {
    //                 "access": null,
    //                 "title": "生成报告",    // children中的title：取我定义的
    //                 "icon": "ios-basket-outline",
    //                 "hideInMenu": false
    //             },
    //             "url": "",
    //             "hideInMenu": false
    //         }]
    // },

    {
        "id": 7,
        "path": "/trainingAndSummary",  // 第一级菜单前面有斜杠： /
        "component": "Layout",
        "name": "",  // 可有可无，我用不到*****
        "title": "训练和总结",  // 可有可无，我用不到*****
        "icon": "ios-color-wand",
        "parentId": 0,
        "enabled": 1,
        "roles": null,
        "meta": {
            "access": null,
            "title": "训练和总结",        //  title取我定义的
            "icon": "ios-color-wand",
            "hideInMenu": false
        },
        "url": "",
        "hideInMenu": false,
        "children": [
            {
                "id": 3,
                "path": "/yearTraining", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                "component": "views/trainingAndSummary/yearTraining", // children中的component：取我定义的，最前面不加斜杠： /
                "name": "yearTraining",     // children中的name：取我定义的
                "title": "年训练管理",      // 可有可无*****
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "yearTraining", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                        "component": "views/trainingAndSummary/yearTraining/list", // children中的component：取我定义的，最前面不加斜杠： /
                        "name": "yearTrainingList",     // children中的name：取我定义的
                        "title": "年训练管理",      // 可有可无*****
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "年训练管理",    // children中的title：取我定义的
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                        },
                        "url": "",
                        "hideInMenu": false
                    },
                    {
                        "id": 3,
                        "path": "details", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                        "component": "views/trainingAndSummary/yearTraining/add", // children中的component：取我定义的，最前面不加斜杠： /
                        "name": "yearTrainingAdd",     // children中的name：取我定义的
                        "title": "编辑年计划",      // 可有可无*****
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "编辑年计划",    // children中的title：取我定义的
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "details", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                        "component": "views/trainingAndSummary/yearTraining/edit", // children中的component：取我定义的，最前面不加斜杠： /
                        "name": "yearTrainingEdit",     // children中的name：取我定义的
                        "title": "创建年计划",      // 可有可无*****
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "创建年计划",    // children中的title：取我定义的
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                ],
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "年训练管理",    // children中的title：取我定义的
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                },
                "url": "",
                "hideInMenu": false
            },
        ]
    },
    {
        "id": 8,
        "path": "/accountAndPermission",  // 第一级菜单前面有斜杠： /
        "component": "Layout",
        "name": "",  // 可有可无，我用不到*****
        "title": "账号和权限",  // 可有可无，我用不到*****
        "icon": "ios-color-wand",
        "parentId": 0,
        "enabled": 1,
        "roles": null,
        "meta": {
            "access": null,
            "title": "账号和权限",        //  title取我定义的
            "icon": "ios-color-wand",
            "hideInMenu": false
        },
        "url": "",
        "hideInMenu": false,
        "children": [
            {
                "id": 3,
                "path": "/accountManage", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                "component": "views/accountAndPermission/accountManage", // children中的component：取我定义的，最前面不加斜杠： /
                "name": "accountManage",     // children中的name：取我定义的
                "title": "账号管理",      // 可有可无*****
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "list", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                        "component": "views/accountAndPermission/accountManage/list", // children中的component：取我定义的，最前面不加斜杠： /
                        "name": "accountManageList",     // children中的name：取我定义的
                        "title": "账号管理",      // 可有可无*****
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "账号管理",    // children中的title：取我定义的
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                        },
                        "url": "",
                        "hideInMenu": false
                    },
                    {
                        "id": 3,
                        "path": "add", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                        "component": "views/accountAndPermission/accountManage/add", // children中的component：取我定义的，最前面不加斜杠： /
                        "name": "accountManageAdd",     // children中的name：取我定义的
                        "title": "创建账号",      // 可有可无*****
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "创建账号",    // children中的title：取我定义的
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                ],
                // "children": null,
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "账号管理",    // children中的title：取我定义的
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                },
                "url": "",
                "hideInMenu": false
            },
            {
                "id": 3,
                "path": "/personManage", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                "component": "views/accountAndPermission/personManage", // children中的component：取我定义的，最前面不加斜杠： /
                "name": "personManage",     // children中的name：取我定义的
                "title": "人员管理",      // 可有可无*****
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "list", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                        "component": "views/accountAndPermission/personManage/list", // children中的component：取我定义的，最前面不加斜杠： /
                        "name": "personManageList",     // children中的name：取我定义的
                        "title": "人员管理",      // 可有可无*****
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "人员管理",    // children中的title：取我定义的
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                        },
                        "url": "",
                        "hideInMenu": false
                    },
                    {
                        "id": 3,
                        "path": "add", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                        "component": "views/accountAndPermission/personManage/add", // children中的component：取我定义的，最前面不加斜杠： /
                        "name": "personManageAdd",     // children中的name：取我定义的
                        "title": "创建人员",      // 可有可无*****
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "创建人员",    // children中的title：取我定义的
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "edit", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                        "component": "views/accountAndPermission/personManage/edit", // children中的component：取我定义的，最前面不加斜杠： /
                        "name": "personManageEdit",     // children中的name：取我定义的
                        "title": "编辑人员",      // 可有可无*****
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "编辑人员",    // children中的title：取我定义的
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                ],
                // "children": null,
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "账号管理",    // children中的title：取我定义的
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                },
                "url": "",
                "hideInMenu": false
            },
        ]
    },
    {
        "id": 9,
        "path": "/systemConfig",  // 第一级菜单前面有斜杠： /
        "component": "Layout",
        "name": "",  // 可有可无，我用不到*****
        "title": "系统配置",  // 可有可无，我用不到*****
        "icon": "ios-color-wand",
        "parentId": 0,
        "enabled": 1,
        "roles": null,
        "meta": {
            "access": null,
            "title": "系统配置",        //  title取我定义的
            "icon": "ios-color-wand",
            "hideInMenu": false
        },
        "url": "",
        "hideInMenu": false,
        "children": [
            {
                "id": 3,
                "path": "/bigProject", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                "component": "views/systemConfig/bigProject", // children中的component：取我定义的，最前面不加斜杠： /
                "name": "bigProject",     // children中的name：取我定义的
                "title": "项目(大项)管理",      // 可有可无*****
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "list", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                        "component": "views/systemConfig/bigProject/list", // children中的component：取我定义的，最前面不加斜杠： /
                        "name": "bigProjectList",     // children中的name：取我定义的
                        "title": "项目(大项)管理",      // 可有可无*****
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "项目(大项)管理",    // children中的title：取我定义的
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                        },
                        "url": "",
                        "hideInMenu": false
                    },
                    {
                        "id": 3,
                        "path": "add", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                        "component": "views/systemConfig/bigProject/add", // children中的component：取我定义的，最前面不加斜杠： /
                        "name": "bigProjectAdd",     // children中的name：取我定义的
                        "title": "创建大项",      // 可有可无*****
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "创建大项",    // children中的title：取我定义的
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "edit", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                        "component": "views/systemConfig/bigProject/edit", // children中的component：取我定义的，最前面不加斜杠： /
                        "name": "bigProjectEdit",     // children中的name：取我定义的
                        "title": "编辑大项",      // 可有可无*****
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "编辑大项",    // children中的title：取我定义的
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                ],
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "项目(大项)管理",    // children中的title：取我定义的
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                },
                "url": "",
                "hideInMenu": false
            },
            {
                "id": 3,
                "path": "/position", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                "component": "views/systemConfig/position", // children中的component：取我定义的，最前面不加斜杠： /
                "name": "position",     // children中的name：取我定义的
                "title": "职位管理",      // 可有可无*****
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "list", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                        "component": "views/systemConfig/position/list", // children中的component：取我定义的，最前面不加斜杠： /
                        "name": "positionList",     // children中的name：取我定义的
                        "title": "职位管理",      // 可有可无*****
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "职位管理",    // children中的title：取我定义的
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                        },
                        "url": "",
                        "hideInMenu": false
                    },
                    {
                        "id": 3,
                        "path": "add", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                        "component": "views/systemConfig/position/add", // children中的component：取我定义的，最前面不加斜杠： /
                        "name": "positionAdd",     // children中的name：取我定义的
                        "title": "创建职位",      // 可有可无*****
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "创建职位",    // children中的title：取我定义的
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "edit", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                        "component": "views/systemConfig/position/edit", // children中的component：取我定义的，最前面不加斜杠： /
                        "name": "positionEdit",     // children中的name：取我定义的
                        "title": "编辑职位",      // 可有可无*****
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "编辑职位",    // children中的title：取我定义的
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                ],
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "职位管理",    // children中的title：取我定义的
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                },
                "url": "",
                "hideInMenu": false
            },
            {
                "id": 3,
                "path": "/team", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                "component": "views/systemConfig/team", // children中的component：取我定义的，最前面不加斜杠： /
                "name": "teamManage",     // children中的name：取我定义的
                "title": "队伍管理",      // 可有可无*****
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "list", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                        "component": "views/systemConfig/team/list", // children中的component：取我定义的，最前面不加斜杠： /
                        "name": "teamList",     // children中的name：取我定义的
                        "title": "队伍管理",      // 可有可无*****
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "队伍管理",    // children中的title：取我定义的
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                        },
                        "url": "",
                        "hideInMenu": false
                    },
                    {
                        "id": 3,
                        "path": "add", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                        "component": "views/systemConfig/team/add", // children中的component：取我定义的，最前面不加斜杠： /
                        "name": "teamAdd",     // children中的name：取我定义的
                        "title": "创建队伍",      // 可有可无*****
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "创建队伍",    // children中的title：取我定义的
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "edit", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                        "component": "views/systemConfig/team/edit", // children中的component：取我定义的，最前面不加斜杠： /
                        "name": "teamEdit",     // children中的name：取我定义的
                        "title": "编辑职位",      // 可有可无*****
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "编辑职位",    // children中的title：取我定义的
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                ],
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "队伍管理",    // children中的title：取我定义的
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                },
                "url": "",
                "hideInMenu": false
            },
        ]
    },
    ]


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
        // obj.alwaysShow = true;  // 始终显示根目录(只有一个子菜单)
        if(route.parentId==0) {
            obj.component = () => import('@/views/layout/Layout');
        } else {
            obj.component = () => import(`@/${route.component}`);
        }
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
        obj.hidden = route.meta.hideInMenu;
        obj.meta = {
            title: route.meta.title,
            icon: route.meta.icon,
            hidden: route.meta.hideInMenu,
            noCache: route.meta.noCache
        }
    }
    return obj;
}


// 将后台返回的路由数据的集合进行组装(成为路由的格式)
function reformRouters1(routersList) {
    let list = [
        {
            path: '/teamManage',
            component: Layout,
            meta: {title: '队伍管理'},
            children: [
                {
                    path: 'list',
                    component: () => import('@/views/teamManage/list'),
                    name: 'teamList',
                    meta: {title: '队伍管理',noCache: true}
                },
                {
                    path: 'manage',
                    component: () => import('@/views/teamManage/manage'),
                    name: 'teamManage',
                    hidden: true,
                    meta: {title: '队伍新增/维护'}
                }
            ]
        },
        {
            path: '/athleteCentral',
            component: Layout,
            meta: {title: '运动员看板'},
            children: [
                {
                    path: 'list',
                    component: () => import('@/views/athleteCentral/list'),
                    name: 'athleteCentral',
                    meta: {title: '运动员看板'}
                },
                {
                    path: 'add',
                    component: () => import('@/views/athleteCentral/add'),
                    name: 'athleteAdd',
                    hidden: true,
                    meta: {title: '新建运动员'}
                }
            ]
        },
        {
            path: '/teamOverview',
            component: Layout,
            meta: {title: '队伍看板'},
            children: [
                {
                    path: 'teamOverview',
                    component: () => import('@/views/teamOverview/teamOverview'),
                    name: 'teamOverview',
                    meta: {title: '队伍看板'}
                }
            ]
        },
        {
            path: '/teamTest',
            component: Layout,
            meta: {title: '队伍测试(人工)'},
            children: [
                {
                    path: 'teamTest',
                    component: () => import('@/views/teamTest/index'),
                    name: 'teamTest',
                    meta: {title: '队伍测试(人工)'}
                }
            ]
        },

        {
            path: '/videoUpload',
            component: Layout,
            meta: {title: '队伍测试(智能)'},
            children: [
                {
                    path: 'videoUpload',
                    component: () => import('@/views/videoUpload/index'),
                    name: 'videoUpload',
                    meta: {title: '队伍测试(智能)'}
                }
            ]
        },
        {
            path: '/report',
            component: Layout,
            meta: {title: '生成报告'},
            children: [
                {
                    path: 'report',
                    component: () => import('@/views/report/report'),
                    name: 'report',
                    meta: {title: '生成报告'}
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
                        Vue.prototype.$message({
                            message: response.data.msg,
                            type: 'warning'
                        });
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
                console.log(state.roles[0])
                getUserMenue(state.roles[0], '2').then(response => {
                    if (response.data.code === 200) {
                        const res = response.data.data;
                        if (res && res.length > 0) { // 验证返回的菜单是否是一个非空数组
                            // let newRouters = reformRouters(res);
                            // console.log(res)
                            // console.log(aa)
                            // let newRouters = reformRouters1(res);
                            let newRouters = reformRouters(aa);
                            commit('SET_ROUTERS', newRouters);
                            resolve()
                        } else {
                            reject('getInfo: routers must be a non-null array !')
                        }
                    } else {
                        Vue.prototype.$message({
                            message: response.data.msg,
                            type: 'warning'
                        });
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
