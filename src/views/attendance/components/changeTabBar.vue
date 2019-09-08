<template>
    <el-row class="item-tab-section">
        <div>
            <span :class="{'act-item':typeName==='day'}" @click="goNext('day')">每日考勤</span>
            <span :class="{'act-item':typeName==='month'}" @click="goNext('month')">月度考勤统计</span>
        </div>
    </el-row>
</template>

<script>
    export default {
        props: ['typeName'],
        methods: {
            goNext(typeName) {
                if(typeName === 'day') {
                    this.$router.push('/dayAttendance/list')
                } else {

                    this.$router.push('/monthAttendance/list')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .item-tab-section {
        margin-bottom: 20px;
        span {
            display: inline-block;
            font-size: 18px;
            font-weight: 700;
            padding: 0 15px 15px 15px;
            cursor: pointer;
            &:hover {
                color: #66b1ff;
                border-bottom: 2px solid #66b1ff;
            }
        }
        .act-item {
            color: #66b1ff;
            border-bottom: 2px solid #66b1ff;
        }
    }
</style>
