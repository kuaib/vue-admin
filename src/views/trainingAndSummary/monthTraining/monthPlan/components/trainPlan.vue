<!--月训练计划 -- 训练计划列表-->
<template>
    <div class="month-plan-train-wrapper">
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
                    <span>{{scope.row.trainType}}</span>
                </template>
            </el-table-column>
            <el-table-column align="left" label="训练内容">
                <template slot-scope="scope">
                    <span>{{scope.row.trainContent}}</span>
                </template>
            </el-table-column>
            <el-table-column align="left" label="训练目的">
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
            <el-table-column align="center" label="是否总结" v-if="isSummary">
                <template slot-scope="scope">
                    <span>{{scope.row.summary==1?'已总结':'未总结'}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" v-if="id&&isSummary">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.summary==1" size="mini" type="primary" @click="toSummary(scope.row)">详情</el-button>
                    <el-button v-if="scope.row.summary==0" size="mini" type="primary" @click="toSummary(scope.row)">总结</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" v-if="(id&&status=='0' || !id&&!status)&&!isSummary">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="validateBaseForm(scope.$index)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="add-btn" v-if="status!='1'&&!isSummary"><span @click="validateBaseForm">增加训练计划>></span></div>

        <!--创建dialog-->
        <el-dialog
                :show-close="false"
                title="训练计划"
                :visible.sync="dialogVisible"
                width="60%"
                center>
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="训练类型" prop="trainType">
                            <!--<el-select v-model="addForm.trainType" placeholder="请选择训练类型">-->
                                <!--<el-option label="国内训练" value="1"></el-option>-->
                                <!--<el-option label="国外训练" value="2"></el-option>-->
                            <!--</el-select>-->
                            <el-input v-model="addForm.trainType" placeholder="请输入训练类型"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="短板" prop="shortBoard">
                            <el-input v-model="addForm.shortBoard" placeholder="请输入短板"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="训练目的" prop="trainPurposeSelectedName">
                            <!--<el-select v-model="addForm.trainPurposeSelected" multiple placeholder="请选择训练目的">-->
                                <!--<el-option-->
                                        <!--v-for="(item,idx) in addForm.trainPurpose"-->
                                        <!--:key="idx"-->
                                        <!--:label="item.label"-->
                                        <!--:value="item.key">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                            <el-input type="textarea" v-model="addForm.trainPurposeSelectedName" placeholder="请输入训练目的"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="训练内容" prop="trainContent">
                            <el-input type="textarea" v-model="addForm.trainContent" placeholder="请输入训练内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="期望目标" prop="trainTarget">
                        <el-input type="textarea" v-model="addForm.trainTarget" placeholder="请输入期望目标"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit('addForm')">提 交</el-button>
            </span>
        </el-dialog>

        <!--月总结窗口-->
        <train-summary ref="trainSummary"></train-summary>
    </div>
</template>

<script>
    import mixins from '@/utils/mixins'
    import trainSummary from './trainSummary'
    export default {
        mixins: [mixins],
        components: {trainSummary},
        data() {
            return {
                rowIdx: null,          // 编辑行时候，当前点击的行索引
                isEditDialog: false,   // 判断当前当前打开dialog是否是编辑
                list: [],              // 行数据列表
                dialogVisible: false,   // 是否显示行数据编辑dialog对话框
                id: this.$route.query.id,
                status: this.$route.query.status,

                addForm: {
                    trainContent: null,
                    trainType: null,
                    shortBoard: null,
                    trainPurpose: [
                        {key: '目的一', label: '目的一', disabled: false},
                        {key: '目的二', label: '目的二', disabled: false},
                        {key: '目的三', label: '目的三', disabled: false},
                    ],
                    trainPurposeSelected: [],        // 选中的训练目的
                    trainPurposeSelectedName: null,  // 选中的训练目的名称
                    trainTarget: null
                },
                rules: {
                    trainType: [
                        { required: true, message: '请输入训练类型', trigger: 'blur' }
                    ],
                    trainContent: [
                        { required: true, message: '请输入训练内容', trigger: 'blur' }
                    ],
                    shortBoard: [
                        { required: true, message: '请输入短板', trigger: 'blur' }
                    ],
                    trainPurposeSelectedName: [
                        { required: true, message: '请输入训练目的', trigger: 'blur' }
                    ],
                    trainTarget: [
                        { required: true, message: '请输入期望目标', trigger: 'blur' }
                    ],

                }
            }
        },
        props: {
            isSummary: {  // 是否是月总结页面
                type: Boolean,
                default: false
            }
        },
        created() {
            this.getAllList();
        },
        methods: {
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
                this.addForm.shortBoard = rowData.shortBoard;

                this.addForm.trainPurposeSelected = rowData.trainPurposeSelected;
                this.addForm.trainPurposeSelectedName = rowData.trainPurposeSelectedName;
                this.addForm.trainTarget = rowData.trainTarget;
            },

            // 点击总结/详情
            toSummary(item) {
                this.$refs.trainSummary.baseForm = item;
                this.$refs.trainSummary.dialogVisible = true;
            }
        },

        watch: {
            // 'addForm.trainPurposeSelected': function(val) {
            //     if(val) {
            //         let str = '';
            //         this.addForm.trainPurpose.forEach(item => {
            //             this.addForm.trainPurposeSelected.forEach(sel => {
            //                 if(sel === item.key) {
            //                     str += '、' + item.label;
            //                 }
            //             });
            //         });
            //         this.addForm.trainPurposeSelectedName = str.substr(1);
            //     }
            // },
            dialogVisible: function(val) {
                if(!val) { // dialog关闭的时候
                    this.isEditDialog = false;
                    this.addForm.trainContent = null;
                    this.addForm.trainType = null;
                    this.addForm.shortBoard = null;
                    this.addForm.trainPurposeSelected = [];
                    this.addForm.trainPurposeSelectedName = null;
                    this.addForm.trainTarget = null;
                }
            }
        }
    }
</script>

<style lang="scss">
    .month-plan-train-wrapper {
        .add-btn {
            margin: 15px auto;
            color: #409EFF;
            text-align: center;
            span {
                cursor: pointer;
            }
        }
        .el-transfer-panel__item.el-checkbox {
            display: block;
        }
        .el-table .cell {
            white-space: pre-line;
        }
    }
</style>
