<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="6">
                <h3 class="leftTitle">选择队伍 Select Team</h3>
                <select-team @getTeamInfo="getTeamInfo"></select-team>
            </el-col>
            <el-col :span="18">
                <div class="clearfix">
                    <div class="tab-item" :class="{'act-tab': activeTab==='injuryTesting'}" @click="changeTab('injuryTesting')">队伍伤病测试 Team Injury Testing</div>
                    <div class="tab-item" :class="{'act-tab': activeTab==='overview'}" @click="changeTab('overview')">队伍信息一览 Team Overview</div>
                </div>
                <div class="main-content">
                    <injury-test v-show="activeTab==='injuryTesting'" :teamRow="teamRow"></injury-test>
                    <overview v-show="activeTab==='overview'" :teamRow="teamRow"></overview>
                </div>

                <!--由于elementui和vue的兼容性暂时不能用-->
                <!--<el-tabs v-model="activeTab" type="card">-->
                    <!--<el-tab-pane label="队伍伤病测试 Team Injury Testing" name="injuryTesting">-->
                        <!--<injury-test :teamRow="teamRow"></injury-test>-->
                    <!--</el-tab-pane>-->
                    <!--<el-tab-pane label="队伍信息一览 Team Overview" name="overview">-->
                        <!--<overview :teamRow="teamRow"></overview>-->
                    <!--</el-tab-pane>-->
                <!--</el-tabs>-->
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import selectTeam from './components/selectTeam'
    import injuryTest from './components/injuryTest'
    import overview from './components/overview'
    export default ({
        name: 'teamOverview',
        components: {
            selectTeam, injuryTest, overview
        },
        data() {
            return {
                activeTab: 'injuryTesting', // 当前显示的tab
                teamRow: null   // 当前选择的队伍信息
            }
        },
        created() {

        },
        methods: {
            // 更改tab页
            changeTab(tabName) {
                this.activeTab = tabName;
            },
            getTeamInfo(teamRow) {
                this.teamRow = teamRow;
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