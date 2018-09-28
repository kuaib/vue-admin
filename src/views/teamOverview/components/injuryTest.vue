<template>
    <div class="injury-wrapper">
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
        <el-row>
            <h3 class="title">LESS Score for the Team</h3>
            <el-table :data="list" border fit highlight-current-row stripe
                      style="width: 100%;">
                <el-table-column align="center" label="Last Name">
                    <template slot-scope="scope">
                        <span>{{scope.row.aaa}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="PRE1-Total Score17">
                    <template slot-scope="scope">
                        <span>{{scope.row.bbb}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="PRE2-Total Score17">
                    <template slot-scope="scope">
                        <span>{{scope.row.ccc}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Total Score17 Change">
                    <template slot-scope="scope">
                        <span>{{scope.row.ddd}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Injury History">
                    <template slot-scope="scope">
                        <span>{{scope.row.eee}}</span>
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
        <div>{{teamRow.id}}</div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default ({
        data() {
            return {
                oneEchart: null,    // 第一个饼图
                twoEchart: null,    // 第二个饼图
                list: [
                    {aaa: 1, bbb: 2, ccc: 3,ddd: 5,eee: 4},
                    {aaa: 11, bbb: 22, ccc: 33,ddd :5, eee: 4},
                ],
                total: null,        // 总条目数
                listQuery: {
                    current: 1,
                    pageSize: 10,
                    teamId: ''
                }
            }
        },
        props: ['teamRow'], // 队伍行信息

        mounted() {
            this.initOne()
            this.initTwo()
        },

        methods: {

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
                    color: ['#91c7ae','#749f83',  '#ca8622'],
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
                            data:[
                                {value:335, name:'aaa'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},

                            ],
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
                            data:[
                                {value:335, name:'aaa'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},

                            ],
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