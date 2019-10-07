<template>
    <div class="train-brief-plan-add-wrapper">
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
                            <el-select v-model="baseForm.project" filterable placeholder="请选择项目">
                                <el-option
                                        v-for="(item,idx) in bigProList"
                                        :key="idx"
                                        :label="item.dicValue"
                                        :value="item.dicKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="队伍：" prop="team">
                            <el-select v-model="baseForm.team" filterable placeholder="请选择队伍" @change="changeItem">
                                <el-option
                                    v-for="item in teamByProList"
                                    :label="item.teamName"
                                    :value="item.teamId"
                                    :key="item.teamId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="主教练：" prop="coach">
                            <el-select v-model="baseForm.coach" filterable placeholder="请选择主教练">
                                <el-option
                                        v-for="(item,idx) in coachInfoList"
                                        :key="idx"
                                        :label="item.dicValue"
                                        :value="item.dicKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="联系人：" prop="contacts">
                            <el-input v-model="baseForm.contacts" placeholder="请输入联系人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系人电话：" prop="contactsPhone">
                            <el-input v-model="baseForm.contactsPhone" placeholder="请输入联系人电话"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="辅助人员：" prop="assist">
                            <el-input v-model="baseForm.assist" placeholder="请输入辅助人员"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="运动员：" prop="athlete">
                                <el-select v-model="baseForm.athlete" multiple placeholder="请选择运动员">
                                    <el-option
                                            v-for="(item,idx) in athleteList"
                                            :key="idx"
                                            :label="item.dicValue"
                                            :value="item.dicKey">
                                    </el-option>
                                </el-select>
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
                            <el-input v-model="baseForm.address" placeholder="请输入地点"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="时间：" prop="trainYear">
                            <el-date-picker
                                    @change="changeItem"
                                    v-model="baseForm.trainYear"
                                    type="month"
                                    value-format="yyyy-MM"
                                    placeholder="请选择时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="人数：" prop="personNum">
                            <el-input v-model="baseForm.personNum" placeholder="请输入地点"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col >
                        <el-form-item label="集训内容及训练目的：" prop="contentPurpose"  label-width="180px">
                            <el-input type="textarea" v-model="baseForm.contentPurpose" placeholder="请输入集训内容及训练目的" :autosize="{ minRows: 4, maxRows: 4 }" resize="none"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                        <el-col>
                            <el-form-item label="需要解决的问题：" prop="problem" label-width="180px">
                                <el-input type="textarea" v-model="baseForm.problem" placeholder="请输入需要解决的问题" :autosize="{ minRows: 4, maxRows: 4 }" resize="none"></el-input>
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
                            <el-input type="textarea" v-model="baseForm.otherContent" placeholder="请输入其他内容" :autosize="{ minRows: 4, maxRows: 4 }" resize="none"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-form-item label="文件上传：">
                        <el-upload
                                class="avatar-uploader"
                                multiple
                                :on-change="changeFile"
                                :file-list="fileList"
                                action="sports/sports_train_report/uploadFile">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                </el-row>
            </el-card>
        </el-form>

        <!--保存-->
        <el-row style="text-align: center;margin-top:15px;">
            <el-button type="primary" round @click="cancelAct" style="padding: 12px 35px;">取消</el-button>
            <el-button type="primary" round @click="onSubmit(0)" :loading="btnLoading1" style="padding: 12px 35px;">保存草稿</el-button>
            <el-button type="primary" round @click="onSubmit(1)" :loading="btnLoading2" style="padding: 12px 35px;">提交中心</el-button>
        </el-row>
    </div>
</template>

