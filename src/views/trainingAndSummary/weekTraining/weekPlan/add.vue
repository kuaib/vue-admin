<!--创建周计划-->
<template>
    <div class="week-train-plan-add-wrapper">
        <!--tab切换-->
        <change-tab-bar :isSummary="isSummary" sectionItem="week"></change-tab-bar>

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
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="训练年度：" prop="trainYear">
                            <el-date-picker
                                    v-model="baseForm.trainYear"
                                    type="month"
                                    value-format="yyyy-MM"
                                    placeholder="请选择训练年度"
                                    @change="changeApplyMonth">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="时间范围：" prop="trainDate">
                            <el-date-picker
                                    v-model="baseForm.trainDate"
                                    type="daterange"
                                    format="MM-dd"
                                    value-format="MM-dd"
                                    range-separator="至"
                                    start-placeholder="开始日"
                                    end-placeholder="结束日"
                                    :default-value="defaultVal"
                                    :picker-options="pickerOptions"
                                    @change="changeApplyDate"
                                    :disabled="!baseForm.trainYear">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>

        <!--训练内容-->
        <el-card class="static-box card-box train-content">
            <div slot="header" class="clearfix">
                <span class="section-title">训练内容</span>
            </div>
            <train-content ref="trainContent"></train-content>
        </el-card>

        <!--保存-->
        <el-row style="text-align: center;">
            <el-button type="primary" round @click="onSubmit('baseForm','0')" :loading="btnLoading" style="padding: 12px 35px;">保存草稿</el-button>
            <el-button type="primary" round @click="onSubmit('baseForm','1')" :loading="btnLoading" style="padding: 12px 35px;">提 交</el-button>
        </el-row>
    </div>
</template>

<script>
    import changeTabBar from '../../components/changeTabBar'
    import trainContent from './components/trainContent'
    import {saveMonthTrainPlan} from '@/api/trainingAndSummary'
    import mixins from '@/utils/mixins'
    export default {
        mixins: [mixins],
        components: {changeTabBar, trainContent},
        data() {
            return {
                isSummary: this.$route.path.indexOf('/weekSummary') !== -1,    // 是否是月训练总结(计划与总结页面公用)
                userInfo: JSON.parse(localStorage.getItem('trainAndSumUserWeek')),
                btnLoading: false,
                baseForm: {
                    project: null,
                    coach: null,
                    trainYear: null,
                    trainDate: null,
                },
                rules: {
                    trainYear: [
                        { required: true, message: '请选择训练年度', trigger: 'change' }
                    ],
                },

                defaultVal: '',  // 日期的选择范围
                pickerOptions: {
                    disabledDate: (time) => {
                        return (this.defaultVal && new Date(this.defaultVal).getMonth() !== time.getMonth())
                    }
                },
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
            },

            //修改月份
            changeApplyMonth(val){
                val = new Date(val)
                this.defaultVal = val.getFullYear()+"-"+(val.getMonth()+1)+"-"+"1";
                // this.defaultValYear = val.getFullYear();
                // this.defaultValMon= val.getMonth()+1;
                // console.log(this.defaultVal);
            },
            //修改日期
            changeApplyDate(val){
                // let val0 = new Date(val[0]);
                // let val1 = new Date(val[1]);
                // let startDate = val0.getFullYear() + "-" + (val0.getMonth()+1) + "-" + val0.getDate();
                // console.log(startDate);
                // let endDate = val1.getFullYear() + "-" + (val1.getMonth()+1) + "-" + val1.getDate();
                // console.log(startDate,endDate);
            },


        },
        watch: {
            'baseForm.trainDate': function(val) {
                if(val) {
                    this.$refs.trainContent.getDateComplete(this.baseForm.trainYear, this.baseForm.trainDate);
                }
            }
        }
    }
</script>

<style lang="scss">
    .week-train-plan-add-wrapper {
        .card-box {
            margin-bottom: 25px;
        }

        .el-date-editor--monthrange.el-input, .el-date-editor--monthrange.el-input__inner {
            width: 320px;
        }
        .el-date-editor .el-range-separator {
            padding: 0;
        }
        .train-content .el-card__body {
            padding: 0 5px;
        }
    }
</style>
