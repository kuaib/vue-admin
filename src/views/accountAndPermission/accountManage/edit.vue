<!--编辑账号-->
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
                        <el-form-item label="密码" prop="password" class="password">
                            <el-input v-model="myForm.password" disabled placeholder="请输入密码"></el-input>
                            <i class="el-icon-edit" @click="changePsw"></i>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="关联人员" prop="person">
                            <el-autocomplete style="width:100%"
                                             v-model="myForm.personName"
                                             :fetch-suggestions="getPersonName"
                                             @select="getPersonInfo"
                                             @blur="personBlur"
                                             placeholder="请选择关联人员">
                                <template slot-scope="{ item }">
                                    <span style="margin-right: 15px;">{{ item.value }}</span>
                                    <span style="color: #8492a6; font-size: 13px">{{ item.identity }}</span>
                                    <span style="color: #8492a6; font-size: 13px">{{ item.jobName }}</span>
                                </template>
                            </el-autocomplete>
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

        <!--修改密码-->
        <change-psw :accountId="myForm.accountId" ref="changPsw"></change-psw>
    </div>
</template>

<script>
    import mixins from '@/utils/mixins'
    import personInfoDetail from '../components/personInfoDetail'
    import changePsw from '../components/changePsw'
    import {saveUser, getFullInfo, getUserDetail} from '@/api/accountAndPermission'
    export default {
        mixins: [mixins],
        components: {personInfoDetail, changePsw},
        data() {
            return {
                personLoading: false,
                personList: [], // 关联人员列表
                btnLoading: false,
                myForm: {
                    accountId: this.$route.query.id,
                    account: null,
                    accountState: null,
                    role: null,
                    phone: null,
                    password: '******',
                    personName: null,
                    personId: null
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
            this.getAllList(this.getDetails)
        },

        methods: {
            // 保存
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.btnLoading = true;
                        saveUser({
                            accountId: this.myForm.accountId,
                            username: this.myForm.account,
                            telephone: this.myForm.phone,
                            enabled: this.myForm.accountState == '1' ? true : false,
                            // password: this.myForm.password,  // 编辑暂时不传递
                            roleId: this.myForm.role,
                            relationStaffId: this.myForm.personId,
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
            getPersonName(queryString, cb) {
                getFullInfo({staffName: queryString}).then(res => {
                    if(res.data.code == 200) {
                        let restaurants = res.data.data.map(item => {
                            return {value: item.staffName, id: item.staffId, identity: item.identity, jobName: item.jobName}
                        })

                        let results = queryString ? restaurants .filter((queryString) => {
                            return (state) => {
                                return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                            };
                        }) : restaurants ;
                        cb(results);
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                })
            },

            // 获取人员详情
            getPersonInfo(personItem) {
                // 两个地方需要调用：搜索选择、初始化渲染页面
                if(typeof personItem === 'string') {
                    this.$refs.personInfo.getPersonInfo(personItem);
                } else {
                    this.myForm.personId = personItem.id;
                    this.$refs.personInfo.getPersonInfo(personItem.id);
                }
            },

            // 获取账号详情
            getDetails() {
                getUserDetail({accountId: this.myForm.accountId}).then(res => {
                    if(res.data.code == 200) {
                        let resData = res.data.data.sportsUser;
                        this.myForm.account = resData.username;
                        this.myForm.phone = resData.telephone;
                        this.myForm.accountState = resData.enabled ? '1' : '0';
                        // this.myForm.password = resData.password;
                        this.myForm.role = resData.roleId.toString();
                        this.myForm.person = resData.relationStaffId;

                        if(res.data.data.sportsStaff) {
                            this.personList = [res.data.data.sportsStaff];
                            this.myForm.personId = this.personList[0].staffId;
                            this.myForm.personName = this.personList[0].staffName;
                            this.getPersonInfo(this.myForm.personId);
                        }
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                })
            },

            // 关联人员失去焦点
            personBlur() {
                if(this.myForm.personName && !this.myForm.personId) {
                    this.myForm.personName = null;
                }
            },

            // 修改密码
            changePsw() {
                this.$refs.changPsw.dialogVisible = true;
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
        .password {
            position: relative;
            .el-icon-edit {
                position: absolute;
                right: 0;
                top: 0;
                cursor: pointer;
                width: 30px;
                height: 100%;
                text-align: center;
                line-height: 36px;
            }
        }
    }
</style>
