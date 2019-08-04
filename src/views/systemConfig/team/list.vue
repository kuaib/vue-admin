<!--队伍管理-->
<template>
    <div class="team-wrapper">
        <!--搜索-->
        <search-section typeName="team" @handleFilter="handleFilter"></search-section>

        <!--表格-->
        <el-row>
            <div class="table-title clearfix">
                <h3>队伍列表</h3>
                <el-button type="success" @click="createItem">创建队伍</el-button>
            </div>
            <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
                      style="width: 100%;">
                <el-table-column align="center" label="队伍id">
                    <template slot-scope="scope">
                        <span>{{scope.row.teamId}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="队伍名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.teamName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="隶属大项">
                    <template slot-scope="scope">
                        <span>{{scope.row.projectName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="项目负责人">
                    <template slot-scope="scope">
                        <span>{{scope.row.leaderName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 1">已激活</span>
                        <span v-if="scope.row.status == 0" style="color: red">未激活</span>
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
    import {getTeamList} from '@/api/systemConfig'
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
            // 创建队伍
            createItem() {
                this.$router.push('/team/add')
            },

            // 编辑队伍
            toDetail(row) {
                this.$router.push({path: '/team/edit', query: {id: row.teamId}})
            },

            // 解除关联
            removeRelation() {

            },

            // 获取队伍列表
            getList(formData = {}) {
                this.listLoading = true;
                getTeamList({
                    teamId: formData.id,
                    teamName: formData.name,
                    status: formData.teamState,
                    leaderId: formData.leader,
                    projectId: formData.parentPro,
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
    .team-wrapper {
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
