<!--创建大项-->
<template>
        <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px">
            <el-row class="form-title">大项信息</el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="大项名称：" prop="name">
                        <el-input placeholder="请输入大项名称" v-model="addForm.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="大项状态：" prop="bigProjectState">
                        <el-select v-model="addForm.bigProjectState" placeholder="请选择大项状态">
                            <el-option label="已激活" value="1"></el-option>
                            <el-option label="未激活" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="关联小项：" prop="smallPro">
                        <el-select
                                v-model="addForm.smallPro"
                                multiple
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请输入关联小项">
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8" style="text-align:center;">
                    <el-button v-waves @click="cancelAct()">取 消</el-button>
                    <el-button v-waves type="primary" :loading="btnLoading" @click="toSubmit('addForm')">保 存</el-button>
                </el-col>
            </el-row>
        </el-form>
</template>

<script>
    import {saveProject} from '@/api/systemConfig'
    import mixins from '@/utils/mixins'
    export default {
        mixins: [mixins],
        data() {
            return {
                btnLoading: false,
                addForm: {
                    name: null,
                    bigProjectState: null,
                    smallPro: []
                },
                rules: {
                    name: [
                        { required: true, message: '请输入大项名称', trigger: 'blur' }
                    ],
                    bigProjectState: [
                        { required: true, message: '请选择大项状态', trigger: 'change' }
                    ],
                    smallPro: [
                        { required: true, message: '请输入关联小项', trigger: 'change' }
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
                        saveProject({
                            projectName: this.addForm.name,
                            status: this.addForm.bigProjectState,
                            childProject: this.addForm.smallPro.join(),
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
        },
        watch: {
            'addForm.smallPro': function(val) {
                console.log(val)
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
