<template>
    <div>
        <el-row :gutter="15">
            <el-col :span="6">
                <h3 class="leftTitle">选择运动员 Select Athlete</h3>
                <select-athlete></select-athlete>
            </el-col>
            <el-col :span="18">
                <div class="clearfix">
                    <div class="tab-item" :class="{'act-tab': activeTab==='athleteView'}" @click="changeTab('athleteView')">运动员看板 Athlete View</div>
                    <div class="tab-item" :class="{'act-tab': activeTab==='athleteBio'}" @click="changeTab('athleteBio')">运动员基本信息 Athlete Bio</div>
                    <div class="tab-item" :class="{'act-tab': activeTab==='athleteTesting'}" @click="changeTab('athleteTesting')">运动员测试 Athlete Testing</div>
                </div>
                <div class="main-content">
                    <athlete-view v-show="activeTab==='athleteView'"></athlete-view>
                    <athlete-bio v-show="activeTab==='athleteBio'"></athlete-bio>
                    <athleth-test v-show="activeTab==='athleteTesting'"></athleth-test>
                </div>


                <!--由于elementui和vue的兼容性暂时不能用-->
                <!--<el-tabs v-model="activeTab" type="card" @tab-click="handleClick">-->
                    <!--<el-tab-pane label="运动员看板 Athlete View" name="athleteView">-->
                        <!--<athlete-view></athlete-view>-->
                    <!--</el-tab-pane>-->
                    <!--<el-tab-pane label="运动员基本信息 Athlete Bio" name="athleteBio">-->
                        <!--<athlete-bio></athlete-bio>-->
                    <!--</el-tab-pane>-->
                    <!--<el-tab-pane label="运动员测试 Athlete Testing" name="athleteTesting">-->
                        <!--<athleth-test></athleth-test>-->
                    <!--</el-tab-pane>-->
                <!--</el-tabs>-->
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import selectAthlete from './components/selectAthlete'
    import athleteView from './components/athleteView'
    import athleteBio from './components/athleteBio'
    import athlethTest from './components/athlethTest'
    export default ({
        name: 'athleteCentral',
        components: {
            selectAthlete, athleteView, athleteBio, athlethTest
        },
        data() {
            return {
                activeTab: 'athleteView'
            }
        },
        methods: {
            // 更改tab页
            changeTab(tabName) {
                this.activeTab = tabName;
            }
        }
    })
</script>
<style lang="scss" scoped>
    .leftTitle {
        text-align: center;
        margin-bottom: 15px;
    }
    .tab-item {
        float: left;
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        font-weight: 500;
        box-sizing: border-box;
        cursor: pointer;
        border: 1px solid #E4E7ED;
        border-right: 0;
        &:nth-child(1) {
             border-top-left-radius: 3px;
        }
        &:nth-child(3) {
            border-top-right-radius: 3px;
             border-right: 1px solid #E4E7ED;
        }
        &:hover {
              color: #409EFF;
         }
    }
    .act-tab {
        color: #409EFF;
        border-bottom: 0;
    }
    .main-content {
        margin-top: 15px;
    }
</style>