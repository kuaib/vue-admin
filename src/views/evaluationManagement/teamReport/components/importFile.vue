<template>
    <div>
        <el-dialog
                title="文件导入"
                :visible.sync="showDialog"
                :show-close="false"
                width="50%"
                center>
            <el-form :model="uploadForm" ref="uploadForm" :rules="rules" label-width="120px">
                <el-row>
                    <el-form-item label="选择文件：" prop="file">
                        <el-upload
                                class="avatar-uploader"
                                :limit=limit
                                :on-success="uploadSuc"
                                :file-list="fileList"
                                action="api/sports/sports_doc/uploadDoc">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-col :span="18">
                        <el-form-item label="允许：" prop="project">
                            <el-select v-model="uploadForm.project" filterable placeholder="请选择项目">
                                <el-option
                                        v-for="(item,idx) in bigProList"
                                        :key="idx"
                                        :label="item.dicValue"
                                        :value="item.dicKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="line-height:36px;padding-left: 20px;">成员查看</el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showDialog = false">取 消</el-button>
                <el-button type="primary" @click="toUpload" :loading="btnLoading">确认上传</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import mixins from '@/utils/mixins'
    import {saveSportsDoc} from '@/api/evaluationManagement'
    export default {
        mixins: [mixins],
        data() {
            return {
                showDialog: false,
                btnLoading: false,
                fileList: [],
                limit: 1,  // 允许最大上传个数
                uploadForm: {
                    file: null,  // 要上传的文件
                    project: null,
                    projectName: null
                },

                rules: {
                    file: [
                        {required: true, message: '请上传文档'},
                    ],
                    project: [
                        {required: true, message: '请选择项目', trigger: 'change'},
                    ]

                }
            }
        },

        created() {
            this.getAllList();
            console.log(window.location)
        },

        methods: {
            // 确认上传
            toUpload() {
                this.$refs.uploadForm.validate((valid) => {
                    if (valid) {
                        this.btnLoading = true;
                        saveSportsDoc({
                            docName: this.uploadForm.file.fileName,
                            docUrl: this.uploadForm.file.fileUrl,
                            projectId: this.uploadForm.project,
                            projectName: this.uploadForm.projectName,
                        }).then(res => {
                            this.btnLoading = false;
                            if(res.data.code == 200) {
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                                this.$emit('saveDoc');
                                this.resetUploadForm();
                            } else {
                                this.btnLoading = true;
                                this.$message({
                                    message: res.data.msg,
                                    type: 'warning'
                                });
                            }
                        }).catch(() => {
                            this.btnLoading = false;
                        })
                    } else {
                        return false
                    }
                })
            },

            // 文件上传成功
            uploadSuc(file, fileList) {
                if(file.code == 200) {
                    this.uploadForm.file = file.data;
                } else {
                    this.$message({
                        message: file.msg,
                        type: 'warning'
                    });
                }
            },

            // 重置表单
            resetUploadForm() {
                this.uploadForm.file = null;
                this.uploadForm.project = null;
                this.uploadForm.projectName = null;
                this.fileList = [];
                this.showDialog = false;
                this.$refs.uploadForm.clearValidata();
            }
        },

        watch: {
            'uploadForm.project': function(val) {
                if(val) {
                    this.bigProList.forEach(item => {
                        if(item.dicKey == val) {
                            this.uploadForm.projectName = item.dicValue;
                        }
                    })
                }
            }
        }
    }
</script>
