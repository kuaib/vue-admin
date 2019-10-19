<template>
    <div>
        <el-form :model="searchForm" ref="searchForm">
            <el-row :gutter="20" class="search-item">
                <el-col :span="6">
                    <el-form-item prop="id">
                        <el-input placeholder="请输入考勤id" v-model="searchForm.id"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="bigPro">
                        <el-select v-model="searchForm.bigPro" placeholder="请选择项目">
                            <el-option v-for="item in bigProList"
                                       :label="item.dicValue"
                                       :value="item.dicKey"
                                       :key="item.dicKey"></el-option>
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
<!--                <el-col :span="6">-->
<!--                    <el-form-item prop="smallPro">-->
<!--                        <el-select v-model="searchForm.smallPro" placeholder="请选择小项">-->
<!--                            <el-option v-for="(item,idx) in smallProList"-->
<!--                                       :label="item"-->
<!--                                       :value="item"-->
<!--                                       :key="idx"></el-option>-->
<!--                        </el-select>-->
<!--                    </el-form-item>-->
<!--                </el-col>-->
            </el-row>
            <el-row :gutter="20" class="search-item">
                <el-col :span="6" v-if="typeName==='day'">
                    <el-form-item prop="dateDay">
                        <el-date-picker style="width:100%;"
                                v-model="searchForm.dateDay"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="请选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6" v-if="typeName==='month'">
                    <el-form-item prop="dateMonth">
                        <el-date-picker style="width:100%;"
                                v-model="searchForm.dateMonth"
                                type="month"
                                value-format="yyyy-MM"
                                placeholder="请选择年月">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="coach">
                        <el-select v-model="searchForm.coach" placeholder="请选择教练员">
                            <el-option v-for="item in coachInfoList"
                                       :label="item.dicValue"
                                       :value="item.dicKey"
                                       :key="item.dicKey"></el-option>
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
        data() {
            return {
                searchForm: {
                    id: null,
                    bigPro: null,
                    team: null,
                    smallPro: null,
                    dateDay: null,
                    dateMonth: null,
                    coach: null
                }
            }
        },

        created() {
            this.getAllList(); // 获取基础下拉
        },

        props: {
            typeName: {  // 引用搜索组件的父组件
                type: String
            }
        },

        methods: {
            // 搜索
            handleFilter() {
                this.$emit('handleFilter', this.searchForm)
            }
        },

        watch: {
            'searchForm.bigPro': function(val) {
                if(val) {
                    this.searchForm.team = null;
                    this.teamByProList = [];
                    this.getTeamByProject(val);
                }
            }
        }
    })
</script>
