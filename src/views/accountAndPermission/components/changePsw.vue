<template>
    <el-dialog
            title="修改密码"
            :visible.sync="dialogVisible"
            width="30%"
            center>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item prop="password">
                <el-input placeholder="请输入密码" :type="passwordType" v-model="ruleForm.password"></el-input>
                <span class="show-pwd" @click="showPwd">
                    <svg-icon v-show="passwordType==='password'" icon-class="eyeclose"/>
                    <svg-icon v-show="!passwordType" icon-class="eye"/>
                </span>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="changePsw('ruleForm')" :loading="btnLoading">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import {changePassword} from '@/api/accountAndPermission'
    export default {
        data() {
            return {
                passwordType: 'password',
                dialogVisible: false,
                btnLoading: false,
                ruleForm: {
                    password: null
                },
                rules: {
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                }
            }
        },
        props: {
            accountId: {
                type: String
            }
        },

        methods: {
            // 确认修改密码
            changePsw(formName) {
                this.btnLoading = true;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        changePassword({
                            accountId: this.accountId,
                            password: this.ruleForm.password
                        }).then(res => {
                            this.btnLoading = false;
                            this.dialogVisible = false;
                            this.ruleForm.password = null;
                            if(res.data.code == 200) {
                                this.$message({
                                    message: '密码修改成功',
                                    type: 'success'
                                });
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
                });
            },

            // 密码可见性切换
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .show-pwd {
        position: absolute;
        right: 10px;
        top: 2px;
        font-size: 16px;
        color: #889aa4;
        cursor: pointer;
        user-select: none;
    }
</style>
