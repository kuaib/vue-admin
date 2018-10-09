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
                      style="width: 100%"
                        ref="athleteTable"
                        :row-class-name="tableRowClassName">
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
                               :current-page="listQuery.currentPage" :page-sizes="[10,20,30,50]"
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
    import bus from '@/utils/bus.js'
    export default ({
        data() {
            return {
                teamList: [],        // 队伍
                teamId: null,        // 当前选中的队伍id
                list: [],            // 运动员列表
                total: null,         // 总条目数
                listLoading: false,
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    teamId: null    // 当前选中的队伍id
                },


            }
        },
        created() {
            this.getAllTeam();

        },
        mounted() {
            bus.$on('changeAthlete', (count) => {
                if(this.total <= this.listQuery.pageSize) { // 只有一页数据
                    this.$refs.athleteTable.setCurrentRow(this.list[count])
                    if(count + 1 >= this.total) {
                        bus.$emit('resetCount') // -1是因为：重置之后直接++，不能获取到0索引数据
                        bus.$emit('setAthleteRow', this.list[0]); // 将当前远动员数据行传递过去
                        this.$refs.athleteTable.setCurrentRow(this.list[0])
                    } else {
                        bus.$emit('setAthleteRow', this.list[count]); // 将当前远动员数据行传递过去
                    }
                } else { // 多页
                    // 不是最后一页
                    if(this.listQuery.currentPage * this.listQuery.pageSize < this.total) {
                        if(count +1 <= this.list.length) {
                            this.$refs.athleteTable.setCurrentRow(this.list[count])
                        } else {
                            bus.$emit('resetCount');
                            this.listQuery.currentPage++
                            this.handleCurrentChange(this.listQuery.currentPage)
                        }
                    } else { // 最后一页
                        this.$refs.athleteTable.setCurrentRow(this.list[count])
                        if(count + 1 > this.total % this.listQuery.pageSize) {
                            bus.$emit('resetCount');
                            this.listQuery.currentPage = 1;
                            this.handleCurrentChange(1)
                        }
                    }
                    bus.$emit('setAthleteRow', this.list[count]); // 将当前远动员数据行传递过去
                }
                console.log('当前的运动员索引' + count)
                // bus.$emit('setAthleteRow', this.list[count]); // 将当前远动员数据行传递过去
            })
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
                        this.listQuery.currentPage = data.pagination.current;
                        this.$nextTick(() => { // 默认选择第一行数据
                            this.$refs.athleteTable.setCurrentRow(this.list[0])
                            this.selectRow(this.list[0])
                        },0)
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
                bus.$emit('resetCount', row.index); // 设置当前索引
                bus.$emit('setAthleteRow', row); // 传递当前运动员行信息
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

            // 把每一行的索引放进row(行的回调方法)
            tableRowClassName({row, rowIndex}) {
                row.index = rowIndex
            }
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