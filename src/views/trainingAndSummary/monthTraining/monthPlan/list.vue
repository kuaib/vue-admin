<template>
    <div class="year-training-wrapper">
        <!--搜索-->
        <search-section typeName="月计划" @handleFilter="handleFilter" :isSummary="isSummary"></search-section>

        <!--表格-->
        <el-row>
            <div class="table-title clearfix">
                <h3>月计划列表</h3>
                <el-button type="success" @click="addNew">创建月计划</el-button>
            </div>
            <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
                      style="width: 100%;">
                <el-table-column align="center" label="月计划id">
                    <template slot-scope="scope">
                        <span>{{scope.row.trainId}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="训练年度">
                    <template slot-scope="scope">
                        <span>{{scope.row.trainYear}}</span>
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
                <el-table-column align="center" label="教练员">
                    <template slot-scope="scope">
                        <span>{{scope.row.coachName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==0">未提交</span>
                        <span v-if="scope.row.status==1">已提交</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="是否总结" v-if="isSummary">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==0">是</span>
                        <span v-if="scope.row.status==1">否</span>
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
    import searchSection from '../../components/searchSection'
    import {getMonthTrainPlanList} from '@/api/trainingAndSummary'
    export default {
        mixins: [mixins],
        components: {searchSection},
        data() {
            return {
                isSummary: false,    // 是否是月训练总结(计划与总结页面公用)
                list: [],            // table列表
                total: null,         // 总条目数
                listLoading: false,  // 查询table的loading
                listQuery: {
                    currentPage: 1,
                    pageSize: 10
                }
            }
        },

        created() {
            this.getList();
        },

        methods: {
            // 获取月计划列表
            getList(formData = {}) {
                this.listLoading = true;
                getMonthTrainPlanList({
                    currentPage: this.listQuery.currentPage,
                    pageSize: this.listQuery.pageSize,
                    trainMonthId: formData.id,
                    projectId: formData.project,
                    teamId: formData.team,
                    coachId: formData.coach,
                    trainMonth: formData.trainYear && (formData.trainYear[0] + ',' + formData.trainYear[1]),
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
                })
            },

            // 创建月计划
            addNew() {
                this.$router.push('/monthPlan/add');
            },

            // 去详情
            toEdit(row) {
                this.$router.push({path: '/monthPlan/edit', query: {id: row.trainId}})
            },
        },

        beforeRouteEnter (to, from, next) {
            next(vm => {
                if(to.meta.isPublic === '月训练总结') {
                    vm.isSummary = true
                }
            })
        }
    }
</script>

<style lang="scss">
    .year-training-wrapper {
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
        .el-date-editor .el-range-separator {
            padding: 0 !important;
        }
        .el-date-editor .el-range-input {
            width: 60%;
        }
    }
</style>