<template>
    <el-scrollbar wrapClass="scrollbar-wrapper">
        <el-menu
                mode="vertical"
                :show-timeout="200"
                :default-active="$route.path"
                :collapse="isCollapse"
                background-color="#304156"
                text-color="#bfcbd9"
                active-text-color="#409EFF"
                unique-opened
        >
            <sidebar-item v-for="route in user_routers" :key="route.name" :item="route"
                          :base-path="route.path"></sidebar-item>
        </el-menu>
    </el-scrollbar>
</template>

<script>
    import {mapGetters} from 'vuex'
    import SidebarItem from './SidebarItem'

    export default {
        components: {SidebarItem},
        computed: {
            ...mapGetters([
                'user_routers',
                'permission_routers', // 获取到所有有权限的路由
                'sidebar' // 折叠菜单栏
            ]),
            isCollapse() {
                return !this.sidebar.opened
            }
        },
        data() {
            return {
                menues: []
            }
        },
        created() {
            this.initMenue();
        },
        methods: {
            initMenue() {
                // 后台的数据返回后可以这样组装，不用管路由页面，路由该怎么写还是怎么写
                // 这里的对象类似路由，但是不需要component和roles这些东西
                // 后续permission.js中的动态路由也有可能不需要
                this.menues = [
                    {
                        path: '/salesManage',
                        meta: {
                            title: '销售管理',
                            icon: 'lock',
                        },
                        children: [
                            {
                                path: 'baseData',
                                meta: {title: '基础数据'},
                                children: [{
                                    path: 'clientFiles/list',
                                    name: 'clientFilesList',
                                    meta: {
                                        title: '客户档案列表',
                                    }
                                },{
                                    path: 'directive',
                                    name: 'directivePermission',
                                    meta: {
                                        title: '合同管理'
                                    }
                                }]
                            },
                            {
                                path: 'documents',
                                name: 'documents',
                                meta: { title: '单据' },
                                children: [
                                    {
                                        path: 'salesOrder/list',
                                        name: 'salesOrderList',
                                        meta: { title: '销售订单列表' }
                                    },
                                    {
                                        path: 'salesSendOrder/list',
                                        name: 'salesSendOrderList',
                                        meta: { title: '销售发货单列表' }
                                    }
                                ]
                            },
                        ]
                    },
                ]
            }
        }
    }
</script>
