<!--编辑周计划-->
<template>
    <div class="week-train-plan-edit-wrapper">
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
    import {saveWeekTrainPlan, getWeekTrainDetail} from '@/api/trainingAndSummary'
    import mixins from '@/utils/mixins'
    import {getWeekChange} from '@/utils/index'
    export default {
        mixins: [mixins],
        components: {changeTabBar, trainContent},
        data() {
            return {
                isSummary: this.$route.path.indexOf('/weekSummary') !== -1,    // 是否是日训练总结(计划与总结页面公用)
                id: this.$route.query.id,
                canOperate: this.$route.query.canOperate,
                isInitFinish: false,   // 是否初始化渲染完成（初始化渲染不让watch走，会影响第二次给dateArrList赋值）
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
            this.getDetails();
        },

        methods: {
            // 获取详情
            getDetails() {
                getWeekTrainDetail({trainWeekId: this.id}).then(res => {
                    if(res.data.code == 200) {
                        let resData = res.data.data;
                        this.baseForm.project = resData.projectName;
                        this.baseForm.projectId = resData.projectId;
                        this.baseForm.team = resData.teamName;
                        this.baseForm.teamId = resData.teamId;
                        this.baseForm.coach = resData.coachName;
                        this.baseForm.coachId = resData.coachId;
                        this.baseForm.purpose = resData.purpose,
                        this.baseForm.trainYear = resData.trainDate;
                        this.changeApplyMonth(resData.trainDate);
                        let arrDate = resData.trainDay.split('-');
                        this.baseForm.trainDate = [arrDate[0].slice(0, 2) + '-' + arrDate[0].slice(2), arrDate[1].slice(0, 2) + '-' + arrDate[1].slice(2)];

                        this.$refs.trainContent.dateArrList = this.formatListReverse(resData.sportsTrainDays);
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                    this.isInitFinish = true;
                })
            },


            // 提交
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.btnLoading = true;
                        let sportsTrainDays = this.formatList(this.$refs.trainContent.dateArrList);
                        saveWeekTrainPlan({
                            trainWeekId: this.id,
                            projectName: this.baseForm.projectName,
                            projectId: this.baseForm.projectId,
                            coachName: this.baseForm.staffName,
                            coachId: this.baseForm.staffId,
                            teamId: this.baseForm.teamId,
                            teamName: this.baseForm.teamName,
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

            //  格式化列表（渲染后端数据,前端需要）
            formatListReverse(list) {
                let arr = [];
                list.forEach((item) => {
                    let obj = {};
                    obj.weekDay = item.dayStr + '（周' + getWeekChange(item.whichDay) + '）';
                    obj.trainList = [];
                    item.sportsTrainDayDetails.forEach((dayItem,idx) => {
                        obj.trainList[idx] = {
                            trainType: {},
                            repeatTimes:{},
                            restInterval:{},
                            rhythm:{},
                            actionTimes:{},
                            trainContent:{},
                            trainTime:{},
                            trainDetail:{},
                            trainDuration:{},
                        };
                        obj.trainList[idx].trainType.value = dayItem.trainSubType;
                        obj.trainList[idx].repeatTimes.value = dayItem.actionRepeat;
                        obj.trainList[idx].restInterval.value = dayItem.rest;
                        obj.trainList[idx].rhythm.value = dayItem.rhythm;
                        obj.trainList[idx].actionTimes.value = dayItem.trainAction;
                        obj.trainList[idx].trainContent.value = dayItem.trainContent;
                        obj.trainList[idx].trainTime.value = dayItem.trainDate.split('-');
                        obj.trainList[idx].trainDetail.value = dayItem.trainDetail;
                        obj.trainList[idx].trainDuration.value = dayItem.trainDuration;
                        obj.trainList[idx].typeCode = dayItem.trainType; // 区分专项和体能的
                    });
                    arr.push(obj);
                });
                return arr;
            },

            //修改月份
            changeApplyMonth(val){
                val = new Date(val)
                this.defaultVal = val.getFullYear()+"-"+(val.getMonth()+1)+"-"+"1";
            },
            //修改日期
            changeApplyDate(val){

            },
        },
        watch: {
            'baseForm.trainDate': function(val) {
                if(val) {
                    if(this.isInitFinish) { // 刚进入页面初始化的时候不去触发子组件的渲染
                        this.$refs.trainContent.getDateComplete(this.baseForm.trainYear, this.baseForm.trainDate);
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    .week-train-plan-edit {
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
