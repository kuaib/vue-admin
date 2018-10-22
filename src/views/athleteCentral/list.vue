<template>
    <div>
        <el-row :gutter="15">
            <el-col :span="6">
                <h3 class="leftTitle">选择运动员 Select Athlete</h3>
                <select-athlete></select-athlete>
            </el-col>
            <el-col :span="18">
                <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
                    <el-tab-pane label="运动员看板 Athlete View" name="athleteView">
                        <athlete-view></athlete-view>
                    </el-tab-pane>
                    <el-tab-pane label="运动员基本信息 Athlete Bio" name="athleteBio">
                        <athlete-bio></athlete-bio>
                    </el-tab-pane>
                    <el-tab-pane label="运动员测试 Athlete Testing" name="athleteTesting">
                        <athleth-test></athleth-test>
                    </el-tab-pane>
                </el-tabs>
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
            handleClick(tab, event) {
                // console.log(tab, event);
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