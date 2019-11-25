<!--运动队看板-->
<template>
    <div class="kanban-wrapper">
        <!--搜索-->
        <searchSection typeName="team" @getAllData="getAllData"></searchSection>

        <el-row class="all-info" v-show="allData.team">
            <!--运动队信息-->
            <el-collapse v-model="activeNames">
                <el-collapse-item :title="allData.team&&allData.team.teamName+'的运动队信息'" name="1" style="margin-bottom: 0">
                    <team :teamForm="allData.team" :list="allData.athlete"></team>
                </el-collapse-item>
            </el-collapse>

            <!--本月/本周训练最多-->
            <!--<most-train></most-train>-->

            <!--最近年训练计划-->
            <el-collapse v-model="activeNames">
                <el-collapse-item title="最近年训练计划" name="2">
                    <train-year :list="allData.year"></train-year>
                </el-collapse-item>
            </el-collapse>

            <!--最近月训练计划/总结-->
            <el-collapse v-model="activeNames">
                <el-collapse-item name="3">
                    <template slot="title">
                        <span class="des-title" :class="{titleAct:!monthFlag}" @click.prevent.stop="monthFlag=false">最近月训练计划</span>
                        <span class="des-title" :class="{titleAct:monthFlag}" @click.prevent.stop="monthFlag=true">最近月训练计划总结</span>
                    </template>
                    <train-month :isSummary="monthFlag" :list="allData.month"></train-month>
                </el-collapse-item>
            </el-collapse>

            <!--最近周训练计划/总结-->
            <el-collapse v-model="activeNames">
                <el-collapse-item name="4">
                    <template slot="title">
                        <span class="des-title" :class="{titleAct:!weekFlag}" @click.prevent.stop="weekFlag=false">最近周训练计划</span>
                        <span class="des-title" :class="{titleAct:weekFlag}" @click.prevent.stop="weekFlag=true">最近周训练计划总结</span>
                    </template>
                    <train-week :isSummary="weekFlag" :list="allData.week"></train-week>
                </el-collapse-item>
            </el-collapse>

            <!--全部比赛情况-->
            <el-collapse v-model="activeNames">
                <el-collapse-item title="全部比赛情况" name="5">
                    <all-match :list="allData.match"></all-match>
                </el-collapse-item>
            </el-collapse>
        </el-row>
    </div>
</template>

<script>
    import mixins from '@/utils/mixins'
    import searchSection from '../components/searchSection'
    import team from './components/team'
    import mostTrain from '../components/mostTrain'
    import trainYear from '../components/trainYear'
    import trainMonth from '../components/trainMonth'
    import trainWeek from '../components/trainWeek'
    import allMatch from '../components/allMatch'
    import {getTeamData} from '@/api/kanbanOfData'
    export default {
        mixins: [mixins],
        components: {searchSection, team, mostTrain, trainYear, trainMonth, trainWeek, allMatch},
        data() {
            return {
                athleteId: '',  // 运动员id
                teamId: '',     // 队伍id
                allData: {},    // 所有的数据
                activeNames: ['1', '2', '3', '4', '5'],
                monthFlag: false,  // 是否是月训练总结
                weekFlag: false,   // 是否是周训练总结
            }
        },

        methods: {
            // 获取看板数据
            getAllData(obj) {
                this.athleteId = obj.athleteId;
                this.teamId = obj.teamId;
                getTeamData({teamId: this.teamId}).then(res => {
                    if(res.data.code == 200) {
                        this.allData = res.data.data;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .kanban-wrapper {
        .el-collapse-item__header {
            font-weight: 700;
            font-size: 18px;
            border-bottom: 1px solid #EBEEF5
        }
        .sub-title {
            font-weight: 700;
            font-size: 15px;
            padding-left: 5px;
            border-left: 2px solid #000;
            margin: 15px 0;
            line-height: 1;
        }
        .all-info {
            .el-form-item {
                margin-bottom: 0;
            }
        }
        .el-collapse {
            margin-bottom: 15px;
        }
        .el-collapse-item__wrap {
            border-bottom: 0;
            margin-top: 15px;
        }
        .des-title {
            margin-right: 20px;
        }
        .titleAct {
            color: #409EFF;
        }
    }
</style>
