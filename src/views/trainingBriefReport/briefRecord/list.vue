<!--集训简报-->
<template>
    <div class="train-brief-report-wrapper">
        <change-tab-bar :isSummary="isSummary"></change-tab-bar>
        <!--搜索-->
        <search-section @handleFilter="handleFilter" :isSummary="isSummary"></search-section>

        <!--表格-->
        <el-row>
            <div class="table-title clearfix">
                <el-button type="success" @click="addNew" v-if="extInfo.canOperate&&!isSummary">创建集训计划</el-button>
            </div>
            <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
                      style="width: 100%;">
                <el-table-column align="center" label="报表id">
                    <template slot-scope="scope">
                        <span>{{scope.row.reportId}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="项目">
                    <template slot-scope="scope">
                        <span>{{scope.row.projectName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="队伍">
                    <template slot-scope="scope">
                        <span>{{scope.row.teamName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="简报类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.reportType}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="集训时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.trainDate}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="教练员">
                    <template slot-scope="scope">
                        <span>{{scope.row.coachName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.reportStatus == 1">已总结</span>
                        <span v-if="scope.row.reportStatus == 0" style="color: red">未总结</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="提交时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.submitTime}}</span>
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
                               :current-page="listQuery.currentPage" :page-sizes="[10,20,30, 50]"
                               :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper"
                               :total="total">
                </el-pagination>
            </div>
        </el-row>
    </div>
</template>

<script>
    import searchSection from '../components/searchSection'
    import changeTabBar from '../components/changeTabBar'
    import mixins from '@/utils/mixins'
    import {getBriefList} from '@/api/trainingBriefReport'

    export default {
        mixins: [mixins],
        components: {searchSection, changeTabBar},
        data() {
            return {
                isSummary: this.$route.path.indexOf('/summary') !== -1, // 是否是集训总结
                list: null,          // table列表
                total: null,         // 总条目数
                listLoading: false,  // 查询table的loading
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                },
                extInfo: {}  // 账号的权限
            }
        },

        created() {
            this.getList();
        },

        methods: {
            // 获取列表
            getList(formData = {}) {
                this.listLoading = true;
                getBriefList({
                    reportId: formData.id,
                    projectId: formData.project,
                    teamId: formData.team,
                    coachId: formData.coach,
                    trainDate: formData.trainYear,
                    summary: formData.summary && parseInt(formData.summary),
                    currentPage: this.listQuery.currentPage,
                    pageSize: this.listQuery.pageSize
                }).then(res => {
                    this.listLoading = false;
                    if (res.data.code == 200) {
                        let resData = res.data.data;
                        this.list = resData.list;
                        this.extInfo = resData.extInfo;
                        this.total = resData.pagination.total;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                }).catch(() => {
                    this.listLoading = false;
                })
            },

            // 创建集训计划
            addNew() {
                localStorage.setItem('trainingBriefReport', JSON.stringify(this.extInfo.useInfo));
                this.$router.push('/briefRecord/plan/add');
            },

            // 去详情
            toDetail(row) {
                let path = '';
                if(this.isSummary) {
                    path = '/briefRecord/summary/edit'
                } else {
                    path = '/briefRecord/plan/edit'
                }
                this.$router.push({path: path, query: {id: row.reportId, canOperate: this.extInfo.canOperate}})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .train-brief-report-wrapper {
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
