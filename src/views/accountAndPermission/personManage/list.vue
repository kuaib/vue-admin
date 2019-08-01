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
                <el-table-column align="center" label="人员id">
                    <template slot-scope="scope">
                        <span>{{scope.row.staffId}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="姓名">
                    <template slot-scope="scope">
                        <span>{{scope.row.staffName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="职位">
                    <template slot-scope="scope">
                        <span>{{scope.row.jobName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="手机">
                    <template slot-scope="scope">
                        <span>{{scope.row.telphone}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="人员状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 1">已激活</span>
                        <span v-if="scope.row.status == 0" style="color: red">未激活</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <!--<el-button size="mini" type="primary" @click="toDetail(scope.row)">详情</el-button>-->
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
                    jobName: formData.position  // 职位名称
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
                this.$router.push({path: '/personManage/edit', query: {id: row.staffId}})
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

