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
        <div class="add-btn" v-if="status!='1'"><span @click="validateBaseForm">增加训练计划>></span></div>

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
                            <el-select v-model="addForm.trainType" placeholder="请选择训练类型">
                                <el-option label="国内训练" value="1"></el-option>
                                <el-option label="国外训练" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="训练内容" prop="trainContent">
                            <el-input v-model="addForm.trainContent" placeholder="请输入训练内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="短板" prop="shortBoard">
                            <el-input v-model="addForm.shortBoard" placeholder="请输入短板"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="训练目的" prop="trainPurposeSelected">
                            <el-transfer
                                    v-model="addForm.trainPurposeSelected"
                                    :data="addForm.trainPurpose"
                                    :titles="['点选可关联','已选训练目的']">
                            </el-transfer>
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
    </div>
</template>

<script>
    import mixins from '@/utils/mixins'
    export default {
        mixins: [mixins],
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
                    trainTypeName: null,
                    shortBoard: null,
                    trainPurpose: [
                        {key: 0, label: '选项一', disabled: false},
                        {key: 1, label: '选项二', disabled: false},
                        {key: 2, label: '选项三', disabled: false},
                    ],
                    trainPurposeSelected: [],        // 选中的训练目的
                    trainPurposeSelectedName: null,  // 选中的训练目的名称(、分割，列表中需要这样显示)
                    trainTarget: null
                },
                rules: {
                    trainType: [
                        { required: true, message: '请选择训练类型', trigger: 'change' }
                    ],
                    trainContent: [
                        { required: true, message: '请输入训练内容', trigger: 'blur' }
                    ],
                    shortBoard: [
                        { required: true, message: '请输入短板', trigger: 'blur' }
                    ],
                    trainPurposeSelected: [
                        { required: true, message: '请选择训练目的', trigger: 'change' }
                    ],
                    trainTarget: [
                        { required: true, message: '请输入期望目标', trigger: 'blur' }
                    ],

                }
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
                this.addForm.trainTypeName = rowData.trainTypeName;
                this.addForm.shortBoard = rowData.shortBoard;

                this.addForm.trainPurposeSelected = rowData.trainPurposeSelected;
                this.addForm.trainPurposeSelectedName = rowData.trainPurposeSelectedName;
                this.addForm.trainTarget = rowData.trainTarget;
            }
        },

        watch: {
            'addForm.trainType': function(val) {
                if(val) {
                    this.addForm.trainTypeName = val === '1' ? '国内训练' : '国外训练';
                }
            },
            'addForm.trainPurposeSelected': function(val) {
                if(val) {
                    let str = '';
                    this.addForm.trainPurpose.forEach(item => {
                        this.addForm.trainPurposeSelected.forEach(sel => {
                            if(sel === item.key) {
                                str += '、' + item.label;
                            }
                        });
                    });
                    this.addForm.trainPurposeSelectedName = str.substr(1);
                }
            },
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
    }
</style>