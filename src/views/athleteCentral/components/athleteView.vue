<template>
    <div v-if="athleteRow">
        <el-row class="row-item">
            <div class="img">
                <img :src="'/img/'+ athleteRow.photo" alt="">
            </div>
        </el-row>
        <el-row class="row-item">
            <div class="name">
                <span>{{athleteRow.athleteName}}</span>
                <span>{{athleteRow.enAthleteName}}</span>
            </div>
        </el-row>
        <el-row class="row-item">
            <div class="orgnization">{{athleteRow.teamName}}</div>
        </el-row>
        <el-row class="row-item">
            <div class="team">{{athleteRow.specialName}}</div>
        </el-row>
    </div>
</template>

<script>
    export default ({
        data() {
            return {

            }
        },
        props: ['athleteRow'],
        created() {
            this.initData();
        },
        methods: {
            initData() {

            }
        }
    })
</script>

<style lang="scss" scoped>
    .row-item {
        text-align: center;
        margin-bottom: 20px;
        .img {
            width: 160px;
            margin: 0 auto;
            img {
                width: 100%;
            }
        }
        .name {
            font-weight: 700;
            font-size: 20px;
        }
    }
</style>