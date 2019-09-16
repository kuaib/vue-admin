<!--冠军视频/运动员视频 搜索-->
<template>
    <div class="video-manage-wrapper">
        <el-form :model="searchForm" ref="searchForm">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item prop="id">
                        <el-input placeholder="请输入视频id" v-model="searchForm.id"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="project">
                        <el-select v-model="searchForm.project" placeholder="请选择项目">
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
                    <el-form-item prop="videoType">
                        <el-select v-model="searchForm.videoType" placeholder="请选择视频类型">
                            <el-option label="短视频" value="1"></el-option>
                            <el-option label="长视频" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item prop="status">
                        <el-select v-model="searchForm.status" placeholder="请选择处理状态">
                            <el-option label="未处理" value="-1"></el-option>
                            <el-option label="处理中" value="0"></el-option>
                            <el-option label="已处理" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="videoName">
                        <el-input placeholder="请输入视频名称" v-model="searchForm.videoName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="athlete">
                        <el-select v-model="searchForm.athlete" :placeholder="typeName==='champion'?'请选择冠军':'请选择运动员'">
                            <el-option
                                    v-for="item in athleteList"
                                    :label="item.dicValue"
                                    :value="item.dicKey"
                                    :key="item.dicKey">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="9">
                    <el-form-item prop="project">
                        <el-date-picker
                                v-model="searchForm.uploadDate"
                                type="daterange"
                                value-format="yyyy-MM-dd"
                                range-separator="至"
                                start-placeholder="上传开始时间"
                                end-placeholder="上传截止时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item prop="name">
                        <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item prop="name">
                        <el-button class="search" type="info" v-waves @click="resetForm('searchForm')">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    import mixin from '@/utils/mixins'
    export default ({
        mixins: [mixin],
        props: ['typeName'],
        data() {
            return {
                searchForm: {
                    id: null,
                    project: null,
                    videoType: null,
                    status: null,
                    videoName: null,
                    athlete: null,
                    uploadDate: null
                }
            }
        },

        created() {
            this.getAllList(); // 获取基础下拉
            this.getAthleteList(); // 获取运动员列表
        },

        methods: {
            // 搜索
            handleFilter() {
                this.$emit('handleFilter', this.searchForm)
            }
        }
    })
</script>

<style lang="scss">
    .video-manage-wrapper {
        .el-date-editor .el-range-input {
            width: 65%;
        }
    }

    .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {
        width: 356px;
    }
    .el-date-editor .el-range-separator {
        padding: 0;
    }

</style>
