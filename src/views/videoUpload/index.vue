<template>
    <div>
        <el-row :gutter="20" style="margin-bottom: 20px;">
            <el-col :span="6">
                <el-select v-model="teamId" placeholder="请选择类别 Select Category" @change="changeTeam">
                    <el-option v-for="item in teamList" :label="item.teamName" :value="item.teamId"
                               :key="item.teamId"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="testKey" placeholder="请选择测试 Select Test">
                    <el-option v-for="item in testItem" :label="item.dicValue" :value="item.dicKey"
                               :key="item.dicKey"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-date-picker type="date" placeholder="选择测试日期 Select Date" v-model="testDate"
                                style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
            </el-col>
            <el-col :span="6">
                <el-select v-model="testNo" placeholder="请选择测试次数 Select No. of Test">
                    <el-option v-for="item in testNoList" :label="item.dicValue" :value="item.dicKey"
                               :key="item.dicKey"></el-option>
                </el-select>
            </el-col>
        </el-row>

        <el-row>
            <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
                      style="width: 100%"
                      ref="athleteTable"
                      :row-class-name="tableRowClassName">
                <el-table-column align="center" :render-header="renderHeader" label="English,Name">
                    <template slot-scope="scope">
                        <span>{{scope.row.enAthleteName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="Chinese,Name">
                    <template slot-scope="scope">
                        <span>{{scope.row.athleteName}}</span>
                    </template>
                </el-table-column>

                <!--LESS-->
                <el-table-column align="center" :render-header="renderHeader" label="第一次动作,Trial 1">
                    <template slot-scope="scope">
                        <span style="color:#8a8a8a">已上传</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="第二次动作,Trial 2">
                    <template slot-scope="scope">
                        <span style="color:#f56c6c">重新上传</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="第三次动作,Trial 3">
                    <template slot-scope="scope">
                        <span style="color:#67c23a">上传</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="第四次动作,Trial 4">
                    <template slot-scope="scope">
                        <span style="color:#67c23a">上传</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="第五次动作,Trial 5">
                    <template slot-scope="scope">
                        <span style="color:#67c23a">上传</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="确认,Sure">
                    <template slot-scope="scope">
                        <!--<span style="color:#f56c6c">提交</span>-->
                        <span style="color:#8a8a8a">已提交</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="LESS分数,LESS Score">
                    <template slot-scope="scope">
                        <span>{{scope.row.compCount}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="总分数,Total Score">
                    <template slot-scope="scope">
                        <span>{{scope.row.compCount}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="测试次数,Test No.">
                    <template slot-scope="scope">
                        <span>{{scope.row.compCount}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="listQuery.currentPage" :page-sizes="[10,20,30,50]"
                               :page-size="listQuery.pageSize" layout="prev, pager, next"
                               :total="total">
                </el-pagination>
            </div>
            <div style="text-align: center;margin-top: 20px;">
                <el-button type="primary">完成本队视频上传</el-button>
            </div>
        </el-row>
    </div>
</template>

<script>
    import { getTeamListAll } from '@/api/team'
    import { getAthleteList, allAthleteDone } from '@/api/athlete'
    export default ({
        data() {
            return {
                teamList: [],        // 队伍
                teamId: null,        // 当前选中的队伍id

                testKey: 'less',   // 测试项目id
                testItem: [        // 测试项目
                    {dicKey: 'less', dicValue: 'NC-LESS'},
                    {dicKey: 'double', dicValue: 'NC-Double Squat'},
                    {dicKey: 'single', dicValue: 'NC-Single Squat'},
                    // {dicKey: 4, dicValue: 'COC-Single Squat'}
                ],

                testDate: null,   // 测试日期

                testNo: null,     // 测试次数
                testNoList: [
                    {dicKey: '1', dicValue: '第一次测试 Test No.1'},
                    {dicKey: '2', dicValue: '第二次测试 Test No.2'},
                    {dicKey: '3', dicValue: '第三次测试 Test No.3'},
                    {dicKey: '4', dicValue: '第四次测试 Test No.4'},
                    {dicKey: '5', dicValue: '第五次测试 Test No.5'},
                ],


                list: [],            // 运动员列表
                total: null,         // 总条目数
                listLoading: false,
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    teamId: null    // 当前选中的队伍id
                },
            }
        },

        created() {
            this.getAllTeam();
        },

        methods: {
            // 获取所有队伍信息（不分页）
            getAllTeam() {
                getTeamListAll().then(res => {
                    if(res.data.code === 200) {
                        this.teamList = res.data.data;
                        this.listQuery.teamId = this.teamList[0].teamId;
                        this.teamId = this.teamList[0].teamId;
                        this.getList();
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    console.log('获取队伍列表失败')
                })
            },

            // 获取运动员列表
            getList() {
                this.listLoading = true;
                getAthleteList(this.listQuery).then(res => {
                    this.listLoading = false;
                    if(res.data.code === 200) {
                        const data = res.data.data;
                        this.list = data.list;
                        this.total = data.pagination.total;
                        this.listQuery.currentPage = data.pagination.current;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    this.listLoading = false;
                    console.log('获取运动员列表失败');
                })
            },

            // 完成当前队伍下所有队员的测试
            finishAllAthleteByTeam() {
                allAthleteDone(this.teamId).then(res => {
                    if(res.data.code == 200) {
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        })
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    console.log('请求失败')
                })
            },

            // 点击行
            selectRow(row) {

            },

            // 切换队伍
            changeTeam(teamId) {
                this.listQuery.teamId = teamId;
                this.getList();
            },

            // 格式化表头
            renderHeader(h, column) {
                let title = column.column.label.split(',');
                return [h('p', {}, [title[0]]),h('p', {}, [title[1]])]
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

            // 把每一行的索引放进row(行的回调方法)
            tableRowClassName({row, rowIndex}) {
                row.index = rowIndex
            }


        }
    })
</script>
