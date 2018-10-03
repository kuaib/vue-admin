<template>
    <div class="dashboard-wrap">
        <el-row :gutter="20">
            <el-col :span="12">
                <h3 class="title">最近活动 Recent Activities</h3>
                <div>活动列表</div>
            </el-col>
            <el-col :span="12">
                <h3 class="title">重要通知 Important Notice</h3>
                <div>重要通知</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default ({
        data() {
            return {

            }
        }
    })
</script>

<style lang="scss">
    .dashboard-wrap {
        h3 {
            margin-bottom: 15px;
            text-align: center;
        }
    }
</style>