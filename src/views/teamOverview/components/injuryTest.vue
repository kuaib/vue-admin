<template>
    <div class="injury-wrapper">
        <!--饼图-->
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="pie-item">
                    <div id="one" style="width: 410px;height:280px;"></div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="pie-item">
                    <div id="two" style="width: 410px;height:280px;"></div>
                </div>
            </el-col>
        </el-row>

        <!--表格-->
        <el-row>
            <h3 class="title">LESS Score for the Team</h3>
            <el-table :data="list" border fit highlight-current-row stripe
                      style="width: 100%;">
                <el-table-column align="center" label="Last Name">
                    <template slot-scope="scope">
                        <span>{{scope.row.athleteName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="PRE1-Total Score17">
                    <template slot-scope="scope">
                        <span>{{scope.row.pre1Score}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="PRE2-Total Score17">
                    <template slot-scope="scope">
                        <span>{{scope.row.pre2Score}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Total Score17 Change">
                    <template slot-scope="scope">
                        <span>{{scope.row.scoreChange}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Injury History">
                    <template slot-scope="scope">
                        <span>{{scope.row.injuryHistory}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="listQuery.current" :page-sizes="[10,20,30, 50]"
                               :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper"
                               :total="total">
                </el-pagination>
            </div>
        </el-row>
    </div>
</template>

<script>
    import { getLessScore, teamInjuryDiskEvaluation } from '@/api/team'
    import echarts from 'echarts'
    export default ({
        data() {
            return {
                oneEchart: null,    // 第一个饼图
                twoEchart: null,    // 第二个饼图
                list: [],           // less分数表格
                total: null,        // 总条目数
                listQuery: {
                    current: 1,
                    pageSize: 10,
                    teamId: null
                },
                teamData: [],        // 饼图1
                changeData: [],      // 饼图2
                echartsFlag: true,   // 是否是初始化页面(用来判断饼图是否需要初始化)
            }
        },
        props: ['teamRow'], // 队伍行信息

        methods: {
            // 饼图数据获取
            getInjuryDiskEvaluation() {
                teamInjuryDiskEvaluation({teamId: this.teamRow.id}).then(res => {
                    if(res.data.code == 200) {
                        const data = res.data.data;
                        this.teamData = data.teamInjuryRiskEvaluation;
                        this.changeData = this.reformData2(data.changInInjuryDisk);
                        if(this.echartsFlag) { // 初始化
                            this.echartsFlag = false;
                            this.initOne();
                            this.initTwo();
                        } else {    // 切换队伍行数据（重新设置饼图数据）
                            let data1 = this.oneEchart.getOption();
                            let data2 = this.twoEchart.getOption();
                            data1.series[0].data = this.teamData;
                            data2.series[0].data = this.changeData;
                            this.oneEchart.setOption(data1);
                            this.twoEchart.setOption(data2);
                        }
                    }
                }).catch(rej => {
                    console.log('获取数据失败')
                })
            },

            // 获取队伍less分数
            getTeamLessScore() {
                getLessScore(this.listQuery).then(res => {
                    if(res.data.code == 200) {
                        const data = res.data.data;
                        this.list = data.list;
                        this.total = data.pagination.total;
                        this.listQuery.current = data.pagination.current;
                    }
                })
            },

            // 通过后台数据判断升降箭头的显示(饼图2)
            reformData2(data) {
                if(data && data.length > 0) {
                    let arr = [];
                    data.forEach((item) => {
                        if(item.flag == 0) {
                            arr.push({name: item.name, mark: '↔', value: item.rate.substr(0, item.rate.length - 1)});
                        } else if(item.flag > 0) {
                            arr.push({name: item.name, mark: '↑', value: item.rate.substr(0, item.rate.length - 1)});
                        } else {
                            arr.push({name: item.name, mark: '↓', value: item.rate.substr(0, item.rate.length - 1)});
                        }
                    })
                    return arr;
                }
            },

            // 点击搜索
            handleFilter() {
                this.listQuery.current = 1;
                this.getTeamLessScore()
            },

            // 改变每页显示条目数
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getTeamLessScore()
            },

            // 跳转到指定页数
            handleCurrentChange(val) {
                this.listQuery.current = val;
                this.getTeamLessScore()
            },

            initOne() {
                this.oneEchart = echarts.init(document.getElementById('one'))
                let option = {
                    title : {
                        text: 'Team Injury Risk Evaluation',
                        x:'center',
                        left: '30%'
                    },
                    color: ['#bf0100','#71ad49', '#fdc100'],
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['High','Low','Moderate']
                    },
                    series: [
                        {
                            name: 'Team Injury Risk Evaluation',
                            type: 'pie',
                            radius : '55%',
                            center: ['60%', '45%'],
                            hoverAnimation: false,
                            data: this.teamData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },
                                normal: {
                                    labelLine:{show:false},
                                    label: {
                                        color: '#000',
                                        position: 'inside',
                                        formatter: '{b}\n{d}%',
                                        fontSize: '14'
                                    }
                                }
                            }
                        }
                    ]
                };
                this.oneEchart.setOption(option);
            },
            initTwo() {
                this.twoEchart = echarts.init(document.getElementById('two'))
                let option = {
                    title : {
                        text: 'Change In Injury Risk',
                        x:'center',
                        left: '30%'
                    },
                    color: ['#bf0100','#71ad49', '#fdc100'],
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['High','Low','Moderate']
                    },
                    series: [
                        {
                            name: 'Change In Injury Risk',
                            type: 'pie',
                            radius : '55%',
                            center: ['60%', '45%'],
                            hoverAnimation: false,
                            data: this.changeData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },
                                normal: {
                                    labelLine:{show:false},
                                    label: {
                                        color: '#000',
                                        position: 'inside',
                                        fontSize: '14',
                                        formatter: (param) => {
                                            let data = param.data;
                                            return [
                                                data.name,
                                                data.mark,
                                                data.value + '%'
                                            ].join('\n')
                                        }
                                    }
                                }
                            }
                        }
                    ]
                };
                this.twoEchart.setOption(option);
            }
        },
        watch: {
            teamRow(val) {
                if(val && val.id) {
                    this.listQuery.teamId = val.id;
                    this.getTeamLessScore();
                    this.getInjuryDiskEvaluation();
                }
            }
        }
    })
</script>

<style lang="scss">
    .injury-wrapper {
        .pie-item {
           margin: 0 auto;
        }
        .title {
            margin-bottom: 15px;
        }
    }
</style>