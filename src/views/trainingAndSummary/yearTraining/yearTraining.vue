<!--年训练管理-->
<template>
    <div class="year-training-wrapper">
        <!--搜索-->
        <search-section idPlaceholder="请输入年计划ID" actBtnName="创建年计划" typeName="年" @handleFilter="handleFilter"></search-section>

        <!--表格-->
        <el-row>
            <div class="table-title">年计划列表</div>
            <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
                      style="width: 100%;">
                <el-table-column align="center" label="年计划id">
                    <template slot-scope="scope">
                        <span>{{scope.row.teamName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="项目">
                    <template slot-scope="scope">
                        <span>{{scope.row.specialName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="队伍">
                    <template slot-scope="scope">
                        <span>{{scope.row.categoryName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="训练年度">
                    <template slot-scope="scope">
                        <span>{{scope.row.organizationName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="教练员">
                    <template slot-scope="scope">
                        <span>{{scope.row.organizationName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="提交时间">
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
            // 获取队伍列表
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

            // 去详情
            toEdit(row) {
                this.$emit('getTeamInfo', row)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .year-training-wrapper {
        .table-title {
            font-size: 18px;
            margin-top: 20px;
            margin-bottom: 10px;
        }
    }
</style>
