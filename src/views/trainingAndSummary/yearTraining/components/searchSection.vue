<!--年、月、周训练计划搜索-->
<template>
    <div>
        <el-form :model="searchForm" ref="searchForm">
            <el-row :gutter="20" class="search-item">
                <el-col :span="6">
                    <el-form-item prop="id">
                        <el-input :placeholder="'请输入'+typeName+'id'" v-model="searchForm.id"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="project">
                        <el-select v-model="accountForm.project" placeholder="请选择项目">
                            <el-option
                                    v-for="item in bigProList"
                                    :label="item.dicValue"
                                    :value="item.dicKey"
                                    :key="item.dicKey">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="team">
                        <el-select v-model="accountForm.team" placeholder="请选择队伍">
                            <el-option
                                    v-for="item in teamInfoList"
                                    :label="item.dicValue"
                                    :value="item.dicKey"
                                    :key="item.dicKey">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="search-item">
                <el-col :span="6">
                    <el-form-item prop="coach">
                        <el-select v-model="accountForm.coach" placeholder="请选择教练">
                            <el-option
                                    v-for="item in coachInfoList"
                                    :label="item.dicValue"
                                    :value="item.dicKey"
                                    :key="item.dicKey">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="team">
                        <el-date-picker
                                v-model="accountForm.trainYear"
                                type="year"
                                placeholder="请选择训练年度">
                        </el-date-picker>
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

    </div>
</template>

<script>
    import mixin from '@/utils/mixins'
    import {findStaffName} from '@/api/accountAndPermission'
    export default ({
        mixins: [mixin],
        data() {
            return {
                roleList: [],   // 角色列表
                nameLoading: false, // 搜索姓名时候的loading
                nameList: [],  // 姓名列表
                options: [],   // 远程搜索姓名时使用

                searchForm: {
                    id: null,
                    account: null,       // 账号
                    accountState: null,  // 账号状态
                    phone: null,         // 电话
                    name: null,          // 姓名
                    role: null,          // 角色
                },

                // 人员表单
                personForm: {
                    id: null,
                    idCard: null,       // 身份证
                    personState: null,  // 人员状态
                    phone: null,         // 电话
                    name: null,          // 姓名
                    position: null,      // 职位
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
                let formName;
                if(this.typeName==='account') {
                    formName = 'accountForm';
                } else if(this.typeName==='person') {
                    formName = 'personForm';
                }
                this.$emit('handleFilter', this[formName])
            },

            // 人员管理模糊搜索姓名
            getPersonName(query) {
                if (query !== '') {
                    this.nameLoading = true;
                    findStaffName({staffName: query}).then(res => {
                        if(res.data.code == 200) {
                            this.nameLoading = false;

                            this.nameList = res.data.data.map(item => {
                                return { value: item, label: item };
                            });
                            this.options = this.nameList.filter(item => {
                                return item.label.toLowerCase()
                                    .indexOf(query.toLowerCase()) > -1;
                            });
                        }
                    })


                } else {
                    this.options = [];
                }
            }
        }
    })
</script>
