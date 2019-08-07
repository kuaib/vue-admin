<template>
    <div class="year-train-edit-wrapper">
        <!--基础信息-->
        <el-card class="static-box card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">基础信息</span>
            </div>
            <el-form :model="baseForm" ref="baseForm" label-width="150px" :rules="baseFormRule">
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
                                        v-for="item in teamInfoList"
                                        :key="item.dicKey"
                                        :label="item.dicValue"
                                        :value="item.dicKey">
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
                                    type="monthrange"
                                    value-format="yyyy-MM"
                                    range-separator="至"
                                    start-placeholder="开始年月"
                                    end-placeholder="结束年月">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>

        <!--保存-->
        <el-row style="text-align: center;">
            <el-button type="primary" round @click="onSubmit('baseForm')" :loading="btnLoading" style="padding: 12px 35px;">保存</el-button>
        </el-row>
    </div>
</template>

<script>
    import mixins from '@/utils/mixins'
    import {saveYearTrain} from '@/api/trainingAndSummary'
    export default {
        mixins: [mixins],
        data() {
            return {
                value1: '',
                btnLoading: false,
                baseForm: {
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
            this.getAllList();
        },

        methods: {
            // 提交
            onSubmit(formName) {
                console.log(this.baseForm)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.btnLoading = true;
                        saveYearTrain({
                            trainId: null,
                            trainYear: this.baseForm.trainYear[0] + ',' + this.baseForm.trainYear[1],
                            teamId: this.baseForm.team,
                            projectId: this.baseForm.bigPro,
                            leaderId: this.baseForm.leader,
                            coachId: this.baseForm.leader,
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
            }
        }
    }
</script>

<style lang="scss">
    .year-train-edit-wrapper {
        .el-date-editor .el-range-separator {
            padding: 0 !important;
        }
    }
</style>