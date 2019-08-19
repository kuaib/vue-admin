<!--集训简报-->
<template>
    <div class="big-project-wrapper">
        <!--搜索-->
        <search-section typeName="报表" @handleFilter="handleFilter"></search-section>

        <!--表格-->
        <el-row>
            <div class="table-title clearfix">

                <el-button type="success" @click="addBriefPlan">创建集训计划</el-button>

                <el-button type="success" @click="addBriefSummary">创建小结计划</el-button>

            </div>
            <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
                      style="width: 100%;">
                <el-table-column align="center" label="报表id">
                    <template slot-scope="scope">
                        <span>{{scope.row.projectId}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="项目">
                    <template slot-scope="scope">
                        <span>{{scope.row.projectName}}</span>
                    </template>
                </el-table-column>
              <el-table-column align="center" label="队伍">
                <template slot-scope="scope">
                  <span>{{scope.row.projectName}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="简报类型">
                <template slot-scope="scope">
                  <span>{{scope.row.projectName}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="集训时间">
                <template slot-scope="scope">
                  <span>{{scope.row.projectName}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="教练员">
                <template slot-scope="scope">
                  <span>{{scope.row.projectName}}</span>
                </template>
              </el-table-column>
                <el-table-column align="center" label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 1">已激活</span>
                        <span v-if="scope.row.status == 0" style="color: red">未激活</span>
                    </template>
                </el-table-column>
              <el-table-column align="center" label="提交时间">
                <template slot-scope="scope">
                  <span>{{scope.row.projectName}}</span>
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
    import searchSection  from '../components/searchSection'
    import mixins from '@/utils/mixins'
    import {getBriefingList} from '@/api/trainingBriefing'
    export default {
        mixins: [mixins],
        components: {searchSection},
        data() {
            return {
                list: null,          // table列表
                total: null,         // 总条目数
                listLoading: false,  // 查询table的loading
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                }
            }
        },

        created() {
            this.getList();
        },

        methods: {
            // 创建小结计划
            addBriefPlan() {
                this.$router.push('/trainingBriefingRecord/addBriefPlan')
            },

            addBriefSummary() {
                this.$router.push('/trainingBriefingRecord/addBriefSummary')
            },

            //创建集训计划
            toDetail(row) {
                this.$router.push('/trainingBriefingRecord/addBriefSummary')
            },


            // 获取大项列表
            getList(formData = {}) {
                this.listLoading = true;
                getBriefingList({
                    projectId: formData.id,
                    projectName: formData.name,
                    status: formData.bigProjectState,
                    currentPage:  this.listQuery.currentPage,
                    pageSize: this.listQuery.pageSize
                }).then(res => {
                    this.listLoading = false;
                    if(res.data.code == 200) {
                        this.list = res.data.data.list;
                        this.total =  res.data.data.pagination.total;
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
        }
    }
</script>

<style lang="scss" scoped>
    .big-project-wrapper {
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
