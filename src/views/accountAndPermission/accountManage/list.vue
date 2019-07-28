<template>
    <div class="account-permission-wrapper">
        <!--搜索-->
        <search-section></search-section>

        <!--表格-->
        <el-row>
            <div class="table-title clearfix">
                <h3>账号列表</h3>
                <el-button type="success" @click="createAccount">创建账号</el-button>
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
                    pageSize: 10,
                    keyWord: null
                }
            }
        },

        created() {
            // this.getList();
        },

        methods: {
            // 获取账号列表
            getList(formData) {
                console.log(formData)
                this.listLoading = true;
                // getTeamList(
                //     {
                //         currentPage: this.listQuery.current,
                //         pageSize: this.listQuery.pageSize,
                //         keyWord: this.listQuery.keyWord
                //     }).then(res => {
                //     this.listLoading = false;
                //     if (res.data.code === 200) {
                //         const data = res.data.data;
                //         this.list = data.list;
                //         this.total = data.pagination.total;
                //         this.listQuery.current = data.pagination.current;
                //     } else {
                //         this.$message({
                //             message: res.data.msg,
                //             type: 'warning'
                //         })
                //     }
                // }).catch(rej => {
                //     this.listLoading = false;
                //     console.log('获取队伍列表失败')
                // })
            },

            // 创建账号
            createAccount() {
                this.$router.push('/accountManage/add');
            },

            // 去详情
            toEdit(row) {
                this.$emit('getTeamInfo', row)
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
