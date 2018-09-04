<template>
    <el-dialog title="客户过滤" :visible.sync="dialogShow">
        <el-row type="flex" justify="space-between">
            <el-col :span="8">
                <el-select v-model="choosedItem" placeholder="请选择客户类型" ref="selectItem">
                    <el-option :value="optionVal">
                        <el-tree :data="trees" :props="defaultProps" @node-click="chooseTreeItem"></el-tree>
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="8">
                <el-input placeholder="请输入名称/编码关键字" v-model="keywords">
                    <el-button slot="append" icon="el-icon-search" @click="keywordsSearch"></el-button>
                </el-input>
            </el-col>
        </el-row>

        <el-row class="table">
            <el-table :data="tableList" border style="width: 100%;margin-top: 10px;" height="250" highlight-current-row @current-change="chooseTableItem">
                <el-table-column property="ccode" label="编码" width="150" align="center"></el-table-column>
                <el-table-column property="cname" label="名称" width="200" align="center"></el-table-column>
                <el-table-column property="deptName" label="部门" align="center"></el-table-column>
                <el-table-column property="cmobile" label="手机" align="center"></el-table-column>
            </el-table>
        </el-row>

        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogShow = false">取 消</el-button>
            <el-button type="primary" @click="sure">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
    import { getCustomerType, getCustomerList } from '@/api/salesManage/doct.js'
    export default({
      data() {
        return {
          dialogShow: false, // 是否显示该dialog
          tableList: [], // 列表
          choosedItem: '', // 树形的选中项
          trees: [ // 树形
            { cname: '全部', children: [] }
          ],
          defaultProps: { // 格式化名字，组件中提供的，可根据接口中的名称来自定义
            children: 'children',
            label: 'cname'
          },

          keywords: '', // 搜索关键字
          tempSelect: null, // 临时选择的表格行
          optionVal: '' // select下拉需要的一个绑定数据，但没有实际用途
        }
      },
      created() {
        this.initCustomerList()
    },
      methods: {
        // 初始化表格信息
        initCustomerList() {
          // getCustomerList(this.choosedType, this.cusKeywords).then(res => {
          //     if(res.code == '200') {
          //         this.tableList = res.data.row;
          //         this.$emit('initTable',this.tableList)
          //     } else {
          //         this.$message.error(res.data.msg)
          //     }
          // }).catch(() => {
          //     console.log('获取客户列表失败！')
          // })
          // 假数据
          console.log('客户列表初始化啦')
          this.tableList = [
            { 'cguid': '运营', 'ccode': '0009', 'cname': '张三', 'value': '张三' },
            { 'cguid': '运营', 'ccode': '0008', 'cname': '李四', 'value': '李四' }
          ]
          this.$emit('initTable', this.tableList)
        },
        // 初始化树结构
        initTrees() {
          // getDepartment().then(res => {
          //     if(res.code == '200') {
          //         this.trees[0].children = res.data.rows;
          //     } else {
          //         this.$message.errow(res.data.msg)
          //     }
          // }).catch(() => {
          //     console.log('获取部门信息失败！')
          // })
          // 假数据
          this.trees[0].children = [
            { 'cname': '财务部' },
            { 'cname': '环境建设部', children: [
              { 'cname': '不提供热服务部' },
              { 'cname': '热力资源部' }
            ] },
            { 'cname': '互联网中心' },
            { 'cname': '用户运营中心', children: [
              { 'cname': '设计部' },
              { 'cname': '用户运营部' }
            ] }
          ]
        },

        // 显示dialog
        openDialog() {
          this.dialogShow = true
          this.$emit('initList')
          if (!this.trees[0].children.length) { // 保证只初始化一次
            this.initTrees()
          }
        },
        // 选中树形结构中的项--搜素
        chooseTreeItem(data) {
          console.log(data)
          if (!data.children || data.children == '全部') {
            this.choosedItem = data.cname // 只显示最后一级别
            this.$emit('initList')
            document.querySelector('.el-select-dropdown').style.display = 'none'
            this.$refs.selectItem.blur()
          }
        },
        // 输入关键字搜索
        keywordsSearch() {
          this.$emit('initList')
        },
        // 设置某一行被选中（dialog中）
        // setCurrent(row) {
        //     this.$refs.singleTable.setCurrentRow(row);
        // },
        // 点选表格，选中当前行
        chooseTableItem(val) {
          this.tempSelect = val
        },

        // 点击职员dialog的确定按钮
        sure() {
          this.dialogShow = false
          if (this.tempSelect) {
            this.$emit('setItem', this.tempSelect.cname)
            this.tempSelect = ''
          }
        }
      }
    })
</script>

<style scoped lang="scss">
    .el-select-dropdown__item {
        height: inherit;
        padding: 0;
    }
    .table {
        padding: 1px;
    }
</style>