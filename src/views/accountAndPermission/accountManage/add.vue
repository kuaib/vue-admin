<template>
    <div class="account-permission-add-wrapper">
        <!--账号信息-->
        <el-card class="card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">账号信息</span>
            </div>
            <el-form :model="myForm" ref="myForm" label-width="80px">
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
                                <el-option v-for="item in accountRoleList" :label="item.dicValue" :value="item.dicKey"
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
                            <el-select v-model="myForm.person" filterable placeholder="请选择关联人员">
                                <el-option v-for="item in personList" :label="item.name" :value="item.name"
                                           :key="item.idCard">
                                    <span style="margin-right: 15px;">{{ item.name }}</span>
                                    <span style="color: #8492a6; font-size: 13px">{{ item.sex }}</span>
                                    <span style="color: #8492a6; font-size: 13px">{{ item.idCard }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>

        <!--个人信息-->
        <el-card class="static-box card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">个人信息</span>
            </div>
            <el-form :model="personForm" label-width="100px">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="姓名：">{{personForm.name}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="性别：">嗷嗷</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="身份证：">嗷嗷</el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="出生年月：">{{personForm.name}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="身高：">嗷嗷</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="体重：">体重</el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="籍贯：">{{personForm.name}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="手机：">嗷嗷</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="个人照片：">
                            <img src="http://photocdn.sohu.com/20111207/Img328215620.jpg" style="width: 150px;">
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>

        <!--业务信息-->
        <el-card class="static-box card-box">
            <div slot="header" class="clearfix">
                <span class="section-title">个人信息</span>
            </div>
            <el-form :model="businessForm" label-width="130px">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="身份：">{{personForm.name}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="运动员级别：">嗷嗷</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="入队时间：">嗷嗷</el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="大项：">{{personForm.name}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="小项：">嗷嗷</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="运动队：">体重</el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="教练员：">{{personForm.name}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="原项目：">嗷嗷</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="原项目训练年限：">嗷嗷</el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>

        <!--保存-->
        <el-row style="text-align: center;">
            <el-button type="primary" round @click="onSubmit" style="padding: 12px 35px;">保存</el-button>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                accountRoleList: [],    // 账号角色列表
                personList: [{name: '张三',idCard: '210229199009082312',sex:'女'},{name: '李四',idCard: '222180199809062356',sex:'男'}], // 关联人员列表
                myForm: {
                    account: '',
                    accountState: '',
                    role: '',
                    phone: '',
                    password: '',
                    person: '',
                },

                personForm: {}, // 个人信息
                businessForm: {} // 业务信息
            }
        },

        methods: {
            // 保存
            onSubmit() {

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
