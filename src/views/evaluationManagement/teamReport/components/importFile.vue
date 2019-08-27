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
                    <el-form-item label="选择文件：" prop="fileList">
                        <el-upload
                                class="avatar-uploader"
                                multiple
                                :on-change="changeFile"
                                action="api/sports/sports_train_report/uploadFile">
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
                <el-button type="primary" @click="toUpload">确认上传</el-button>
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
                showDialog: false,
                fileList: null,  // 要上传的文件
                uploadForm: {
                    fileList: null,  // 要上传的文件
                    project: null
                },

                rules: {

                }
            }
        },

        methods: {
            // 确认上传
            toUpload() {

            },

            // 文件改变
            changeFile(file, fileList) {
                this.fileList = fileList;
            },
        }
    }
</script>
