<template>
    <section>
        <el-row type="flex" justify="space-between" class="content-wrapper">
            <el-col :span="4" class="tree">
                <el-tree :data="treeData" :props="defaultProps" @node-click="selectType"></el-tree>
            </el-col>
            <el-col :span="19" class="table">
                <el-row type="flex" justify="space-between" style="margin-bottom: 10px">
                    <el-col :span="8">
                        <el-input placeholder="请输入客户名称" v-model="clientName">
                            <el-button slot="append" icon="el-icon-search" @click="getTableList"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-row type="flex" justify="space-between">
                            <el-button type="primary" @click="toAdd">新增</el-button>
                            <el-button type="success">查看</el-button>
                            <el-button type="warning">修改</el-button>
                            <el-button type="danger">删除</el-button>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-table 
                            border
                            :data="clientList"
                            style="width: 100%"
                            @selection-change="selectTableRows">
                        <el-table-column
                          type="selection"
                          width="55">
                        </el-table-column>
                        <el-table-column
                            prop="className"
                            label="客户分类名称"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="cname"
                            label="客户名称"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="cagency"
                            label="经销商">
                        </el-table-column>
                        <el-table-column
                            prop="employeeName"
                            label="客户经理">
                        </el-table-column>
                        <el-table-column
                            prop="cindustry"
                            label="行业">
                        </el-table-column>
                        <el-table-column
                            prop="cmodel"
                            label="经营模式">
                        </el-table-column>
                        <el-table-column
                            prop="cstatus"
                            label="状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.cstatus=='Y'" style="color:#30B08F">已审核</span>
                                <span v-if="scope.row.cstatus=='N'" style="color:#ccc">未审核</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <el-pagination
                      background
                      @size-change="changePageSize"
                      @current-change="toCurrentPage"
                      :current-page="page.currentPage"
                      :page-sizes="[1, 200, 300, 400]"
                      :page-size="page.pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="page.totalPage">
                    </el-pagination>
                </el-row>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import { getClientApllyList, getClientType } from '@/api/salesManage/baseData'
    export default {
        data() {
          return {
            clientList: [],     // 客户数据列表
            clientName: '',     // 输入的客户名称(用于查询)
            clientType: '',     // 选择的客户类型
            page: {             // 关于表格分页的数据
                pageSize: 1,
                pageNum: 1,
                totalPage: 0,
                currentPage: 1
            },
            treeData: [],
            defaultProps: {
              children: 'children',
              label: 'label'
            },
            loading: true
          };
        },
        created() {
            this.getTreeData();  // 初始化树形结构
            this.getTableList(); // 初始化表格数据
        },
        methods: {
            // 初始化树形结构
            getTreeData() {
                // getClientType().then(res => {
                //     if(res.code == '200') {
                //         this.treeData = res.data;
                //     } else {
                //         this.$message.erro(res.data.msg);
                //     }
                // }).catch( () => {
                //     console.log('获取客户类型失败！')
                // })
                // 假数据
                this.treeData = [{
                    label: '全部',
                    children: [{
                        label: '测试',
                        children: [{
                            label: '测试-1',
                            children: [{
                                label: '测试-1-1'
                                
                            }]
                        },{
                            label: '测试-2'
                        }]
                    },{
                        label: '市场',
                        children: [{
                            label: '三级 1-1-1'
                        }]
                    },{
                        label: '运营',
                    }]
                }];
            },
            // 初始化表格数据(可带查询条件)
            getTableList() {
                // getClientApllyList({name: this.clientName, type: this.clientType,this.page.pageNum,this.page.pageSize}).then(res => {
                //     this.clientList = res.rows
                //     this.page.pageSize = res.pageSize,
                //     this.page.totalPage = res.totalPage,
                // }).catch(() => {
                //     console.log(' 客户数据列表请求失败！')
                // })

                // 暂用假数据
                this.page.pageSize = 12,
                this.page.totalPage = 100,
                this.clientList = [{
                    'className': '运营',
                    'cname': '运营1',
                    'cagency': '旌招-北京',
                    'employeeName': '潘海琪',
                    'cindustry': '食品',
                    'cmodel': '直营现代渠道',
                    'cstatus': 'Y'
                },{
                    'className': '运营',
                    'cname': '运营2',
                    'cagency': '旌招-北京',
                    'employeeName': '潘海琪',
                    'cindustry': '食品',
                    'cmodel': '直营现代渠道',
                    'cstatus': 'N'
                },{
                    'className': '运营',
                    'cname': '运营3',
                    'cagency': '旌招-北京',
                    'employeeName': '潘海琪',
                    'cindustry': '食品',
                    'cmodel': '直营现代渠道',
                    'cstatus': 'Y'
                }]
            },

            // 选择树中的类型
            selectType(type) {
                if(type.label == '全部' || !type.children) {
                    this.clientType = type.label;
                    this.getTableList();
                    console.log(type)
                }
            },

            // 点击翻页
            toCurrentPage(pageNum) {
                this.page.pageNum = parseInt(pageNum, 10);
                this.getTableList(); // 翻页请求数据
                console.log(pageNum)
            },

            // 改变每页显示的数据条数
            changePageSize(pageSize) {
                this.page.pageSize = pageSize;
                this.getTableList();
                console.log(pageSize)
            },

            // 选择表格行(可多选)
            selectTableRows(val) {
                console.log(val) // value是选中的所有行的数据
            },

            // 新增
            toAdd() {
                this.$router.push({name: 'clientFilesAdd'})
            }
        }
    };
</script>

<style scoped lang="scss">
    @import '../../../../styles/element-ui.scss';
    .content-wrapper {
        border: 1px solid #ccc;
        .tree {
            border-right: 1px solid #ccc;
        }
        .table {
            padding: 12px;
            border-left: 1px solid #ccc;
        }
    }
</style>