<!--编辑年计划-->
<template>
    <div class="year-train-edit-wrapper">
        <!--基础信息-->
        <el-card class="static-box card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">基础信息</span>
            </div>
            <el-form :model="baseForm" ref="baseForm" label-width="150px" :rules="baseFormRule">
                <el-row :gutter="20" v-if="baseForm.trainId&&baseForm.status">
                    <el-col :span="8">
                        <el-form-item label="计划id：">
                            <span>{{baseForm.trainId}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8"></el-col>
                    <el-col :span="8">
                        <el-form-item label="计划状态：">
                            <span>{{baseForm.status=='1'?'已提交':'未提交'}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="项目：" prop="bigPro">
                            <el-select v-model="baseForm.bigPro" filterable placeholder="请选择项目">
                                <el-option
                                        v-for="item in bigProList"
                                        :key="item.dicKey"
                                        :label="item.dicValue"
                                        :value="item.dicKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="组别：" prop="team">
                            <el-select v-model="baseForm.team" filterable placeholder="请选择组别">
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
                        <el-form-item label="教练：" prop="coach">
                            <el-select v-model="baseForm.coach" filterable placeholder="请选择教练">
                                <el-option
                                        v-for="item in coachInfoList"
                                        :key="item.dicKey"
                                        :label="item.dicValue"
                                        :value="item.dicKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="项目负责人(领队)：" prop="leader">
                            <el-select v-model="baseForm.leader" filterable placeholder="请选择项目负责人">
                                <el-option
                                        v-for="item in leaderInfoList"
                                        :key="item.dicKey"
                                        :label="item.dicValue"
                                        :value="item.dicKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="训练年度：" prop="trainYear">
                            <el-date-picker
                                    v-model="baseForm.trainYear"
                                    type="month"
                                    value-format="yyyy-MM"
                                    placeholder="训练年度">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>

        <!--行程详情-->
        <el-card class="static-box card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">行程详情</span>
            </div>
            <trip-detail @validateBaseForm="validateBaseForm" ref="tripDetail"></trip-detail>
        </el-card>

        <!--保存-->
        <el-row style="text-align: center;" v-if="baseForm.status==1">
            <el-button type="primary" round style="padding: 12px 35px;" @click="cancelAct('save')">关 闭</el-button>
        </el-row>
        <el-row style="text-align: center;" v-else>
            <el-button type="primary" round @click="onSubmit('baseForm','0')" :loading="btnLoading" style="padding: 12px 35px;">保存草稿</el-button>
            <el-button type="primary" round @click="onSubmit('baseForm','1')" :loading="btnLoading" style="padding: 12px 35px;">提 交</el-button>
        </el-row>
    </div>
</template>

<script>
    import tripDetail from  './components/tripDetail'
    import mixins from '@/utils/mixins'
    import {saveYearTrain, getYearDetail} from '@/api/trainingAndSummary'
    export default {
        components: {tripDetail},
        mixins: [mixins],
        data() {
            return {
                btnLoading: false,
                idDetail: true,  // 是否是详情接口渲染
                baseForm: {
                    trainId: this.$route.query.id,
                    status: this.$route.query.status, // 提交还是未提交
                    bigPro: null,
                    team: null,
                    coach: null,
                    leader: null,
                    trainYear: null,
                },
                baseFormRule: {
                    bigPro: [
                        { required: true, message: '请选择项目', trigger: 'change' }
                    ],
                    team: [
                        { required: true, message: '请选择组别', trigger: 'change' }
                    ],
                    coach: [
                        { required: true, message: '请选择教练', trigger: 'change' }
                    ],
                    leader: [
                        { required: true, message: '请选择项目负责人', trigger: 'change' }
                    ],
                    trainYear: [
                        { required: true, message: '请选择训练年度', trigger: 'change' }
                    ],
                }
            }
        },

        created() {
            this.getAllList(this.getDetails);
        },

        methods: {
            // 获取年训练详情
            getDetails() {
                getYearDetail({trainId: this.baseForm.trainId}).then(res => {
                    if(res.data.code == 200) {
                        let resData = res.data.data;
                        this.baseForm.bigPro = resData.projectId;
                        this.baseForm.team = parseInt(resData.teamId);
                        this.baseForm.coach = resData.coachId;
                        this.baseForm.leader = resData.leaderId;
                        this.baseForm.trainYear = resData.trainYear;
                        this.$refs.tripDetail.list = this.formateListReverse(resData.detailList);
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
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.btnLoading = true;
                        let detail = this.formateList(this.$refs.tripDetail.list);
                        saveYearTrain({
                            trainId: this.baseForm.trainId,
                            trainYear: this.baseForm.trainYear,
                            teamId: this.baseForm.team,
                            projectId: this.baseForm.bigPro,
                            leaderId: this.baseForm.leader,
                            coachId: this.baseForm.coach,
                            status: parseInt(types),
                            detail: detail
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

            // 增加行程先判断主表单是否已填写
            validateBaseForm(rowIdx) {
                this.$refs.baseForm.validate((valid) => {
                    if (valid) {
                        this.$refs.tripDetail.dialogVisible = true;
                        // 通过编辑进入dialog
                        if(typeof rowIdx === 'number') {
                            this.$refs.tripDetail.getTripDetail(rowIdx);
                        }
                    }
                })
            },

            // 格式化行程列表(传递给后台)
            formateList(list) {
                let arr = [];
                list.forEach((item, idx) => {
                    let obj = {};
                    obj.journeyName = '行程' + (idx + 1);
                    obj.trainType = parseInt(item.trainType);
                    obj.startDate = item.startDate;
                    obj.endDate = item.endDate;
                    obj.country = item.country;
                    obj.city = item.city;
                    obj.coachId = item.coach;
                    obj.coachName = item.coachName;
                    obj.trainPurpose = item.trainTarget;
                    obj.trainContent = item.trainContent;
                    arr.push(obj);
                });
                return JSON.stringify(arr)
            },

            // 格式化行程列表(渲染前台)
            formateListReverse(list) {
                let arr = [];
                list.forEach(item => {
                    let obj = {};
                    obj.trainType = item.trainType.toString();
                    obj.startDate = item.startDate;
                    obj.endDate = item.endDate;
                    obj.country = item.country;
                    obj.city = item.city;
                    obj.coach = item.coachId;
                    obj.coachName = item.coachName;
                    obj.trainTarget = item.trainPurpose;
                    obj.trainContent = item.trainContent;
                    arr.push(obj);
                });
                return arr;
            }
        },
         watch: {
            'baseForm.bigPro': function(val) {
                if(val) {
                    if(this.idDetail) {
                        this.idDetail = false;
                    } else {
                        this.baseForm.team = null;
                    }
                    this.teamByProList = [];
                    this.getTeamByProject(val, () => {

                    });
                }
            }
        }
    }
</script>

<style lang="scss">
    .year-train-edit-wrapper {
        .el-date-editor .el-range-separator {
            padding: 0 !important;
        }
        .card-box {
            margin-bottom: 25px;
        }
    }
</style>