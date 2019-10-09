<template>
    <el-menu class="nav-bar-wrapper" mode="horizontal">
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <div class="projectName">
            <img src="../../../assets/logo1.jpg" alt="">
            <span>奥运备战</span>
        </div>
        <el-row class="right-menu">
            <span style="color: #fff;margin-right: 12px;">您好：{{username}}</span>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                <el-submenu index="1">
                    <template slot="title">系统切换</template>
                    <el-menu-item index="1-1" v-if="username==='admin'" @click="changeSystem('1')">{{sysTemChange}}</el-menu-item>
                    <el-menu-item index="1-2" @click="changeSystem('2')">运动体征监测</el-menu-item>
                </el-submenu>
            </el-menu>

            <!--<el-button type="primary" @click="changeSystem" v-if="username==='admin'">{{sysTemChange}}</el-button>-->
            <el-button type="primary" @click="logout">{{$t('navbar.logOut')}}</el-button>
        </el-row>
    </el-menu>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Hamburger from '@/components/Hamburger'
    import Cookies from 'js-cookie'

    export default {
        // inject: ['reload'],
        data() {
            return {
                username: Cookies.get('userName'),  // 当前的用户名
                systemType: Cookies.get('systemType'), // 1: 老系统  2: 新系统
                sysTemChange: '',  // 系统切换按钮名称

                activeIndex: '1'
            }
        },
        components: {
            Hamburger
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'name',
                'avatar'
            ])
        },
        created() {
            // console.log(Cookies.get('userName'))
            if(this.systemType === '1') {
                this.sysTemChange = '运动训练管理'
            } else if(this.systemType === '2') {
                this.sysTemChange = 'Less损伤评估'
            }
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('toggleSideBar')
            },
            logout() {
                this.$store.dispatch('LogOut').then(() => {
                    location.reload()// In order to re-instantiate the vue-router object to avoid bugs
                })
            },

            // 系统切换
            changeSystem(types) {
                if(types == '1') {
                    let systemType = Cookies.get('systemType');
                    if(systemType === '1') {
                        Cookies.set('systemType', '2');
                    } else if(systemType === '2') {
                        Cookies.set('systemType', '1');
                    }
                    this.$store.dispatch('GetUserMenue').then(() => {
                        this.$store.dispatch('delAllViews');
                        this.$router.push('/');
                        location.reload();
                    })
                } else if(types == '2') {
                    window.open('http://sport.wpzcare.com:8080/medcooper');
                    // window.location.href = 'http://sport.wpzcare.com:8080/medcooper';
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .nav-bar-wrapper {
        border-radius: 0px !important;
        background: rgb(48, 65, 86);
        padding: 15px 15px 15px 0;
        .hamburger-container {
            line-height: 30px;
            float: left;
            padding: 8px 10px 5px 10px;
        }
        .projectName {
            img {
                width: 35px;
                vertical-align: middle;
            }
            float: left;
            font-size: 26px;
            color: #fff;
            line-height: 38px;
        }
        .right-menu {
            float: right;
            &:focus {
                outline: none;
            }
            .right-menu-item {
                display: inline-block;
                margin: 0 8px;
            }
            .avatar-container {
                height: 50px;
                margin-right: 30px;
                .avatar-wrapper {
                    cursor: pointer;
                    margin-top: 5px;
                    position: relative;
                    .user-avatar {
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                    }
                    .el-icon-caret-bottom {
                        position: absolute;
                        right: -20px;
                        top: 25px;
                        font-size: 12px;
                    }
                }
            }
        }

        .el-menu {
            display: inline-block;
            position: relative;
            top: 14px;
            background: transparent;
            .el-submenu__title {
                background: transparent !important;
                color: #fff;
            }
        }
        .el-menu.el-menu--horizontal {
            border-bottom: none;
        }

        .el-menu--horizontal>.el-submenu:focus .el-submenu__title, .el-menu--horizontal>.el-submenu:hover .el-submenu__title {
            color: #fff;
        }
        .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
            border-bottom: none;
            color: #fff !important;
        }
    }
</style>
