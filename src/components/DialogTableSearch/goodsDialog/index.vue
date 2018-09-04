<template>
    <el-dialog title="物品过滤" :visible.sync="dialogShow">
        <el-row type="flex" justify="space-between">
            <el-col :span="8">
                <el-select v-model="choosedItem" placeholder="请选物品分类" ref="selectItem">
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
                <el-table-column property="type" label="物品分类" width="150" align="center"></el-table-column>
                <el-table-column property="code" label="物品编码" width="200" align="center"></el-table-column>
                <el-table-column property="name" label="物品名称" align="center"></el-table-column>
            </el-table>
        </el-row>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogShow = false">取 消</el-button>
            <el-button type="primary" @click="sure">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
    import { getGoodsTypes, getGoodsList } from '@/api/salesManage/doct.js'
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
        this.initTableList()
      },
      methods: {
        // 初始化列表
        initTableList() {
          // getGoodsList().then(res => {
          // 	if(res.code ="200") {
          // 		this.tableList = res.data.rows;
          //      this.$emit('initTable', this.tableList);
          // 	} else {
          // 		this.$message.error('获取物品列表失败！')
          // 	}
          // }).catch(() => {
          // 	console.log('error')
          // })

          // 假数据
          this.tableList = [
            { type: '水', code: 'RMH001', name: '水', value: '水' },
            { type: '水', code: 'RMH002', name: '草莓', value: '草莓' },
            { type: '面团', code: 'RMH003', name: '饼底', value: '饼底' },
            { type: '茶类', code: 'RMH004', name: '茉莉绿茶', value: '茉莉绿茶' },
            { type: '吸管', code: 'RMH005', name: '果蔬昔吸管', value: '果蔬昔吸管' }
          ]
          this.$emit('initTable', this.tableList)
        },

        // 初始化树结构
        initTrees() {
          // getGoodsTypes().then(res => {
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
            { 'cname': '半成品', children: [
              { 'cname': '希腊酸奶半成品', children: [
                { 'cname': '初步半成品' },
                { 'cname': '基料半成品' },
                { 'cname': '杯装半成品' }
              ] }
            ] },
            { 'cname': '食品生产原材料', children: [
              { 'cname': '大包装奶袋' },
              { 'cname': '包装纸' }
            ] },
            { 'cname': '物流包装', children: [
              { 'cname': '活动材料' },
              { 'cname': '宣传材料' }
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
            this.$emit('setItem', this.tempSelect)
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