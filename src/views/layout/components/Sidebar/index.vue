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
            return {}
        }
    }
</script>
