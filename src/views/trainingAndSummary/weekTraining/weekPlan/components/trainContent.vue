<!--周训练计划 -- 增加每天的训练内容-->
<template>
    <div class="week-plan-train-wrapper">

        <!--一周的列表-->
        <el-row>
            <el-row class="week-item" v-for="(item,idx) in dateArrList" :key="idx">
                <el-col :span="3">
                    <div :span="3" class="week-title">{{item.trainDate.split('-').slice(1, 3).join('-')}}(周{{item.weekDay}})</div>
                </el-col>
                <el-col :span="18">
                    <el-row :gutter="20" v-if="item.trainList&&item.trainList.length>0">
                        <el-col :span="4" v-for="(dayItem,dayIdx) in item.trainList" :key="dayIdx">
                            <p >{{dayItem.trainTime[0]}}~{{dayItem.trainTime[1]}}</p>
                            <p >{{dayItem.trainTypeName}}</p>
                        </el-col>
                    </el-row>
                    <el-row v-else>
                        <el-col :span="4">&nbsp;</el-col>
                    </el-row>
                </el-col>
                <el-col :span="3" class="week-btn">
                    <span @click="editRow(item,idx)">详情</span>
                </el-col>
            </el-row>
            <el-row class="add-btn" v-if="canOperate==='true'">
                <span @click="editRow">增加日训练计划</span>
            </el-row>
        </el-row>

        <!--显示训练计划表格-->
        <el-dialog
                :show-close="false"
                title="训练内容"
                :visible.sync="dialogVisible"
                width="75%"
                :close-on-click-modal="false"
                center>
            <el-form :model="addForm" ref="addForm" :rules="rules" style="margin-bottom: 15px;">
                <el-form-item label="训练年度：" prop="trainDate">
                    <el-col :span="8">
                        <el-date-picker
                                :editable="false"
                                v-model="addForm.trainDate"
                                type="date"
                                format="MM-dd"
                                value-format="yyyy-MM-dd"
                                placeholder="请选择训练日期">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="3" v-if="addForm.trainDate" style="line-height:36px;"><span>周{{addForm.weekDay}}</span></el-col>
                </el-form-item>
            </el-form>

            <!--专项训练/体能训练编辑框-->
            <train-content-add ref="trainContentAdd" @showItem="showItem"></train-content-add>

            <!--专项训练-->
            <el-row>
                <el-row class="item-title">专项训练</el-row>
                <el-table :data="listSpecial" border fit highlight-current-row
                          style="width: 100%;">
                    <el-table-column align="center" label="训练时段">
                        <template slot-scope="scope">
                            <span>{{scope.row.trainTime[0]}}~{{scope.row.trainTime[1]}} | </span>
                            <span>{{scope.row.trainDuration}}分钟</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="训练类型">
                        <template slot-scope="scope">
                            <span>{{scope.row.trainTypeName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="训练内容">
                        <template slot-scope="scope">
                            <span>{{scope.row.trainContentName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="内容细节" width="350">
                        <template slot-scope="scope">
                            <!--<el-input type="textarea" readonly :value="scope.row.trainDetailName" :autosize="{ minRows: 2, maxRows: 10 }"></el-input>-->
                            <span>{{scope.row.trainDetailName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="重复次数" width="50">
                        <template slot-scope="scope">
                            <span>{{scope.row.repeatTimes}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作" width="90" v-if="canOperate==='true'">
                        <template slot-scope="scope">
                            <div class="add-btn">
                                <span @click="handleDel(scope.$index, 'listSpecial')">删除</span>
                                <span> | </span>
                                <span @click="addRow('专项', scope.row, scope.$index)">编辑</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-row class="add-btn"><span @click="addRow('专项')" v-if="canOperate==='true'">添加</span></el-row>
            </el-row>

            <!--体能训练-->
            <el-row>
                <el-row class="item-title">体能训练</el-row>
                <el-table :data="listBody" border fit highlight-current-row
                          style="width: 100%;">
                    <el-table-column align="center" label="训练时段">
                        <template slot-scope="scope">
                            <span>{{scope.row.trainTime[0]}}~{{scope.row.trainTime[1]}} | </span>
                            <span>{{scope.row.trainDuration}}分钟</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="训练类型">
                        <template slot-scope="scope">
                            <span>{{scope.row.trainTypeName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="训练内容" width="300">
                        <template slot-scope="scope">
                            <span>{{scope.row.trainContentName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="每组重复次数" width="50">
                        <template slot-scope="scope">
                            <span>{{scope.row.repeatTimes}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="动作组数" width="50">
                        <template slot-scope="scope">
                            <span>{{scope.row.actionTimes}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="组间休息间隔s" width="50">
                        <template slot-scope="scope">
                            <span>{{scope.row.restInterval}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="节奏" width="70">
                        <template slot-scope="scope">
                            <span>{{scope.row.rhythm}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作" width="90" v-if="canOperate==='true'">
                        <template slot-scope="scope">
                            <div class="add-btn">
                                <span @click="handleDel(scope.$index, 'listBody')">删除</span>
                                <span> | </span>
                                <span @click="addRow('体能', scope.row, scope.$index)">编辑</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-row class="add-btn"><span @click="addRow('体能')" v-if="canOperate==='true'">添加</span></el-row>
            </el-row>

            <span slot="footer" class="dialog-footer" v-if="canOperate==='true'">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit('addForm')">保 存</el-button>
            </span>
            <span slot="footer" class="dialog-footer" v-else>
                <el-button @click="dialogVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import mixins from '@/utils/mixins'
    import {getWeek} from '@/utils/index'
    import trainContentAdd from './trainContentAdd'
    export default {
        mixins: [mixins],
        components: {trainContentAdd},
        props: ['canOperate'],
        data() {
            return {
                rowIdx: null,          // 编辑行时候，当前点击的行索引(最外层的大项)
                isEditDialog: false,   // 判断当前当前打开dialog是否是编辑(最外层的大项)
                currentWeekDay: null,  // 当前点击的行的日期
                dialogVisible: false,   // 是否显示行数据编辑dialog对话框

                dateArrList: [],       // 周区间,包括每天的训练计划
                listSpecial: [],       // 专项训练列表(初始化增加时候使用)
                listBody: [],          // 体能训练列表(初始化增加时候使用)
                listSpecialData: [],   // 专项训练列表(真实存储数据的)
                listBodyData: [],      // 体能训练列表(真实存储数据的)




                //
                // id: this.$route.query.id,
                // status: this.$route.query.status,
                //
                addForm: {
                    trainDate: null,
                    weekDay: null,
                },
                rules: {
                    trainDate: [
                        { required: true, message: '请选择训日期', trigger: 'change' }
                    ]
                }
            }
        },
        created() {
            this.getAllList();
        },

        methods: {
            // 保存
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.listSpecial.length + this.listBody.length === 0) {
                            this.$message({
                                type: 'warning',
                                message: '请至少填写一条训练信息'
                            });
                            return;
                        }
                        this.dialogVisible = false;
                        this.listSpecialData = this.listSpecial.concat();
                        this.listBodyData = this.listBody.concat();
                        if(this.isEditDialog) { // 编辑
                            this.dateArrList[this.rowIdx].trainDate = this.addForm.trainDate;
                            this.dateArrList[this.rowIdx].weekDay = this.addForm.weekDay;
                            this.dateArrList[this.rowIdx].trainList = this.listSpecialData.concat(this.listBodyData);
                        } else {    // 新增
                            this.dateArrList.push({
                                trainDate: this.addForm.trainDate,   // 日期
                                weekDay: this.addForm.weekDay, // 周几
                                trainList: this.listSpecialData.concat(this.listBodyData)  // 列表
                            })
                        }
                        console.log(this.dateArrList)
                    }
                })
            },

            // 增加一条表格行/编辑表格行(专项/体能)
            addRow(typeName, item, idx) {
                if(typeof idx === 'number') {
                    item = JSON.parse(JSON.stringify(item));
                }
                this.$refs.trainContentAdd.addRow(typeName, item, idx);
            },

            // 反显增加的数据(新增/编辑)
            showItem(addForm, titleType, idx) {
                if(titleType === '专项') {
                    if(typeof idx === 'number') {
                        // this.listSpecial[idx] = addForm;
                        this.$set(this.listSpecial, idx, addForm)
                    } else {
                        this.listSpecial.push(addForm);
                    }
                } else if(titleType === '体能') {
                    if(typeof idx === 'number') {
                        // this.listBody[idx] = addForm;
                        this.$set(this.listBody, idx, addForm)
                    } else {
                        this.listBody.push(addForm);
                    }
                }
            },

            // 点击每一天的编辑/新增
            editRow(item, idx) {
                this.dialogVisible = true;
                if(typeof idx === 'number') {
                    this.isEditDialog = true;
                    this.rowIdx = idx;
                    this.addForm.trainDate = item.trainDate;
                    this.addForm.weekDay = item.weekDay;
                    this.dateArrList[idx].trainList = item.trainList;
                    item.trainList.forEach(list => {
                        if(list.typeCode === 1) {
                            this.listSpecial.push(list);
                        } else {
                            this.listBody.push(list);
                        }
                    });
                }
            },

            // 删除一条表格行
            handleDel(index, tableName) {
                this[tableName].splice(index, 1)
            }
        },

        watch: {
            dialogVisible: function(val) {
                if(!val) { // dialog关闭的时候重置列表
                    this.isEditDialog = false;
                    this.addForm.trainDate = null;
                    this.addForm.weekDay = null;
                    this.listSpecial = [];
                    this.listBody = [];
                }
            },
            'addForm.trainDate': function(val) { // 获取周几
                if(val) {
                    this.addForm.weekDay = getWeek(val);
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
            color: #409EFF;
            cursor: pointer;
            font-size: 16px;
        }
        .item-title {
            font-size: 16px;
            color: #000;
            margin-bottom: 10px;
            padding-left: 5px;
            border-left: 2px solid #000;
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
        .el-date-editor--timerange.el-input__inner {
            width: 190px;
        }

        .el-table .cell {
            white-space: pre-line;
        }
    }
</style>
