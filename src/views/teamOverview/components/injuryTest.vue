<template>
    <div class="injury-wrapper">
        <!--饼图-->
        <div @click="bbb">哈哈哈哈哈</div>
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="pie-item">
                    <div id="one" style="width: 400px;height:280px;"></div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="pie-item">
                    <div id="two" style="width: 400px;height:280px;"></div>
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
    import { getLessScore } from '@/api/team'
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
                teamData: [{value:335, name:'High'},
                    {value:310, name:'Low'},
                    {value:234, name:'Moderate'},],  // 饼图1
                changeData: [
                    {value:335, name:'aaa'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                ],   // 饼图2
                echartsFlag: true   // 是否是初始化页面
            }
        },
        props: ['teamRow'], // 队伍行信息

        mounted() {
            this.aaa();
        },

        methods: {
            bbb() {
                let data1 = this.oneEchart.getOption();
                data1.series[0].data = [{value:20, name:'High'},
                    {value:310, name:'Low'},
                    {value:234, name:'Moderate'}];
                this.oneEchart.setOption(data1)
            },
            // 饼图数据获取
            aaa() {
                this.initOne();
                this.initTwo();
                // bbb().then(res => {
                //     if(res.data.code == 200) {
                //         const data = res.data.data;
                //         this.teamData = data.list1;
                //         this.changeData = data.list2;
                //         if(this.echartsFlag) { // 初始化
                //             this.echartsFlag = false;
                //             this.initOne();
                //             this.initTwo();
                //         } else {    // 切换队伍行数据（重新设置饼图数据）
                //             let data1 = this.oneEchart.getOption();
                //             let data2 = this.oneEchart.twoEchart();
                //             data1.series[0].data = this.this.teamData;
                //             data2.series[0].data = this.this.changeData;
                //             this.oneEchart.setOption(data1);
                //             this.oneEchart.setOption(data2)
                //         }
                //     }
                // }).catch(rej => {
                //     console.log('获取数据失败')
                // })
            },

            // 获取队伍less分数
            getTeamLessScore() {
                getLessScore(this.listQuery).then(res => {
                    if(res.data.code == 200) {
                        const data = res.data.data;
                        this.list = data.list;
                        this.total = data.pagination.total;
                        this.listQuery.pageSize = data.pagination.pageSize;
                        this.listQuery.current = data.pagination.current;
                    }
                })
            },

            // 点击搜索
            handleFilter() {
                this.listQuery.current = 1;
                this.getList()
            },

            // 改变每页显示条目数
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList()
            },

            // 跳转到指定页数
            handleCurrentChange(val) {
                this.listQuery.currentPage = val;
                this.getList()
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
                            name: '访问来源',
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
                                        position: 'inside'
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
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['aaa','邮件营销','联盟广告']
                    },
                    series: [
                        {
                            name: '访问来源',
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
                                        position: 'inside'
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