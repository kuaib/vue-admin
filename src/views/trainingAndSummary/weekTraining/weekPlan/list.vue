<!--周训练管理列表-->
<template>
    <div class="week-training-wrapper">
        <!--tab切换-->
        <change-tab-bar :isSummary="isSummary" sectionItem="week"></change-tab-bar>

        <!--搜索-->
        <search-section :typeName="typeName" @handleFilter="handleFilter" :isSummary="isSummary"></search-section>

        <!--表格-->
        <el-row>
            <div class="table-title clearfix">
                <h3>{{typeName}}列表</h3>
                <el-button type="success" @click="addNew" v-if="extInfo.canOperate&&!isSummary">创建周计划</el-button>
            </div>
            <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
                      style="width: 100%;">
                <el-table-column align="center" :label="typeName+'id'">
                    <template slot-scope="scope">
                        <span v-if="!isSummary">{{scope.row.trainWeekId}}</span>
                        <span v-else>{{scope.row.trainDayId}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="项目">
                    <template slot-scope="scope">
                        <span>{{scope.row.projectName}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="教练员">
                    <template slot-scope="scope">
                        <span>{{scope.row.coachName}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="训练年度">
                    <template slot-scope="scope">
                        <span>{{scope.row.trainDate}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="时间范围" v-if="!isSummary">
                    <template slot-scope="scope">
                        <span>{{scope.row.trainDay}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="日期" v-if="isSummary">
                    <template slot-scope="scope">
                        <span>{{scope.row.dayStr}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="是否有视频" v-if="isSummary">
                    <template slot-scope="scope">
                        <span>{{scope.row.video?'是':'否'}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="是否总结" v-if="isSummary">
                    <template slot-scope="scope">
                        <span>{{scope.row.summary=='0'?'否':'是'}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="toEdit(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="listQuery.currentPage" :page-sizes="[10,20,30, 50]"
                               :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper"
                               :total="total">
                </el-pagination>
            </div>
        </el-row>
    </div>
</template>

<script>
    import mixins from '@/utils/mixins'
    import changeTabBar from '../../components/changeTabBar'
    import searchSection from '../../components/searchSection'
    import {getWeekTrainPlanList, getDayTrainList} from '@/api/trainingAndSummary'

    export default {
        mixins: [mixins],
        components: {searchSection, changeTabBar},
        data() {
            return {
                isSummary: this.$route.path.indexOf('/weekSummary') !== -1,    // 是否是周训练总结(计划与总结页面公用)
                typeName: this.$route.path.indexOf('/weekSummary') !== -1 ? '日计划' : '周计划',
                list: [],            // table列表
                total: null,         // 总条目数
                listLoading: false,  // 查询table的loading
                listQuery: {
                    currentPage: 1,
                    pageSize: 10
                },
                extInfo: {}  // 账号的权限
            }
        },

        created() {
            this.getList();
        },

        methods: {
            // 获取周/日计划列表
            getList(formData = {}) {
                this.listLoading = true;
                if (this.isSummary) { // 日计划列表
                    getDayTrainList({
                        currentPage: this.listQuery.currentPage,
                        pageSize: this.listQuery.pageSize,
                        trainDayId: formData.id,
                        projectId: formData.project,
                        teamId: formData.team,
                        coachId: formData.coach,
                        trainDate: formData.trainYear,
                        dayStr: formData.trainDate && formData.trainDate.split('-').join(''),
                    }).then(res => {
                        this.listLoading = false;
                        if (res.data.code === 200) {
                            const data = res.data.data;
                            this.list = data.list;
                            this.extInfo = data.extInfo;
                            this.total = data.pagination.total;
                        } else {
                            this.$message({
                                message: res.data.msg,
                                type: 'warning'
                            })
                        }
                    }).catch(rej => {
                        this.listLoading = false;
                    })
                } else { // 周计划列表
                    getWeekTrainPlanList({
                        currentPage: this.listQuery.currentPage,
                        pageSize: this.listQuery.pageSize,
                        trainWeekId: formData.id,
                        projectId: formData.project,
                        teamId: formData.team,
                        coachId: formData.coach,
                        trainDate: formData.trainYear,
                    }).then(res => {
                        this.listLoading = false;
                        if (res.data.code === 200) {
                            const data = res.data.data;
                            this.list = data.list;
                            this.extInfo = data.extInfo;
                            this.total = data.pagination.total;
                        } else {
                            this.$message({
                                message: res.data.msg,
                                type: 'warning'
                            })
                        }
                    }).catch(rej => {
                        this.listLoading = false;
                    })
                }
            },

            // 创建周计划
            addNew() {
                localStorage.setItem('trainAndSumUserWeek', JSON.stringify(this.extInfo.useInfo));
                this.$router.push('/weekTraining/weekPlan/add');
            },

            // 去详情
            toEdit(row) {
                let path;
                if (this.isSummary) {
                    path = '/weekTraining/weekSummary/edit';
                    this.$router.push(
                        {path: path, query: {id: row.trainDayId, canOperate: this.extInfo.canOperate}})
                } else {
                    path = '/weekTraining/weekPlan/edit';
                    this.$router.push(
                        {path: path, query: {id: row.trainWeekId, canOperate: this.extInfo.canOperate}})
                }

            },
        }
    }
</script>

<style lang="scss">
    .week-training-wrapper {
        .table-title {
            margin-top: 20px;
            margin-bottom: 10px;
            h3 {
                font-size: 18px;
                float: left;
                margin-top: 10px;
            }
            button {
                float: right;
            }
        }
        .el-date-editor .el-range-separator {
            padding: 0 !important;
        }
        .el-date-editor .el-range-input {
            width: 60%;
        }
    }
</style>
