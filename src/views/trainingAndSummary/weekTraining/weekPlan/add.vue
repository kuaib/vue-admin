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
                <el-row :gutter="20">
                    <el-col>
                        <el-form-item label="本周训练目标：" prop="purpose">
                            <el-input type="textarea" v-model="baseForm.purpose" placeholder="本周训练目标"></el-input>
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
        <el-row style="text-align: center;margin-top:15px;">
            <el-button type="primary" round @click="cancelAct" style="padding: 12px 35px;">取消</el-button>
            <el-button type="primary" round @click="onSubmit('baseForm')" :loading="btnLoading" style="padding: 12px 35px;">提 交</el-button>
        </el-row>
    </div>
</template>

<script>
    import changeTabBar from '../../components/changeTabBar'
    import trainContent from './components/trainContent'
    import {saveWeekTrainPlan} from '@/api/trainingAndSummary'
    import mixins from '@/utils/mixins'
    import {getWeekChange} from '@/utils/index'
    export default {
        mixins: [mixins],
        components: {changeTabBar, trainContent},
        data() {
            return {
                isSummary: this.$route.path.indexOf('/weekSummary') !== -1,    // 是否是日训练总结(计划与总结页面公用)
                userInfo: JSON.parse(localStorage.getItem('trainAndSumUserWeek')),
                btnLoading: false,
                baseForm: {
                    project: null,
                    coach: null,
                    trainYear: null,
                    trainDate: null,
                    purpose: null
                },
                rules: {
                    trainYear: [
                        { required: true, message: '请选择训练年度', trigger: 'change' }
                    ],
                    trainDate: [
                        { required: true, message: '请选择时间范围', trigger: 'change' }
                    ]
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
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.btnLoading = true;
                        let sportsTrainDays = this.formatList(this.$refs.trainContent.dateArrList);
                        saveWeekTrainPlan({
                            projectName: this.userInfo.projectName,
                            projectId: this.userInfo.projectId,
                            coachName: this.userInfo.staffName,
                            coachId: this.userInfo.staffId,
                            teamId: this.userInfo.teamId,
                            teamName: this.userInfo.teamName,
                            trainDate: this.baseForm.trainYear,
                            purpose: this.baseForm.purpose,
                            trainDay: this.baseForm.trainDate[0].split('-').join('') + '-' + this.baseForm.trainDate[1].split('-').join(''),
                            sportsTrainDays: sportsTrainDays
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
                    }
                })
            },

            // 格式化列表（传递给后台需要）
            formatList(list) {
                let arr = [];
                list.forEach((item) => {
                    let obj = {}; obj.sportsTrainDayDetails = [];
                    obj.dayStr = item.weekDay.substr(0, 4);
                    obj.whichDay = getWeekChange(item.weekDay.substr(item.weekDay.length - 2, 1));
                    item.trainList.forEach((dayItem,idx) => {
                        obj.sportsTrainDayDetails[idx] = {};
                        obj.sportsTrainDayDetails[idx].trainSubType = dayItem.trainType && dayItem.trainType.value;
                        obj.sportsTrainDayDetails[idx].actionRepeat = dayItem.repeatTimes && dayItem.repeatTimes.value;
                        obj.sportsTrainDayDetails[idx].rest = dayItem.restInterval && dayItem.restInterval.value;
                        obj.sportsTrainDayDetails[idx].rhythm = dayItem.rhythm && dayItem.rhythm.value;
                        obj.sportsTrainDayDetails[idx].trainAction = dayItem.actionTimes && dayItem.actionTimes.value;
                        obj.sportsTrainDayDetails[idx].trainContent = dayItem.trainContent && dayItem.trainContent.value;
                        obj.sportsTrainDayDetails[idx].trainDate = dayItem.trainTime && (dayItem.trainTime.value[0] + '-' + dayItem.trainTime.value[1]);
                        obj.sportsTrainDayDetails[idx].trainDetail = dayItem.trainDetail && dayItem.trainDetail.value;
                        obj.sportsTrainDayDetails[idx].trainDuration = dayItem.trainDuration && dayItem.trainDuration.value;
                        obj.sportsTrainDayDetails[idx].trainType = dayItem.typeCode; // 区分专项和体能的
                    });
                    arr.push(obj);
                });
                return arr;
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
