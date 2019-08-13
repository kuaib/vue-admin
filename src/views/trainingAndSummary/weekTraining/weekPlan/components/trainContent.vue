<!--周训练计划 -- 增加每天的训练内容-->
<template>
    <div class="week-plan-train-wrapper">
        <!--一周的列表-->
        <el-row class="week-item" v-for="(item,idx) in dateArrList" :key="idx">
            <el-col :span="3">
                <div :span="3" class="week-title">{{item.weekDay}}</div>
            </el-col>
            <el-col :span="18">
                <el-row :gutter="20">
                    <el-col :span="4" v-if="item.trainList&&item.trainList.length>0">
                        <p>{{item.trainList && item.trainList.time}}</p>
                        <p>{{item.trainList && item.trainList.trainType}}</p>
                    </el-col>
                    <el-col :span="4" v-else>&nbsp;</el-col>
                </el-row>
            </el-col>
            <el-col :span="3" class="week-btn" @click="editRow(item,idx)">{{item.trainList&&item.trainList.length>0?'详情':'编辑'}}</el-col>
        </el-row>


        <el-dialog
                :show-close="false"
                :title="currentWeekDay+'训练内容'"
                :visible.sync="dialogVisible"
                width="60%"
                center>
            <el-table :data="list" border fit highlight-current-row empty-text="暂无训练计划"
                      style="width: 100%;">
                <el-table-column
                        align="center"
                        label="序号"
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column align="center" label="训练类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.trainType=='1'?'国内训练':'国外训练'}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="训练内容">
                    <template slot-scope="scope">
                        <span>{{scope.row.trainContent}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="训练目的">
                    <template slot-scope="scope">
                        <span>{{scope.row.trainPurposeSelectedName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="短板">
                    <template slot-scope="scope">
                        <span>{{scope.row.shortBoard}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="期望目标" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.trainTarget}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" v-if="id&&status=='0' || !id&&!status">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="validateBaseForm(scope.$index)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit('addForm')">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import mixins from '@/utils/mixins'
    export default {
        mixins: [mixins],
        props: {
        },
        data() {
            return {
                dateArrList: [],       // 周区间
                currentWeekDay: null,  // 当前点击的行的日期



                rowIdx: null,          // 编辑行时候，当前点击的行索引
                isEditDialog: false,   // 判断当前当前打开dialog是否是编辑
                list: [],              // 行数据列表
                dialogVisible: false,   // 是否显示行数据编辑dialog对话框
                id: this.$route.query.id,
                status: this.$route.query.status,

                addForm: {
                    trainContent: null,
                    trainType: null,
                    trainTypeName: null,
                    shortBoard: null,
                },
                rules: {
                    trainType: [
                        { required: true, message: '请选择训练类型', trigger: 'change' }
                    ],
                    trainContent: [
                        { required: true, message: '请输入训练内容', trigger: 'blur' }
                    ]

                }
            }
        },
        created() {
            this.getAllList();
        },
        methods: {
            // 点击每一天的详情/编辑
            editRow(item, idx) {
                this.currentWeekDay = item.weekDay;

            },

            // 获取所选时间的区间数组
            getDateComplete(year, dateRange) {
                year = year.slice(0, 5);
                let startDate = new Date(year + dateRange[0]);
                let endDate = new Date(year + dateRange[1]);
                let dataArr = [];
                let weeks = ['日', '一', '二', '三', '四', '五', '六'];
                while((endDate.getTime() - startDate.getTime()) >= 0) {
                    var month = (startDate.getMonth() + 1).toString().length == 1 ? "0" + (startDate.getMonth() + 1).toString() : (startDate.getMonth() + 1);
                    var day = startDate.getDate().toString().length == 1 ? "0" + startDate.getDate() : startDate.getDate();
                    var week = weeks[startDate.getDay()];
                    dataArr.push({weekDay: month + day + '（周' + week + '）'});
                    startDate.setDate(startDate.getDate() + 1);
                }
                this.dateArrList = dataArr;
            },
















            // 提交
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogVisible = false;
                        if(this.isEditDialog) { // 编辑
                            this.list.splice(this.rowIdx, 1, JSON.parse(JSON.stringify(this.addForm)))
                        } else {    // 新增
                            this.list.push(JSON.parse(JSON.stringify(this.addForm)));
                        }
                        this.resetForm(formName);
                    }
                })
            },

            // 点击添加/编辑
            validateBaseForm(rowIdx) {
                if(typeof rowIdx === 'number') {
                    this.rowIdx = rowIdx;
                    this.dialogVisible = true;
                    this.getRowDetail(rowIdx);
                }
                this.dialogVisible = true;
            },

            // 编辑时渲染信息
            getRowDetail(rowIdx) {
                this.isEditDialog = true;
                let rowData = this.list[rowIdx];
                this.addForm.trainContent = rowData.trainContent;
                this.addForm.trainType = rowData.trainType;
                this.addForm.trainTypeName = rowData.trainTypeName;
                this.addForm.shortBoard = rowData.shortBoard;

                this.addForm.trainPurposeSelected = rowData.trainPurposeSelected;
                this.addForm.trainPurposeSelectedName = rowData.trainPurposeSelectedName;
                this.addForm.trainTarget = rowData.trainTarget;
            },


        },

        watch: {

            dialogVisible: function(val) {
                if(!val) { // dialog关闭的时候
                    this.isEditDialog = false;
                    this.$refs.addForm.resetFields();
                }
            }
        }
    }
</script>

<style lang="scss">
    .week-plan-train-wrapper {
        .add-btn {
            margin: 15px auto;
            color: #409EFF;
            text-align: center;
            span {
                cursor: pointer;
            }
        }
        .week-item {
            font-size: 13px;
            text-align: center;
            border-bottom: 1px solid #EBEEF5;
            padding: 15px 0;
            .week-title {
                font-weight: 700;
            }
            .week-btn {
                color: #409EFF;
            }
        }
    }
</style>