<template>
    <div class="athlete-select">
        <div class="row-item actBtn clearfix">
            <el-button class="add" type="primary" @click="addAthelet">
                <p>新建运动员</p>
                <p>Create Athlete</p>
            </el-button>
            <el-button class="search" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索 Search</el-button>
        </div>

        <div class="row-item">
            <el-select clearable v-model="listQuery.specialId" placeholder="请选择项目 Select Sport">
                <el-option v-for="item in specialList" :label="item.dicValue" :value="item.dicKey"
                           :key="item.dicKey"></el-option>
            </el-select>
        </div>
        <div class="row-item">
            <el-select clearable v-model="listQuery.teamId" placeholder="请选择队伍 Select Team">
                <el-option v-for="item in teamList" :label="item.teamName" :value="item.teamId"
                           :key="item.teamId"></el-option>
            </el-select>
        </div>
        <div class="row-item">
            <el-select clearable v-model="listQuery.genderId" placeholder="请选择性别 Select Gender">
                <el-option v-for="item in genderList" :label="item.dicValue" :value="item.dicKey"
                           :key="item.dicKey"></el-option>
            </el-select>
        </div>
        <div class="row-item">
            <el-select clearable v-model="listQuery.risk" placeholder="请选择损伤分数范围 Injury Score">
                <el-option v-for="item in riskList" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
        </div>
        <div class="row-item">
            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="请输入名字 Search Name" v-model="listQuery.searchKey">
                </el-input>
        </div>


        <div class="row-item">
            <div class="title">运动员列表 Athlete List</div>
            <el-table :data="list" v-loading="listLoading" border fit highlight-current-row @row-click="selectRow"
                      style="width: 100%" ref="athleteTable" :row-class-name="tableRowClassName">
                <el-table-column align="center" :render-header="renderHeader" label="姓名 Name">
                    <template slot-scope="scope">
                        <span>{{scope.row.athleteName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="项目 Sport">
                    <template slot-scope="scope">
                        <span>{{scope.row.specialName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="性别 Gender" width="80">
                    <template slot-scope="scope">
                        <span>{{scope.row.gender==1?'男':'女'}}</span>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination-container">
                <el-pagination @current-change="handleCurrentChange"
                               :current-page="listQuery.currentPage"
                               :pager-count="5"
                               :page-size="listQuery.pageSize" layout="prev, pager, next"
                               :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import waves from '@/directive/waves' // 水波纹指令
    import bus from '@/utils/bus.js' // 总线
    import { getAllDic } from '@/api/common'
    import { getTeamListAll } from '@/api/team'
    import { getAthleteList } from '@/api/athlete'
    export default ({
        directives: {waves},
        data() {
            return {
                teamList: [],       // 队伍
                specialList: [],    // 专项
                genderList: [{dicKey: '1', dicValue: '男'},{dicKey: '2', dicValue: '女'}],   // 性别
                riskList: ['0-9','10-19','20-29','30-59','60-69','70-79','80-89','90-100'], // 损伤分数范围

                total: null,        // 总条目数
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    searchKey: null,
                    teamId: null,
                    specialId: null,
                    genderId: null,
                    organizationId: null,
                    risk: null,
                },
                list: [], // 运动员列表
                listLoading: false
            }
        },
        created() {
           this.getAllTeam();   // 队伍列表
           this.getSelectList();// 其他下拉列表
           this.getList();      // 运动员列表
        },
        mounted() {
            bus.$on('changeAthlete1', (count) => {
                if(this.total <= this.listQuery.pageSize) { // 只有一页数据
                    this.$refs.athleteTable.setCurrentRow(this.list[count])
                    if(count + 1 > this.total) {
                        bus.$emit('resetCount1')
                        bus.$emit('setAthleteRow1', this.list[0]); // 将当前远动员数据行传递过去
                        this.$refs.athleteTable.setCurrentRow(this.list[0]);
                        bus.$emit('getAthleteInfo', this.list[0]); // 服务于看板和基本信息页面(使其数据更新)
                    } else {
                        bus.$emit('setAthleteRow1', this.list[count]); // 将当前远动员数据行传递过去
                        bus.$emit('getAthleteInfo', this.list[count]); // 服务于看板和基本信息页面(使其数据更新)
                    }
                } else { // 多页
                    // 不是最后一页
                    if(this.listQuery.currentPage * this.listQuery.pageSize < this.total) {
                        if(count +1 <= this.list.length) {
                            this.$refs.athleteTable.setCurrentRow(this.list[count]);
                        } else {
                            bus.$emit('resetCount1');
                            this.listQuery.currentPage++
                            this.handleCurrentChange(this.listQuery.currentPage)
                        }
                    } else { // 最后一页
                        this.$refs.athleteTable.setCurrentRow(this.list[count])
                        if(count + 1 > this.total % this.listQuery.pageSize) {
                            bus.$emit('resetCount1');
                            this.listQuery.currentPage = 1;
                            this.handleCurrentChange(1)
                        }
                    }
                    bus.$emit('setAthleteRow1', this.list[count]); // 将当前远动员数据行传递过去
                    bus.$emit('getAthleteInfo', this.list[count]); // 服务于看板和基本信息页面(使其数据更新)
                }
                console.log('当前的运动员索引' + count)
            })
        },
        methods: {
            // 获取下拉选项
            getSelectList() {
                getAllDic().then(res => {
                    if (res.data.code === 200) {
                        const data = res.data.data;
                        this.specialList = data.specialList;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch(rej => {
                    console.log('获取失败')
                })
            },
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
                getAthleteList(this.listQuery).then(res => {
                    this.listLoading = false;
                    if(res.data.code === 200) {
                        const data = res.data.data;
                        this.list = data.list;
                        this.total = data.pagination.total;
                        this.listQuery.currentPage = data.pagination.current;
                        this.$nextTick(() => { // 默认选择第一行数据
                            this.$refs.athleteTable.setCurrentRow(this.list[0])
                            this.selectRow(this.list[0])
                        })
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
                bus.$emit('resetCount1', row.index); // 设置当前索引(服务于测试页面)
                bus.$emit('setAthleteRow1', row);    // 传递当前运动员行信息(服务于测试页面)
                bus.$emit('getAthleteInfo', row);   // 服务于看板和基本信息页面
            },

            // 点击搜索
            handleFilter() {
                this.listQuery.currentPage = 1;
                this.getList()
            },

            // 跳转到指定页数
            handleCurrentChange(val) {
                this.listQuery.currentPage = val;
                this.getList()
            },

            // 跳转新建运动员
            addAthelet() {
                this.$router.push({path: '/athleteCentral/add'})
            },

            // 格式化表头
            renderHeader(h, column) {
                let title = column.column.label.split(' ');
                return [h('p', {}, [title[0]]),h('p', {}, [title[1]])]
            },

            // 把每一行的索引放进row(行的回调方法)
            tableRowClassName({row, rowIndex}) {
                row.index = rowIndex
            }
        }
    })
</script>

<style lang="scss">
    .athlete-select {
        .add {
            padding: 5px 10px;
        }
        .search {
            padding: 10px;
        }
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
        .actBtn {
            .add {
                float: left;
            }
            .search {
                float: right;
            }
        }
        .el-pager li {
            min-width: 25.5px !important;
        }
    }
</style>