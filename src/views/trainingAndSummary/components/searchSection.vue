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
                        <el-select v-model="searchForm.project" placeholder="请选择项目">
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
                        <el-select v-model="searchForm.team" placeholder="请选择队伍">
                            <el-option
                                    v-for="item in teamByProList"
                                    :label="item.teamName"
                                    :value="item.teamId"
                                    :key="item.teamId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="search-item">
                <el-col :span="6">
                    <el-form-item prop="coach">
                        <el-select v-model="searchForm.coach" placeholder="请选择教练">
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
                    <el-form-item prop="trainYear">
                        <el-date-picker style="width:100%"
                                v-model="searchForm.trainYear"
                                type="month"
                                value-format="yyyy-MM"
                                @change="changeApplyMonth"
                                placeholder="请选择训练年度">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item prop="name">
                        <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item prop="name">
                        <el-button class="search" type="info" v-waves @click="resetForm('searchForm')">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6" v-if="isSummary&&typeName.indexOf('月')!=-1">
                    <el-form-item prop="summary">
                        <el-select v-model="searchForm.summary" placeholder="是否总结">
                            <el-option label="否" value="0"></el-option>
                            <el-option label="是" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" v-if="isSummary&&typeName==='日计划'">
                    <el-form-item prop="trainDate">
                        <el-date-picker
                                v-model="searchForm.trainDate"
                                type="date"
                                format="MM-dd"
                                value-format="MM-dd"
                                placeholder="请选择日期"
                                :default-value="defaultVal"
                                :picker-options="pickerOptions"
                                :disabled="!searchForm.trainYear">
                        </el-date-picker>
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
                nameLoading: false, // 搜索姓名时候的loading
                nameList: [],  // 姓名列表
                options: [],   // 远程搜索姓名时使用

                searchForm: {
                    id: null,
                    project: null,
                    team: null,
                    coach: null,
                    trainYear: null,  // 训练年度
                    trainDate: null,  // 日期选择
                    summary: null
                },

                defaultVal: null,
                pickerOptions: {
                    disabledDate: (time) => {
                        return (this.defaultVal && new Date(this.defaultVal).getMonth() !== time.getMonth())
                    }
                },
            }
        },

        created() {
            this.getAllList(); // 获取基础下拉
        },

        props: {
            typeName: {  // 引用搜索组件的父组件
                type: String
            },
            isSummary: { // 是否是月训练总结页面
                type: Boolean,
                default: false
            }
        },

        methods: {
            // 搜索
            handleFilter() {
                this.$emit('handleFilter', this.searchForm)
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
            },

            // 改变训练年度
            changeApplyMonth(val){
                val = new Date(val)
                this.defaultVal = val.getFullYear()+"-"+(val.getMonth()+1)+"-"+"1";
            },
        },
        watch: {
            'searchForm.project': function(val) {
                if(val) {
                    this.searchForm.team = null;
                    this.teamByProList = [];
                    this.getTeamByProject(val);
                }
            }
        }

    })
</script>
