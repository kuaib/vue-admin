<!--测评管理--搜索-->
<template>
    <div>
        <!--测评记录的-->
        <el-form :model="searchForm" ref="searchForm" v-if="typeName==='evalManage'">
            <el-row :gutter="20" class="search-item">
                <el-col :span="6">
                    <el-form-item prop="id">
                        <el-input placeholder="请输入测评id" v-model="searchForm.id"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="athlete">
                        <el-select v-model="searchForm.athlete" placeholder="请选择运动员">
                            <el-option
                                    v-for="item in athleteList"
                                    :label="item.dicValue"
                                    :value="item.dicKey"
                                    :key="item.dicKey">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="evaluationType">
                        <el-select v-model="searchForm.evaluationType" placeholder="请选择测评类型">
                            <el-option
                                    v-for="(item,idx) in testTypeList"
                                    :label="item.testType"
                                    :value="item.id"
                                    :key="idx">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="search-item">
                <el-col :span="6">
                    <el-form-item prop="project">
                        <el-select v-model="searchForm.project" placeholder="请选择测评项目">
                            <el-option
                                    v-for="(item,idx) in testProjectList"
                                    :label="item.testType"
                                    :value="item.id"
                                    :key="idx">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="batch">
                        <el-select v-model="searchForm.batch" placeholder="请选择测评批次">
                            <el-option
                                    v-for="item in coachInfoList"
                                    :label="item.dicValue"
                                    :value="item.dicKey"
                                    :key="item.dicKey">
                            </el-option>
                        </el-select>
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
        </el-form>

        <!--队伍分析报告的-->
        <el-form :model="searchForm" ref="searchForm" v-if="typeName==='teamReport'">
            <el-row :gutter="20" class="search-item">
                <el-col :span="6">
                    <el-form-item prop="id">
                        <el-input placeholder="请输入文档id" v-model="searchForm.id"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="fileName">
                        <el-input placeholder="请输入文档名称" v-model="searchForm.fileName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="project">
                        <el-select v-model="searchForm.project" placeholder="请选择测评项目">
                            <el-option
                                    v-for="item in bigProList"
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
                    <el-form-item prop="project">
                        <el-date-picker style="width:100%"
                                v-model="searchForm.uploadDate"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="请选择上传时间">
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
        </el-form>
    </div>
</template>

<script>
    import mixin from '@/utils/mixins'
    import {findStaffName} from '@/api/accountAndPermission'
    import {getTestTypeOrTestProjectList} from '@/api/evaluationManagement'
    export default ({
        mixins: [mixin],
        data() {
            return {
                // nameLoading: false, // 搜索姓名时候的loading
                // nameList: [],  // 姓名列表
                // options: [],   // 远程搜索姓名时使用
                testTypeList: [], //测评类型
                testProjectList: [], //测评项目
                searchForm: {
                    id: null,
                    athlete: null,
                    evaluationType: null,
                    project: null,
                    batch: null,  // 测评批次
                    fileName: null,
                    uploadDate: null
                }
            }
        },

        created() {
            this.getAllList(); // 获取基础下拉
            this.getAthleteList(); // 获取运动员列表
            this.getTypeOrProjectList({dataLevel: '1',queryId: '0' }, 'testTypeList');//测评类型查询
        },

        props: {
            typeName: {  // 引用搜索组件的父组件
                type: String
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

            getTypeOrProjectList(param, typeName) {
                getTestTypeOrTestProjectList({
                    dataLevel: param.dataLevel,
                    queryId: param.queryId
                }).then(res => {
                    if (res.data.code === 200) {
                        const data = res.data.data;
                        this[typeName] = data;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                });
            }
        },

        watch: {
            'searchForm.evaluationType': function (val) {
               if (val) {
                   this.searchForm.project = null;
                   this.getTypeOrProjectList({dataLevel: '2', queryId: val}, 'testProjectList');//测评项目查询
               }
            }

        },
    })
</script>
