<!--创建月计划-->
<template>
    <div class="month-train-plan-add-wrapper">
        <!--基础信息-->
        <el-card class="static-box card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">基础信息</span>
            </div>
            <el-form :model="baseForm" ref="baseForm" label-width="150px">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="项目：">
                            <span>{{baseForm.project}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="教练：">
                            <span>{{baseForm.coach}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="队伍：">
                            <span>{{baseForm.team}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="训练年度：">
                            <span>{{baseForm.trainYear}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="状态：">
                            <span>{{baseForm.status=='1'?'已提交':'未提交'}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>

        <!--训练计划-->
        <el-card class="static-box card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">训练计划</span>
            </div>
            <train-plan ref="trainPlan"></train-plan>
        </el-card>

        <!--比赛计划-->
        <el-card class="static-box card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">比赛计划</span>
            </div>
            <competition-plan ref="competitionPlan"></competition-plan>
        </el-card>

        <!--保存-->
        <el-row style="text-align: center;">
            <el-button type="primary" round @click="onSubmit('baseForm','0')" :loading="btnLoading" style="padding: 12px 35px;">保存草稿</el-button>
            <el-button type="primary" round @click="onSubmit('baseForm','1')" :loading="btnLoading" style="padding: 12px 35px;">提 交</el-button>
        </el-row>
    </div>
</template>

<script>
    import trainPlan from './components/trainPlan'
    import competitionPlan from './components/competitionPlan'
    import {saveMonthTrainPlan} from '@/api/trainingAndSummary'
    export default {
        components: {trainPlan, competitionPlan},
        data() {
            return {
                btnLoading: false,
                baseForm: {
                    project: null,
                    coach: null,
                    team: null,
                    trainYear: null,
                    status: '0',
                }
            }
        },

        methods: {
            // 提交
            onSubmit(formName, types) {
                this.btnLoading = true;
                let trainPlan = this.formatList(this.$refs.trainPlan.list, 'train');
                let matchPlan = this.formatList(this.$refs.competitionPlan.list, 'match');
                saveMonthTrainPlan({
                    projectName: this.baseForm.project,
                    projectId: this.baseForm.project,
                    coachName: this.baseForm.project,
                    coachId: this.baseForm.project,
                    teamId: this.baseForm.project,
                    teamName: this.baseForm.project,
                    trainMonth: this.baseForm.trainYear,
                    status: parseInt(types),
                    trainPlan: trainPlan,
                    matchPlan: matchPlan,
                }).then(res => {
                    if(res.data.code == 200) {
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                        this.cancelAct('save');
                    } else {
                        this.btnLoading = true;
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                }).catch(() => {
                    this.btnLoading = true;
                })
            },

            // 格式化列表（传递给后台需要）
            formatList(list, typeName) {
                let arr = [];
                if(typeName === 'train') {  // 训练计划
                    list.forEach((item, idx) => {
                        let obj = {};
                        obj.serialNumber = idx + 1;
                        obj.shortBoard = item.shortBoard;
                        obj.trainType = item.trainType;
                        obj.trainTypeName = item.trainTypeName;
                        obj.trainPurpose = item.trainPurposeSelected.join();
                        obj.trainContent = item.trainContent;
                        obj.target = item.trainTarget;
                        arr.push(obj);
                    });
                } else {   // 比赛计划
                    list.forEach((item, idx) => {
                        let obj = {};
                        obj.serialNumber = idx + 1;
                        obj.matchName = item.compName;
                        obj.matchDate = item.comDate;
                        obj.matchCountry = item.country;
                        obj.matchCity = item.city;
                        obj.matchProject = item.bigPro;
                        obj.matchSmall = item.smallPro.join();
                        obj.matchAthlete = item.athleteSelected.join();
                        arr.push(obj);
                    });
                }
                return JSON.stringify(arr)
            }
        }
    }
</script>

<style lang="scss">
    .month-train-plan-add-wrapper {
        .card-box {
            margin-bottom: 25px;
        }
    }
</style>