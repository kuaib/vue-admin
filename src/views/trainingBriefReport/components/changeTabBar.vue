<template>
    <el-row class="item-tab-section">
        <div>
            <span :class="{'act-item':!isSummary}" @click="goNext('plan')">集训计划</span>
            <span :class="{'act-item':isSummary}" @click="goNext('summary')">训练小结</span>
        </div>
    </el-row>
</template>

<script>
    export default {
        props: ['isSummary'],
        methods: {
            goNext(types) {
                if(types === 'plan') {
                    this.$router.push('/briefRecord/plan/list')
                } else if(types === 'summary') {
                    this.$router.push('/briefRecord/summary/list')
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
