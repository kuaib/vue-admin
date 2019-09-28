<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <search-video typeName="冠军" :ai-result.sync="aiResultA"></search-video>
            </el-col>
            <el-col :span="12">
                <search-video typeName="运动员" :ai-result.sync="aiResultB"></search-video>
            </el-col>
        </el-row>

        <el-row :gutter="20" class="diff-data">
            <el-col :span="12" v-if="aiResultA.length>0">
                <div class="diff-title">视频数据分析</div>
                <div v-for="(item,idx) in aiResultA" :key="idx" class="data-item">
                    <span>{{item}}</span>
                </div>
            </el-col>
            <el-col :span="12" v-if="aiResultB.length>0">
                <div class="diff-title">视频数据分析</div>
                <div v-for="(item,idx) in aiResultB" :key="idx" class="data-item">
                    <span>{{item}}</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import searchVideo from './components/searchVideo'
    export default {
        components: {searchVideo},
        data() {
            return {
                aiResultA: [],   // 冠军
                aiResultB: []    // 运动员
            }
        }
    }
</script>

<style lang="scss" scoped>
    .diff-data {
        .diff-title {
            margin: 20px 0;
        }
        .data-item {
            line-height: 30px;
            margin-left: 30px;
            span {
                color: #606266;
            }
        }
    }
</style>
