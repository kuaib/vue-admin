<!--伤病备注 新增编辑弹窗-->
<template>
    <!--新增列表中的项-->
    <el-dialog
                class="train-content-add-wrapper"
                :show-close="false"
                title="伤病备注"
                :visible.sync="dialogVisible"
                width="60%"
                :close-on-click-modal="false"
                append-to-body
                center>
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="伤病人员" prop="name">
                            <el-input v-model="addForm.name" placeholder="请输入伤病人员"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="伤病原因及病症" prop="reason">
                            <el-input v-model="addForm.reason" placeholder="请输入伤病原因及病症"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="康复情况" prop="detail">
                            <el-input v-model="addForm.detail" placeholder="请输入伤病人员"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="运动员等级" prop="level">
                            <el-input v-model="addForm.level" placeholder="请输入伤病原因及病症"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit('addForm')">保 存</el-button>
            </span>
        </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                rowIdx: null,     // 编辑时候行索引
                dialogVisible: false,

                addForm: {
                    name: null,
                    reason: null,
                    detail: null,
                    level: null
                },
                rules: {
                    name: [
                        {required: true, message: '请输入伤病人员', trigger: 'blur'}
                    ],
                    reason: [
                        {required: true, message: '请输入伤病原因及病症', trigger: 'blur'}
                    ],
                    detail: [
                        {required: true, message: '请输入康复情况', trigger: 'blur'}
                    ],
                    level: [
                        {required: true, message: '请输入运动员等级', trigger: 'blur'}
                    ],
                },
            }
        },

        methods: {
            // 添加数据行
            addRow(item, idx) {
                if(item !== undefined && typeof idx === 'number') {
                    this.addForm = item;
                    this.rowIdx = idx;
                }
                this.dialogVisible = true;
            },

            // 保存
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let obj = JSON.parse(JSON.stringify(this.addForm));
                        this.$emit('showItem', obj, this.rowIdx);
                        this.dialogVisible = false;
                    }
                })
            }
        },

        watch: {
            dialogVisible: function(val) {
                if(!val) {
                    this.addForm.name = null;
                    this.addForm.reason = null;
                    this.addForm.detail = null;
                    this.addForm.level = null;

                    this.rowIdx = null;
                }
            }
        }
    }
</script>

<style lang="scss">
    .train-content-add-wrapper {
        .el-range-editor--medium.el-input__inner {
            width: 100%;
        }
        .el-date-editor .el-range-separator {
            width: 8%;
        }
    }
</style>
