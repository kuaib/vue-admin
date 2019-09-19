<template>
    <div>
        <!--条件-->
        <el-form :model="searchForm" ref="searchForm" label-width="100px">
            <el-row :gutter="20">
                <el-col>
                    <el-form-item prop="project" label="条件一：">
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
            </el-row>
            <el-row :gutter="20">
                <el-col>
                    <el-form-item prop="videoType" label="条件二：">
                        <el-select v-model="searchForm.videoType" placeholder="请选择视频类型">
                            <el-option label="短节目" value="1"></el-option>
                            <el-option label="长节目" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col>
                    <el-form-item prop="videoId" label="条件三：">
                        <el-select v-model="searchForm.videoId" placeholder="请选择视频名称">
                            <el-option
                                    v-for="item in bigProList"
                                    :label="item.dicValue"
                                    :value="item.dicKey"
                                    :key="item.dicKey">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item prop="personName" :label="typeName+'：'">
                        <el-select v-model="searchForm.personName" :placeholder="'请选择'+typeName">
                            <el-option
                                    v-for="item in bigProList"
                                    :label="item.dicValue"
                                    :value="item.dicKey"
                                    :key="item.dicKey">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <!--视频-->
        <el-row>
            <div class="video-title">{{typeName}}{{searchForm.personName}}的视频</div>
            <div class="video-content">
                <video src="" controls="controls"></video>
            </div>
        </el-row>
    </div>
</template>

<script>
    import mixins from '@/utils/mixins'
    export default {
        mixins: [mixins],
        props: ['typeName'],  // 运动员/冠军
        data() {
            return {
                searchForm: {
                    project: null,
                    videoType: null,
                    personName: null,
                    videoId: null,
                }
            }
        },
        created() {
            this.getAllList();
        }
    }
</script>

<style>
    .video-title {
        font-size: 18px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 15px;
    }
    .video-content {
        width: 300px;
        margin: 0 auto;
    }
</style>