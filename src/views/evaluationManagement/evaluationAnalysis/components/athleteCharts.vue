<!--运动员  测试指标变化趋势图(折线图)-->
<template>
    <div class="test-athlete-charts">
        <!--条件-->
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

        <!--图表-->
        <el-row>
            <div style="font-size: 18px;font-weight:700;text-align:center">运动员测试指标变化趋势图</div>
            <div id="myChart" style="width: 600px;height:400px;margin:0 auto"></div>
        </el-row>
    </div>
</template>
<script>
    import mixins from '@/utils/mixins'
    import echarts from 'echarts'
    import {getTestTypeOrTestProjectList, getTargetList, getAthleteCharts} from '@/api/evaluationManagement'

    export default {
        mixins: [mixins],
        data() {
            return {
                testTypeList: [],   // 测评类型
                testProjectList: [],// 测评项目
                testTargetList: [], // 测评指标

                myChart: null,  // 图表对象
                xAxis: [],  // 横坐标时间
                legend: [], // echarts头部提示
                series: [], // 纵坐标数据
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
        },
        created() {
            this.getAllList(); // 获取基础下拉
            this.getTypeOrProjectList({dataLevel: '1', queryId: '0'}, 'testTypeList');//测评类型查询
        },
        mounted() {
            this.initEcharts();
        },
        methods: {
            // 点击查询按钮
            searchCharts() {
                this.$refs.searchForm.validate((valid) => {
                    if (valid) {
                        getAthleteCharts({
                            athleteIds: this.searchForm.athlete.length > 0 ? this.searchForm.athlete.join() : null,
                            attribute: this.searchForm.target,
                            testProjectId: this.searchForm.project,
                            startDate: this.searchForm.date && this.searchForm.date[0],
                            endDate: this.searchForm.date && this.searchForm.date[1],
                            queryType: '1' // 运动员折线：1；退伍折线：2；同批次运动员对比：3
                        }).then(res => {
                            if(res.data.code == 200) {
                                this.formatChartsData(res.data.data.athleteLineEchart); // 组装折线图数据
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

            // 组装折线图数据
            formatChartsData(resData) {
                this.xAxis = resData.xaxis;
                if(resData.series && resData.series.length > 0) {
                    resData.series.forEach(item => {
                        this.legend.push(item.name)
                        this.series.push({
                            name: item.name,
                            type:'line',
                            stack: '总量',
                            data: item.data
                        })
                    })
                }
                this.refreshEcharts();
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

            // 初始化echarts
            initEcharts() {
                // 基于准备好的dom，初始化echarts实例
                this.myChart = echarts.init(document.getElementById('myChart'));
                this.myChart.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: this.legend
                        // data: ['张晓明', '张小丽']
                    },
                    grid: {
                        // left: '3%',
                        // right: '4%',
                        // bottom: '3%',
                        // containLabel: true
                    },
                    toolbox: {
                        // feature: {
                        //     saveAsImage: {}
                        // }
                    },
                    xAxis: {
                        name: '时间',
                        type: 'category',
                        boundaryGap: false,
                        data: this.xAxis
                    },
                    yAxis: {
                        type: 'value',
                        name: '测试指标'
                    },
                    series: this.series
                });
            },

            // 刷新echarts
            refreshEcharts() {
                if(!this.myChart){
                    return;
                }
                let option = this.myChart.getOption();
                option.xAxis[0].data = this.xAxis;
                option.series = this.series;
                this.myChart.setOption(option);

                // 异步的目的：props传值早于从父组件中设置子组件
                // this.$nextTick(() => {
                //     if(this.currentX && this.currentY) {
                //         option.xAxis[0].name = this.currentX;
                //         option.yAxis[0].name = this.currentY;
                //     }
                //     this.myChart.setOption(option);
                // })
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
                    // this.getAthleteList('', {teamId: this.searchForm.team}); // 获取运动员列表
                    this.getAthleteList(); // 获取运动员列表
                } else {
                    this.athleteList = []
                }
            }
        },

    }
</script>

<style lang="scss">
    .test-athlete-charts {
        .el-date-editor .el-range-separator {
            padding: 0 !important;
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner {
            width: 280px;
        }
    }
</style>
