<template>
    <section>
        <el-form  ref="form" :model="form" :rules="rules" label-width="100px">
            <!-- 基本信息 -->
            <section>
                <el-row type="flex" class="row-item" justify="space-between">
                    <el-col :span="4"><div class="grid-content title">基本信息</div></el-col>
                    <el-col :span="3">
                        <el-row type="flex" justify="space-between">
                            <el-button type="primary" @click="submitForm('form')">保存</el-button>
                            <el-button @click="resetForm('form')">重置</el-button>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="销售订单号" prop="saleOrderNum">
                            <el-input v-model="form.saleOrderNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="单据日期" prop="orderDate">
                        <el-date-picker type="date" placeholder="单据日期" v-model="form.orderDate" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="交货日期" prop="subProdDate">
                            <el-date-picker type="date" placeholder="交货日期" v-model="form.subProdDate" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="职员" prop="employee">
                            <el-autocomplete
                              v-model="form.employee"
                              :fetch-suggestions="searchEmploy"
                              :trigger-on-focus="false"
                              @select="empSelCb"
                            >
                                <i
                                class="el-icon-more el-input-icon"
                                slot="suffix"
                                
                                @click="openEmpDialog">
                              </i>
                            </el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="客户" prop="customer">
                            <el-autocomplete
                              v-model="form.customer"
                              :fetch-suggestions="searchCustomer"
                              :trigger-on-focus="false"
                              @select="customerSelCb"
                            >
                                <i
                                class="el-icon-more el-input-icon"
                                slot="suffix"
                                @click="openCusDialog">
                              </i>
                            </el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="收货地址" prop="address">
                            <el-select v-model="form.address" placeholder="请选择收货地址" style="width:100%">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="联系人">
                            <el-input v-model="form.linkman"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系电话">
                            <el-input v-model="form.linktel"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </section>

            <!--明细信息-->
            <section>
                <el-row type="flex" class="row-item" justify="space-between">
                    <el-col :span="4"><div class="grid-content title">明细信息</div></el-col>
                    <el-col :span="4"></el-col>
                </el-row>
                <edit-table></edit-table>
            </section>
            
            <!-- 其他信息 -->
            <section style="margin-top: 20px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注信息">
                            <el-input type="textarea" v-model="form.remark"></el-input>   
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="优惠率%">
                            <el-input v-model="form.conRate"></el-input>   
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="优惠金额">
                            <el-input v-model="form.conPrice"></el-input>   
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="优惠后金额">
                            <el-input v-model="form.hasConPrice"></el-input>   
                        </el-form-item>
                    </el-col>
                </el-row>
            </section>
        </el-form>

        <!-- 更多职员的dialog -->
        <employee-dialog ref="empDialog" @initTable="initEmployeeList" @setItem="setEmployee"></employee-dialog>

        <!-- 更多客户的dialog -->
        <customer-dialog ref="cusDialog" @initTable="initCustomerList" @setItem="setCustomer"></customer-dialog>
    </section>
</template>

<script>
    import customerDialog from '@/components/DialogTableSearch/customerDialog'
    import employeeDialog from '@/components/DialogTableSearch/employeeDialog'
    import editTable from './components/editTable'
    import { getEmployeeList, getCustomerList, getDepartment, getCustomerType } from '@/api/salesManage/doct.js'
    export default {
      data() {
        return {
          form: {
            saleOrderNum: '', // 销售订单号
            orderDate: '', // 单据日期
            subProdDate: '', // 交货日期
            employee: '', // 职员
            customer: '', // 客户
            address: '', // 收货地址
            linkman: '', // 联系人
            linktel: '', // 联系电话
            remark: '', // 备注信息
            conRate: '0.00', // 优惠率
            conPrice: '0.00', // 优惠金额
            hasConPrice: '0.00', // 优惠后金额
            detailList: [] // 明细信息列表
          },

          employeeList: [], // 职员列表
          customerList: [], // 客户列表
    
          rules: { // 表单校验规则
            saleOrderNum: [
              { required: true, message: '请输入销售订单编号', trigger: 'blur' },
              { message: '长度为 17 个字符', trigger: 'blur' }
            ],
            orderDate: [
              { type: 'date', required: true, message: '请选择单据日期', trigger: 'change' }
            ],
            subProdDate: [
              { type: 'date', required: true, message: '请选择交货日期', trigger: 'change' }
            ],
            customer: [
              { required: true, message: '请输入/选择客户' }
            ],
            address: [
              { required: true, message: '请至少选择一个地址', trigger: 'change' }
            ]
          }
        }
      },
      components: {
        employeeDialog,
        customerDialog,
        editTable
      },
      methods: {
        // 提交表单
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              console.log(this.form)
            } else {
              console.log('error submit!!')
              return false
            }
          })
        },
        // 重置表单
        resetForm(formName) {
          this.$refs[formName].resetFields()
        },

        // 初始化职员信息列表
        initEmployeeList(employee) {
          this.employeeList = employee
        },

        // 初始化客户信息列表
        initCustomerList(customer) {
          this.customerList = customer
        },

        // 手动输入检索职员
        searchEmploy(queryString, cb) {
          var searchList = this.employeeList
          var results = queryString ? searchList.filter(this.createFilter(queryString)) : searchList
          cb(results)
        },
        // 选中职员信息后的回调函数
        empSelCb(item) {
          console.log(this.form.employee)
          console.log(item)
        },

        // 手动输入搜索客户
        searchCustomer(queryString, cb) {
          var searchList = this.customerList
          var results = queryString ? searchList.filter(this.createFilter(queryString)) : searchList

          cb(results)
        },
        // 过滤输入的内容(通用)
        createFilter(queryString) {
          return (restaurant) => {
            return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
          }
    },
        // 下拉时，选中客户信息后的回调函数
        customerSelCb(item) {
          console.log(item)
        },

        /** ***********************以下为打开dialog之后的逻辑********************/
        openEmpDialog() {
          this.$refs.empDialog.openDialog()
        },
        openCusDialog() {
          this.$refs.cusDialog.openDialog()
        },
        // 职员回显
        setEmployee(employee) {
          this.form.employee = employee
        },
        // 客户回显
        setCustomer(customer) {
          this.form.customer = customer
        }
      }
    }
</script>

<style lang="scss" scoped>
@import '../../../../styles/variables.scss';
    // 各个大项的标题
    .row-item {
        padding: 10px 0;
        border-bottom: 1px solid $blue;
        margin-bottom: 20px;
        .grid-content {
            border-radius: 4px;
            min-height: 20px;
        }
        .title {
            font-size: 20px;
            color: $blue;
        }
    }

    // 改变带有选择的input输入框的长度
    .el-autocomplete {
        width: 100% !important;
    }

    // 改变下拉菜单的样式和位置
    .el-dropdown-menu {
        left: 440px !important;
    }
    .el-dropdown {
        width: 100%;
        color: #606266;
        line-height: 24px;
        font-size: 14px;
    }

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
        line-height: inherit;
    }
    .el-icon-more::before {
        font-size: 25px;
    }

</style>
