<template>
    <div class="evaluation-record-list-wrapper">
        <!--搜索-->
        <search-section typeName="evalManage" @handleFilter="handleFilter"></search-section>

        <!--表格-->
        <el-row>
            <div class="table-title clearfix">
                <h3>测评记录列表</h3>
                <el-button type="success" @click="addNew">批量导入</el-button>
            </div>
            <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
                      style="width: 100%;">
                <el-table-column align="center" label="测评id">
                    <template slot-scope="scope">
                        <span>{{scope.row.trainMonthId}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="测评批次">
                    <template slot-scope="scope">
                        <span>{{scope.row.trainMonth}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="测评类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.projectName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="测评项目">
                    <template slot-scope="scope">
                        <span>{{scope.row.teamName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="运动员">
                    <template slot-scope="scope">
                        <span>{{scope.row.coachName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="toEdit(scope.row)">详情</el-button>
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
    import mixins from '@/utils/mixins'
    import searchSection from '../components/searchSection'
    export default {
        components: {searchSection},
        mixins: [mixins],
        data() {
            return {
                list: [],            // table列表
                total: null,         // 总条目数
                listLoading: false,  // 查询table的loading
                listQuery: {
                    currentPage: 1,
                    pageSize: 10
                },
            }
        },

        created() {
            // this.getList();
        },

        methods: {
            // 获取列表
            getList(formData = {}) {
                this.listLoading = true;
                getMonthTrainPlanList({
                    currentPage: this.listQuery.currentPage,
                    pageSize: this.listQuery.pageSize,
                    trainMonthId: formData.id,
                    projectId: formData.project,
                    teamId: formData.team,
                    coachId: formData.coach,
                    trainMonth: formData.trainYear,
                    summary: formData.summary && parseInt(formData.summary)
                }).then(res => {
                    this.listLoading = false;
                    if (res.data.code === 200) {
                        const data = res.data.data;
                        this.list = data.list;
                        this.extInfo = data.extInfo;
                        this.total = data.pagination.total;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    this.listLoading = false;
                })
            },

            // 批量导入
            addNew() {
                this.$router.push({path: '/evaluationRecord/importFile'})
            },

            // 去详情
            toEdit(row) {
                this.$router.push({path: '/evaluationRecord/detail', query: {id: row.id}})
            }
        }
    }
</script>

<style lang="scss">
    .evaluation-record-list-wrapper {
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
