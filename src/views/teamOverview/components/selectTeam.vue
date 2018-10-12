<template>
    <div>
        <div class="row-item actBtn clearfix">
            <el-button class="search" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索 Search</el-button>
        </div>

        <div class="row-item">
            <el-select clearable v-model="listQuery.specialId" placeholder="请选择项目 Select Sport">
                <el-option v-for="item in specialList" :label="item.dicValue" :value="item.dicKey"
                           :key="item.dicKey"></el-option>
            </el-select>
        </div>
        <div class="row-item">
            <el-select clearable v-model="listQuery.organizationId" placeholder="请选择单位 Select Unit">
                <el-option v-for="item in orgList" :label="item.dicValue" :value="item.dicKey"
                           :key="item.dicKey"></el-option>
            </el-select>
        </div>
        <div class="row-item">
            <el-select clearable v-model="listQuery.categoryId" placeholder="请选择类别 Select Class">
                <el-option v-for="item in cateList" :label="item.dicValue" :value="item.dicKey"
                           :key="item.dicKey"></el-option>
            </el-select>
        </div>
        <div class="row-item">
            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="请输入队名 Enter Team Name" v-model="listQuery.searchKey">
                </el-input>
        </div>


        <div class="row-item">
            <div class="title">队伍列表 Team List</div>
            <el-table :data="list" v-loading="listLoading" border fit highlight-current-row @row-click="selectRow"
                      style="width: 100%" ref="teamTable">
                <el-table-column align="center" :render-header="renderHeader" label="队名 Name">
                    <template slot-scope="scope">
                        <span>{{scope.row.teamName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="项目 Sport">
                    <template slot-scope="scope">
                        <span>{{scope.row.specialName}}</span>
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
    import { getTeamList } from '@/api/team'
    export default ({
        directives: {waves},
        data() {
            return {
                list: [],       // 队伍列表
                listLoading: false,

                specialList: [],    // 项目
                orgList: [],        // 单位
                cateList: [],       // 类别

                total: null,        // 总条目数
                listQuery: {
                    current: 1,
                    pageSize: 10,
                    searchKey: null,
                    specialId: null,
                    categoryId: null,
                    organizationId: null
                }
            }
        },
        created() {
           this.getList();   // 队伍列表
           this.getSelectList();// 其他下拉列表
        },
        methods: {
            // 获取下拉选项
            getSelectList() {
                getAllDic().then(res => {
                    if (res.data.code === 200) {
                        const data = res.data.data;
                        this.specialList = data.specialList; // 项目
                        this.orgList = data.orgList;    // 单位
                        this.cateList = data.cateList;  // 类别
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

            // 获取队伍列表
            getList() {
                this.listLoading = true;
                // getTeamList(this.listQuery.current, this.listQuery.pageSize, this.listQuery.keyWord).then(res => {
                getTeamList({
                    specialId: this.listQuery.specialId,
                    orgId: this.listQuery.organizationId,
                    cateId: this.listQuery.categoryId,
                    currentPage: this.listQuery.current,
                    pageSize: this.listQuery.pageSize,
                    keyWord: this.listQuery.searchKey,
                }).then(res => {
                    this.listLoading = false;
                    if (res.data.code === 200) {
                        const data = res.data.data;
                        this.list = data.list;
                        this.total = data.pagination.total;
                        this.listQuery.current = data.pagination.current;
                        this.$nextTick(() => { // 默认选择第一行数据
                            this.$refs.teamTable.setCurrentRow(this.list[0])
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
                    console.log('获取队伍列表失败')
                })
            },

            // 点击行
            selectRow(row) {
                this.$emit('getTeamInfo', row)
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

            // 格式化表头
            renderHeader(h, column) {
                let title = column.column.label.split(' ');
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
    .actBtn {
        .add {
            float: left;
        }
        .search {
            float: right;
        }
    }

</style>