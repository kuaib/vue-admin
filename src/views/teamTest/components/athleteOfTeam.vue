<template>
    <div>
        <div class="row-item">
            <el-select clearable v-model="teamId" placeholder="请选择队伍 Select Team">
                <el-option v-for="item in teamList" :label="item.teamName" :value="item.teamId"
                           :key="item.teamId"></el-option>
            </el-select>
        </div>
        <div class="row-item">
            <div class="title">运动员列表 Athlete List</div>
            <el-table :data="list" v-loading="listLoading" border fit highlight-current-row @row-click="selectRow"
                      style="width: 100%">
                <el-table-column align="center" label="English,Name">
                    <template slot-scope="scope">
                        <span>{{scope.row.athleteName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Chinese,Name">
                    <template slot-scope="scope">
                        <span>{{scope.row.specialName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="完成次数,No. of completion" width="80">
                    <template slot-scope="scope">
                        <span>{{scope.row.num}}</span>
                    </template>
                </el-table-column>
            </el-table>
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
                teamId: null,        // 当前选中的队伍
                list: [],            // 运动员列表
                listLoading: true
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
                getAthleteList({teamId: this.teamId}).then(res => {
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
                this.$emit('getAthleteInfo', row)
            },

            // 格式化表头
            renderHeader(h, column) {
                let title = column.column.label.split(',');
                return [h('p', {}, [title[0]]),h('p', {}, [title[1]])]
            }
        }
    })
</script>

<style lang="scss" scoped>
    .row-item {
        margin-bottom: 10px;
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