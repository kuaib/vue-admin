<template>
	<section>
		<el-table :data="tableList" border highlight-current-row style="width: 100%;" height="250">
	        <el-table-column fixed type="index" width="40" prop="lineNumber" align="center" header-align="center">
	        </el-table-column>
	        <el-table-column fixed label="操作" width="80" align="center" header-align="center">
	            <template slot-scope="scope">
	                <i class="el-icon-delete" @click="handleDel(scope.$index, scope.row)"></i>
	                <i class="el-icon-plus" @click="addRow(scope.$index)"></i>
	            </template>
	        </el-table-column>
	        
	         <el-table-column prop="prodName" label="物品名称" width="230" align="center" header-align="center">
	            <template slot-scope="scope">
	            	<el-autocomplete v-if="scope.row.prodName.editFlag"
						v-model="scope.row.prodName.value"
						:fetch-suggestions="handleSearch"
						:trigger-on-focus="false"
						v-focus
						@select="selectCb(scope)">
	                    <i class="el-icon-more el-input-icon" slot="suffix" @click="openGoodsDialog(scope)"></i>
	                </el-autocomplete>
	                <div v-else class="table-item-div" @click="editRow(scope)">{{scope.row.prodName.value}}</div>
	            </template>
	        </el-table-column>
	            
	        <el-table-column prop="igiveaway" label="是否赠品" width="100" align="center" header-align="center">
	            <template slot-scope="scope">
                    <el-select v-if="scope.row.igiveaway.editFlag" @change="selectCb(scope)" v-model="scope.row.igiveaway.value">
                        <el-option
                          v-for="item in isGiveaway"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          >
                        </el-option>
                    </el-select>
	                <div v-else class="table-item-div" @click="editRow(scope)">{{scope.row.igiveaway.value}}</div>
	            </template>
	        </el-table-column>
	        <el-table-column prop="warehouse" label="仓库" width="120" align="center" header-align="center">
	            <template slot-scope="scope">
                    <el-select v-if="scope.row.warehouse.editFlag" @change="selectCb(scope)" v-model="scope.row.warehouse.value">
                        <el-option
                          v-for="item in warehouse"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          >
                        </el-option>
                    </el-select>
	                <div v-else class="table-item-div" @click="editRow(scope)">{{scope.row.warehouse.value}}</div>
	            </template>
	        </el-table-column>
	        <el-table-column prop="unit" label="单位" width="120" align="center" header-align="center">
	            <template slot-scope="scope">
	                <el-input v-if="scope.row.unit.editFlag" v-model="scope.row.unit.value" v-focus></el-input>
	                <div v-else class="table-item-div" @click="editRow(scope)">{{scope.row.unit.value}}</div>
	            </template>
	        </el-table-column>
	        <el-table-column prop="num" label="数量" width="120" align="center" header-align="center">
	            <template slot-scope="scope">
	                <el-input v-if="scope.row.num.editFlag" v-model="scope.row.num.value" v-focus></el-input>
	                <div v-else class="table-item-div" @click="editRow(scope)">{{scope.row.num.value}}</div>
	            </template>
	        </el-table-column>
	        <el-table-column prop="price" label="报价" width="120" align="center" header-align="center">
	            <template slot-scope="scope">
	                <el-input v-if="scope.row.price.editFlag" v-model="scope.row.price.value" v-focus></el-input>
	                <div v-else class="table-item-div" @click="editRow(scope)">{{scope.row.price.value}}</div>
	            </template>
	        </el-table-column>
	        <el-table-column prop="price" label="含税报价" width="120" align="center" header-align="center">
	            <template slot-scope="scope">
	                <el-input v-if="scope.row.price.editFlag" v-model="scope.row.price.value" v-focus></el-input>
	                <div v-else class="table-item-div" @click="editRow(scope)">{{scope.row.price.value}}</div>
	            </template>
	        </el-table-column>
	        <el-table-column prop="price" label="单价" width="120" align="center" header-align="center">
	            <template slot-scope="scope">
	                <el-input v-if="scope.row.price.editFlag" v-model="scope.row.price.value" v-focus></el-input>
	                <div v-else class="table-item-div" @click="editRow(scope)">{{scope.row.price.value}}</div>
	            </template>
	        </el-table-column>
	        <el-table-column prop="price" label="含税单价" width="120" align="center" header-align="center">
	            <template slot-scope="scope">
	                    <el-input v-if="scope.row.price.editFlag" v-model="scope.row.price.value" v-focus></el-input>
	                <div v-else class="table-item-div" @click="editRow(scope)">{{scope.row.price.value}}</div>
	            </template>
	        </el-table-column>
	        <el-table-column prop="price" label="金额" width="120" align="center" header-align="center">
	            <template slot-scope="scope">
	                <el-input v-if="scope.row.price.editFlag" v-model="scope.row.price.value" v-focus></el-input>
	                <div v-else class="table-item-div" @click="editRow(scope)">{{scope.row.price.value}}</div>
	            </template>
	        </el-table-column>
	        <el-table-column prop="price" label="税率(%)" width="120" align="center" header-align="center">
	            <template slot-scope="scope">
	                <el-input v-if="scope.row.price.editFlag" v-model="scope.row.price.value" v-focus></el-input>
	                <div v-else class="table-item-div" @click="editRow(scope)">{{scope.row.price.value}}</div>
	            </template>
	        </el-table-column>
	        <el-table-column prop="price" label="税额" width="120" align="center" header-align="center">
	            <template slot-scope="scope">
	                <el-input v-if="scope.row.price.editFlag" v-model="scope.row.price.value" v-focus></el-input>
	                <div v-else class="table-item-div" @click="editRow(scope)">{{scope.row.price.value}}</div>
	            </template>
	        </el-table-column>
	        <el-table-column prop="price" label="价税合计" width="120" align="center" header-align="center">
	            <template slot-scope="scope">
	                <el-input v-if="scope.row.price.editFlag" v-model="scope.row.price.value" v-focus></el-input>
	                <div v-else class="table-item-div" @click="editRow(scope)">{{scope.row.price.value}}</div>
	            </template>
	        </el-table-column>
	        <el-table-column prop="price" label="折扣率(%)" width="120" align="center" header-align="center">
	            <template slot-scope="scope">
	                <el-input v-if="scope.row.price.editFlag" v-model="scope.row.price.value"></el-input>
	                <div v-else class="table-item-div" @click="editRow(scope)">{{scope.row.price.value}}</div>
	            </template>
	        </el-table-column>
	        <el-table-column prop="price" label="折扣额" width="120" align="center" header-align="center">
	            <template slot-scope="scope">
	                <el-input v-if="scope.row.price.editFlag" v-model="scope.row.price.value" v-focus></el-input>
	                <div v-else class="table-item-div" @click="editRow(scope)">{{scope.row.price.value}}</div>
	            </template>
	        </el-table-column>
	        <el-table-column prop="price" label="批次" width="120" align="center" header-align="center">
	            <template slot-scope="scope">
	                <el-input v-if="scope.row.price.editFlag" v-model="scope.row.price.value" v-focus></el-input>
	                <div v-else class="table-item-div" @click="editRow(scope)">{{scope.row.price.value}}</div>
	            </template>
	        </el-table-column>
	        <el-table-column prop="price" label="备注" width="120" align="center" header-align="center">
	            <template slot-scope="scope">
	                <el-input v-if="scope.row.price.editFlag" v-model="scope.row.price.value" v-focus></el-input>
	                <div v-else class="table-item-div" @click="editRow(scope)">{{scope.row.price.value}}</div>
	            </template>
	        </el-table-column>
	    </el-table>

	    <!-- 物品列表弹窗 -->
	    <!--<goods-dialog ref="goodsDialog" :tableList="goodsList" @initList="initGoodsList" @setItem="setGoods"></goods-dialog>-->
	    <goods-dialog ref="goodsDialog" @initTable="initGoodsList" @setItem="setGoods"></goods-dialog>
	</section>
	
