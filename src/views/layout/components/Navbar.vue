<template>
    <el-menu class="navbar" mode="horizontal">
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <!-- <div class="projectName">奥运备战</div> -->
        <div class="projectName">
            <img src="../../../assets/logo1.jpg" alt="" style="width: 30px">
            <span>奥运备战</span>
        </div>
        <el-row class="right-menu">
            <!--<el-button type="primary" v-if="$route.path.indexOf('/dashboard')!=-1">{{$t('navbar.allAthlete')}}-->
            <!--</el-button>-->
            <!--<el-button type="primary">{{$t('navbar.teamManage')}}</el-button>-->
            <!--<el-button type="primary">{{$t('navbar.enterData')}}</el-button>-->
            <!--<el-button type="primary">{{$t('navbar.test')}}</el-button>-->
            <span class="user">您好：{{user}}</span>
            <el-button type="primary" @click="logout">{{$t('navbar.logOut')}}</el-button>
        </el-row>
    </el-menu>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Hamburger from '@/components/Hamburger'
    import Cookies from 'js-cookie'

    export default {
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
        data() {
            return {
                user: ''
            }
        },
        created() {
            this.user = Cookies.get('userName');
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('toggleSideBar')
            },
            logout() {
                this.$store.dispatch('LogOut').then(() => {
                    location.reload()// In order to re-instantiate the vue-router object to avoid bugs
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        border-radius: 0px !important;
        background: rgb(48, 65, 86);
        padding: 15px 15px 15px 0;
        .user {
            color: #fff;
            margin-right: 15px;
        }
        .hamburger-container {
            line-height: 30px;
            float: left;
            padding: 8px 10px 5px 10px;
        }
        .projectName {
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
    }
</style>
