<!--考勤管理--月度考勤统计-->
<template>
    <div class="attendance-list-wrapper">
        <!--tab切换-->
        <change-tab-bar typeName="month"></change-tab-bar>

        <!--搜索-->
        <search-section typeName='month' @handleFilter="handleFilter"></search-section>

        <!--表格-->
        <el-row>
            <div class="table-title clearfix">
                <h3>月度考勤列表</h3>
            </div>
            <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
                      style="width: 100%;" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                <el-table-column align="center" label="考勤报表id">
                    <template slot-scope="scope">
                        <span>{{scope.row.attendanceId}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="考勤年度">
                    <template slot-scope="scope">
                        <span>{{scope.row.attDate}}</span>
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
                        <div class="act-btns">
                            <span class="btn" @click="previewItem(scope.row)">预览</span>
                            <span> | </span>
                            <span class="btn" @click="downLoadItem(scope.row)">下载</span>
                        </div>
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
    import {getMonthAttendanceList, monthFileDownload} from '@/api/attendance'
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
                previewList: [],   // 预览列表
            }
        },

        created() {
            this.getList();
        },

        methods: {
            // 获取月考勤列表
            getList(formData = {}) {
                this.listLoading = true;
                getMonthAttendanceList({
                    currentPage: this.listQuery.current,
                    pageSize: this.listQuery.pageSize,
                    attendanceId: formData.id,
                    projectId: formData.bigPro,
                    attDate: formData.dateMonth,
                    coachId: formData.coach
                }).then(res => {
                    this.listLoading = false;
                    if (res.data.code === 200) {
                        const data = res.data.data;
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

            // 预览
            previewItem(row) {
                this.$router.push({path: '/monthAttendance/preview', query: {coachId: row.coachId, projectId: row.projectId, attDate: row.attDate}})
            },

            // 下载
            downLoadItem(row) {
                window.location.href = `/sports/sports_attendance/downloadExcel?coachId=${row.coachId}&projectId=${row.projectId}&attDate=${row.attDate}`

            },
        }
    }
</script>

<style lang="scss" scoped>
    .attendance-list-wrapper {
        .act-btns {
            span {
                color: #409EFF;
            }
            .btn {
                cursor: pointer;
            }
        }
    }
</style>
