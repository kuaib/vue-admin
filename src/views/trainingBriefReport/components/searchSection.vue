<!--集训简报计划搜索-->
<template>
    <div>
        <el-form :model="searchForm" ref="searchForm">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item prop="id">
                        <el-input placeholder="请输入报表id" v-model="searchForm.id"></el-input>
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
                    <el-form-item prop="team">
                        <el-select v-model="searchForm.team" placeholder="请选择队伍">
                            <el-option
                                    v-for="item in teamByProList"
                                    :label="item.teamName"
                                    :value="item.teamId"
                                    :key="item.teamId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item prop="coach">
                        <el-select v-model="searchForm.coach" placeholder="请选择教练">
                            <el-option
                                    v-for="item in coachInfoList"
                                    :label="item.dicValue"
                                    :value="item.dicKey"
                                    :key="item.dicKey">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="trainYear">
                        <el-date-picker style="width:100%"
                                v-model="searchForm.trainYear"
                                type="month"
                                value-format="yyyy-MM"
                                placeholder="请选择集训时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6" v-if="isSummary">
                    <el-form-item prop="summary">
                        <el-select v-model="searchForm.summary" placeholder="是否总结">
                            <el-option label="否" value="0"></el-option>
                            <el-option label="是" value="1"></el-option>
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
    export default ({
        mixins: [mixin],
        props: ['isSummary'],
        data() {
            return {
                searchForm: {
                    id: null,
                    project: null,
                    team: null,
                    coach: null,
                    trainYear: null,
                    summary: null
                }
            }
        },

        created() {
            this.getAllList(); // 获取基础下拉
        },

        methods: {
            // 搜索
            handleFilter() {
                this.$emit('handleFilter', this.searchForm)
            }
        },
         watch: {
            'searchForm.project': function(val) {
                if(val) {
                    this.searchForm.team = null;
                    this.teamByProList = [];
                    this.getTeamByProject(val);
                }
            }
        }
    })
</script>
