<template>
    <div class="train-video-add-wrapper">
        <!--基础信息-->
        <el-row>
            <div>基础信息</div>
            <el-form :model="baseForm" ref="baseForm" :rules="rules" label-width="100px">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="视频名称：" prop="videoName">
                            <el-input placeholder="请输入视频名称" v-model="baseForm.videoName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="所属项目：" prop="project">
                            <el-select v-model="baseForm.project" placeholder="请选择所属项目">
                                <el-option
                                        v-for="item in bigProList"
                                        :label="item.dicValue"
                                        :value="item.dicKey"
                                        :key="item.dicKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="视频类型：" prop="videoType">
                            <el-select v-model="baseForm.videoType" placeholder="请选择视频类型">
                                <el-option label="短节目" value="1"></el-option>
                                <el-option label="长节目" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="typeName==='champion'">
                        <el-form-item label="视频冠军：" prop="personName">
                            <el-input placeholder="请输入视频冠军" v-model="baseForm.personName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="typeName==='athlete'">
                        <el-form-item label="运动员：" prop="personName">
                            <el-input placeholder="请输入运动员" v-model="baseForm.personName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col>
                        <el-form-item label="备注：" prop="remark">
                            <el-input type="textarea" v-model="baseForm.remark" placeholder="请输入备注"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" v-if="fileType==='edit'">
                    <el-col :span="8">
                        <el-form-item label="处理状态：" prop="status">
                            <span v-if="baseForm.status=='-1'">未处理</span>
                            <span v-if="baseForm.status=='0'">处理中</span>
                            <span v-if="baseForm.status=='1'">已处理</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="上传人：">
                            <span>{{baseForm.createdName}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="上传时间：">
                            <span>{{baseForm.createdTime}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>

        <!--视频内容-->
        <el-row>
            <div>视频内容</div>
            <el-form :model="baseForm1" ref="baseForm1" :rules="rules1" label-width="150px" v-if="canEdit=='true'&&fileType==='edit'||fileType==='add'">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="文件上传：" prop="videoFile">
                            <el-upload
                                    class="avatar-uploader"
                                    :limit=limit
                                    :data="{videoGroup: videoGroup}"
                                    :on-success="uploadSuc"
                                    :on-progress="uploadProcess"
                                    :on-remove="removeFile"
                                    :file-list="fileList"
                                    action="sports/sports_video/upload">
                                <el-button size="small" type="primary" v-show="!baseForm1.videoFile">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" v-if="videoFlag == true">
                        上传进度：
                        <el-progress :percentage="videoUploadPercent"></el-progress>
                    </el-col>
                </el-row>
            </el-form>

            <el-form :model="baseForm1" ref="baseForm1" :rules="rules1" label-width="150px" v-if="canEdit=='false'">
                <el-row :gutter="20">
                    <el-col :span="8" :offset="8">
                        <video :src="baseForm1.videoFile&&baseForm1.videoFile.fileUrl" controls="controls" class="video"></video>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>

        <!--操作按钮-->
        <el-row style="text-align: center;margin-top:15px;">
            <el-button type="primary" round @click="cancelAct" style="padding: 12px 35px;">取 消</el-button>
            <el-button type="primary" round @click="onSubmit('baseForm')" :loading="btnLoading" style="padding: 12px 35px;">提交处理</el-button>
        </el-row>
    </div>
</template>

<script>
    import mixins from '@/utils/mixins'
    import {saveVideo, getVideoDetail} from '@/api/trainVideoManage'
    export default {
        mixins: [mixins],
        props: ['fileType', 'typeName', 'videoId'],  // 编辑还是创建, 运动员还是冠军
        data() {
            return {
                btnLoading: false,
                limit: 1,  // 文件上传的个数限制
                videoUploadPercent: 0,  // 文件上传进度
                videoFlag: false,       // 是否上传完成
                fileList: [],
                videoGroup: this.typeName === 'champion' ? 1 : (this.typeName === 'athlete' ? 2 : null),
                canEdit: this.$route.query.canEdit,  // 当前的视频是否可编辑
                baseForm: {
                    videoName: null,
                    project: null,
                    projectName: null,
                    videoType: null,
                    personName: null,
                    remark: null,
                    status: null,
                    createdName: null,
                    createdTime: null
                },
                baseForm1: {
                    videoFile: null
                },

                rules: {
                    videoName: [
                        { required: true, message: '请输入视频名称', trigger: 'blur' }
                    ],
                    project: [
                        { required: true, message: '请选择所属项目', trigger: 'change' }
                    ],
                    videoType: [
                        { required: true, message: '请选择视频类型', trigger: 'change' }
                    ],
                    personName: [
                        { required: true, message: '请输入视频冠军', trigger: 'blur' }
                    ],
                    remark: [
                        { required: true, message: '请输入备注', trigger: 'blur' }
                    ]
                },
                rules1: {
                    videoFile: [
                        { required: true, message: '请上传视频', trigger: 'change' }
                    ]
                }
            }
        },

        created() {
            this.getAllList(); // 获取基础下拉
            if(this.videoId) {
                this.getDetail();
            }
        },

        methods: {
            // 获取详情
            getDetail() {
                getVideoDetail({videoId: this.videoId}).then(res => {
                    if(res.data.code == 200) {
                        let resData = res.data.data;
                        this.baseForm.videoName = resData.videoName;
                        this.baseForm.project = resData.projectId;
                        this.baseForm.projectName = resData.projectName;
                        this.baseForm.videoType = resData.videoType.toString();
                        this.baseForm.personName = resData.athleteName;
                        this.baseForm.remark = resData.remark;
                        this.baseForm.status = resData.status;
                        this.baseForm.createdName = resData.createdName;
                        this.baseForm.createdTime = resData.createdTime;
                        this.baseForm1.videoFile = {fileName: resData.fileName, fileUrl: resData.videoUrl};

                        this.fileList = [{name: resData.fileName, url: resData.videoUrl, aiNo: resData.aiNo}]
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                })
            },

            // 保存
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$refs.baseForm1.validate((valid1) => {
                            if (valid1) {
                                this.btnLoading = true;
                                saveVideo({
                                    videoId: this.videoId ? this.videoId : null,  // 编辑id
                                    videoGroup: this.videoGroup,
                                    videoName: this.baseForm.videoName,
                                    projectId: this.baseForm.project,
                                    projectName: this.baseForm.projectName,
                                    videoType: parseInt(this.baseForm.videoType),
                                    athleteName: this.baseForm.personName,
                                    remark: this.baseForm.remark,
                                    videoUrl: this.baseForm1.videoFile.fileUrl,
                                    fileName: this.baseForm1.videoFile.fileName,
                                    aiNo: this.baseForm1.videoFile.aiNo,
                                }).then(res => {
                                    if(res.data.code == 200) {
                                        this.$message({
                                            message: '保存成功',
                                            type: 'success'
                                        });
                                        this.cancelAct('save');
                                    } else {
                                        this.btnLoading = false;
                                        this.$message({
                                            message: res.data.msg,
                                            type: 'warning'
                                        });
                                    }
                                }).catch(() => {
                                    this.btnLoading = false;
                                })
                            }
                        })
                    }
                })
            },

            // 文件上传成功
            uploadSuc(file, fileList) {
                this.videoFlag = false;
                if(file.code == 200) {
                    console.log(file)
                    this.baseForm1.videoFile = file.data;
                } else {
                    this.$message({
                        message: file.msg,
                        type: 'warning'
                    });
                }
            },

            // 上传过程中
            uploadProcess(event, file, fileList) {
                this.videoFlag = true;
                this.videoUploadPercent = parseInt(file.percentage);
            },

            // 删除文件
            removeFile(file, fileList) {
                if(file.name === this.baseForm1.videoFile.fileName) {
                    this.baseForm1.videoFile = null
                }

            }
        },

        watch: {
            'baseForm.project': function(val) {
                if(val) {
                    this.bigProList.forEach(item => {
                        if(item.dicKey == val) {
                            this.baseForm.projectName = item.dicValue;
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss">
    .train-video-add-wrapper {
        .el-upload-list__item {
            .el-progress--line {
                display: none;
            }
        }

        .video {
            width: 400px;
            margin-top: 15px;
            outline-style: none;
            margin-bottom: 20px;
        }
    }
</style>
