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
                            <!--<el-date-picker-->
                                    <!--v-model="baseForm.trainYear"-->
                                    <!--type="month"-->
                                    <!--value-format="yyyy-MM"-->
                                    <!--placeholder="请选择训练年度"-->
                                    <!--@change="changeApplyMonth">-->
                            <!--</el-date-picker>-->
                            <el-date-picker
                                    v-model="baseForm.trainYear"
                                    type="week"
                                    format="yyyy-MM"
                                    value-format="yyyy-MM-dd"
                                    placeholder="请选择训练年度">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="周一至周五：" prop="trainDay">
                            <el-input v-model="baseForm.trainDay" readonly></el-input>
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
            <train-content ref="trainContent" :canOperate="canOperate"></train-content>
        </el-card>

        <!--保存-->
        <el-row style="text-align: center;margin-top:15px;" v-if="canOperate=='true'">
            <el-button type="primary" round @click="cancelAct" style="padding: 12px 35px;">取消</el-button>
            <el-button type="primary" round @click="onSubmit('baseForm')" :loading="btnLoading" style="padding: 12px 35px;">提 交</el-button>
        </el-row>
        <el-row style="text-align: center;margin-top:15px;" v-else>
            <el-button type="primary" round @click="cancelAct('save')" style="padding: 12px 35px;">关闭</el-button>
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
                canOperate: this.$route.query.canOperate.toString(),
                btnLoading: false,
                baseForm: {
                    project: null,
                    coach: null,
                    trainYear: null,
                    trainDay: null,
                    purpose: null
                },
                rules: {
                    trainYear: [
                        { required: true, message: '请选择训练年度', trigger: 'change' }
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
                        this.baseForm.purpose = resData.purpose;
                        this.baseForm.trainYear = resData.trainDate;
                        this.baseForm.trainDay = resData.trainDay;
                        this.changeApplyMonth(resData.trainDate);

                        this.$refs.trainContent.dateArrList = this.formatListReverse(resData.sportsTrainDays);
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
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
                            trainDay: this.baseForm.trainDay,
                            purpose: this.baseForm.purpose,
                            sportsTrainDays: sportsTrainDays
                        }).then(res => {
                            if(res.data.code == 200) {
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                                this.cancelAct('save');
                            } else {
                                this.btnLoading = false;
                                this.$message({
                                    message: res.data.msg,
                                    type: 'warning'
                                });
                            }
                        }).catch(() => {
                            this.btnLoading = false;
                        })
                    }
                })
            },

            // 格式化列表（传递给后台需要）
            formatList(list) {
                let arr = [];
                list.forEach((item) => {
                    let obj = {}; obj.sportsTrainDayDetails = [];
                    obj.trainDayId = item.trainDayId;
                    obj.dayStr = item.trainDate.split('-').join('');
                    obj.whichDay = getWeekChange(item.weekDay);
                    item.trainList.forEach((dayItem,idx) => {
                        obj.sportsTrainDayDetails[idx] = {};
                        obj.sportsTrainDayDetails[idx].trainSubTypeId = dayItem.trainType.join();
                        obj.sportsTrainDayDetails[idx].trainSubType = dayItem.trainTypeName;
                        obj.sportsTrainDayDetails[idx].actionRepeat = dayItem.repeatTimes;
                        obj.sportsTrainDayDetails[idx].rest = dayItem.restInterval;
                        obj.sportsTrainDayDetails[idx].rhythm = dayItem.rhythm;
                        obj.sportsTrainDayDetails[idx].trainAction = dayItem.actionTimes;
                        obj.sportsTrainDayDetails[idx].trainContentId = dayItem.trainContent;
                        obj.sportsTrainDayDetails[idx].trainContent = dayItem.trainContentName;
                        obj.sportsTrainDayDetails[idx].trainDate = dayItem.trainTime[0] + '-' + dayItem.trainTime[1];
                        obj.sportsTrainDayDetails[idx].trainDetailId = dayItem.trainDetail;
                        obj.sportsTrainDayDetails[idx].trainDetail = dayItem.trainDetailName;
                        obj.sportsTrainDayDetails[idx].trainDuration = dayItem.trainDuration;
                        obj.sportsTrainDayDetails[idx].trainDayId = dayItem.trainDayId;
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
                    obj.trainDayId = item.trainDayId;
                    obj.trainDate = item.dayStr.substring(0, 4) + '-' + item.dayStr.substring(4, 6) + '-' + item.dayStr.substring(6, 8);
                    obj.weekDay = getWeekChange(item.whichDay);
                    obj.trainList = [];
                    item.sportsTrainDayDetails.forEach((dayItem,idx) => {
                        let tempObj = {};
                        let trainTypeId = dayItem.trainSubTypeId.split(',');
                        trainTypeId = trainTypeId.map(item => {
                            return parseInt(item)
                        });
                        tempObj.trainType = trainTypeId;
                        tempObj.trainTypeName = dayItem.trainSubType;
                        tempObj.repeatTimes = dayItem.actionRepeat;
                        tempObj.restInterval = dayItem.rest;
                        tempObj.rhythm = dayItem.rhythm;
                        tempObj.actionTimes = dayItem.trainAction;
                        tempObj.trainContent = dayItem.trainContentId;
                        tempObj.trainContentName = dayItem.trainContent;
                        tempObj.trainTime = dayItem.trainDate.split('-');
                        tempObj.trainDetail = dayItem.trainDetailId;
                        tempObj.trainDetailName = dayItem.trainDetail;
                        tempObj.trainDuration = dayItem.trainDuration;
                        tempObj.trainDayId = dayItem.trainDayId;
                        tempObj.typeCode = dayItem.trainType; // 区分专项和体能的
                        obj.trainList.push(tempObj);
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
        },
        watch: {
            'baseForm.trainYear': function(val) {
                // 组件返回的都是周一的时间
                console.log(val);
                let arr = val.split("-");
                let date = new Date(arr[0], arr[1] - 1, arr[2]);
                let dateOfWeek = date.getDay();//返回当前日期的在当前周的某一天（0～6--周日到周一）
                let dateOfWeekInt = parseInt(dateOfWeek, 10);//转换为整型

                let aa = 7 - dateOfWeekInt;//当前于周末相差的天数
                let temp2 = parseInt(arr[2], 10);//按10进制转换，以免遇到08和09的时候转换成0
                let sunDay = temp2 + aa;//当前日期的周日的日期
                let monDay = sunDay - 6;//当前日期的周一的日期
                let startDate = new Date(arr[0], arr[1] - 1, monDay);
                let endDate = new Date(arr[0], arr[1] - 1, sunDay);
                let sm = parseInt(startDate.getMonth()) + 1;//月份+1 因为月份从0开始
                let em = parseInt(endDate.getMonth()) + 1;
                let start = startDate.getFullYear() + "-" + sm + "-" + startDate.getDate();
                let end = endDate.getFullYear() + "-" + em + "-" + endDate.getDate();
                this.baseForm.trainDay = start.substring(5, start.length) + '至' + end.substring(5, end.length);
                console.log(this.baseForm.trainDay)
            }
        }
    }
</script>

<style lang="scss">
    .week-train-plan-edit-wrapper {
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
