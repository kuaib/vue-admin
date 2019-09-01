<!--运动员  测试指标变化趋势图(折线图)-->
<template>
    <div>
        <!--条件-->
      <el-form :model="searchForm" ref="searchForm">
        <el-row>
            <el-row :gutter="20">
                <el-col :span="3">条件一：</el-col>
                <el-col :span="7">
                    <el-date-picker
                      type="daterange"
                      v-model="searchForm.date"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
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
                      :label="item.attribute"
                      :value="item.code"
                      :key="idx">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          <el-row>
            <el-col :span="6"> </el-col>
              <el-col :span="6">
                <el-form-item prop="name">
                  <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="name">
                  <el-button class="search" type="info" v-waves @click="resetForm('searchForm')">重置</el-button>
                </el-form-item>
              </el-col>
            <el-col :span="6"></el-col>
          </el-row>
        </el-row>
      </el-form>

      <!--结果-->
      <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
    </div>
</template>
<script>
    import mixins from '@/utils/mixins'
    import {getTestTypeOrTestProjectList,getTargetList} from '@/api/evaluationManagement'
    export default {
        mixins: [mixins],
        data() {
            return {
                testTypeList: [],
                testProjectList: [],
                testTargetList:[],
                btnLoading: false,
                searchForm: {
                    athlete: null,
                    team: null,
                    target: null,
                    date:null,
                    evaluationType: null,
                    project: null
                }
            }
        },
        created() {
            this.getAllList(); // 获取基础下拉
            this.getAthleteList(); // 获取运动员列表
            this.getTypeOrProjectList({dataLevel: '1',queryId: '0' }, 'testTypeList');//测评类型查询
        },
        mounted(){
            this.drawLine();
        },
        methods: {
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
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: { text: '运动员测试指标变化趋势图' },
                    tooltip: {},
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line'
                    }]
                });
            }
        },
        watch: {
            'searchForm.evaluationType': function (val) {
                if (val) {
                    this.searchForm.project = null;
                    this.getTypeOrProjectList({dataLevel: '2', queryId: val}, 'testProjectList');//测评项目查询
                }
            },
            'searchForm.project': function (val) {
                if (val) {
                    this.searchForm.target = null;
                    this.getTarget(val);//测评指标查询
                }
            }
        },

    }
</script>
