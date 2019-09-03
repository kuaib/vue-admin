<!--运动员测试指标对比图(柱状图)-->
<template>
    <div class="test-athlete-charts">
        <!--搜索条件-->
        <charts-search @searchAction="formatChartsData" typeName="column"></charts-search>

        <!--图表-->
        <el-row>
            <div style="font-size: 18px;font-weight:700;text-align:center">运动员测试指标对比图</div>
            <div id="athleteTargetChart" style="width: 600px;height:400px;margin:0 auto"></div>
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
                series: [{type:'bar', barWidth: '60%', data: []}], // 纵坐标数据
            }
        },

        mounted() {
            this.initEcharts();
        },

        methods: {
            // 初始化echarts
            initEcharts() {
                // 基于准备好的dom，初始化echarts实例
                this.myChart = echarts.init(document.getElementById('athleteTargetChart'));
                this.myChart.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        name: '运动员',
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
                    }
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

            // 组装壮壮图数据
            formatChartsData(resData) {
                this.series = [{type:'bar', barWidth: '60%', data: []}];
                this.xAxis = resData.xAxis;
                if(resData.data && resData.data.length > 0) {
                    this.series[0].data = resData.data;
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

