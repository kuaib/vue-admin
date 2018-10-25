<template>
    <div>
        <div class="filter-container">
            <el-row class="clearfix">
                <div class="left">
                    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                              placeholder="请输入队名" v-model="listQuery.keyWord">
                    </el-input>
                    <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
                        搜索
                    </el-button>
                </div>
                <div class="right">
                    <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="toTeamManage">新建队伍
                    </el-button>
                </div>
            </el-row>
        </div>

        <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
                  style="width: 100%;">
            <el-table-column align="center" label="队名">
                <template slot-scope="scope">
                    <span>{{scope.row.teamName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="项目">
                <template slot-scope="scope">
                    <span>{{scope.row.specialName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="级别">
                <template slot-scope="scope">
                    <span>{{scope.row.categoryName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="单位">
                <template slot-scope="scope">
                    <span>{{scope.row.organizationName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <!--<el-button type="primary" size="mini">-->
                        <!--<router-link :to="{path: '/teamManage/manage',query: {teamId:scope.row.id}}"><i-->
                                <!--class="el-icon-edit"></i></router-link>-->
                    <!--</el-button>-->
                    <el-button size="mini" type="primary" @click="toEdit(scope.row)"><i class="el-icon-edit"></i></el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)"><i class="el-icon-delete"></i>
                    </el-button>
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
    </div>
</template>

<script>
    import {fetchList, fetchPv, createArticle, updateArticle} from '@/api/article'
    import {getTeamList, deleteTeam} from '@/api/team'
    import waves from '@/directive/waves' // 水波纹指令

    export default {
        name: 'teamList',
        directives: {
            waves
        },
        data() {
            return {
                list: null,         // table列表
                total: null,        // 总条目数
                listLoading: true,  // 查询table的loading
                listQuery: {
                    current: 1,
                    pageSize: 10,
                    keyWord: null
                }
            }
        },

        created() {
            this.getList()
        },
        methods: {
            // 获取队伍列表
            getList() {
                this.listLoading = true;
                getTeamList(
                    {
                        currentPage: this.listQuery.current,
                        pageSize: this.listQuery.pageSize,
                        keyWord: this.listQuery.keyWord
                    }).then(res => {
                    this.listLoading = false;
                    if (res.data.code === 200) {
                        const data = res.data.data;
                        this.list = data.list;
                        this.total = data.pagination.total;
                        this.listQuery.current = data.pagination.current;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    this.listLoading = false;
                    console.log('获取队伍列表失败')
                })
            },

            // 删除队伍
            handleDelete(row) {
                this.$confirm('确定删除' + row.teamName + '吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.listLoading = true;
                    deleteTeam(row.id).then(res => {
                        this.listLoading = false;
                        if(res.data.code === 200) {
                            this.$message({
                                message: res.data.msg,
                                type: 'success'
                            })
                            this.getList();
                        } else {
                            this.$message({
                                message: res.data.msg,
                                type: 'warning'
                            })
                        }
                    }).catch((rej) => {
                        this.listLoading = false;
                        console.log('删除失败');
                    })
                }).catch(() => {});
            },

            // 改变每页显示条目数
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList()
            },

            // 跳转到指定页数
            handleCurrentChange(val) {
                this.listQuery.current = val;
                this.getList()
            },

            // 点击搜索
            handleFilter() {
                this.listQuery.current = 1;
                this.getList()
            },

            // 跳转队伍管理页面
            toTeamManage() {
                this.$router.push('/teamManage/manage');
            },

            // 编辑
            toEdit(row) {
                this.$router.push({path: '/teamManage/manage',query: {teamId: row.id}});
            }
        }
    }
</script>

<style>
    .teamName {
        cursor: pointer;
        color: #409EFF;
    }
</style>