</template>

<script>
	import goodsDialog from '@/components/DialogTableSearch/goodsDialog'
	import { getGoodsList } from '@/api/salesManage/doct.js'
	export default({
	  data() {
	    return {
	      tableList: [],	// 表格列表
	      goodsList: [],	// 物品列表
	      tempRowIdx: null,	// 暂时点击的空的表格的行索引(用于物品名称回显时使用)
	      isGiveaway: [		// 是否赠品下拉选项
	        { label: '是', value: '是' },
	        { label: '否', value: '否' }
	      ],
	      warehouse: [		// 仓库下拉选项(后续可能会是接口)
	        { label: '普洛斯', value: '普洛斯' },
	        { label: '辉山库', value: '辉山库' }
	      ]
	    }
	  },
	  props: {},
	  components: {
	    goodsDialog
	  },
	  created() {
	    this.initTable()
	},
	  methods: {
	    // 初始化物品列表
	    initGoodsList(goods) {
      this.goodsList = goods
	    },
	    // 初始化明细信息表格空数据
    initTable() {
      var data = [
        {
          lineNumber: '1',
          prodName: { value: '', editFlag: false },
          igiveaway: { value: '否', editFlag: false },
          warehouse: { value: '', editFlag: false },
          unit: { value: '', editFlag: false },
          num: { value: '0.00', editFlag: false },
          price: { value: '', editFlag: false }
        },
        {
          lineNumber: '1',
          prodName: { value: '', editFlag: false },
          igiveaway: { value: '否', editFlag: false },
          warehouse: { value: '', editFlag: false },
          unit: { value: '', editFlag: false },
          num: { value: '0.00', editFlag: false },
          price: { value: '', editFlag: false }
        }
      ]
      this.tableList = data
    },

    // 增加一条表格行
    addRow(index) {
      this.tableList.splice(index + 1, 0, {
        lineNumber: '1',
        prodName: { value: '', editFlag: false },
        igiveaway: { value: '否', editFlag: false },
        warehouse: { value: '', editFlag: false },
        unit: { value: '', editFlag: false },
        num: { value: '0.00', editFlag: false },
        price: { value: '', editFlag: false }
      })
    },
    // 删除一条表格行
    handleDel: function(index, row) {
      this.tableList.splice(index, 1)
    },

    // 聚焦(使除了自己以外的所有数据都失去焦点，自己聚焦)
    editRow(scope) {
      var columnName = scope.column.property
      this.tableList.forEach((item, idx) => {
                	for (var key in this.tableList[idx]) {
                		if (this.tableList[idx][key].editFlag !== undefined) {
                			this.tableList[idx][key].editFlag = false
                		}
                	}
      })
      this.tableList[scope.$index][columnName].editFlag = true
    },

    // 手动输入搜索物品
    handleSearch(queryString, cb) {
      var searchList = this.goodsList
      var results = queryString ? searchList.filter(this.createFilter(queryString)) : searchList
      cb(results)
    },
    // 选中信息后的回调函数
    selectCb(scope) {
      var columnName = scope.column.property
      this.$nextTick(() => {
        this.tableList[scope.$index][columnName].editFlag = false
      })
    },

    // 过滤输入的内容
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },

    // 点击物品输入框的更多按钮
    openGoodsDialog(scope) {
            	this.tempRowIdx = scope.$index
            	this.$refs.goodsDialog.openDialog()
    },
    // 物品回显(点击dialog中的确定按钮)
    setGoods(goods) {
      // console.log(goods)
      // 后续可能还有别的赋值
      this.tableList[this.tempRowIdx].prodName.value = goods.name
      this.tableList[this.tempRowIdx].prodName.editFlag = false
    }

	  }
	})
</script>

<style scoped lang="scss">
	// 改变表格中的input输入框
    .el-table__row .el-form-item {
        margin-bottom: 0 !important;
    }

    .table-item-div {
        width:100%;
        height:36px;
        line-height: 36px;
    }

    // input的更多图标样式
    .el-icon-more {
        line-height: 36px;
    }
    .el-icon-more::before {
        font-size: 25px;
    }
</style>