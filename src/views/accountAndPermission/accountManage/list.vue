<!--账号管理--列表-->
<template>
    <div class="account-permission-wrapper">
        <!--搜索-->
        <search-section typeName='account' @handleFilter="handleFilter"></search-section>

        <!--表格-->
        <el-row>
            <div class="table-title clearfix">
                <h3>账号列表</h3>
                <el-button type="success" @click="createAccount">创建账号</el-button>
            </div>
            <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
                      style="width: 100%;" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                <el-table-column align="center" label="账号id">
                    <template slot-scope="scope">
                        <span>{{scope.row.accountId}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="账号">
                    <template slot-scope="scope">
                        <span>{{scope.row.username}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="角色">
                    <template slot-scope="scope">
                        <span>{{scope.row.roleName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="姓名">
                    <template slot-scope="scope">
                        <span>{{scope.row.staffName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="账号状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.enabled == 1">已激活</span>
                        <span v-if="scope.row.enabled == 0" style="color: red">未激活</span>
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
    import searchSection from '../components/searchSection'
    import mixins from '@/utils/mixins'
    import {getUserList} from '@/api/accountAndPermission'
    export default {
        components: {searchSection},
        mixins: [mixins],
        data() {
            return {
                list: null,          // table列表
                total: null,         // 总条目数
                listLoading: false,  // 查询table的loading
                listQuery: {
                    current: 1,
                    pageSize: 10
                }
            }
        },

        created() {
            this.getList();
        },

        methods: {
            // 获取账号列表
            getList(formData = {}) {
                this.listLoading = true;
                getUserList({
                    currentPage: this.listQuery.current,
                    pageSize: this.listQuery.pageSize,
                    accountId: formData.id,
                    username: formData.account,
                    enabled: formData.accountState,
                    telephone: formData.phone,
                    staffName: formData.name,
                    roleId: formData.role,
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
                    console.log('获取账号列表失败')
                })
            },

            // 创建账号
            createAccount() {
                this.$router.push('/accountManage/add');
            },

            // 去详情
            toDetail(row) {
                this.$router.push({path: '/accountManage/edit', query: {id: row.accountId}})
            },
        }
    }
</script>

<style lang="scss" scoped>
    .account-permission-wrapper {
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
