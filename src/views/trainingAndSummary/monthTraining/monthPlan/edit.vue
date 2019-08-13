<!--编辑月计划-->
<template>
    <div class="month-train-plan-edit-wrapper">
        <!--tab切换-->
        <change-tab-bar :isSummary="isSummary"></change-tab-bar>

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
                                    type="monthrange"
                                    value-format="yyyy-MM"
                                    range-separator="至"
                                    start-placeholder="训练年度开始年月"
                                    end-placeholder="训练年度结束年月">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :offset="8">
                        <el-form-item label="状态：" v-if="$route.query.status!==undefined">
                            <span>{{status=='1'?'已提交':'未提交'}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" v-if="isSummary">
                    <el-col :span="8">
                        <el-form-item label="月计划id：">
                            <span>{{id}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="创建时间：">
                            <span>{{updatedTime}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>

        <!--训练计划-->
        <el-card class="static-box card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">训练计划{{isSummary?'总结':''}}</span>
            </div>
            <train-plan ref="trainPlan" :isSummary="isSummary"></train-plan>
        </el-card>

        <!--比赛计划-->
        <el-card class="static-box card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">比赛计划{{isSummary?'总结':''}}</span>
            </div>
            <competition-plan ref="competitionPlan" :isSummary="isSummary"></competition-plan>
        </el-card>

        <!--保存-->
        <el-row style="text-align: center;" v-if="status==1&&!isSummary">
            <el-button type="primary" round style="padding: 12px 35px;" @click="cancelAct('save')">关 闭</el-button>
        </el-row>
        <el-row style="text-align: center;"  v-if="status!=1&&!isSummary">
            <el-button type="primary" round @click="onSubmit('baseForm','0')" :loading="btnLoading" style="padding: 12px 35px;">保存草稿</el-button>
            <el-button type="primary" round @click="onSubmit('baseForm','1')" :loading="btnLoading" style="padding: 12px 35px;">提 交</el-button>
        </el-row>
    </div>
</template>

<script>
    import trainPlan from './components/trainPlan'
    import competitionPlan from './components/competitionPlan'
    import changeTabBar from './components/changeTabBar'
    import {saveMonthTrainPlan, getMonthTrainDetail} from '@/api/trainingAndSummary'
    import mixins from '@/utils/mixins'
    export default {
        mixins: [mixins],
        components: {trainPlan, competitionPlan, changeTabBar},
        data() {
            return {
                isSummary: this.$route.path.indexOf('/monthSummary') !== -1,  // 是否是月训练总结(计划与总结页面公用)
                updatedTime: this.$route.query.updatedTime,
                id: this.$route.query.id,
                status: this.$route.query.status,
                btnLoading: false,
                baseForm: {
                    project: null,
                    projectId: null,
                    coach: null,
                    coachId: null,
                    team: null,
                    teamId: null,
                    trainYear: null
                },
                rules: {
                    trainYear: [
                        { required: true, message: '请选择训练年度', trigger: 'change' }
                    ],
                }
            }
        },

        created() {
            this.getDetails();
        },

        methods: {
            // 获取详情
            getDetails() {
                getMonthTrainDetail({trainMonthId: this.id}).then(res => {
                    if(res.data.code == 200) {
                        let resData = res.data.data;
                        let sportsTrainMonth = resData.sportsTrainMonth;
                        this.$refs.trainPlan.list = this.formatListReverse(resData.trainPlanList, 'train');
                        this.$refs.competitionPlan.list = this.formatListReverse(resData.matchPlanList, 'match');

                        this.baseForm.project = sportsTrainMonth.projectName;
                        this.baseForm.projectId = sportsTrainMonth.projectId;
                        this.baseForm.team = sportsTrainMonth.teamName;
                        this.baseForm.teamId = sportsTrainMonth.teamId;
                        this.baseForm.coach = sportsTrainMonth.coachName;
                        this.baseForm.coachId = sportsTrainMonth.coachId;
                        this.baseForm.trainYear = sportsTrainMonth.trainMonth.split(',');
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                })
            },

            // 提交
            onSubmit(formName, types) {
                this.btnLoading = true;
                let trainPlans = this.formatList(this.$refs.trainPlan.list, 'train');
                let matchPlans = this.formatList(this.$refs.competitionPlan.list, 'match');
                saveMonthTrainPlan({
                    trainMonthId: this.id,
                    projectName: this.baseForm.project,
                    projectId: this.baseForm.projectId,
                    coachName: this.baseForm.coach,
                    coachId: this.baseForm.coachId,
                    teamId: this.baseForm.teamId,
                    teamName: this.baseForm.team,
                    trainMonth: this.baseForm.trainYear.join(),
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
                        obj.matchDate = item.compDate;
                        obj.matchCountry = item.country;
                        obj.matchCity = item.city;
                        obj.matchProjetId = item.bigPro;
                        obj.matchProjectInfo = item.smallPro.join();
                        obj.matchAthlete = item.athleteSelected.join();
                        arr.push(obj);
                    });
                }
                return JSON.stringify(arr)
            },

            // 格式化接口返回的数据(渲染需要)
            formatListReverse(list, typeName) {
                let arr = [];
                if(typeName === 'train') {  // 训练计划
                    list.forEach((item, idx) => {
                        let obj = {};
                        obj.shortBoard = item.shortBoard;
                        obj.trainType = item.trainType;
                        obj.trainPurposeSelectedName = item.trainPurpose;
                        obj.trainPurposeSelected = item.trainPurpose.split('、');
                        obj.trainContent = item.trainContent;
                        obj.trainTarget = item.target;

                        // 月总结使用的
                        obj.id = item.id;
                        obj.summary = item.summary;
                        obj.realize = item.realize;
                        obj.realizeDetail = item.realizeDetail;
                        obj.program = item.program;
                        arr.push(obj);
                    });
                } else {   // 比赛计划
                    list.forEach((item, idx) => {
                        let obj = {};
                        obj.compName = item.matchName;
                        obj.compDate = item.matchDate;
                        obj.country = item.matchCountry;
                        obj.city = item.matchCity;
                        obj.bigPro = item.matchProjetId;
                        obj.bigProName = item.matchProjetName;
                        obj.smallPro = item.matchProjectInfo.split(',');
                        obj.athleteSelected = item.matchAthlete.split(',');
                        obj.athleteSelectedName = item.matchAthleteList;

                        // 月总结使用的
                        obj.id = item.id;
                        obj.summary = item.summary;
                        obj.score = item.score;
                        obj.rank = item.rank;
                        arr.push(obj);
                    });
                }
                return arr;
            }
        }
    }
</script>

<style lang="scss">
    .month-train-plan-edit-wrapper {
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
