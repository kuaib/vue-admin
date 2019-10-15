<!--日总结-->
<template>
    <div class="week-train-plan-edit-wrapper">
        <!--tab切换-->
        <change-tab-bar :isSummary="true" sectionItem="week"></change-tab-bar>

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
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="训练年度：" prop="trainYear">
                            <span>{{baseForm.trainYear}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="本周训练目标：" prop="purpose">
                            <span>{{baseForm.purpose}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="视频上传：" prop="purpose">
                            <el-upload
                                    class="avatar-uploader"
                                    action="sports/sports_train_day/uploadVideo"
                                    :limit=limit
                                    :on-success="uploadSuccess"
                                    :on-remove="removeFile"
                                    :file-list="fileList"
                            >
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
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

        <!--总结内容-->
        <el-card class="static-box card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">总结内容</span>
            </div>
            <summary-content ref="summaryContent"></summary-content>
        </el-card>

        <!--保存-->
        <el-row style="text-align: center;margin-top:15px;">
            <el-button type="primary" round @click="cancelAct" style="padding: 12px 35px;">取消</el-button>
            <el-button type="primary" round @click="onSubmit('baseForm')" :loading="btnLoading" style="padding: 12px 35px;">保 存</el-button>
        </el-row>
    </div>
</template>

<script>
    import changeTabBar from '../../components/changeTabBar'
    import trainContent from './components/trainContent'
    import summaryContent from './components/summaryContent'
    import {saveDaySummary, getDayTrainDetail} from '@/api/trainingAndSummary'
    import mixins from '@/utils/mixins'
    import {getWeekChange} from '@/utils/index'
    export default {
        mixins: [mixins],
        components: {changeTabBar, trainContent, summaryContent},
        data() {
            return {
                limit: 1,  // 文件上传的个数限制
                fileList: [],

                id: this.$route.query.id,
                canOperate: this.$route.query.canOperate,
                videoUrl: null,
                btnLoading: false,
                baseForm: {
                    project: null,
                    coach: null,
                    trainYear: null,
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
                getDayTrainDetail({trainDayId: this.id}).then(res => {
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
                        this.videoUrl = resData.video;
                        this.fileList = resData.fileList;
                        // this.changeApplyMonth(resData.trainDate);

                        this.$refs.trainContent.listSpecial = this.formatListReverse(resData.special);
                        this.$refs.trainContent.listBody = this.formatListReverse(resData.stamina);
                        this.$refs.summaryContent.remarkList = resData.remark ? resData.remark : [];
                        this.$refs.summaryContent.baseForm.bestAthlete = resData.bestAthlete;
                        this.$refs.summaryContent.baseForm.summary = resData.summary;
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
                        saveDaySummary({
                            trainDayId: this.id,
                            bestAthlete: this.$refs.summaryContent.baseForm.bestAthlete,
                            summary: this.$refs.summaryContent.baseForm.summary,
                            remark: this.$refs.summaryContent.remarkList,
                            video: this.videoUrl
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
                    obj.dayStr = item.trainDate.split('-').join('');
                    obj.whichDay = getWeekChange(item.weekDay);
                    item.trainList.forEach((dayItem,idx) => {
                        obj.sportsTrainDayDetails[idx] = {};
                        obj.sportsTrainDayDetails[idx].trainSubTypeId = dayItem.trainType;
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
                        obj.sportsTrainDayDetails[idx].trainType = dayItem.typeCode; // 区分专项和体能的
                    });
                    arr.push(obj);
                });
                return arr;
            },

            //  格式化列表（渲染后端数据,前端需要）
            formatListReverse(list) {
                let arr = [];
                list.forEach((dayItem) => {
                    let tempObj = {}
                    tempObj.trainType = dayItem.trainSubTypeId;
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
                    tempObj.typeCode = dayItem.trainType; // 区分专项和体能的
                    arr.push(tempObj);
                });
                return arr;
            },

            //修改月份
            changeApplyMonth(val){
                val = new Date(val)
                this.defaultVal = val.getFullYear()+"-"+(val.getMonth()+1)+"-"+"1";
            },

            // 上传成功回调函数
            uploadSuccess(res) {
                if(res.code == 200) {
                    this.videoUrl = res.data.videoUrl;
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                }
            },

            // 删除文件
            removeFile(file, fileList) {
                this.videoUrl = null;
            }
        },
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
