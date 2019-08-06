<!--创建账号-->
<template>
    <div class="account-permission-add-wrapper">
        <!--账号信息-->
        <el-card class="card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">账号信息</span>
            </div>
            <el-form :model="myForm" :rules="myFormRules" ref="myForm" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="账号名" prop="account">
                            <el-input v-model="myForm.account" placeholder="请输入账号名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="账号状态" prop="accountState" placeholder="请选择账号状态">
                            <el-select v-model="myForm.accountState">
                                <el-option label="已激活" value="1"></el-option>
                                <el-option label="未激活" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="账号角色" prop="role" placeholder="请选择账号角色">
                            <el-select v-model="myForm.role">
                                <el-option v-for="item in roleInfoList" :label="item.dicValue" :value="item.dicKey"
                                           :key="item.dicKey"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="电话" prop="phone">
                            <el-input v-model="myForm.phone" placeholder="请输入电话"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="myForm.password" placeholder="请输入密码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="关联人员" prop="person">
                            <el-select
                                    v-model="myForm.person"
                                    filterable
                                    remote
                                    reserve-keyword
                                    placeholder="请选择关联人员"
                                    :remote-method="getPersonName"
                                    :loading="personLoading"
                                    @change="getPersonInfo">
                                <el-option
                                        v-for="item in personList"
                                        :key="item.staffId"
                                        :label="item.staffName"
                                        :value="item.staffId">
                                    <span style="margin-right: 15px;">{{ item.staffName }}</span>
                                    <span style="color: #8492a6; font-size: 13px">{{ item.identity }}</span>
                                    <span style="color: #8492a6; font-size: 13px">{{ item.jobName }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>

        <!--个人和业务信息-->
        <person-info-detail ref="personInfo"></person-info-detail>

        <!--保存-->
        <el-row style="text-align: center;">
            <el-button type="primary" round @click="onSubmit('myForm')" :loading="btnLoading" style="padding: 12px 35px;">保存</el-button>
        </el-row>
    </div>
</template>

<script>
    import mixins from '@/utils/mixins'
    import personInfoDetail from '../components/personInfoDetail'
    import {saveUser, getFullInfo} from '@/api/accountAndPermission'
    export default {
        mixins: [mixins],
        components: {personInfoDetail},
        data() {
            return {
                personLoading: false,
                personList: [], // 关联人员列表
                btnLoading: false,
                myForm: {
                    account: null,
                    accountState: null,
                    role: null,
                    phone: null,
                    password: null,
                    person: null,
                },
                myFormRules: {
                    account: [
                        { required: true, message: '请输入账号名', trigger: 'blur' }
                    ],
                    accountState: [
                        { required: true, message: '请选择账号状态', trigger: 'change' }
                    ],
                    role: [
                        { required: true, message: '请选择角色', trigger: 'change' }
                    ],
                    phone: [
                        { required: true, message: '请输入电话', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                }
            }
        },

        created() {
            this.getAllList()
        },

        methods: {
            // 保存
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.btnLoading = true;
                        saveUser({
                            username: this.myForm.account,
                            telephone: this.myForm.phone,
                            enabled: this.myForm.accountState == '1' ? true : false,
                            password: this.myForm.password,
                            roleId: this.myForm.role,
                            relationStaffId: this.myForm.person,
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

            // 模糊搜索关联人员
            getPersonName(query) {
                if (query !== '') {
                    this.personLoading = true;
                    getFullInfo({staffName: query}).then(res => {
                        if(res.data.code == 200) {
                            this.personLoading = false;
                            this.personList = res.data.data
                            this.personList = res.data.data;
                            this.options = this.personList.filter(item => {
                                return item.staffName.toLowerCase()
                                    .indexOf(query.toLowerCase()) > -1;
                            });
                        } else {

                        }
                    })
                } else {
                    this.options = [];
                }
            },

            // 获取人员详情
            getPersonInfo(id) {
                this.$refs.personInfo.getPersonInfo(id);
            }
        }
    }
</script>

<style lang="scss">
    .account-permission-add-wrapper {
        .card-box {
            margin-bottom: 25px;
            .section-title {
                font-weight: 700;
            }
        }
        .static-box {
            .el-form-item {
                margin-bottom: 0 !important;
            }
        }
    }
</style>
