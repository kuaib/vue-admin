<!--详情 (已处理的)-->
<template>
    <div class="train-video-add-wrapper">
        <!--基础信息-->
        <el-row>
            <div>基础信息</div>
            <el-form :model="baseForm" ref="baseForm" :rules="rules" label-width="150px">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="视频名称：" prop="videoName">
                            <span>{{baseForm.videoName}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="所属项目：" prop="project">
                            <span>{{baseForm.projectName}}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="视频类型：" prop="videoType">
                            <span>{{baseForm.videoType=='1'?'短节目':'长节目'}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="typeName==='champion'">
                        <el-form-item label="视频冠军：" prop="personName">
                            <span>{{baseForm.personName}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="typeName==='athlete'">
                        <el-form-item label="运动员：" prop="personName">
                            <span>{{baseForm.personName}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col>
                        <el-form-item label="备注：" prop="remark">
                            <span>{{baseForm.remark}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" v-if="fileType==='edit'||fileType==='detail'">
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
            <el-form :model="baseForm1" ref="baseForm1" :rules="rules1" label-width="150px">
                <el-row :gutter="20">
                    <el-col :span="8" :offset="8">
                        <video :src="baseForm1.videoFile" controls="controls" class="video"></video>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>

        <!--视频数据分析-->
        <el-row>
            <div style="margin-bottom:15px;">视频数据分析</div>
            <el-row :gutter="20">
                <el-col :span="12" class="video-items">
                    <div v-for="item in aiResult.slice(0, subLen)" :key="item.name">
                        <span>{{item.name}}：</span>
                        <span>{{item.value}}</span>
                    </div>
                </el-col>
                <el-col :span="12" class="video-items">
                    <div v-for="item in aiResult.slice(subLen, aiResult.length)" :key="item.name">
                        <span>{{item.name}}：</span>
                        <span>{{item.value}}</span>
                    </div>
                </el-col>
            </el-row>
        </el-row>

        <!--操作按钮-->
        <el-row style="text-align: center;margin-top:15px;">
            <el-button type="primary" round @click="cancelAct('save')" style="padding: 12px 35px;">关 闭</el-button>
        </el-row>
    </div>
</template>

<script>
    import mixins from '@/utils/mixins'
    import {getVideoDetail} from '@/api/trainVideoManage'
    import {getRelation} from '../relation'
    export default {
        mixins: [mixins],
        props: ['fileType', 'typeName', 'videoId'],  // 编辑还是创建, 运动员还是冠军
        data() {
            return {
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
                aiResult: [],   // ai结果数组集
                subLen: 0,      // ai结果数组集长度一半（向上取整）

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
            this.getDetail();
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
                        this.baseForm1.videoFile = resData.videoUrl;
                        this.aiResult = getRelation(resData.aiResult); // 将对象转为对象数组
                        this.subLen = Math.ceil(this.aiResult.length / 2);
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scope>
    .video {
        width: 400px;
        margin-top: 15px;
        outline-style: none;
        margin-bottom: 20px;
    }
    .video-items {
        div {
            margin-left: 25px;
            line-height: 35px;
            span {
                color: #606266;
            }
        }
    }
</style>
