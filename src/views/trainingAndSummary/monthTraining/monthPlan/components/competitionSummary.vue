<!--比赛总结-->
<template>
    <el-dialog
            :show-close="false"
            title="比赛计划总结"
            :visible.sync="dialogVisible"
            width="60%"
            center>
        <el-row>
            <div class="section-title">比赛计划总结</div>
            <el-form :model="baseForm" label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="比赛名称：" prop="compName">
                            <span>{{baseForm.compName}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="比赛日期：" prop="compDate">
                            <span>{{baseForm.compDate}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="比赛国家：" prop="country">
                            <span>{{baseForm.country}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="比赛城市：" prop="city">
                            <span>{{baseForm.city}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="比赛大项：" prop="bigProName">
                            <span>{{baseForm.bigProName}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="比赛小项：" prop="smallPro">
                            <span>{{baseForm.smallPro&&baseForm.smallPro.join()}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="参赛运动员：" prop="athleteSelectedName">
                            <span>{{baseForm.athleteSelectedName}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>

        <el-row>
            <div class="section-title">总结内容</div>
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="获取成绩" prop="score">
                            <el-input type="textarea" v-model="addForm.score" placeholder="请输入获取成绩"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="获取名次" prop="rank">
                            <el-input type="textarea" v-model="addForm.rank" placeholder="请输入获取名次"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>
        <span slot="footer" class="dialog-footer" v-if="baseForm.summary==0">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" :loading="btnLoading" @click="onSubmit('addForm')">提 交</el-button>
            </span>
        <span slot="footer" class="dialog-footer" v-else>
                <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
            </span>
    </el-dialog>
</template>

<script>
    import {saveMonthSummary} from '@/api/trainingAndSummary'
    export default {
        inject: ['reload'],
        data() {
            return {
                dialogVisible: false,
                btnLoading: false,
                baseForm: {},
                addForm: {
                    score: null,
                    rank: null
                },
                rules: {
                    score: [
                        { required: true, message: '请输入获取成绩', trigger: 'blur' }
                    ],
                    rank: [
                        { required: true, message: '请输入获取名次', trigger: 'blur' }
                    ]
                }
            }
        },

        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.btnLoading = true;
                        saveMonthSummary({
                            id: this.baseForm.id,
                            score: this.addForm.score,
                            rank: this.addForm.rank,
                        }).then(res => {
                            this.btnLoading = false;
                            if(res.data.code == 200) {
                                this.dialogVisible = false;
                                this.reload();
                            } else {
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
            }
        },

        watch: {
            'baseForm.realizeDetail': function(val) {
                if(val) {
                    this.addForm.realize = this.baseForm.realize.toString();
                    this.addForm.realizeDetail = this.baseForm.realizeDetail;
                    this.addForm.program = this.baseForm.program;
                }
            }
        }
    }
</script>

<style scoped>
    .section-title {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 15px;
    }
</style>