<script>
    import changeTabBar from '../components/changeTabBar'
    import {getTrainInfoByTeamIdAnTrainDate, saveReport, saveSummary} from '@/api/trainingBriefReport'
    import mixins from '@/utils/mixins'
    export default {
        components: {changeTabBar},
        mixins: [mixins],
        data() {
            return {
                isSummary: this.$route.path.indexOf('/summary') !== -1, // 是否是集训总结
                userInfo: JSON.parse(localStorage.getItem('trainingBriefReport')),
                firstReq: true,
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
                    problem: null,
                    otherContent: null,
                },
                rules: {
                    project: [
                        { required: true, message: '请选择项目', trigger: 'change' }
                    ],
                    team: [
                        { required: true, message: '请选择队伍', trigger: 'change' }
                    ],
                    coach: [
                        { required: true, message: '请选择主教练', trigger: 'change' }
                    ],
                    contacts: [
                        { required: true, message: '请输入联系人', trigger: 'blur' }
                    ],
                    contactsPhone: [
                        { required: true, message: '请输入联系电话', trigger: 'blur' }
                    ],
                    athlete: [
                        { required: true, message: '请选择运动员', trigger: 'change' }
                    ],
                    assist: [
                        { required: true, message: '请输入辅助人员', trigger: 'blur' }
                    ],
                    trainYear: [
                        { required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    address: [
                        { required: true, message: '请输入地点', trigger: 'blur' }
                    ],
                    personNum: [
                        { required: true, message: '请输入人数', trigger: 'blur' }
                    ],
                    contentPurpose: [
                        { required: true, message: '请输入集训内容及训练目的', trigger: 'blur' }
                    ],
                    problem: [
                        { required: true, message: '请输入需要解决的问题', trigger: 'blur' }
                    ],
                },
                btnLoading1: false,
                btnLoading2: false,
                fileList: [],
                fileUrl: []
            }
        },

        created() {
            this.getAllList(() => {  // 基础下拉
                this.baseForm.project = this.userInfo.projectId;
                this.baseForm.projectName = this.userInfo.projectName;
                this.baseForm.team = parseInt(this.userInfo.teamId);
                this.baseForm.teamName = this.userInfo.teamName;
                this.baseForm.coach = this.userInfo.staffId.toString();
                this.baseForm.coachName = this.userInfo.staffName;
            });
        },

        methods: {
            // 保存/提交
            onSubmit(types) {
                this.$refs.baseForm.validate((valid) => {
                    if (valid) {
                        if(types == 0) {
                            this.btnLoading1 = true;
                        } else {
                            this.btnLoading2 = true;
                        }
                        saveReport({
                            address: this.baseForm.address,
                            assistName: this.baseForm.assist,
                            athleteId: this.baseForm.athlete.join(','),
                            athleteName: this.baseForm.athleteName,
                            coachId: this.baseForm.coach,
                            coachName: this.baseForm.coachName,
                            contactsName: this.baseForm.contacts,
                            contactsPhone: this.baseForm.contactsPhone,
                            contentPurpose: this.baseForm.contentPurpose,
                            files: this.getUrlStr(this.fileUrl),
                            personNum: parseInt(this.baseForm.personNum),
                            problem:this.baseForm.problem,
                            projectId:this.baseForm.project,
                            projectName:this.baseForm.projectName,
                            teamId:this.baseForm.team,
                            teamName:this.baseForm.teamName,
                            trainDate:this.baseForm.trainYear.split('-').join(''),
                            others: this.baseForm.otherContent,
                            reportStatus: types,  // 0: 保存草稿  1: 提交
                        }).then(res => {
                            this.btnLoading1 = false;
                            this.btnLoading2 = false;
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
                            this.btnLoading1 = false;
                            this.btnLoading2 = false;
                        })
                    }
                })
            },

            // 根据队伍id获取运动员列表
            getAthleteListByTeam() {
                this.getAthleteList((res) => { // 运动员列表
                    this.baseForm.personNum = res.length ? res.length : 0;
                    if(res.length && res.length > 0) {
                        this.baseForm.athlete = [];
                        res.forEach(item => {
                            this.baseForm.athlete.push(item.dicKey)
                        })
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
                this.fileUrl = fileList;
            },

            // 获取url集合
            getUrlStr(file) {
                console.log(file)
                let str = '';
                if(file && file.length > 0) {
                    file.forEach(item => {
                        str += ',' + item.response.data.url
                    })
                }
                return str.substr(1)
            }
        },
        watch: {
            'baseForm.project': function(val) {
                if(val) {
                    if(this.firstReq) {
                        this.firstReq = false;
                    } else {
                        this.baseForm.team = null;
                    }
                    this.teamByProList = [];
                    this.getTeamByProject(val);
                }
            },
            // 根据队伍获取运动员
            'baseForm.team': function(val) {
                if(val) {
                    this.getAthleteListByTeam();
                }
            },

            // 获取运动员名字字符串
            'baseForm.athlete': function(val) {
                let str = '';
                this.athleteList.forEach(item => {
                    val.forEach(althId => {
                        if(item.dicKey == althId) {
                            str += ',' + item.dicValue;
                        }
                    })
                })
                this.baseForm.athleteName = str.substr(1);
            }
        }
    }
</script>

<style lang="scss">
    .train-brief-plan-add-wrapper {
        .static-box {
            margin-bottom: 15px;
        }
    }
</style>
