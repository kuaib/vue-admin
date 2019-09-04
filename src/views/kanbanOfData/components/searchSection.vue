<!--数据看板 -- 搜索-->
<template>
    <div>
        <el-form :model="searchForm" ref="searchForm">
            <el-row :gutter="20" class="search-item">
                <el-col :span="6">
                    <el-form-item prop="id">
                        <el-input placeholder="请输入测评id" v-model="searchForm.id"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="project">
                        <el-select v-model="searchForm.project" placeholder="请选择大项">
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
                    <el-form-item prop="smallPro">
                        <el-select v-model="searchForm.smallPro" placeholder="请选择小项">
                            <el-option
                                    v-for="(item, idx) in smallProList"
                                    :key="idx"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="search-item">
                <el-col :span="6">
                    <el-form-item prop="batch">
                        <el-select v-model="searchForm.team" placeholder="请选择队伍">
                            <el-option
                                    v-for="item in teamInfoList"
                                    :label="item.dicValue"
                                    :value="item.dicKey"
                                    :key="item.dicKey">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" v-if="typeName==='athlete'">
                    <el-form-item prop="athlete">
                        <el-select v-model="searchForm.athlete" placeholder="请选择运动员">
                            <el-option
                                    v-for="item in athleteList"
                                    :label="item.dicValue"
                                    :value="item.dicKey"
                                    :key="item.dicKey">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" v-if="typeName==='team'">
                    <el-form-item prop="coach">
                        <el-select v-model="searchForm.coach" placeholder="请选择教练员">
                            <el-option
                                    v-for="item in coachInfoList"
                                    :label="item.dicValue"
                                    :value="item.dicKey"
                                    :key="item.dicKey">
                            </el-option>
                        </el-select>
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
    import {getTestTypeOrTestProjectList} from '@/api/evaluationManagement'
    export default ({
        mixins: [mixin],
        data() {
            return {
                testTypeList: [],    //测评类型
                testProjectList: [], //测评项目
                searchForm: {
                    id: null,
                    project: null,
                    smallPro: null,
                    athlete: null,
                    coach: null,
                    team: null
                }
            }
        },
        props: {
            typeName: {  // 引用搜索组件的父组件
                type: String
            }
        },

        created() {
            this.getAllList();     // 获取基础下拉
        },
        methods: {
            // 搜索
            handleFilter() {
                this.$emit('getAllData', {athleteId: this.searchForm.athlete, teamId: this.searchForm.team})
            }
        },

        watch: {
            'searchForm.project': function(val) {
                if(val) {
                    this.getSmallProList(val)
                }
            },
            'searchForm.team': function(val) { // 根据队伍获取运动员
                if(val) {
                    this.getAthleteList('', {teamId: val});
                }
            }
        }
    })
</script>
