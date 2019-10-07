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
                    <el-form-item prop="testBatch">
                        <el-form-item prop="id">
                            <el-input placeholder="请输入测评批次" v-model="searchForm.testBatch"></el-input>
                        </el-form-item>
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
            </el-row>
            <el-row :gutter="20" class="search-item">
                <el-col :span="9">
                    <el-form-item prop="project">
                        <el-date-picker
                                v-model="searchForm.uploadDate"
                                type="datetimerange"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                range-separator="至"
                                start-placeholder="上传开始时间"
                                end-placeholder="上传截止时间">
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
    import {getTestTypeOrTestProjectList} from '@/api/evaluationManagement'
    export default ({
        mixins: [mixin],
        data() {
            return {
                testTypeList: [],    //测评类型
                testProjectList: [], //测评项目
                searchForm: {
                    id: null,
                    athlete: null,
                    evaluationType: null,
                    project: null,
                    testBatch: null,  // 测评批次
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

            // 获取测评类型/测评项目列表
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
