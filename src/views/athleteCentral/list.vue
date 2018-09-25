<template>
    <div>
        <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
            <el-tab-pane label="选择运动员" name="selectAthlete">
                <select-athlete></select-athlete>
            </el-tab-pane>
            <el-tab-pane label="运动员看板" name="athleteView">运动员看板</el-tab-pane>
            <el-tab-pane label="运动员基本信息" name="athleteBio">运动员基本信息</el-tab-pane>
            <el-tab-pane label="运动员测试" name="athleteTesting">运动员测试</el-tab-pane>
        </el-tabs>
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
                activeTab: 'selectAthlete',

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