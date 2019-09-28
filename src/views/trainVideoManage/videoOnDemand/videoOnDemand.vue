<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <search-video typeName="冠军"></search-video>
            </el-col>
            <el-col :span="12">
                <search-video typeName="运动员"></search-video>
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
                aiResult: []
            }
        }
    }
</script>

<style lang="scss">
    .diff-data {
        .diff-title {
            margin: 15px 0;
        }
    }
</style>
