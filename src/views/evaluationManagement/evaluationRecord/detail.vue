<template>
    <div class="evaluation-record-detail-wrapper">
        <!--个人信息-->
        <el-collapse v-model="activeNames" style="margin-bottom: 15px;">
            <el-collapse-item title="个人信息" name="1">
                <el-form :model="personForm" label-width="130px">
                    <el-row>
                        <div class="sub-title">基础信息</div>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-form-item label="姓名：">{{personForm.staffName}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="性别：">{{personForm.gender == 1 ?'男':'女'}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="身份证：">{{personForm.identity}}</el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-form-item label="出生年月：">{{personForm.birthday}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="身高(cm)：">{{personForm.height}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="体重(kg)：">{{personForm.weight}}</el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-form-item label="籍贯：">{{personForm.nativePlace}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="个人照片：">
                                    <img :src="personForm.photo" style="width: 150px;">
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-row>

                    <el-row>
                        <div class="sub-title">身份信息</div>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-form-item label="身份角色：">{{personForm.jobName}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="运动员级别：">{{personForm.jobLevel}}</el-form-item>
                            </el-col>
                        </el-row>
                    </el-row>

                    <el-row>
                        <div class="sub-title">业务信息</div>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-form-item label="大项：">{{personForm.projectName}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="小项：">{{personForm.childProject}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="运动队：">{{personForm.teamName}}</el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-form-item label="教练员：">{{personForm.coachName}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="原项目：">{{personForm.oldProjectName}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="原项目训练年限：">{{personForm.oldProjectDuration}}</el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-form-item label="入队时间：">{{personForm.joinDate}}</el-form-item>
                            </el-col>
                        </el-row>
                    </el-row>
                </el-form>
            </el-collapse-item>
        </el-collapse>

        <!--测评信息-->
        <el-collapse v-model="activeNames">
            <el-collapse-item title="测评信息" name="2">
                <el-form :model="testForm" label-width="130px">
                    <el-row>
                        <div class="sub-title">基础信息</div>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-form-item label="测评类型：">{{testForm.testType}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="测评项目：">{{testForm.testProjectName}}</el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-form-item label="测评id：">{{testForm.testId}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="测评批次：">{{testForm.testBatch}}</el-form-item>
                            </el-col>
                        </el-row>
                    </el-row>

                    <el-row>
                        <div class="sub-title">测评详情</div>
                        <el-row :gutter="20">
                            <el-table :data="list" border fit highlight-current-row
                                      style="width: 100%;" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                                <el-table-column align="center"
                                        v-for="(col,idx) in cols" :key="idx"
                                        :prop="col.prop" :label="col.label" >
                                </el-table-column>
                            </el-table>
                        </el-row>
                    </el-row>
                </el-form>
            </el-collapse-item>
        </el-collapse>
        <el-row style="text-align: center;margin-top:20px;">
            <el-button type="primary" round @click="closeWindow" style="padding: 12px 35px;">关闭</el-button>
        </el-row>
    </div>
</template>

<script>
    import {getTestDetail} from '@/api/evaluationManagement'
    import linq from "linq"

    export default {
        data() {
            return {
                //header: ['通气量(MV)', '最大氧耗量（VO2max ）', '心率(HR)', '负荷', '速度(km/h)', '坡度(%)'],

                activeNames: ['2'],
                id: this.$route.query.id,
                personForm: { // 个人信息
                    staffName: null,
                    gender: null,
                    identity: null,
                    birthday: null,
                    height: null,
                    weight: null,
                    nativePlace: null,
                    photo: null,
                    jobName: null,
                    jobLevel: null,
                    projectName: null,
                    childProject: null,
                    teamName: null,
                    coachName: null,
                    oldProjectName: null,
                    oldProjectDuration: null,
                    joinDate: null,
                },

                testForm: {  // 测评信息
                    testType: null,
                    testProjectName: null,
                    testId: null,
                    testBatch: null
                },

                list: [],   // 测评详情列表
                cols:[]// 列信息

            }
        },

        created() {
            this.getDetails();
        },

        methods: {
            // 获取详情信息
            getDetails() {
                getTestDetail({
                    testId: this.id
                }).then(res => {
                    if(res.data.code == 200) {
                        this.personForm = res.data.data.sportsStaff;
                        this.testForm = res.data.data.sportsTest;
                        this.cols = linq.from(this.testForm.headerList).orderBy("d=>d.orderNum").toArray();
                        this.list = this.testForm.detailList;

                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                })
            },

            // 关闭
            closeWindow() {
                this.$store.dispatch('delVisitedViews', this.$route).then((views) => {
                    this.$router.go(-1)
                })
            }
        }
    }
</script>


<style lang="scss">
    .evaluation-record-detail-wrapper {
        .el-collapse-item__header {
            font-weight: 700;
            font-size: 18px;
            border-bottom: 1px solid #EBEEF5
        }
        .sub-title {
            font-weight: 700;
            font-size: 15px;
            padding-left: 5px;
            border-left: 2px solid #000;
            margin: 15px 0;
            line-height: 1;
        }

        .el-form-item {
            margin-bottom: 0;
        }

        .el-collapse-item__wrap {
            border-bottom: 0;
        }
    }
</style>
