<template>
    <div>
        <!--账号管理-->
        <el-form :model="accountForm" ref="accountForm" v-if="typeName==='account'">
            <el-row :gutter="20" class="search-item">
                <el-col :span="6">
                    <el-form-item prop="id">
                        <el-input placeholder="请输入账号id" v-model="accountForm.id"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="account">
                        <el-input placeholder="请输入账号" v-model="accountForm.account"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="accountState">
                        <el-select v-model="accountForm.accountState" placeholder="请选择账号状态">
                            <el-option label="已激活" value="1"></el-option>
                            <el-option label="未激活" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="search-item">
                <el-col :span="6">
                    <el-form-item prop="phone">
                        <el-input placeholder="请输入电话" v-model="accountForm.phone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="name">
                        <el-select v-model="accountForm.name" placeholder="请选择姓名">
                            <el-option v-for="item in nameList" :label="item.dicValue" :value="item.dicKey"
                                       :key="item.dicKey"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="role">
                        <el-select v-model="accountForm.role" placeholder="请选择角色">
                            <el-option v-for="item in roleList" :label="item.dicValue" :value="item.dicKey"
                                       :key="item.dicKey"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item prop="name">
                        <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索 Search</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item prop="name">
                        <el-button class="search" type="info" v-waves @click="resetForm('accountForm')">重置 Reset</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <!--人员管理-->
        <el-form :model="personForm" ref="accountForm" v-if="typeName==='person'">
            <el-row :gutter="20" class="search-item">
                <el-col :span="6">
                    <el-form-item prop="id">
                        <el-input placeholder="请输入人员id" v-model="personForm.id"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="idCard">
                        <el-input placeholder="请输入身份证" v-model="personForm.idCard"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="personState">
                        <el-select v-model="personForm.personState" placeholder="请选择人员状态">
                            <el-option label="已激活" value="1"></el-option>
                            <el-option label="未激活" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item prop="name">
                        <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索 Search</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item prop="name">
                        <el-button class="search" type="info" v-waves @click="resetForm('accountForm')">重置 Reset</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="search-item">
                <el-col :span="6">
                    <el-form-item prop="phone">
                        <el-input placeholder="请输入手机" v-model="personForm.phone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="name">
                        <el-select v-model="personForm.name" placeholder="请选择姓名">
                            <el-option v-for="item in nameList" :label="item.dicValue" :value="item.dicKey"
                                       :key="item.dicKey"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="position">
                        <el-select v-model="personForm.position" placeholder="请选择职位">
                            <el-option v-for="item in roleList" :label="item.dicValue" :value="item.dicKey"
                                       :key="item.dicKey"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    import mixin from '@/utils/mixins'
    export default ({
        mixins: [mixin],
        data() {
            return {
                accountStateList: [],  // 账号状态列表
                nameList: [],   // 姓名列表
                roleList: [],  // 角色列表
                yearList: [],   // 年度列表

                // 账号表单
                accountForm: {
                    id: '',
                    account: '',       // 账号
                    accountState: '',  // 账号状态
                    phone: '',         // 电话
                    name: '',          // 姓名
                    role: '',          // 角色
                },

                // 人员表单
                personForm: {
                    id: '',
                    idCard: '',       // 身份证
                    personState: '',  // 人员状态
                    phone: '',         // 电话
                    name: '',          // 姓名
                    position: '',      // 职位
                },
            }
        },

        created() {
            this.getAllList(); // 获取基础下拉
        },

        props: {
            typeName: {  // 引用搜索组件的父组件
                type: String
            }
        },

        methods: {

            // 搜索
            handleFilter() {
                this.$emit('handleFilter', this.accountForm)
            }
        }
    })
</script>
