<!--训练总结-->
<template>
    <el-dialog
            :show-close="false"
            title="训练计划总结"
            :visible.sync="dialogVisible"
            width="60%"
            center>
        <el-row>
            <div class="section-title">训练计划总结</div>
            <el-form :model="baseForm" label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="训练类型：" prop="trainType">
                            <span>{{baseForm.trainType}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="训练内容：" prop="trainContent">
                            <span>{{baseForm.trainContent}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <!--<el-col :span="12">-->
                    <!--<el-form-item label="训练内容" prop="trainContent">-->
                    <!--<span>{{baseForm.trainContent}}</span>-->
                    <!--</el-form-item>-->
                    <!--</el-col>-->
                    <el-col :span="12">
                        <el-form-item label="短板：" prop="shortBoard">
                            <span>{{baseForm.shortBoard}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="训练目的：" prop="trainPurposeSelectedName">
                            <span>{{baseForm.trainPurposeSelectedName}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="期望目标：" prop="trainTarget">
                            <span>{{baseForm.trainTarget}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>

        <el-row>
            <div class="section-title">总结内容</div>
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="是否实现目标" prop="realize">
                            <el-select v-model="addForm.realize" placeholder="请选择是否实现目标">
                                <el-option label="未实现" value="0"></el-option>
                                <el-option label="已实现" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="目标实现情况" prop="realizeDetail">
                            <el-input type="textarea" v-model="addForm.realizeDetail" placeholder="请输入目标实现情况"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="后续方案" prop="program">
                            <el-input type="textarea" v-model="addForm.program" placeholder="请输入后续方案"></el-input>
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
                    realize: null,
                    realizeDetail: null,
                    program: null
                },
                rules: {
                    realize: [
                        { required: true, message: '请选择是否实现目标', trigger: 'change' }
                    ],
                    realizeDetail: [
                        { required: true, message: '请输入目标实现情况', trigger: 'blur' }
                    ],
                    program: [
                        { required: true, message: '请输入后续方案', trigger: 'blur' }
                    ],
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
                            realize: parseInt(this.addForm.realize),
                            realizeDetail: this.addForm.realizeDetail,
                            program: this.addForm.program,
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