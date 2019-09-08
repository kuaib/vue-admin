<!--测评记录---批量导入-->
<template>
    <div>
        <el-form :model="searchForm" ref="searchForm">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item prop="evaluationType">
                        <el-select v-model="searchForm.testTypeId" placeholder="请选择测评类型">
                            <el-option
                                v-for="(item,idx) in testTypeList"
                                :label="item.testType"
                                :value="item.id"
                                :key="idx">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item prop="project">
                        <el-select v-model="searchForm.testProjectId" placeholder="请选择测评项目">
                            <el-option
                                v-for="(item,idx) in testProjectList"
                                :label="item.testType"
                                :value="item.id"
                                :key="idx">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item prop="team">
                        <el-select v-model="searchForm.teamId" placeholder="请选择队伍">
                            <el-option
                                    v-for="item in teamInfoList"
                                    :label="item.dicValue"
                                    :value="item.dicKey"
                                    :key="item.dicKey">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="文件上传：">
                        <el-upload
                            class="avatar-uploader"
                            multiple
                            ref="upload"
                            :auto-upload="false"
                            :on-success="importSuccess"
                            :on-error="importError"
                            :data="searchForm"
                            action="sports/sports_test/importFile">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8" style="text-align: center;">
                    <el-button type="primary" v-waves @click="importFile" :loading="btnLoading">批量导入</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    import mixin from '@/utils/mixins'
    import {getTestTypeOrTestProjectList} from '@/api/evaluationManagement'
    export default ({
        mixins: [mixin],
        data() {
            return {
                testTypeList: [],
                testProjectList: [],
                btnLoading: false,
                searchForm: {
                    testTypeId: null,
                    testType: null,
                    testProjectId: null,
                    testProject: null,
                    teamId: null,
                    teamName: null
                }
            }
        },


        created() {
            this.getAllList(); // 获取基础下拉
            this.getTypeOrProjectList({dataLevel: '1',queryId: '0' }, 'testTypeList');//测评类型查询
        },

        methods: {
            // 批量导入
            importFile(){
                this.btnLoading = true;
                this.$refs.upload.submit();
            },
            getTypeOrProjectList(param, typeName) {
                getTestTypeOrTestProjectList({
                    dataLevel: param.dataLevel,
                    queryId: param.queryId
                }).then(res => {
                    if (res.data.code === 200) {
                        const data = res.data.data;
                        this[typeName] = data;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                });
            },
            //上传成功
            importSuccess(response, file, fileList){
                this.btnLoading = false;
                if(response.code != 200) {
                    this.$message({
                        message: response.msg,
                        type: 'warning'
                    })
                } else {
                    this.cancelAct('save');
                }

            },
            //上传失败
            importError(err, file, fileList){
                this.$message({
                    message: err,
                    type: 'warning'
                })
            }
        },
        watch: {
            'searchForm.testTypeId': function (val) {
                if (val) {
                    this.searchForm.testProjectId = null;
                    this.searchForm.testProject = null;
                    this.testTypeList.forEach(item => {
                        if(item.id == val) {
                            this.searchForm.testType = item.testType;
                        }
                    });
                    this.getTypeOrProjectList({dataLevel: '2', queryId: val}, 'testProjectList');//测评项目查询
                }
            },
            'searchForm.testProjectId': function (val) {
                if (val) {
                    this.testProjectList.forEach(item => {
                        if(item.id == val) {
                            this.searchForm.testProject = item.testType;
                        }
                    });
                }
            },
            'searchForm.teamId': function (val) {
                if (val) {
                    this.teamInfoList.forEach(item => {
                        if(item.dicKey == val) {
                            this.searchForm.teamName = item.dicValue;
                        }
                    });
                }
            }
        },
    })
</script>
