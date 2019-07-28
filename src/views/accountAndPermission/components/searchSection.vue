<template>
    <el-form :model="searchForm" ref="searchForm">
        <el-row :gutter="20" class="search-item">
            <el-col :span="6">
                <el-form-item prop="id">
                    <el-input placeholder="请输入账号ID" v-model="searchForm.id"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item prop="account">
                    <el-input placeholder="请输入账号" v-model="searchForm.account"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item prop="accountState">
                    <el-select v-model="searchForm.accountState" placeholder="请选择账号状态">
                        <el-option v-for="item in accountStateList" :label="item.dicValue" :value="item.dicKey"
                                   :key="item.dicKey"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="search-item">
            <el-col :span="6">
                <el-form-item prop="phone">
                    <el-input placeholder="请输入电话" v-model="searchForm.phone"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item prop="name">
                    <el-select v-model="searchForm.name" placeholder="请选择姓名">
                        <el-option v-for="item in nameList" :label="item.dicValue" :value="item.dicKey"
                                   :key="item.dicKey"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item prop="role">
                    <el-select v-model="searchForm.role" placeholder="请选择角色">
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
                    <el-button class="search" type="info" v-waves @click="resetForm('searchForm')">重置 Reset</el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
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
                searchForm: {
                    id: '',
                    account: '',       // 账号
                    accountState: '',  // 账号状态
                    phone: '',         // 电话
                    role: '',          // 角色
                },
            }
        },

        methods: {

            // 搜索
            handleFilter() {
                this.$emit('handleFilter', this.searchForm)
            }
        }
    })
</script>
