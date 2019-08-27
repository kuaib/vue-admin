<!--测评记录---批量导入-->
<template>
    <div>
        <el-form :model="searchForm" ref="searchForm">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item prop="evaluationType">
                        <el-select v-model="searchForm.evaluationType" placeholder="请选择测评类型">
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
                    <el-form-item prop="project">
                        <el-select v-model="searchForm.project" placeholder="请选择测评项目">
                            <el-option
                                    v-for="item in coachInfoList"
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
                    <el-form-item prop="team">
                        <el-select v-model="searchForm.team" placeholder="请选择队伍">
                            <el-option
                                    v-for="item in coachInfoList"
                                    :label="item.dicValue"
                                    :value="item.dicKey"
                                    :key="item.dicKey">
                            </el-option>
                        </el-select>
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
    export default {
        data() {
            return {
                btnLoading: false,
                searchForm: {
                    evaluationType: null,
                    project: null,
                    team: null
                }
            }
        },

        methods: {
            // 批量导入
            importFile(){

            }
        }
    }
</script>
