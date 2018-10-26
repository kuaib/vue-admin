<template>
    <div class="dashboard-wrap">
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
        .logo {
            width: 250px;
            margin: 45px auto;
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