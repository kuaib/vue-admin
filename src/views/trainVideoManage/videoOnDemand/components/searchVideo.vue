<template>
    <div>
        <!--条件-->
        <el-form :model="searchForm" ref="searchForm" :rules="rules" label-width="100px">
            <el-row :gutter="20">
                <el-col>
                    <el-form-item prop="project" label="项目：">
                        <el-select v-model="searchForm.project" placeholder="请选择项目">
                            <el-option
                                    v-for="item in projectList"
                                    :label="item.projectName"
                                    :value="item.projectId"
                                    :key="item.projectId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col>
                    <el-form-item prop="videoType" label="视频类型：">
                        <el-select v-model="searchForm.videoType" placeholder="请选择视频类型">
                            <el-option label="短节目" value="1"></el-option>
                            <el-option label="长节目" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col>
                    <el-form-item prop="personName" :label="typeName+'：'">
                        <el-select v-model="searchForm.personName" :placeholder="'请选择'+typeName">
                            <el-option
                                    v-for="(item,idx) in personNameList"
                                    :label="item.athleteName"
                                    :value="item.athleteName"
                                    :key="idx">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item prop="videoName" label="视频名称：">
                        <el-select v-model="searchForm.videoName" placeholder="请选择视频名称">
                            <el-option
                                    v-for="(item,idx) in videoList"
                                    :label="item.videoName"
                                    :value="item.videoId"
                                    :key="idx">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col style="text-align:center;margin-bottom: 20px;">
                    <el-button type="primary" v-waves icon="el-icon-search" @click="getDetail('searchForm')">搜索</el-button>
                </el-col>
            </el-row>
        </el-form>

        <!--视频-->
        <el-row v-if="videoUrl">
            <div class="video-title">{{typeName}}{{searchForm.personName}}的视频</div>
            <div class="video-content">
                <video :src="videoUrl" controls="controls"></video>
            </div>
        </el-row>
    </div>
</template>

<script>
    import {selectEnum, getProjectByPerson, getVideoList, getAthleteBySome, getVideoDetail} from '@/api/trainVideoManage'
    export default {
        props: ['typeName', 'aiResult'],  // 运动员/冠军
        data() {
            return {
                projectList: [],       // 项目列表
                personNameList: [],    // 冠军/运动列表
                videoList: [],         // 视频下拉离诶包
                videoUrl: null,
                searchForm: {
                    project: null,
                    videoType: null,
                    personName: null,
                    videoName: null,
                },

                rules: { // 表单校验规则
                    project: [
                        {required: true, message: '请选择项目', trigger: 'change'}
                    ],
                    videoType: [
                        {required: true, message: '请选择视频类型', trigger: 'change'}
                    ],
                    personName: [
                        {required: true, message: '请选择' + this.typeName, trigger: 'change'}
                    ],
                    videoName: [
                        {required: true, message: '请选择视频名称', trigger: 'change'}
                    ],
                }
            }
        },
        created() {
            this.getProjectList();  // 获取项目列表
        },

        methods: {
            // 获取项目列表
            getProjectList() {
                getProjectByPerson({
                    videoGroup: this.typeName === '冠军' ? '1' : '2',  // 1: 冠军视频;  2: 运动员视频
                }).then(res => {
                    if(res.data.code == 200) {
                        this.projectList = res.data.data;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                })
            },

            // 获取冠军/运动员列表 和 视频id
            getPersonList() {
                getAthleteBySome({
                    videoGroup: this.typeName === '冠军' ? '1' : '2',  // 1: 冠军视频;  2: 运动员视频
                    projectId: this.searchForm.project,
                    videoType: this.searchForm.videoType,
                    athleteName: this.searchForm.personName,   // 当入参有这个字段的时候获取的就是视频id
                }).then(res => {
                    if(res.data.code == 200) {
                        if(this.searchForm.personName) {
                            this.videoList = res.data.data;
                            let videoObj = this.videoList && this.videoList[0];
                            this.videoId = videoObj.videoId;
                        } else {
                            this.personNameList = res.data.data;
                        }
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                })
            },

            // 获取详情
            getDetail(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        getVideoDetail({videoId: this.videoId}).then(res => {
                            if(res.data.code == 200) {
                                let resData = res.data.data;
                                this.$emit('update:aiResult', resData.aiResult);
                                this.videoUrl = resData.videoUrl;
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'warning'
                                });
                            }
                        })
                    }
                })
            },

        },

        watch: {
            'searchForm.project': function(val) {
                if(val && this.searchForm.videoType) {
                    this.searchForm.personName = null;
                    this.searchForm.videoName = null;
                    this.getPersonList();
                }
            },
            'searchForm.videoType': function(val) {
                if(val && this.searchForm.project) {
                    this.searchForm.personName = null;
                    this.searchForm.videoName = null;
                    this.getPersonList();
                }
            },
            'searchForm.personName': function(val) {
                if(val) {
                    this.searchForm.videoName = null;
                    this.getPersonList();  // 获取视频列表
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .video-title {
        font-size: 18px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 15px;
    }
    .video-content {
        width: 400px;
        margin: 0 auto;
        video {
            width: 100%;
        }
    }
</style>
