<!--图表的搜索条件-->
<template>
    <el-form :model="searchForm" ref="searchForm" :rules="rules">
        <el-row :gutter="20">
            <el-col :span="3">条件一：</el-col>
            <el-col :span="7">
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
            <el-col :span="3">
                <el-button type="primary" v-waves icon="el-icon-search" @click="searchCharts">查询</el-button>
            </el-col>
            <el-col :span="3">
                <el-button class="search" type="info" v-waves @click="resetForm('searchForm')">重置</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3">条件二：</el-col>
            <el-col :span="6">
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
            <el-col :span="6">
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
    export default {
        data() {
            return {
                testTypeList: [],   // 测评类型
                testProjectList: [],// 测评项目
                testTargetList: [], // 测评指标
                searchForm: {
                    athlete: [],
                    team: null,
                    target: null,
                    date: null,
                    evaluationType: null,
                    project: null
                },
                rules: {
                    date: [
                        {required: true, message: '请选择日期', trigger: 'blur'},
                    ],
                    team: [
                        {required: true, message: '请选择队伍', trigger: 'blur'},
                    ],
                    athlete: [
                        {required: true, message: '请选择运动员', trigger: 'blur'},
                    ],
                    evaluationType: [
                        {required: true, message: '请选择测评类型', trigger: 'blur'},
                    ],
                    project: [
                        {required: true, message: '请选择测评项目', trigger: 'blur'},
                    ],
                    target: [
                        {required: true, message: '请选择测评指标', trigger: 'blur'},
                    ],
                }
            }
        }
    }
</script>