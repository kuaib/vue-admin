<!--周训练管理列表-->
<template>
    <div class="week-training-wrapper">
        <!--搜索-->
        <search-section typeName="周计划" @handleFilter="handleFilter" :isSummary="isSummary"></search-section>

        <!--表格-->
        <el-row>
            <div class="table-title clearfix">
                <h3>周计划列表</h3>
                <el-button type="success" @click="addNew" v-if="extInfo.canOperate&&!isSummary">创建周计划</el-button>
            </div>
            <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
                      style="width: 100%;">
                <el-table-column align="center" label="周计划id">
                    <template slot-scope="scope">
                        <span>{{scope.row.trainWeekId}}</span>
                    </template>
                </el-table-column>

              <el-table-column align="center" label="项目">
                <template slot-scope="scope">
                  <span>{{scope.row.projectName}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="教练员">
                <template slot-scope="scope">
                  <span>{{scope.row.coachName}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="训练年度">
                  <template slot-scope="scope">
                      <span>{{scope.row.trainDate}}</span>
                  </template>
              </el-table-column>

              <el-table-column align="center" label="时间范围">
                <template slot-scope="scope">
                  <span>{{scope.row.trainDay}}</span>
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
    import {getWeekTrainPlanList} from '@/api/trainingAndSummary'
    export default {
        mixins: [mixins],
        components: {searchSection},
        data() {
            return {
                isSummary: this.$route.path.indexOf('/weekSummary') !== -1,    // 是否是周训练总结(计划与总结页面公用)
                list: [],            // table列表
                total: null,         // 总条目数
                listLoading: false,  // 查询table的loading
                listQuery: {
                    currentPage: 1,
                    pageSize: 10
                },
                extInfo: {}  // 账号的权限
            }
        },

        created() {
            this.getList();
        },

        methods: {
            // 获取周计划列表
            getList(formData = {}) {
                this.listLoading = true;
                getWeekTrainPlanList({
                    currentPage: this.listQuery.currentPage,
                    pageSize: this.listQuery.pageSize,
                    trainWeekId: formData.id,
                    projectId: formData.project,
                    teamId: formData.team,
                    coachId: formData.coach,
                    trainDate: formData.trainYear && (formData.trainYear[0] + ',' + formData.trainYear[1]),
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

            // 创建周计划
            addNew() {
                localStorage.setItem('trainAndSumUserWeek', JSON.stringify(this.extInfo.useInfo));
                this.$router.push('/weekPlan/add');
            },

            // 去详情
            toEdit(row) {
                // this.$router.push({path: '/weekPlan/edit', query: {id: row.trainId}})
            },
        }
    }
</script>

<style lang="scss">
    .week-training-wrapper {
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
