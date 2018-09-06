<template>
    <div class="salesOrderList-container">
        <el-row type="flex" justify="end">
            <el-button type="primary" @click="toAdd">新增</el-button>
            <el-button v-permission="['editor']" type="primary">查看</el-button>
            <el-button type="primary" @click="resetTable">重置</el-button>
            <el-button type="primary">修改</el-button>
            <el-button type="primary">删除</el-button>
            <el-button type="primary">查询</el-button>
            <el-button type="primary">导出</el-button>
        </el-row>
        <el-row class="table-wrapper">
            <el-table
                    :header-cell-style="setRowStyle"
                    :data="salesOrderList"
                    max-height="500"
                    border
                    highlight-current-row
                    style="width: 100%">
                <el-table-column type="selection"></el-table-column>
                <el-table-column align="center"
                                 prop="date"
                                 label="单据日期"
                                 width="180">
                </el-table-column>
                <el-table-column align="center"
                                 prop="code"
                                 label="单据编号"
                                 width="180">
                </el-table-column>
                <el-table-column align="center"
                                 prop="customer"
                                 label="客户">
                </el-table-column>
                <el-table-column align="center"
                                 prop="employee"
                                 label="客户">
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                    background
                    @size-change="changePageSize"
                    @current-change="toCurrentPage"
                    :current-page.sync="page.currentPage"
                    :page-sizes="[1, 200, 300, 400]"
                    :page-size="page.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.totalPage">
            </el-pagination>
        </el-row>
    </div>
</template>
<script>
    import {getSalesOrderList} from '@/api/salesManage/doct'
    import permission from '@/directive/permission/index.js' // 权限判断指令
    export default ({
        directives: {permission},
        data() {
            return {
                salesOrderList: [], // 列表数据
                page: { // 关于表格分页的数据
                    pageSize: 1,
                    pageNum: 1,
                    totalPage: 0,
                    currentPage: 1
                }
            }
        },
        created() {
            this.initTableList()
        },
        methods: {
            resetTable() {
                // 有sync修饰符才能重置分页
                this.page.currentPage = 1
            },
            initTableList() {
                // getSalesOrderList().then(res => {
                // 	if(res.code == '200') {
                // 		this.salesOrderList = res.data.rows;
                // 	} else {
                // 		this.$message.error(res.msg)
                // 	}
                // }).catch(() => {
                // 	console.log('获取销售订单列表失败！')
                // })
                // 假数据
                this.page.pageSize = 12
                this.page.totalPage = 100
                this.salesOrderList = [
                    {date: '2018-07-29', code: 'XSDD-2018072900000', customer: 'KH10003', 'employee': '潘海琪'},
                    {date: '2018-07-29', code: 'XSDD-2018072900000', customer: 'KH10003', 'employee': '潘海琪'},
                    {date: '2018-07-29', code: 'XSDD-2018072900000', customer: 'KH10003', 'employee': '潘海琪'},
                    {date: '2018-07-29', code: 'XSDD-2018072900000', customer: 'KH10003', 'employee': '潘海琪'}
                ]
            },
            // 跳转新增页
            toAdd() {
                this.$router.push({name: 'salesOrderAdd'})
            },
            // 点击翻页
            toCurrentPage(pageNum) {
                this.page.pageNum = parseInt(pageNum, 10)
                this.initTableList() // 翻页请求数据
                console.log(pageNum)
            },

            // 改变每页显示的数据条数
            changePageSize(pageSize) {
                this.page.pageSize = pageSize
                this.initTableList()
                console.log(pageSize)
            },

            // 设置表头颜色
            setRowStyle({row, column, rowIndex, columnIndex}) {
                if (rowIndex == 0) {
                    return 'background: #f5f5f5'
                }
            }
        }
    })
</script>
<style lang="scss" scoped>
    // >20,才能让表格的border都显示
    .table-wrapper {
        margin-top: 22px;
    }
</style>
