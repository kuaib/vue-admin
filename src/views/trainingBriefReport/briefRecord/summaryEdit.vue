<template>
    <div class="train-brief-plan-edit-wrapper">
        <change-tab-bar :isSummary="isSummary"></change-tab-bar>
        <el-form :model="baseForm" ref="baseForm" :rules="rules" label-width="120px">
            <!--基础信息-->
            <el-card class="static-box card-box">
                <div slot="header" class="clearfix">
                    <span class="section-title">基础信息</span>
                </div>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="项目：" prop="project">
                            <span>{{baseForm.projectName}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="队伍：" prop="team">
                            <span>{{baseForm.teamName}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="主教练：" prop="coach">
                            <span>{{baseForm.coachName}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="联系人：" prop="contacts">
                            <span>{{baseForm.contacts}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系人电话：" prop="contactsPhone">
                            <span>{{baseForm.contactsPhone}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="辅助人员：" prop="assist">
                            <span>{{baseForm.assist}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="运动员：" prop="athlete">
                            <span>{{baseForm.athleteName}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>

            <!--集训详情-->
            <el-card class="static-box card-box">
                <div slot="header" class="clearfix">
                    <span class="section-title">集训详情</span>
                </div>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="地点：" prop="address">
                            <span>{{baseForm.address}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="时间：" prop="trainYear">
                            <span>{{baseForm.trainYear}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="人数：" prop="personNum">
                            <span>{{baseForm.personNum}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col >
                        <el-form-item label="集训内容及训练目的：" prop="contentPurpose"  label-width="180px">
                            <span>{{baseForm.contentPurpose}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col>
                        <el-form-item label="集训成果及经验总结：" prop="resultExperience" label-width="180px">
                            <el-input type="textarea" v-model="baseForm.resultExperience" placeholder="请输入集训成果及经验总结" :autosize="{ minRows: 4, maxRows: 4 }" resize="none"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col>
                        <el-form-item label="集训不足及拟解决方法：" prop="solveMethod" label-width="180px">
                            <el-input type="textarea" v-model="baseForm.solveMethod" placeholder="请输入集训不足及拟解决方法" :autosize="{ minRows: 4, maxRows: 4 }" resize="none"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col>
                        <el-form-item label="运动员伤病及康复情况：" prop="athleteHealth" label-width="180px">
                            <el-input type="textarea" v-model="baseForm.athleteHealth" placeholder="请输入运动员伤病及康复情况" :autosize="{ minRows: 4, maxRows: 4 }" resize="none"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>

            <!--其他内容-->
            <el-card class="static-box card-box">
                <div slot="header" class="clearfix">
                    <span class="section-title">其他内容</span>
                </div>
                <el-row :gutter="20">
                    <el-col >
                        <el-form-item label="其他内容：">
                            <span>{{baseForm.otherContent}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-form-item label="文件上传：">
                        <!--<el-upload-->
                                <!--class="avatar-uploader"-->
                                <!--multiple-->
                                <!--:on-change="changeFile"-->
                                <!--:on-remove="removeFile"-->
                                <!--:file-list="fileList"-->
                                <!--action="api/sports/sports_train_report/uploadFile">-->
                            <!--<el-button size="small" type="primary">点击上传</el-button>-->
                        <!--</el-upload>-->
                        <el-row v-for="item in fileList" :key="item.name">{{item.name}}</el-row>
                    </el-form-item>
                </el-row>
            </el-card>
        </el-form>

        <!--保存-->
        <el-row style="text-align: center;margin-top:15px;" v-if="canOperate">
            <el-button type="primary" round @click="cancelAct" style="padding: 12px 35px;">取消</el-button>
            <el-button type="primary" round @click="onSubmit" :loading="btnLoading" style="padding: 12px 35px;">保 存</el-button>
        </el-row>
        <el-row style="text-align: center;margin-top:15px;" v-else>
            <el-button type="primary" round @click="cancelAct" style="padding: 12px 35px;">关闭</el-button>
        </el-row>
    </div>
</template>

<script>
    import changeTabBar from '../components/changeTabBar'
    import {getTrainInfoByTeamIdAnTrainDate, saveSummary, getReportDetail} from '@/api/trainingBriefReport'
    import mixins from '@/utils/mixins'
    export default {
        components: {changeTabBar},
        mixins: [mixins],
        data() {
            return {
                isSummary: this.$route.path.indexOf('/summary') !== -1, // 是否是集训总结
                id: this.$route.query.id,
                canOperate: this.$route.query.canOperate,
                userInfo: JSON.parse(localStorage.getItem('trainingBriefReport')),
                isFirstReq: false,  // 是否是第一次获取到队伍
                baseForm: {
                    project: null,
                    team: null,
                    coach: null,
                    contacts: null, // 联系人
                    contactsPhone: null,
                    assist: null,    // 辅助人员
                    athlete: [],     // 运动员
                    athleteName: null,     // 运动员名称，逗号隔开
                    trainYear: null,
                    address: null,
                    personNum: null,
                    contentPurpose: null,
                    resultExperience: null,
                    solveMethod: null,
                    athleteHealth: null,
                    otherContent: null,
                },
                rules: {
                    resultExperience: [
                        { required: true, message: '请输入集训成果及经验总结', trigger: 'blur' }
                    ],
                    solveMethod: [
                        { required: true, message: '请输入集训不足及拟解决方法', trigger: 'blur' }
                    ],
                    athleteHealth: [
                        { required: true, message: '请输入运动员伤病及康复情况', trigger: 'blur' }
                    ],
                },
                btnLoading: false,
                fileList: [],
            }
        },

        created() {
            this.getAllList(() => {  // 基础下拉
                this.getDetail();
            });
        },

        methods: {
            // 获取详情
            getDetail() {
                getReportDetail({reportId: this.id}).then(res => {
                    if(res.data.code == 200) {
                        this.isFirstReq = true;
                        let resData = res.data.data;
                        this.baseForm.project = resData.projectId;
                        this.baseForm.projectName = resData.projectName;
                        this.baseForm.team = resData.teamId;
                        this.baseForm.teamName = resData.teamName;
                        this.baseForm.coach = resData.coachId;
                        this.baseForm.coachName = resData.coachName;
                        this.baseForm.contacts = resData.contactsName;
                        this.baseForm.contactsPhone = resData.contactsPhone;
                        this.baseForm.assist = resData.assistName;
                        this.baseForm.athlete = resData.athleteId.split(',');
                        this.baseForm.athleteName = resData.athleteName;
                        this.baseForm.address = resData.address;
                        this.baseForm.trainYear = resData.trainDate.slice(0, 4) + '-' + resData.trainDate.slice(4, 6);
                        this.baseForm.personNum = resData.personNum;
                        this.baseForm.contentPurpose = resData.contentPurpose;
                        this.baseForm.problem = resData.problem;
                        this.baseForm.otherContent = resData.others;
                        this.fileList = resData.fileList;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                })
            },

            // 保存/提交
            onSubmit() {
                this.$refs.baseForm.validate((valid) => {
                    if (valid) {
                        this.btnLoading = true;
                        saveSummary({
                            reportId: this.id,
                            resultExperience: this.baseForm.resultExperience,
                            solveMethod: this.baseForm.solveMethod,
                            athleteHealth: this.baseForm.athleteHealth
                        }).then(res => {
                            this.btnLoading = false;
                            if(res.data.code == 200) {
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                                this.cancelAct('save');
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'warning'
                                })
                            }
                        }).catch(() => {
                            this.btnLoading = false;
                        })
                    }
                })
            },

            // 根据队伍id获取运动员列表
            getAthleteListByTeam() {
                this.getAthleteList((res) => { // 运动员列表
                    if(this.isFirstReq) {
                        this.isFirstReq = false;
                    } else {
                        this.baseForm.personNum = res.length ? res.length : 0;
                        if(res.length && res.length > 0) {
                            this.baseForm.athlete = [];
                            res.forEach(item => {
                                this.baseForm.athlete.push(item.dicKey)
                            })
                        }
                    }
                }, {teamId: this.baseForm.team});
            },

            // 通过训练日期和队伍查询月计划
            getMonthInfo() {
                getTrainInfoByTeamIdAnTrainDate({
                    trainDate: this.baseForm.trainYear,
                    teamId: this.baseForm.team
                }).then(res => {
                    if(res.data.code == 200) {
                        let resData = res.data.data;
                        let trainPlanList = resData.trainPlanList;
                        let matchPlanList = resData.matchPlanList;
                        let sportsTrainMonth = resData.sportsTrainMonth;
                        this.baseForm.contentPurpose = this.getTrainStr(trainPlanList, 'train');
                        this.baseForm.otherContent = this.getTrainStr(matchPlanList, 'match');
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                })
            },

            // 改变队伍 / 训练日期
            changeItem() {
                if(this.baseForm.team && this.baseForm.trainYear) {
                    this.getMonthInfo();
                }
            },

            // 将训练内容格式化成字符串
            getTrainStr(list, typeName) {
                let str = '';
                if(list && list.length > 0) {
                    if(typeName === 'train') {
                        list.forEach((item, idx) => {
                            let index = idx + 1;
                            str += `${index}.训练类型：${item.trainType}；训练内容：${item.trainContent}；训练目的：${item.trainPurpose}；期望目标：${item.target}。\n`
                        })
                    } else {
                        list.forEach((item, idx) => {
                            let index = idx + 1;
                            str += `${index}.比赛日期：${item.matchDate}；比赛名称：${item.matchName}；比赛国家：${item.matchCountry}；比赛城市：${item.matchCity}；比赛大项：${item.matchProjectName}；比赛小项：${item.matchProjectInfo}；参赛运动员：${item.matchAthleteList}。\n`
                        })
                    }
                }
                return str;
            },

            // 文件改变
            changeFile(file, fileList) {
                this.fileList = fileList;
            },
            // 移除文件
            removeFile(file, fileList) {
                this.fileList = fileList;
            },

            // 获取url集合
            getUrlStr(file) {
                let str = '';
                if(file && file.length > 0) {
                    file.forEach(item => {
                        if(item.response) {
                            str += ',' + item.response.data.url
                        } else {
                            str += ',' + item.url
                        }
                    })
                }
                return str.substr(1)
            }
        },

        watch: {
            // 根据队伍获取运动员
            'baseForm.team': function(val) {
                if(val) {
                    this.getAthleteListByTeam();
                }
            },

            // 获取运动员名字字符串
            'baseForm.athlete': function(val) {
                let str = '';
                if(!this.isFirstReq) {
                    this.athleteList.forEach(item => {
                        val.forEach(althId => {
                            if(item.dicKey == althId) {
                                str += ',' + item.dicValue;
                            }
                        })
                    });
                    this.baseForm.athleteName = str.substr(1);
                }
            }
        }
    }
</script>

<style lang="scss">
    .train-brief-plan-edit-wrapper {
        .static-box {
            margin-bottom: 15px;
        }
    }
</style>
