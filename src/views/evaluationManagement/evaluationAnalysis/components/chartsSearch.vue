<!--图表的搜索条件-->
<template>
    <el-form :model="searchForm" ref="searchForm" :rules="rules">
        <el-row :gutter="20">
            <el-col :span="3">条件一：</el-col>
            <el-col :span="7" v-if="typeName!=='column'">
                <el-form-item prop="date">
                    <el-date-picker
                            type="daterange"
                            v-model="searchForm.date"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="6" v-else>
                <el-form-item prop="testBatch">
                    <el-input v-model="searchForm.testBatch" placeholder="请输入测评批次"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" v-waves icon="el-icon-search" @click="searchCharts">查询</el-button>
            </el-col>
            <el-col :span="3">
                <el-button class="search" type="info" v-waves @click="resetForm('searchForm')">重置</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3">条件二：</el-col>

            <!--除队伍外-->
            <el-col :span="6" v-if="typeName!=='team'">
                <el-form-item prop="team">
                    <el-select v-model="searchForm.team" placeholder="请选择队伍">
                        <el-option
                                v-for="item in teamInfoList"
                                :label="item.dicValue"
                                :value="item.dicKey"
                                :key="item.dicKey">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6" v-if="typeName!=='team'">
                <el-form-item prop="athlete">
                    <el-select v-model="searchForm.athlete" multiple placeholder="请选择运动员">
                        <el-option
                                v-for="item in athleteList"
                                :label="item.dicValue"
                                :value="item.dicKey"
                                :key="item.dicKey">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <!--队伍-->
            <el-col :span="6" v-if="typeName==='team'">
                <el-form-item prop="team">
                    <el-select v-model="searchForm.team" multiple placeholder="请选择队伍">
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
        <el-row :gutter="20">
            <el-col :span="3">条件三：</el-col>
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
                <el-form-item prop="project">
                    <el-select v-model="searchForm.target" placeholder="请选择测评指标">
                        <el-option
                                v-for="(item,idx) in testTargetList"
                                :label="item.name"
                                :value="item.attribute"
                                :key="idx">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
    import mixins from '@/utils/mixins'
    import {getTestTypeOrTestProjectList, getTargetList, getAthleteCharts} from '@/api/evaluationManagement'

    export default {
        mixins: [mixins],
        props: ['typeName'],
        data() {
            return {
                testTypeList: [],   // 测评类型
                testProjectList: [],// 测评项目
                testTargetList: [], // 测评指标
                searchForm: {
                    athlete: null,
                    team: null,
                    target: null,
                    date: null,
                    evaluationType: null,
                    project: null,
                    testBatch: null
                },
                rules: {
                    date: [
                        {required: true, message: '请选择日期', trigger: 'change'},
                    ],
                    team: [
                        {required: true, message: '请选择队伍', trigger: 'change'},
                    ],
                    athlete: [
                        {required: true, message: '请选择运动员', trigger: 'change'},
                    ],
                    evaluationType: [
                        {required: true, message: '请选择测评类型', trigger: 'change'},
                    ],
                    project: [
                        {required: true, message: '请选择测评项目', trigger: 'change'},
                    ],
                    target: [
                        {required: true, message: '请选择测评指标', trigger: 'change'},
                    ],
                    testBatch: [
                        {required: true, message: '请输入测评批次', trigger: 'blur'},
                    ],
                }
            }
        },
        created() {
            this.getAllList(); // 获取基础下拉
            this.getTypeOrProjectList({dataLevel: '1', queryId: '0'}, 'testTypeList');//测评类型查询
        },

        methods: {
            // 点击查询按钮
            searchCharts() {
                this.$refs.searchForm.validate((valid) => {
                    if (valid) {
                        getAthleteCharts({
                            athleteIds: (this.searchForm.athlete && this.searchForm.athlete.length) > 0 ? this.searchForm.athlete.join() : null,
                            teamIds: (this.searchForm.team && typeof this.searchForm.team !== 'string' && this.searchForm.team.length > 0) ? this.searchForm.team.join() : null,
                            attribute: this.searchForm.target,
                            testProjectId: this.searchForm.project,
                            startDate: this.searchForm.date && this.searchForm.date[0],
                            endDate: this.searchForm.date && this.searchForm.date[1],
                            testBatch: this.searchForm.testBatch,
                            queryType: this.typeName === 'athlete' ? '1' : (this.typeName === 'team' ? '2' : '3') // 运动员折线：1；队伍折线：2；同批次运动员对比：3
                        }).then(res => {
                            if(res.data.code == 200) {
                                let resData;
                                if(this.typeName === 'athlete') {
                                    resData = res.data.data.athleteLineEchart;
                                } else if(this.typeName === 'team') {
                                    resData = res.data.data.teamLineEchart;
                                } else if(this.typeName === 'column') {
                                    resData = res.data.data.batchEchart;
                                }
                                this.$emit('searchAction', resData)
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'warning'
                                })
                            }
                        })
                    }
                })
            },

            // 测评类型/项目查询
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
            },

            // 获取测评指标列表
            getTarget(param) {
                getTargetList({
                    testProjectId: param
                }).then(res => {
                    if (res.data.code === 200) {
                        const data = res.data.data;
                        this.testTargetList = data;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                });
            },
        },

        watch: {
            'searchForm.evaluationType': function (val) {
                if (val) {
                    this.searchForm.project = null;
                    this.getTypeOrProjectList({dataLevel: '2', queryId: val}, 'testProjectList');//测评项目查询
                } else {
                    this.testProjectList = [];
                }
            },
            'searchForm.project': function (val) {
                if (val) {
                    this.searchForm.target = null;
                    this.getTarget(val);//测评指标查询
                } else {
                    this.testTargetList = [];
                }
            },
            'searchForm.team': function(val) {
                if(val) {
                    if(typeof val === 'string') {
                        this.getAthleteList('', {teamId: this.searchForm.team}); // 获取运动员列表
                    }
                } else {
                    this.athleteList = []
                }
            }
        },
    }
</script>
