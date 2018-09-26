<template>
    <div>
        <el-row :gutter="40">
            <el-col :span="6">
                <h3 class="leftTitle">选择运动员 Select Athlete</h3>
                <select-athlete></select-athlete>
            </el-col>
            <el-col :span="18">
                <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
                    <el-tab-pane label="运动员看板 Athlete View" name="athleteView">运动员看板</el-tab-pane>
                    <el-tab-pane label="运动员基本信息 Athlete Bio" name="athleteBio">运动员基本信息</el-tab-pane>
                    <el-tab-pane label="运动员测试 Athlete Testing" name="athleteTesting">运动员测试</el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import selectAthlete from './components/selectAthlete'
    export default ({
        name: 'athleteCentral',
        components: {
            selectAthlete
        },
        data() {
            return {
                activeTab: 'athleteView',
            }
        },
        created() {

        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
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