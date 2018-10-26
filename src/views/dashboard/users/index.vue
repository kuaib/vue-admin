<template>
    <div class="dashboard-wrap">
        <!--<el-row :gutter="20">-->
            <!--<el-col :span="12">-->
                <!--<h3 class="title">最近活动 Recent Activities</h3>-->
                <!--<div>活动列表</div>-->
            <!--</el-col>-->
            <!--<el-col :span="12">-->
                <!--<h3 class="title">重要通知 Important Notice</h3>-->
                <!--<div>重要通知</div>-->
            <!--</el-col>-->
        <!--</el-row>-->
        <el-row>
            <div class="logo">
                <img src="../../../assets/main-logo.png" alt="">
            </div>
            <div class="words">
                <p>增强使命感、责任感、荣誉感</p>
                <p>打造能征善战、作风优良的国家队</p>
            </div>
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
        /*h3 {*/
            /*margin-bottom: 15px;*/
            /*text-align: center;*/
        /*}*/
        .logo {
            width: 250px;
            margin: 30px auto;
            img {
                width: 100%;
            }
        }
        .words p {
            font-size: 24px;
            font-weight: 700;
            text-align: center;
            margin-bottom: 25px;
        }
    }
</style>