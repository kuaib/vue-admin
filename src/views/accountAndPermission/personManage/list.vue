<!--人员管理列表-->
<template>
    <div class="account-permission-person-wrapper">
        <!--搜索-->
        <search-section typeName="person" @handleFilter="handleFilter"></search-section>

        <!--表格-->
        <el-row>
            <div class="table-title clearfix">
                <h3>人员列表</h3>
                <el-button type="success" @click="addNew">创建人员</el-button>
            </div>
            <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
                      style="width: 100%;">
                <el-table-column align="center" label="账号id">
                    <template slot-scope="scope">
                        <span>{{scope.row.teamName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="姓名">
                    <template slot-scope="scope">
                        <span>{{scope.row.specialName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="角色">
                    <template slot-scope="scope">
                        <span>{{scope.row.categoryName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="账号">
                    <template slot-scope="scope">
                        <span>{{scope.row.organizationName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="账号状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.organizationName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="toDetail(scope.row)">详情</el-button>
                        <el-button size="mini" type="success" @click="toEdit(scope.row)">编辑</el-button>
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
    import mixins from '@/utils/mixins'
    import {getStaffList} from '@/api/accountAndPermission'
    export default {
        components: {searchSection},
        mixins: [mixins],
        data() {
            return {
                list: null,          // table列表
                total: null,         // 总条目数
                listLoading: false,  // 查询table的loading
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    keyWord: null
                }
            }
        },

        created() {
            this.getList();
        },

        methods: {
            // 获取人员列表
            getList(formData = {}) {
                this.listLoading = true;
                getStaffList({
                    currentPage: this.listQuery.currentPage,
                    pageSize: this.listQuery.pageSize,
                    staffId: formData.id,
                    identity: formData.idCard,
                    status: formData.personState,
                    telphone: formData.phone,
                    staffName: formData.name,
                    jobId: formData.position  // 职位id
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

            // 创建人员
            addNew() {
                this.$router.push('/personManage/add');
            },

            // 去详情
            toEdit(row) {
                this.$emit('getTeamInfo', row)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .account-permission-person-wrapper {
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

