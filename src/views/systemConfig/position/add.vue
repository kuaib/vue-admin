<!--创建职位-->
<template>
    <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px">
        <el-row class="form-title">职位信息</el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="职位名称：" prop="name">
                    <el-input placeholder="请输入职位名称" v-model="addForm.name"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="职位状态：" prop="positionState">
                    <el-select v-model="addForm.positionState" placeholder="请选择职位状态">
                        <el-option label="已激活" value="1"></el-option>
                        <el-option label="未激活" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="职位级别：" prop="positionLevel">
                    <el-input placeholder="请输入职位级别(仅运动员需要填写)" v-model="addForm.positionLevel"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8" style="text-align:center;">
                <el-button v-waves @click="cancelAct">取 消</el-button>
                <el-button v-waves type="primary" :loading="btnLoading" @click="toSubmit('addForm')">保 存</el-button>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
    import {saveJob} from '@/api/systemConfig'
    import mixins from '@/utils/mixins'
    export default {
        mixins: [mixins],
        data() {
            return {
                btnLoading: false,
                addForm: {
                    name: null,
                    positionState: null,
                    positionLevel: null
                },
                rules: {
                    name: [
                        { required: true, message: '请输入职位名称', trigger: 'blur' }
                    ],
                    positionState: [
                        { required: true, message: '请选择职位状态', trigger: 'change' }
                    ]
                }
            }
        },

        methods: {
            // 创建保存
            toSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.btnLoading = true;
                        saveJob({
                            jobName: this.addForm.name,
                            jobLevel: this.addForm.positionLevel,
                            status: parseInt(this.addForm.positionState),
                            jobId: this.addForm.id,
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
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .form-title {
        font-size: 18px;
        font-weight: 700;
        padding-bottom: 15px;
    }
</style>
