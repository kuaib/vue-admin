<!--运动员  测试指标变化趋势图(折线图)-->
<template>
    <div class="test-athlete-charts">
        <!--搜索条件-->
        <charts-search @searchAction="formatChartsData" typeName="athlete"></charts-search>

        <!--图表-->
        <el-row>
            <div style="font-size: 18px;font-weight:700;text-align:center">运动员测试指标变化趋势图</div>
            <div id="athleteChart" style="width: 600px;height:400px;margin:0 auto"></div>
        </el-row>
    </div>
</template>
<script>
    import chartsSearch from './chartsSearch'
    import echarts from 'echarts'

    export default {
        components: {chartsSearch},
        data() {
            return {
                myChart: null,  // 图表对象
                xAxis: [],  // 横坐标时间
                legend: [], // echarts头部提示
                series: [], // 纵坐标数据
            }
        },

        mounted() {
            this.initEcharts();
        },

        methods: {
            // 初始化echarts
            initEcharts() {
                // 基于准备好的dom，初始化echarts实例
                this.myChart = echarts.init(document.getElementById('athleteChart'));
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
                        axisLabel: {
                            rotate: 30
                        },
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
            },

            // 组装折线图数据
            formatChartsData(resData) {
                this.legend = [];
                this.series = [];
                this.xAxis = resData.xaxis;
                if(resData.series && resData.series.length > 0) {
                    resData.series.forEach(item => {
                        this.legend.push(item.name)
                        this.series.push({
                            name: item.name,
                            type:'line',
                            stack: '总量',
                            data: item.data,
                            symbolSize: 9, // 设定折线点的大小
                        })
                    })
                }
                this.refreshEcharts();
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
