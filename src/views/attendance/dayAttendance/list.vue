<!--考勤管理--日考勤列表-->
<template>
    <div class="attendance-list-wrapper">
        <!--tab切换-->
        <change-tab-bar typeName="day"></change-tab-bar>

        <!--搜索-->
        <search-section typeName='day' @handleFilter="handleFilter"></search-section>

        <!--表格-->
        <el-row>
            <div class="table-title clearfix">
                <h3>日考勤列表</h3>
                <el-button type="success" @click="createData" v-if="extInfo.canOperate">创建日考勤</el-button>
            </div>
            <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
                      style="width: 100%;">
                <el-table-column align="center" label="考勤id">
                    <template slot-scope="scope">
                        <span>{{scope.row.attendanceId}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="日期">
                    <template slot-scope="scope">
                        <span>{{scope.row.attDate}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="时间段">
                    <template slot-scope="scope">
                        <span>{{scope.row.stage==1?'上午':(scope.row.stage==2?'下午':'晚上')}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="项目">
                    <template slot-scope="scope">
                        <span>{{scope.row.projectName}}</span>
                    </template>
                </el-table-column>
<!--                <el-table-column align="center" label="小项">-->
<!--                    <template slot-scope="scope">-->
<!--                        <span>{{scope.row.username}}</span>-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column align="center" label="教练员">
                    <template slot-scope="scope">
                        <span>{{scope.row.coachName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="toDetail(scope.row)">详情</el-button>
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
    import changeTabBar from '../components/changeTabBar'
    import searchSection from '../components/searchSection'
    import mixins from '@/utils/mixins'
    import {getDayAttendanceList} from '@/api/attendance'
    export default {
        components: {changeTabBar, searchSection},
        mixins: [mixins],
        data() {
            return {
                list: null,          // table列表
                total: null,         // 总条目数
                listLoading: false,  // 查询table的loading
                listQuery: {
                    current: 1,
                    pageSize: 10
                },
                extInfo: {}  // 账号的权限
            }
        },

        created() {
            this.getList();
        },

        methods: {
            // 获取日考勤列表
            getList(formData = {}) {
                this.listLoading = true;
                getDayAttendanceList({
                    currentPage: this.listQuery.current,
                    pageSize: this.listQuery.pageSize,
                    attendanceId: formData.id,
                    projectId: formData.bigPro,
                    attDate: formData.dateDay,
                    coachId: formData.coach
                }).then(res => {
                    this.listLoading = false;
                    if (res.data.code === 200) {
                        const data = res.data.data;
                        this.extInfo = data.extInfo;
                        this.list = data.list;
                        this.total = data.pagination.total;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    this.listLoading = false;
                    console.log('获取账号列表失败')
                })
            },

            // 创建考勤
            createData() {
                localStorage.setItem('attendanceDay', JSON.stringify(this.extInfo.useInfo));
                this.$router.push('/dayAttendance/add');
            },

            // 去详情
            toDetail(row) {
                this.$router.push({path: '/dayAttendance/edit', query: {id: row.attendanceId, stage: row.stage}})
            },
        }
    }
</script>

<style lang="scss" scoped>
    .attendance-list-wrapper {
        .table-title {
            margin-top: 20px;
            margin-bottom: 10px;
            h3 {
                font-size: 18px;
                float: left;
                margin-top: 10px;
            }
            button {
                float: right;
            }
        }
    }
</style>
