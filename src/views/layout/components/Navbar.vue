<template>
  <el-menu class="navbar" mode="horizontal">
      <logo-tip>
          <el-row>
              <!--<el-button type="primary"><router-link to="/">去首页</router-link></el-button>-->
              <el-button type="primary" v-if="$route.path.indexOf('/dashboard')!=-1">{{$t('navbar.allAthlete')}}</el-button>
              <el-button type="primary">{{$t('navbar.ranksManage')}}</el-button>
              <el-button type="primary">{{$t('navbar.enterData')}}</el-button>
              <el-button type="primary">{{$t('navbar.test')}}</el-button>
              <el-button type="primary" @click="logout">{{$t('navbar.logOut')}}</el-button>
          </el-row>
      </logo-tip>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import logoTip from '@/components/logoTip'

export default {
  components: {
      logoTip
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
    created() {
      console.log(this.$route)
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
    .el-row {
        margin-top: 10px;
    }
  .right-menu {
    float: right;
    &:focus{
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
