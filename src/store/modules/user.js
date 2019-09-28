import {loginByUsername, getUserMenue} from '@/api/login'
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
    {
        "id": 7,
        "path": "/trainingAndSummary",
        "component": "Layout",
        "name": "",
        "title": "训练和总结",
        "icon": "ios-color-wand",
        "parentId": 0,
        "enabled": 1,
        "roles": null,
        "meta": {
            "access": null,
            "title": "训练和总结",
            "icon": "ios-color-wand",
            "hideInMenu": false
        },
        "url": "",
        "hideInMenu": false,
        "children": [
            {
                "id": 3,
                "path": "/yearTraining",
                "component": "views/trainingAndSummary/yearTraining",
                "name": "yearTraining",
                "title": "年训练管理",
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "list",
                        "component": "views/trainingAndSummary/yearTraining/list",
                        "name": "yearTrainingList",
                        "title": "年训练管理",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "年训练管理",
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": false
                    },
                    {
                        "id": 3,
                        "path": "add",
                        "component": "views/trainingAndSummary/yearTraining/add",
                        "name": "yearTrainingAdd",
                        "title": "创建年计划",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "创建年计划",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "edit",
                        "component": "views/trainingAndSummary/yearTraining/edit",
                        "name": "yearTrainingEdit",
                        "title": "编辑年计划",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "编辑年计划",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                ],
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "年训练管理",
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true
                },
                "url": "",
                "hideInMenu": false
            },
            {
                "id": 3,
                "path": "/monthTraining",
                "component": "views/trainingAndSummary/monthTraining/monthPlan",
                "name": "monthTraining",
                "title": "月训练管理",
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "monthPlan/list",
                        "component": "views/trainingAndSummary/monthTraining/monthPlan/list",
                        "name": "monthTrainingPlanList",
                        "title": "月训练计划",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "月训练计划",
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": false
                    },
                    {
                        "id": 3,
                        "path": "monthPlan/add",
                        "component": "views/trainingAndSummary/monthTraining/monthPlan/add",
                        "name": "monthTrainingPlanAdd",
                        "title": "创建月训练计划",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "创建月训练计划",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "monthPlan/edit",
                        "component": "views/trainingAndSummary/monthTraining/monthPlan/edit",
                        "name": "monthTrainingPlanEdit",
                        "title": "编辑月训练计划",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "编辑月训练计划",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },

                    {
                        "id": 3,
                        "path": "monthSummary/list",
                        "component": "views/trainingAndSummary/monthTraining/monthPlan/list",
                        "name": "monthTrainingSummaryList",
                        "title": "月训练总结",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "月训练总结",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "monthSummary/add",
                        "component": "views/trainingAndSummary/monthTraining/monthPlan/add",
                        "name": "monthTrainingSummaryAdd",
                        "title": "创建月训练总结",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "创建月训练总结",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true,
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "monthSummary/edit",
                        "component": "views/trainingAndSummary/monthTraining/monthPlan/edit",
                        "name": "monthTrainingSummaryEdit",
                        "title": "编辑月训练总结",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "编辑月训练总结",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true,
                        },
                        "url": "",
                        "hideInMenu": true
                    }
                ],
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "月训练管理",
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true
                },
                "url": "",
                "hideInMenu": false
            },
            {
                "id": 3,
                "path": "/weekTraining",
                "component": "views/trainingAndSummary/weekTraining/weekPlan",
                "name": "weekTraining",
                "title": "周训练管理",
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "weekPlan/list",
                        "component": "views/trainingAndSummary/weekTraining/weekPlan/list",
                        "name": "weekTrainingPlanList",
                        "title": "周训练计划",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "周训练计划",
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": false
                    },
                    {
                        "id": 3,
                        "path": "weekPlan/add",
                        "component": "views/trainingAndSummary/weekTraining/weekPlan/add",
                        "name": "weekTrainingPlanAdd",
                        "title": "创建周训练计划",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "创建周训练计划",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "weekPlan/edit",
                        "component": "views/trainingAndSummary/weekTraining/weekPlan/edit",
                        "name": "weekTrainingPlanEdit",
                        "title": "编辑周训练计划",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "编辑周训练计划",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },

                    {
                        "id": 3,
                        "path": "weekSummary/list",
                        "component": "views/trainingAndSummary/weekTraining/weekPlan/list",
                        "name": "weekTrainingSummaryList",
                        "title": "日训练总结",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "日训练总结",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "weekSummary/edit",
                        "component": "views/trainingAndSummary/weekTraining/weekSummary/edit",
                        "name": "weekTrainingSummaryEdit",
                        "title": "编辑日训练总结",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "编辑日训练总结",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                ],
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "周训练管理",
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true
                },
                "url": "",
                "hideInMenu": false
            }
        ]
    },
    {
        "id": 10,
        "path": "/trainingBriefReport",
        "component": "Layout",
        "name": "",
        "title": "集训简报管理",
        "icon": "ios-color-wand",
        "parentId": 0,
        "enabled": 1,
        "roles": null,
        "meta": {
            "access": null,
            "title": "集训简报管理",
            "icon": "ios-color-wand",
            "hideInMenu": false
        },
        "url": "",
        "hideInMenu": false,
        "children": [
            {
                "id": 3,
                "path": "/briefRecord",
                "component": "views/trainingBriefReport/briefRecord",
                "name": "briefRecord",
                "title": "简报记录",
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "plan/list",
                        "component": "views/trainingBriefReport/briefRecord/list",
                        "name": "planList",
                        "title": "简报记录",
                        "icon": "ios-basket-outline",
                        "parentId": 1,
                        "enabled": 1,
                        "children": [],
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "简报记录",
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": false
                    },
                    {
                        "id": 3,
                        "path": "plan/add",
                        "component": "views/trainingBriefReport/briefRecord/add",
                        "name": "planAdd",
                        "title": "创建集训计划",
                        "icon": "ios-basket-outline",
                        "parentId": 1,
                        "enabled": 1,
                        "children": [],
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "创建集训计划",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "plan/edit",
                        "component": "views/trainingBriefReport/briefRecord/edit",
                        "name": "planEdit",
                        "title": "编辑集训计划",
                        "icon": "ios-basket-outline",
                        "parentId": 1,
                        "enabled": 1,
                        "children": [],
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "编辑集训计划",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "summary/list",
                        "component": "views/trainingBriefReport/briefRecord/list",
                        "name": "summaryList",
                        "title": "训练小结",
                        "icon": "ios-basket-outline",
                        "parentId": 1,
                        "enabled": 1,
                        "children": [],
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "训练小结",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "summary/edit",
                        "component": "views/trainingBriefReport/briefRecord/summaryEdit",
                        "name": "summaryEdit",
                        "title": "编辑集训小结",
                        "icon": "ios-basket-outline",
                        "parentId": 1,
                        "enabled": 1,
                        "children": [],
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "编辑集训小结",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    }
                ],
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "简报记录",
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true
                },
                "url": "",
                "hideInMenu": false
            }
        ]
    },
    {
        "id": 11,
        "path": "/evaluationManagement",
        "component": "Layout",
        "name": "",
        "title": "测评管理",
        "icon": "ios-color-wand",
        "parentId": 0,
        "enabled": 1,
        "roles": null,
        "meta": {
            "access": null,
            "title": "测评管理",
            "icon": "ios-color-wand",
            "hideInMenu": false
        },
        "url": "",
        "hideInMenu": false,
        "children": [
            {
                "id": 3,
                "path": "/evaluationRecord",
                "component": "views/evaluationManagement/evaluationRecord/index",
                "name": "evaluationRecord",
                "title": "测评记录",
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "list",
                        "component": "views/evaluationManagement/evaluationRecord/list",
                        "name": "evaluationRecordList",
                        "title": "测评记录",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "测评记录",
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": false
                    },
                    {
                        "id": 3,
                        "path": "importFile",
                        "component": "views/evaluationManagement/evaluationRecord/importFile",
                        "name": "valuationRecordImportFile",
                        "title": "文件导入",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "文件导入",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "detail",
                        "component": "views/evaluationManagement/evaluationRecord/detail",
                        "name": "evaluationRecordDetail",
                        "title": "有氧测试",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "有氧测试",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                ],
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "测评记录",
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true
                },
                "url": "",
                "hideInMenu": false
            },
            {
                "id": 3,
                "path": "/evaluationAnalysis",
                "component": "views/evaluationManagement/evaluationAnalysis/index",
                "name": "evaluationAnalysis",
                "title": "测评分析",
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "detail",
                        "component": "views/evaluationManagement/evaluationAnalysis/detail",
                        "name": "evaluationAnalysisDetail",
                        "title": "测评分析",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "测评分析",
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": false
                    },
                ],
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "测评分析",
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true
                },
                "url": "",
                "hideInMenu": false
            },
            {
                "id": 3,
                "path": "/teamReport",
                "component": "views/evaluationManagement/teamReport/index",
                "name": "teamReport",
                "title": "队伍分析报告",
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "list",
                        "component": "views/evaluationManagement/teamReport/list",
                        "name": "teamReportList",
                        "title": "队伍分析报告",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "队伍分析报告",
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": false
                    },
                ],
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "队伍分析报告",
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true
                },
                "url": "",
                "hideInMenu": false
            }
        ]
    },
    {
        "id": 12,
        "path": "/kanbanOfData",
        "component": "Layout",
        "name": "",
        "title": "数据看板",
        "icon": "ios-color-wand",
        "parentId": 0,
        "enabled": 1,
        "roles": null,
        "meta": {
            "access": null,
            "title": "数据看板",
            "icon": "ios-color-wand",
            "hideInMenu": false
        },
        "url": "",
        "hideInMenu": false,
        "children": [
            {
                "id": 3,
                "path": "/athleteKanban",
                "component": "views/kanbanOfData/athleteKanban/index",
                "name": "athleteKanban",
                "title": "运动员看板",
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "allData",
                        "component": "views/kanbanOfData/athleteKanban/allData",
                        "name": "allDataAthlete",
                        "title": "运动员看板",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "运动员看板",
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": false
                    }
                ],
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "运动员看板",
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true
                },
                "url": "",
                "hideInMenu": false
            },
            {
                "id": 3,
                "path": "/teamKanban",
                "component": "views/kanbanOfData/teamKanban/index",
                "name": "teamKanban",
                "title": "运动队看板",
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "allData",
                        "component": "views/kanbanOfData/teamKanban/allData",
                        "name": "allDataTeam",
                        "title": "运动队看板",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "运动队看板",
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": false
                    }
                ],
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "运动队看板",
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true
                },
                "url": "",
                "hideInMenu": false
            }
        ]
    },
    {
        "id": 8,
        "path": "/accountAndPermission",
        "component": "Layout",
        "name": "",
        "title": "账号和权限",
        "icon": "ios-color-wand",
        "parentId": 0,
        "enabled": 1,
        "roles": null,
        "meta": {
            "access": null,
            "title": "账号和权限",
            "icon": "ios-color-wand",
            "hideInMenu": false
        },
        "url": "",
        "hideInMenu": false,
        "children": [
            {
                "id": 3,
                "path": "/accountManage",
                "component": "views/accountAndPermission/accountManage",
                "name": "accountManage",
                "title": "账号管理",
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "list",
                        "component": "views/accountAndPermission/accountManage/list",
                        "name": "accountManageList",
                        "title": "账号管理",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "账号管理",
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": false
                    },
                    {
                        "id": 3,
                        "path": "add",
                        "component": "views/accountAndPermission/accountManage/add",
                        "name": "accountManageAdd",
                        "title": "创建账号",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "创建账号",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "edit",
                        "component": "views/accountAndPermission/accountManage/edit",
                        "name": "accountManageEdit",
                        "title": "编辑账号",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "编辑账号",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                ],
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "账号管理",
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true
                },
                "url": "",
                "hideInMenu": false
            },
            {
                "id": 3,
                "path": "/personManage",
                "component": "views/accountAndPermission/personManage",
                "name": "personManage",
                "title": "人员管理",
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "list",
                        "component": "views/accountAndPermission/personManage/list",
                        "name": "personManageList",
                        "title": "人员管理",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "人员管理",
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": false
                    },
                    {
                        "id": 3,
                        "path": "add",
                        "component": "views/accountAndPermission/personManage/add",
                        "name": "personManageAdd",
                        "title": "创建人员",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "创建人员",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "edit",
                        "component": "views/accountAndPermission/personManage/edit",
                        "name": "personManageEdit",
                        "title": "编辑人员",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "编辑人员",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                ],
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "账号管理",
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true
                },
                "url": "",
                "hideInMenu": false
            }
        ]
    },
    {
        "id": 13,
        "path": "/attendance",
        "component": "Layout",
        "name": "",
        "title": "考勤管理",
        "icon": "ios-color-wand",
        "parentId": 0,
        "enabled": 1,
        "roles": null,
        "meta": {
            "access": null,
            "title": "考勤管理",
            "icon": "ios-color-wand",
            "hideInMenu": false
        },
        "url": "",
        "hideInMenu": false,
        "children": [
            {
                "id": 3,
                "path": "/dayAttendance",
                "component": "views/attendance/dayAttendance",
                "name": "dayAttendance",
                "title": "每日考勤",
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "list",
                        "component": "views/attendance/dayAttendance/list",
                        "name": "dayAttendanceList",
                        "title": "每日考勤",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "每日考勤",
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": false
                    },
                    {
                        "id": 3,
                        "path": "add",
                        "component": "views/attendance/dayAttendance/add",
                        "name": "dayAttendanceAdd",
                        "title": "创建每日考勤",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "创建每日考勤",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "edit",
                        "component": "views/attendance/dayAttendance/edit",
                        "name": "dayAttendanceEdit",
                        "title": "编辑每日考勤",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "编辑每日考勤",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                ],
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "每日考勤",
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true
                },
                "url": "",
                "hideInMenu": false
            },
            {
                "id": 3,
                "path": "/monthAttendance",
                "component": "views/attendance/monthAttendance/index",
                "name": "monthAttendance",
                "title": "月度考勤统计",
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "list",
                        "component": "views/attendance/monthAttendance/list",
                        "name": "monthAttendanceList",
                        "title": "月度考勤统计",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "月度考勤统计",
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": false
                    },
                  {
                    "id": 3,
                    "path": "preview",
                    "component": "views/attendance/monthAttendance/preview",
                    "name": "monthAttendancePreview",
                    "title": "月度考勤预览",
                    "icon": "ios-basket-outline",
                    "parentId": 2,
                    "enabled": 1,
                    "children": null,
                    "roles": null,
                    "meta": {
                      "access": null,
                      "title": "月度考勤预览",
                      "icon": "ios-basket-outline",
                      "hideInMenu": true,
                      "noCache": true
                    },
                    "url": "",
                    "hideInMenu": true
                  }
                ],
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "月度考勤统计",
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true
                },
                "url": "",
                "hideInMenu": false
            }
        ]
    },
    {
        "id": 9,
        "path": "/systemConfig",
        "component": "Layout",
        "name": "",
        "title": "系统配置",
        "icon": "ios-color-wand",
        "parentId": 0,
        "enabled": 1,
        "roles": null,
        "meta": {
            "access": null,
            "title": "系统配置",
            "icon": "ios-color-wand",
            "hideInMenu": false
        },
        "url": "",
        "hideInMenu": false,
        "children": [
            {
                "id": 3,
                "path": "/bigProject",
                "component": "views/systemConfig/bigProject",
                "name": "bigProject",
                "title": "项目(大项)管理",
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "list",
                        "component": "views/systemConfig/bigProject/list",
                        "name": "bigProjectList",
                        "title": "项目(大项)管理",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "项目(大项)管理",
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": false
                    },
                    {
                        "id": 3,
                        "path": "add",
                        "component": "views/systemConfig/bigProject/add",
                        "name": "bigProjectAdd",
                        "title": "创建大项",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "创建大项",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "edit",
                        "component": "views/systemConfig/bigProject/edit",
                        "name": "bigProjectEdit",
                        "title": "编辑大项",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "编辑大项",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                ],
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "项目(大项)管理",
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true
                },
                "url": "",
                "hideInMenu": false
            },
            {
                "id": 3,
                "path": "/position",
                "component": "views/systemConfig/position",
                "name": "position",
                "title": "职位管理",
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "list",
                        "component": "views/systemConfig/position/list",
                        "name": "positionList",
                        "title": "职位管理",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "职位管理",
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": false
                    },
                    {
                        "id": 3,
                        "path": "add",
                        "component": "views/systemConfig/position/add",
                        "name": "positionAdd",
                        "title": "创建职位",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "创建职位",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "edit",
                        "component": "views/systemConfig/position/edit",
                        "name": "positionEdit",
                        "title": "编辑职位",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "编辑职位",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                ],
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "职位管理",
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true
                },
                "url": "",
                "hideInMenu": false
            },
            {
                "id": 3,
                "path": "/team",
                "component": "views/systemConfig/team",
                "name": "teamManage",
                "title": "队伍管理",
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "list",
                        "component": "views/systemConfig/team/list",
                        "name": "teamList",
                        "title": "队伍管理",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "队伍管理",
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": false
                    },
                    {
                        "id": 3,
                        "path": "add",
                        "component": "views/systemConfig/team/add",
                        "name": "teamAdd",
                        "title": "创建队伍",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "创建队伍",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "edit",
                        "component": "views/systemConfig/team/edit",
                        "name": "teamEdit",
                        "title": "编辑队伍",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "编辑队伍",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                ],
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "队伍管理",
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true
                },
                "url": "",
                "hideInMenu": false
            }
        ]
    },
    {
        "id": 13,
        "path": "/trainVideoManage",
        "component": "Layout",
        "name": "",
        "title": "训练视频管理",
        "icon": "ios-color-wand",
        "parentId": 0,
        "enabled": 1,
        "roles": null,
        "meta": {
            "access": null,
            "title": "训练视频管理",
            "icon": "ios-color-wand",
            "hideInMenu": false
        },
        "url": "",
        "hideInMenu": false,
        "children": [
            {
                "id": 3,
                "path": "/championVideo",
                "component": "views/trainVideoManage/championVideo/index",
                "name": "championVideo",
                "title": "冠军视频源",
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "list",
                        "component": "views/trainVideoManage/championVideo/list",
                        "name": "championVideoList",
                        "title": "冠军视频源",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "冠军视频源",
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": false
                    },
                    {
                        "id": 3,
                        "path": "add",
                        "component": "views/trainVideoManage/championVideo/add",
                        "name": "championVideoAdd",
                        "title": "上传冠军视频",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "上传冠军视频",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "edit",
                        "component": "views/trainVideoManage/championVideo/edit",
                        "name": "championVideoEdit",
                        "title": "编辑冠军视频",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "编辑冠军视频",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "detail",
                        "component": "views/trainVideoManage/championVideo/detail",
                        "name": "championVideoDetail",
                        "title": "冠军视频详情",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "冠军视频详情",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                ],
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "冠军视频源",
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true
                },
                "url": "",
                "hideInMenu": false
            },
            {
                "id": 3,
                "path": "/athleteVideo",
                "component": "views/trainVideoManage/athleteVideo/index",
                "name": "athleteVideo",
                "title": "运动员视频源",
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "list",
                        "component": "views/trainVideoManage/athleteVideo/list",
                        "name": "athleteVideoList",
                        "title": "运动员视频源",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "运动员视频源",
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": false
                    },
                    {
                        "id": 3,
                        "path": "add",
                        "component": "views/trainVideoManage/athleteVideo/add",
                        "name": "athleteVideoAdd",
                        "title": "上传运动员视频",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "上传运动员视频",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "edit",
                        "component": "views/trainVideoManage/athleteVideo/edit",
                        "name": "athleteVideoEdit",
                        "title": "编辑运动员视频",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "编辑运动员视频",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                    {
                        "id": 3,
                        "path": "detail",
                        "component": "views/trainVideoManage/athleteVideo/detail",
                        "name": "athleteVideoDetail",
                        "title": "运动员视频详情",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "运动员视频详情",
                            "icon": "ios-basket-outline",
                            "hideInMenu": true,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": true
                    },
                ],
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "运动员视频源",
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true
                },
                "url": "",
                "hideInMenu": false
            },
            {
                "id": 3,
                "path": "/videoOnDemand",
                "component": "views/trainVideoManage/videoOnDemand/index",
                "name": "videoOnDemand",
                "title": "视频点播对比",
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": [
                    {
                        "id": 3,
                        "path": "videoOnDemand",
                        "component": "views/trainVideoManage/videoOnDemand/videoOnDemand",
                        "name": "videoOnDemandIdx",
                        "title": "视频点播对比",
                        "icon": "ios-basket-outline",
                        "parentId": 2,
                        "enabled": 1,
                        "children": null,
                        "roles": null,
                        "meta": {
                            "access": null,
                            "title": "视频点播对比",
                            "icon": "ios-basket-outline",
                            "hideInMenu": false,
                            "noCache": true
                        },
                        "url": "",
                        "hideInMenu": false
                    },
                ],
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "视频点播对比",
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true
                },
                "url": "",
                "hideInMenu": false
            }
        ]
    }
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
        if (route.parentId == 0) {
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
                    meta: {title: '队伍管理', noCache: true}
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
        // 动态添加路由
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers
            state.routers = constantRouterMap.concat(routers)
        }
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
                        Cookies.set('systemType', '2');  // 新系统：2，老系统：1
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
                let systemType = Cookies.get('systemType');
                getUserMenue(state.roles[0], systemType).then(response => {
                    if (response.data.code === 200) {
                        const res = response.data.data;
                        if (res && res.length > 0) { // 验证返回的菜单是否是一个非空数组
                            let newRouters = reformRouters(res);
                            // let newRouters = reformRouters1(res);
                            // let newRouters = reformRouters(aa);
                            commit('SET_ROUTERS', newRouters);
                            resolve()
                        } else {
                            let newRouters = reformRouters(aa);
                            commit('SET_ROUTERS', newRouters);
                            resolve()
                            // reject('getInfo: routers must be a non-null array !')
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

        // 登出
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                // logout(state.token).then(() => {
                //     // commit('SET_TOKEN', '')
                //     // removeToken()
                //     commit('SET_ROLES', '');
                //     Cookies.remove('realName');
                //     Cookies.remove('userName');
                //     Cookies.remove('roles');
                //     Cookies.remove('systemType');
                //     resolve()
                // }).catch(error => {
                //     reject(error)
                // })

                commit('SET_ROLES', '');
                Cookies.remove('realName');
                Cookies.remove('userName');
                Cookies.remove('roles');
                Cookies.remove('systemType');
                resolve()
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
        // ChangeRoles({commit}, role) {
        //     return new Promise(resolve => {
        //         commit('SET_TOKEN', role)
        //         setToken(role)
        //         getUserInfo(role).then(response => {
        //             const data = response.data
        //             commit('SET_ROLES', data.roles)
        //             commit('SET_NAME', data.name)
        //             commit('SET_AVATAR', data.avatar)
        //             commit('SET_INTRODUCTION', data.introduction)
        //             resolve()
        //         })
        //     })
        // }
    }
}

export default user
