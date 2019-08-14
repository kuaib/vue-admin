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
            <el-col :span="3" class="week-btn"><span @click="editRow(item,idx)">{{item.trainList&&item.trainList.length>0?'详情':'编辑'}}</span></el-col>
        </el-row>

        <!--新增类表中的项-->
        <el-dialog
                :show-close="false"
                :title="currentWeekDay+'训练内容'"
                :visible.sync="dialogVisible"
                width="60%"
                :close-on-click-modal="false"
                center>
            <el-row class="train-section">
                <el-row class="edit-table-title">专项训练</el-row>
                <el-table :data="listSpecial" border highlight-current-row style="width: 100%" max-height="250">

                    <el-table-column prop="trainTime" label="*训练时段" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-input v-if="scope.row.trainTime.editFlag" v-model="scope.row.trainTime.value" v-focus></el-input>
                            <div v-else class="table-item-div" @click="editRowItem(scope,'listSpecial')">{{scope.row.trainTime.value}}</div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="trainType" label="*训练类型" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-input v-if="scope.row.trainType.editFlag" v-model="scope.row.trainType.value" v-focus></el-input>
                            <div v-else class="table-item-div" @click="editRowItem(scope,'listSpecial')">{{scope.row.trainType.value}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="trainContent" label="*训练内容" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-input v-if="scope.row.trainContent.editFlag" v-model="scope.row.trainContent.value" v-focus></el-input>
                            <div v-else class="table-item-div" @click="editRowItem(scope,'listSpecial')">{{scope.row.trainContent.value}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="trainDetail" label="内容细节" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-input v-if="scope.row.trainDetail.editFlag" v-model="scope.row.trainDetail.value" v-focus></el-input>
                            <div v-else class="table-item-div" @click="editRowItem(scope,'listSpecial')">{{scope.row.trainDetail.value}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="repeatTimes" label="重复次数" width="80" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-input v-if="scope.row.repeatTimes.editFlag" v-model="scope.row.repeatTimes.value" v-focus></el-input>
                            <div v-else class="table-item-div" @click="editRowItem(scope,'listSpecial')">{{scope.row.repeatTimes.value}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column fixed label="操作" width="80" align="center" header-align="center">
                        <template slot-scope="scope">
                            <span @click="handleDel(scope.$index, scope.row, 'listSpecial')" class="row-act-btns">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div @click="addRow('listSpecial')" class="row-act-btns addBtn">添加</div>
            </el-row>
            <el-row class="train-section">
                <el-row class="edit-table-title">体能训练</el-row>
                <el-table :data="listBody" border highlight-current-row style="width: 100%" max-height="250">

                    <el-table-column prop="trainTime" label="*训练时段" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-input v-if="scope.row.trainTime.editFlag" v-model="scope.row.trainTime.value" v-focus></el-input>
                            <div v-else class="table-item-div" @click="editRowItem(scope,'listBody')">{{scope.row.trainTime.value}}</div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="trainType" label="*训练类型" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-input v-if="scope.row.trainType.editFlag" v-model="scope.row.trainType.value" v-focus></el-input>
                            <div v-else class="table-item-div" @click="editRowItem(scope,'listBody')">{{scope.row.trainType.value}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="trainContent" label="训练内容" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-input v-if="scope.row.trainContent.editFlag" v-model="scope.row.trainContent.value" v-focus></el-input>
                            <div v-else class="table-item-div" @click="editRowItem(scope,'listBody')">{{scope.row.trainContent.value}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="trainDetail" label="内容细节" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-input v-if="scope.row.trainDetail.editFlag" v-model="scope.row.trainDetail.value" v-focus></el-input>
                            <div v-else class="table-item-div" @click="editRowItem(scope,'listBody')">{{scope.row.trainDetail.value}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="repeatTimes" label="每组重复次数" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-input v-if="scope.row.repeatTimes.editFlag" v-model="scope.row.repeatTimes.value" v-focus></el-input>
                            <div v-else class="table-item-div" @click="editRowItem(scope,'listBody')">{{scope.row.repeatTimes.value}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="actionTimes" label="动作次数" width="80" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-input v-if="scope.row.actionTimes.editFlag" v-model="scope.row.actionTimes.value" v-focus></el-input>
                            <div v-else class="table-item-div" @click="editRowItem(scope,'listBody')">{{scope.row.actionTimes.value}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="restInterval" label="组间休息间隔s" width="80" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-input v-if="scope.row.restInterval.editFlag" v-model="scope.row.restInterval.value" v-focus></el-input>
                            <div v-else class="table-item-div" @click="editRowItem(scope,'listBody')">{{scope.row.restInterval.value}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="rhythm" label="节奏" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-input v-if="scope.row.rhythm.editFlag" v-model="scope.row.rhythm.value" v-focus></el-input>
                            <div v-else class="table-item-div" @click="editRowItem(scope,'listBody')">{{scope.row.rhythm.value}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column fixed label="操作" width="80" align="center" header-align="center">
                        <template slot-scope="scope">
                            <span @click="handleDel(scope.$index, scope.row, 'listSpecial')" class="row-act-btns">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div @click="addRow('listBody')" class="row-act-btns addBtn">添加</div>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit('addForm')">保 存</el-button>
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
                rowIdx: null,          // 编辑行时候，当前点击的行索引
                isEditDialog: false,   // 判断当前当前打开dialog是否是编辑
                // dateArrList: [{weekDay:"0205（周二）"},{weekDay:"0206（周三）"},{weekDay:"0207（周四）"},{weekDay:"0208（周五）"}],       // 周区间
                dateArrList: [],       // 周区间
                currentWeekDay: null,  // 当前点击的行的日期
                dialogVisible: true,   // 是否显示行数据编辑dialog对话框
                listSpecial: [],       // 专项训练列表
                listBody: [],          // 体能训练列表




                //
                // id: this.$route.query.id,
                // status: this.$route.query.status,
                //
                // addForm: {
                //     trainContent: null,
                //     trainType: null,
                //     trainTypeName: null,
                //     shortBoard: null,
                // },
                // rules: {
                //     trainType: [
                //         { required: true, message: '请选择训练类型', trigger: 'change' }
                //     ],
                //     trainContent: [
                //         { required: true, message: '请输入训练内容', trigger: 'blur' }
                //     ]
                //
                // }
            }
        },
        created() {
            this.getAllList();
        },
        methods: {
            // 增加一条表格行
            addRow(tableName) {
                if(tableName === 'listSpecial') {
                    this[tableName].push({
                        trainType: { value: '', editFlag: false },
                        trainTime: { value: '', editFlag: false },
                        trainContent: { value: '', editFlag: false },
                        trainDetail: { value: '', editFlag: false },
                        repeatTimes: { value: '', editFlag: false }
                    });
                } else {
                    this[tableName].push({
                        trainType: { value: '', editFlag: false },
                        trainTime: { value: '', editFlag: false },
                        trainContent: { value: '', editFlag: false },
                        trainDetail: { value: '', editFlag: false },
                        repeatTimes: { value: '', editFlag: false },
                        actionTimes: { value: '', editFlag: false },
                        restInterval: { value: '', editFlag: false },
                        rhythm: { value: '', editFlag: false }
                    });
                }
            },
            // 删除一条表格行
            handleDel: function(index, row, tableName) {
                this[tableName].splice(index, 1)
            },
            // 聚焦(使除了自己以外的所有数据都失去焦点，自己聚焦)
            editRowItem(scope,tableName) {
                let columnName = scope.column.property;
                this[tableName].forEach((item, idx) => {
                    for (var key in this[tableName][idx]) {
                        if (this[tableName][idx][key].editFlag !== undefined) {
                            this[tableName][idx][key].editFlag = false;
                        }
                    }
                })
                this[tableName][scope.$index][columnName].editFlag = true
            },


            // 点击每一天的详情/编辑
            editRow(item, idx) {
                this.currentWeekDay = item.weekDay;
                this.rowIdx = idx;
                this.dialogVisible = true;
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

            // 保存
            onSubmit(formName) {
                // this.$refs[formName].validate((valid) => {
                //     if (valid) {
                        this.dialogVisible = false;
                        if(this.isEditDialog) { // 编辑
                            this.list.splice(this.rowIdx, 1, JSON.parse(JSON.stringify(this.addForm)))
                        } else {    // 新增
                            let arr1 = this.listSpecial.slice(0, this.listSpecial.length);
                            let arr2 = this.listBody.slice(0, this.listBody.length);
                            this.dataArrList[this.rowIdx].trainList = arr1.concat(arr2);
                        }
                        this.resetForm(formName);
                //     }
                // })
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
                cursor: pointer;
            }
        }
        .row-act-btns {
            color: #409EFF;
            cursor: pointer;
            text-align: center;
        }
        .addBtn {
            font-size: 16px;
            margin-top: 15px;
        }
        .table-item-div {
            width:100%;
            height:36px;
            line-height: 36px;
        }
        .train-section {
            .edit-table-title {
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 10px;
                padding-left: 10px;
                border-left: 3px solid #409EFF;
            }
            &:first-child {
                margin-bottom: 15px;
            }
        }
        .el-table__empty-block {
            display: none;
        }
    }
</style>
