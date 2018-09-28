<template>
    <div>
        <el-row :gutter="40">
            <el-col :span="6">
                <h3 class="leftTitle">选择队伍 Select Team</h3>
                <select-team @getTeamInfo="getTeamInfo"></select-team>
            </el-col>
            <el-col :span="18">
                <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
                    <el-tab-pane label="队伍伤病测试 Team Injury Testing" name="injuryTesting">
                        <injury-test :teamRow="teamRow" v-if="teamRow"></injury-test>
                    </el-tab-pane>
                    <el-tab-pane label="队伍信息一览 Team Overview" name="overview">运动员基本信息</el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import selectTeam from './components/selectTeam'
    import injuryTest from './components/injuryTest'
    export default ({
        name: 'teamOverview',
        components: {
            selectTeam, injuryTest
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
            handleClick(tab, event) {
                console.log(tab, event);
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
</style>