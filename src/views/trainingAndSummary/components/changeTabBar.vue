<template>
    <el-row class="item-tab-section">
        <div v-if="sectionItem==='month'">
            <span :class="{'act-item':!isSummary}" @click="goNext('train')">月训练计划</span>
            <span :class="{'act-item':isSummary}" @click="goNext('summary')">月训练总结</span>
        </div>
        <div v-if="sectionItem==='week'">
            <span :class="{'act-item':!isSummary}" @click="goNext('train')">周训练计划</span>
            <span :class="{'act-item':isSummary}" @click="goNext('summary')">日训练总结</span>
        </div>
    </el-row>
</template>

<script>
    export default {
        props: ['isSummary', 'sectionItem'],
        methods: {
            goNext(types) {
                if(this.sectionItem === 'month') {
                    if(types === 'train' && this.isSummary) {
                        this.$router.push('/monthTraining/monthPlan/list')
                    } else if(types === 'summary' && !this.isSummary) {
                        this.$router.push('/monthTraining/monthSummary/list')
                    }
                } else if(this.sectionItem === 'week') {
                    if(types === 'train' && this.isSummary) {
                        this.$router.push('/weekTraining/weekPlan/list')
                    } else if(types === 'summary' && !this.isSummary) {
                        this.$router.push('/weekTraining/weekSummary/list')
                    }
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