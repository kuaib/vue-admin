<template>
    <div>
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
                      style="width: 100%">
                <el-table-column align="center" label="姓名 Name">
                    <template slot-scope="scope">
                        <span>{{scope.row.athleteName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="项目 Sport">
                    <template slot-scope="scope">
                        <span>{{scope.row.specialName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="性别 Gender" width="50">
                    <template slot-scope="scope">
                        <span>{{scope.row.gender==1?'男':'女'}}</span>
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
    import waves from '@/directive/waves' // 水波纹指令
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
                    current: 1,
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

            // 点击搜索
            handleFilter() {
                this.listQuery.current = 1;
                this.getList()
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

            // 跳转新建运动员
            addAthelet() {
                this.$router.push({path: '/athleteCentral/add'})
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
    .actBtn {
        .add {
            float: left;
        }
        .search {
            float: right;
        }
    }

</style>