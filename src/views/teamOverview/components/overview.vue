<template>
    <div>
        <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
                  style="width: 100%;">
            <el-table-column align="center" label="运动员姓名 Athlete Name">
                <template slot-scope="scope">
                    <router-link class="teamName" tag="div" :to="{path:'/athleteManage/list',query:{teamId: scope.row.id}}">{{scope.row.teamName}}
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column align="center" label="队伍 Team">
                <template slot-scope="scope">
                    <span>{{scope.row.specialName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="身份证号 ID NO.">
                <template slot-scope="scope">
                    <span>{{scope.row.categoryName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="身高 Height">
                <template slot-scope="scope">
                    <span>{{scope.row.organizationName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="体重 Weight">
                <template slot-scope="scope">
                    <span>{{scope.row.organizationName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="落地动作分数 LESS Score">
                <template slot-scope="scope">
                    <span>{{scope.row.organizationName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="双腿下蹲分数 Double Squat">
                <template slot-scope="scope">
                    <span>{{scope.row.organizationName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="单腿下蹲分数 Single Squat">
                <template slot-scope="scope">
                    <span>{{scope.row.organizationName}}</span>
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
    import { getTeamAthlete } from '@/api/team'
    export default ({
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

        props: ['teamRow'],

        methods: {
            // 获取队伍列表
            getList() {
                this.listLoading = true;
                getTeamAthlete({
                    teamId: this.teamRow.id,
                    currentPage: this.listQuery.current,
                    pageSize: this.listQuery.pageSize
                }).then(res => {
                    this.listLoading = false;
                    if (res.data.code === 200) {
                        const data = res.data.data;
                        this.list = data.list;
                        this.total = data.pagination.total;
                        this.listQuery.pageSize = data.pagination.pageSize;
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
        },

        watch: {
            teamRow(val) {
                if(val && val.id) {
                    this.getList()
                }
            }
        }
    })
</script>