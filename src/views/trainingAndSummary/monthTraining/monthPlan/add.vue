<!--创建月计划-->
<template>
    <div class="month-train-plan-add-wrapper">
        <!--tab切换-->
        <change-tab-bar :isSummary="isSummary" sectionItem="month"></change-tab-bar>

        <!--基础信息-->
        <el-card class="static-box card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">基础信息</span>
            </div>
            <el-form :model="baseForm" ref="baseForm" :rules="rules" label-width="150px">
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
                        <el-form-item label="训练年度：" prop="trainYear">
                            <el-date-picker
                                    v-model="baseForm.trainYear"
                                    type="month"
                                    value-format="yyyy-MM"
                                    placeholder="请选择训练年度">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :offset="6">
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
    import changeTabBar from '../../components/changeTabBar'
    import {saveMonthTrainPlan} from '@/api/trainingAndSummary'
    import mixins from '@/utils/mixins'
    export default {
        mixins: [mixins],
        components: {trainPlan, competitionPlan, changeTabBar},
        data() {
            return {
                isSummary: this.$route.path.indexOf('/monthSummary') !== -1,    // 是否是月训练总结(计划与总结页面公用)
                userInfo: JSON.parse(localStorage.getItem('trainAndSumUserMonth')),
                btnLoading: false,
                baseForm: {
                    project: null,
                    coach: null,
                    team: null,
                    trainYear: null,
                    status: '0',
                },
                rules: {
                    trainYear: [
                        { required: true, message: '请选择训练年度', trigger: 'change' }
                    ],
                }
            }
        },

        created() {
            this.baseForm.project = this.userInfo.projectName;
            this.baseForm.team = this.userInfo.teamName;
            this.baseForm.coach = this.userInfo.staffName;
        },

        methods: {
            // 提交
            onSubmit(formName, types) {
                this.btnLoading = true;
                let trainPlans = this.formatList(this.$refs.trainPlan.list, 'train');
                let matchPlans = this.formatList(this.$refs.competitionPlan.list, 'match');
                saveMonthTrainPlan({
                    projectName: this.userInfo.projectName,
                    coachName: this.userInfo.staffName,
                    coachId: this.userInfo.staffId,
                    teamId: this.userInfo.teamId,
                    teamName: this.userInfo.teamName,
                    trainMonth: this.baseForm.trainYear,
                    status: parseInt(types),
                    trainPlans: trainPlans,
                    matchPlans: matchPlans,
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
                        obj.shortBoard = item.shortBoard;
                        obj.trainType = item.trainType;
                        // obj.trainPurpose = item.trainPurposeSelected.join(); // 后续是字典项的时候使用
                        obj.trainPurpose = item.trainPurposeSelectedName;
                        obj.trainContent = item.trainContent;
                        obj.target = item.trainTarget;
                        arr.push(obj);
                    });
                } else {   // 比赛计划
                    list.forEach((item, idx) => {
                        let obj = {};
                        obj.matchName = item.compName;
                        obj.matchDate = item.comDate;
                        obj.matchCountry = item.country;
                        obj.matchCity = item.city;
                        obj.matchProjetId = item.bigPro;
                        obj.matchProjectInfo = item.smallPro.join();
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

        .el-date-editor--monthrange.el-input, .el-date-editor--monthrange.el-input__inner {
            width: 320px;
        }
        .el-date-editor .el-range-separator {
            padding: 0;
        }
    }
</style>
