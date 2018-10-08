<template>
    <div>
        <div class="row-item">
            <el-select clearable v-model="teamId" placeholder="请选择队伍 Select Team" @change="changeTeam">
                <el-option v-for="item in teamList" :label="item.teamName" :value="item.teamId"
                           :key="item.teamId"></el-option>
            </el-select>
        </div>
        <div class="row-item">
            <div class="title">运动员列表 Athlete List</div>
            <el-table :data="list" v-loading="listLoading" border fit highlight-current-row @row-click="selectRow"
                      style="width: 100%">
                <el-table-column align="center" :render-header="renderHeader" label="English,Name">
                    <template slot-scope="scope">
                        <span>{{scope.row.enAthleteName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="Chinese,Name">
                    <template slot-scope="scope">
                        <span>{{scope.row.athleteName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="完成次数,No. of completion" width="80">
                    <template slot-scope="scope">
                        <span>{{scope.row.compCount}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="listQuery.current" :page-sizes="[10,20,30, 50]"
                               :page-size="listQuery.pageSize" layout="prev, pager, next, jumper"
                               :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import { getTeamListAll } from '@/api/team'
    import { getAthleteList } from '@/api/athlete'
    export default ({
        data() {
            return {
                teamList: [],        // 队伍
                teamId: null,        // 当前选中的队伍id
                list: [],            // 运动员列表
                total: null,         // 总条目数
                listLoading: false,
                listQuery: {
                    current: 1,
                    pageSize: 10,
                    teamId: null    // 当前选中的队伍id
                },
            }
        },
        created() {
            this.getAllTeam();
        },
        methods: {
            // 获取所有队伍信息（不分页）
            getAllTeam() {
                getTeamListAll().then(res => {
                    if(res.data.code === 200) {
                        this.teamList = res.data.data;
                        this.listQuery.teamId = this.teamList[0].teamId;
                        this.teamId = this.teamList[0].teamId;
                        this.listLoading = true;
                        this.getList();
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    console.log('获取队伍列表失败')
                })
            },

            // 获取运动员列表
            getList() {
                this.listLoading = true;
                getAthleteList(this.listQuery).then(res => {
                    this.listLoading = false;
                    if(res.data.code === 200) {
                        const data = res.data.data;
                        this.list = data.list;
                        this.total = data.pagination.total;
                        this.listQuery.pageSize = data.pagination.pageSize;
                        this.listQuery.current = data.pagination.current;
                        this.selectRow(this.list[0]) // 默认选择第一行数据
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    this.listLoading = false;
                    console.log('获取运动员列表失败');
                })
            },

            // 点击行
            selectRow(row) {
                console.log(row)
                this.$emit('getAthleteInfo', row)
            },

            // 切换队伍
            changeTeam(teamId) {
                this.listQuery.teamId = teamId;
                this.getList();
            },

            // 格式化表头
            renderHeader(h, column) {
                let title = column.column.label.split(',');
                return [h('p', {}, [title[0]]),h('p', {}, [title[1]])]
            },

            // 改变每页显示条目数
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList()
            },

            // 跳转到指定页数
            handleCurrentChange(val) {
                this.listQuery.currentPage = val;
                this.getList()
            },
        }
    })
</script>

<style lang="scss" scoped>
    .row-item {
        margin-bottom: 50px;
        &:last-child {
            margin-bottom: 0;
        }
        .el-input {
            width: 100% !important;
        }
        .title {
            text-align: center;
            color: #333;
            margin-bottom: 10px;
        }
    }

</style>